"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { PLANS, type PlanId } from "@/lib/offer";
import { track } from "@/lib/track";

/**
 * Fires the Meta `Purchase` event on the post-checkout thank-you page.
 *
 * Stripe payment links redirect here after a successful payment, carrying
 * ?plan=website-crm or ?plan=growth-seo (configure this as the payment
 * link's success URL — see the owner checklist in lib/offer.ts). The plan
 * id resolves to a real price from PLANS, so the value reported to Meta can
 * never drift from the price on the page.
 *
 * An unrecognised or missing ?plan reports no value rather than guessing —
 * a Purchase with the wrong number is worse for optimisation than one
 * without a number.
 *
 * The ref guard makes this idempotent across React's development
 * double-invoke and any re-render, so one payment is one Purchase.
 */
export default function PurchaseTracker() {
  const params = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const planId = params.get("plan") as PlanId | null;
    const plan = PLANS.find((p) => p.id === planId);

    track("Purchase", {
      currency: "USD",
      value: plan?.price,
      content_name: plan?.name,
      content_ids: plan?.id,
      content_type: "product",
    });
  }, [params]);

  return null;
}
