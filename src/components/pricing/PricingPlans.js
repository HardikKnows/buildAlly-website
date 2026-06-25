import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { PRICING, formatPrice, monthlyEquivalent } from "@/lib/pricing";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// Two-plan pricing cards (Monthly / Annual) reading from the centralized
// pricing config. Each card shows the original price (strikethrough), the
// limited-period offer price, the discount badge, and a Start-trial CTA.
export function PricingPlans({ location = "pricing", className = "" }) {
  return (
    <RevealGroup
      className={`mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 ${className}`}
    >
      {PRICING.plans.map((plan) => {
        const perMonth = monthlyEquivalent(plan);
        return (
          <RevealItem key={plan.id}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 ${
                plan.featured
                  ? "border-brand shadow-lg shadow-brand/10 ring-1 ring-brand/15"
                  : "border-line"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Icon name="Star" size={13} /> Best value
                </span>
              )}

              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-ink">
                  {plan.name}
                </h3>
                <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                  {plan.discountPercent}% OFF
                </span>
              </div>
              <p className="mt-1.5 text-sm text-slate-body">{plan.tagline}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
                  {formatPrice(plan.price)}
                </span>
                <span className="pb-1.5 text-slate-body">{plan.periodLabel}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
                <span className="text-slate-400 line-through">
                  {formatPrice(plan.originalPrice)}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-brand">
                  <Icon name="Tag" size={13} /> {PRICING.offerLabel}
                </span>
              </div>
              {perMonth && (
                <p className="mt-1.5 text-sm text-slate-body">
                  ≈ {formatPrice(perMonth)}/month, billed annually
                </p>
              )}

              <div className="mt-auto pt-7">
                <TrackedButton
                  href={URLS.signup}
                  external
                  event={EVENTS.START_TRIAL}
                  eventProps={{ location, plan: plan.id }}
                  variant={plan.featured ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  Start 7-day trial <Icon name="ArrowRight" size={18} />
                </TrackedButton>
                <p className="mt-3 text-center text-xs text-slate-body">
                  {plan.billingNote} · Cancel anytime
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
