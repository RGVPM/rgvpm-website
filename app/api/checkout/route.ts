import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/site";

/**
 * GET /api/checkout?plan=site&add=seo,ads
 *
 * Self-serve signup: turns the pricing page's picks into a Stripe Checkout
 * session (a monthly subscription, plus the one-time build fee when the
 * website is bought on its own) and redirects there. Price IDs come from env vars,
 * one per product, so prices are changed in Stripe, not here. Links to the retired
 * bundle plans go to /pricing.
 *
 * Until those env vars are set, it falls back to the website payment link,
 * then to the booking page, so the button never dead-ends.
 */
type Addon = "seo" | "content" | "social" | "ads";

const ADDONS: Addon[] = ["seo", "content", "social", "ads"];

const PRICE_ENV: Record<"site" | Addon | "buildFee", string> = {
  site: "STRIPE_PRICE_SITE",
  buildFee: "STRIPE_PRICE_BUILD_FEE",
  seo: "STRIPE_PRICE_SEO",
  content: "STRIPE_PRICE_CONTENT",
  social: "STRIPE_PRICE_SOCIAL",
  ads: "STRIPE_PRICE_ADS",
};

/** Payment link that works today, for the website on its own. */
const FALLBACK_LINK = "https://buy.stripe.com/7sY9ATeDa4ui3dwg7T7Zu0F";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const planParam = params.get("plan");
  if (planParam === "machine" || planParam === "market") {
    return NextResponse.redirect(`${SITE.url}/pricing`, 303);
  }
  const picked = Array.from(new Set((params.get("add") ?? "").split(",")))
    .filter((a): a is Addon => (ADDONS as string[]).includes(a));
  // Content Crew and Full Service Social are either/or; keep the bigger one.
  const addons = picked.includes("social") ? picked.filter((a) => a !== "content") : picked;

  const key = process.env.STRIPE_SECRET_KEY;
  // The build fee is only for the website on its own; any add-on waives it.
  const fee = addons.length === 0 ? (["buildFee"] as const) : [];
  const items = (["site", ...addons, ...fee] as const).map((k) => process.env[PRICE_ENV[k]]);

  if (!key || items.some((id) => !id)) {
    return NextResponse.redirect(addons.length === 0 ? FALLBACK_LINK : SITE.bookingUrl, 303);
  }

  const body = new URLSearchParams({
    mode: "subscription",
    success_url: `${SITE.url}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE.url}/pricing`,
    allow_promotion_codes: "true",
    billing_address_collection: "auto",
    "phone_number_collection[enabled]": "true",
    "subscription_data[metadata][plan]": "site",
    "subscription_data[metadata][addons]": addons.join(","),
  });
  items.forEach((price, i) => {
    body.set(`line_items[${i}][price]`, price!);
    body.set(`line_items[${i}][quantity]`, "1");
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const session = (await res.json()) as { url?: string; error?: { message: string } };
  if (!res.ok || !session.url) {
    console.error("Stripe checkout failed:", session.error?.message ?? res.status);
    return NextResponse.redirect(SITE.bookingUrl, 303);
  }
  return NextResponse.redirect(session.url, 303);
}
