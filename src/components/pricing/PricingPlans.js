import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import {
  PRICING,
  formatPrice,
  annualSavings,
  discountPercent,
} from "@/lib/pricing";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// Four-tier pricing cards (Trial / Interior / Builder / Enterprise) reading from
// the centralized pricing config. Builder is the highlighted, recommended card.

// Map a plan's CTA action to its destination + tracking event, so the pricing
// config stays free of routing concerns.
function ctaTarget(action) {
  if (action === "contact") {
    return { href: URLS.contactSales, external: false, event: EVENTS.CONTACT_SALES };
  }
  return { href: URLS.signup, external: true, event: EVENTS.START_TRIAL };
}

export function PricingPlans({ location = "pricing", className = "" }) {
  return (
    <RevealGroup
      className={`grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {PRICING.plans.map((plan) => {
        const savings = annualSavings(plan);
        const offPercent = discountPercent(plan);
        const target = ctaTarget(plan.cta.action);

        return (
          <RevealItem key={plan.id} className={plan.featured ? "lg:-my-4" : ""}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-7 ${
                plan.featured
                  ? "border-brand shadow-xl shadow-brand/10 ring-1 ring-brand/20 lg:py-10"
                  : "border-line shadow-sm"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Icon name="Star" size={13} /> {plan.badge}
                </span>
              )}

              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-ink">
                  {plan.name}
                </h3>
                {plan.comingSoon && (
                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
                    Coming Soon
                  </span>
                )}
                {offPercent && (
                  <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                    {offPercent}% OFF
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
                {plan.tagline}
              </p>

              {plan.bestFor && (
                <p className="mt-3 text-xs leading-relaxed text-slate-body">
                  <span className="font-semibold text-ink-600">Best for:</span>{" "}
                  {plan.bestFor.join(" · ")}
                </p>
              )}

              {/* Price */}
              <div className="mt-6">
                {plan.priceLabel ? (
                  <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
                    {plan.priceLabel}
                  </span>
                ) : (
                  <div className="flex items-end gap-1.5">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="pb-1.5 text-sm text-slate-body">
                      {plan.periodLabel}
                    </span>
                  </div>
                )}

                {/* Standard rate, struck through, + the launch-offer label. */}
                {plan.originalPrice && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
                    <span className="text-slate-400 line-through">
                      {formatPrice(plan.originalPrice)}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-brand">
                      <Icon name="Tag" size={13} /> {PRICING.offerLabel}
                    </span>
                  </div>
                )}

                {plan.annualPrice && (
                  <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="text-slate-body">
                      or {formatPrice(plan.annualPrice)}/year
                    </span>
                    {plan.originalAnnualPrice && (
                      <span className="text-slate-400 line-through">
                        {formatPrice(plan.originalAnnualPrice)}
                      </span>
                    )}
                    {savings && (
                      <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-bold text-success">
                        Save {formatPrice(savings.amount)} vs monthly
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600"
                  >
                    <Icon
                      name="Check"
                      size={16}
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto pt-7">
                <TrackedButton
                  href={target.href}
                  external={target.external}
                  event={target.event}
                  eventProps={{ location, plan: plan.id }}
                  variant={plan.featured ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta.label}
                </TrackedButton>
                <p className="mt-3 text-center text-xs text-slate-body">
                  {plan.billingNote}
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
