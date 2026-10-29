import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/site";

/**
 * GET /api/checkout?plan=site|machine|market&add=seo,ads
 *
 * Self-serve signup: turns the pricing page's picks into a Stripe Checkout
 * session (a monthly subscription) and redirects there. Price IDs come from env vars,
 * one per plan and add-on, so prices are changed in Stripe, not here.
 *
 * Until those env vars are set, it falls back to the payment links that
 * already exist, then to the booking page, so the button never dead-ends.
 */
type Plan = "site" | "machine" | "market";
type Addon = "seo" | "content" | "social" | "ads";

const ADDONS: Addon[] = ["seo", "content", "social", "ads"];

/** Add-ons a bundle already includes (so they're never billed twice). */
const COVERED: Record<Plan, Addon[]> = {
  site: [],
  machine: ["seo", "content"],
  market: ["seo", "content", "social", "ads"],
};

const PRICE_ENV: Record<Plan | Addon, string> = {
  site: "STRIPE_PRICE_SITE",
  machine: "STRIPE_PRICE_MACHINE",
  market: "STRIPE_PRICE_MARKET",
  seo: "STRIPE_PRICE_SEO",
  content: "STRIPE_PRICE_CONTENT",
  social: "STRIPE_PRICE_SOCIAL",
  ads: "STRIPE_PRICE_ADS",
};

/** Payment links that work today, for the picks they match exactly. */
const FALLBACK_LINKS: Partial<Record<Plan, string>> = {
  site: "https://buy.stripe.com/7sY9ATeDa4ui3dwg7T7Zu0F",
  machine: "https://api.rgvperformancemarketing.com/payment-link/6a25cba371a0aa761e46375b",
};

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const planParam = params.get("plan");
  const plan: Plan = planParam === "machine" || planParam === "market" ? planParam : "site";
  const picked = Array.from(new Set((params.get("add") ?? "").split(",")))
    .filter((a): a is Addon => (ADDONS as string[]).includes(a))
    .filter((a) => !COVERED[plan].includes(a));
  // Content Crew and Full Service Social are either/or; keep the bigger one.
  const addons = picked.includes("social") ? picked.filter((a) => a !== "content") : picked;

  const key = process.env.STRIPE_SECRET_KEY;
  const items = [plan, ...addons].map((k) => process.env[PRICE_ENV[k]]);

  if (!key || items.some((id) => !id)) {
    const link = addons.length === 0 ? FALLBACK_LINKS[plan] : undefined;
    return NextResponse.redirect(link ?? SITE.bookingUrl, 303);
  }

  const origin = req.nextUrl.origin;
  const body = new URLSearchParams({
    mode: "subscription",
    success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    allow_promotion_codes: "true",
    billing_address_collection: "auto",
    "phone_number_collection[enabled]": "true",
    "subscription_data[metadata][plan]": plan,
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
