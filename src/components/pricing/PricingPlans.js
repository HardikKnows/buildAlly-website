"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import {
  PRICING,
  BILLING_CYCLES,
  DEFAULT_CYCLE,
  formatPrice,
  priceFor,
  discountPercent,
  annualSavings,
  monthlyEquivalent,
} from "@/lib/pricing";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// The pricing block: one billing toggle driving four plan cards. Annual is
// selected on load (it's the better value). Switching is pure client state —
// there is only ever one set of cards in the DOM, never a duplicated section.

// Map a plan's CTA action to its destination + tracking event, so the pricing
// config stays free of routing concerns.
function ctaTarget(action) {
  if (action === "contact") {
    return { href: URLS.contactSales, external: false, event: EVENTS.CONTACT_SALES };
  }
  return { href: URLS.signup, external: true, event: EVENTS.START_TRIAL };
}

function BillingToggle({ cycle, onChange }) {
  return (
    <div className="flex justify-center">
      <div
        role="radiogroup"
        aria-label="Billing cycle"
        className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm"
      >
        {BILLING_CYCLES.map((c) => {
          const active = c.id === cycle;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(c.id)}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                active
                  ? "bg-gradient-brand text-white shadow-sm"
                  : "text-ink-600 hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlanCard({ plan, cycle, location }) {
  const billing = priceFor(plan, cycle);
  const offPercent = discountPercent(plan, cycle);
  const savings = annualSavings(plan);
  const perMonth = cycle === "annual" ? monthlyEquivalent(plan) : null;
  const target = ctaTarget(plan.cta.action);
  const note = billing?.note || plan.billingNote;

  return (
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
        <h3 className="font-display text-lg font-bold text-ink">{plan.name}</h3>
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

      {/* Price — updates instantly with the toggle */}
      <div className="mt-6">
        {billing ? (
          <div className="flex items-end gap-1.5">
            <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
              {formatPrice(billing.price)}
            </span>
            <span className="pb-1.5 text-sm text-slate-body">
              {billing.periodLabel}
            </span>
          </div>
        ) : (
          <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
            {plan.priceLabel}
          </span>
        )}

        {/* Standard rate, struck through, + the launch-offer label. */}
        {billing?.originalPrice && (
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
            <span className="text-slate-400 line-through">
              {formatPrice(billing.originalPrice)}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand">
              <Icon name="Tag" size={13} /> {PRICING.offerLabel}
            </span>
          </div>
        )}

        {cycle === "annual" && savings && (
          <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-bold text-success">
              <Icon name="PiggyBank" size={13} /> Save{" "}
              {formatPrice(savings.amount)}/year
            </span>
            {perMonth && (
              <span className="text-slate-body">
                ≈ {formatPrice(perMonth)}/month
              </span>
            )}
          </p>
        )}
      </div>

      {/* Capacity at a glance — always visible on every card */}
      <dl className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-canvas p-3.5">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-body">
            Active sites
          </dt>
          <dd className="mt-0.5 text-sm font-bold text-ink">{plan.sites}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-body">
            Storage
          </dt>
          <dd className="mt-0.5 text-sm font-bold text-ink">{plan.storage}</dd>
        </div>
      </dl>

      {/* Feature hierarchy — each plan builds on the one before it */}
      {plan.inherits && (
        <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
          <Icon name="CircleCheckBig" size={16} className="shrink-0 text-brand" />
          {plan.inherits}
        </p>
      )}
      <ul className={`space-y-2.5 ${plan.inherits ? "mt-4" : "mt-6 border-t border-line pt-6"}`}>
        {plan.highlights.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600"
          >
            <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-brand" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#compare"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-deep"
      >
        Compare plans <Icon name="ArrowDown" size={14} />
      </a>

      {/* CTA */}
      <div className="mt-auto pt-7">
        <TrackedButton
          href={target.href}
          external={target.external}
          event={target.event}
          eventProps={{ location, plan: plan.id, cycle }}
          variant={plan.featured ? "primary" : "secondary"}
          size="lg"
          className="w-full"
        >
          {plan.cta.label}
        </TrackedButton>
        {note && (
          <p className="mt-3 text-center text-xs text-slate-body">{note}</p>
        )}
      </div>
    </div>
  );
}

export function PricingPlans({ location = "pricing", className = "" }) {
  const [cycle, setCycle] = useState(DEFAULT_CYCLE);

  return (
    <div className={className}>
      <BillingToggle cycle={cycle} onChange={setCycle} />

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRICING.plans.map((plan) => (
          <div key={plan.id} className={plan.featured ? "lg:-my-4" : ""}>
            <PlanCard plan={plan} cycle={cycle} location={location} />
          </div>
        ))}
      </div>
    </div>
  );
}
