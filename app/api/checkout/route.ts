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
 *
 * &promo=bf (Black Friday 2026): no build fee and the first month
 * free. The card is taken at checkout for $0 (sent on the launch call, when the
 * site goes live) and the first charge lands 30 days later, then monthly.
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

/**
 * Black Friday requests close Mon Nov 30, 2026; the link stays good through Mon Dec 7,
 * 11:59 PM CT (06:00 UTC Dec 8), so late requests can still check out on their launch call.
 */
const BF_ENDS = Date.UTC(2026, 11, 8, 6);
const BF_FREE_DAYS = 30;

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

  const now = Date.now();
  const bf = params.get("promo") === "bf" && now < BF_ENDS;

  const key = process.env.STRIPE_SECRET_KEY;
  // The build fee is only for the website on its own; any add-on (or the BF deal) waives it.
  const fee = addons.length === 0 && !bf ? (["buildFee"] as const) : [];
  const items = (["site", ...addons, ...fee] as const).map((k) => process.env[PRICE_ENV[k]]);

  if (!key || items.some((id) => !id)) {
    // The payment link charges today, so a BF signup goes to a call instead.
    return NextResponse.redirect(addons.length === 0 && !bf ? FALLBACK_LINK : SITE.bookingUrl, 303);
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
  if (bf) {
    const day = new Date(now + BF_FREE_DAYS * 86_400_000)
      .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
    body.set("payment_method_collection", "always");
    body.set("subscription_data[trial_period_days]", String(BF_FREE_DAYS));
    body.set("subscription_data[trial_settings][end_behavior][missing_payment_method]", "cancel");
    body.set("subscription_data[metadata][promo]", "bf-2026");
    body.set(
      "custom_text[submit][message]",
      `Black Friday: no build fee and your first month is free. Your first charge is on ${day}, then every month on that date. Cancel before ${day} and you pay nothing; your site comes down.`,
    );
  }
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
