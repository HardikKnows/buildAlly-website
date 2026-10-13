"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { SignupButton } from "@/components/ui/SignupLink";
import {
  PLANS,
  PAID_PLANS,
  BILLING_CYCLES,
  DEFAULT_CYCLE,
  SITE_ADDON,
  GROWTH_SITES,
  KEY_HOLDER_NOTE,
  formatPrice,
  priceFor,
  effectiveMonthly,
  annualSavings,
} from "@/lib/pricing";
import { track, EVENTS } from "@/lib/track";

// The pricing block: one billing selector driving four plan cards. Annual is
// selected on load. Whichever period is selected, every card states both the
// monthly and the annual price, so the billing period is never ambiguous and
// an annual monthly-equivalent is never shown without the amount actually
// billed.

// Only claim annual is cheaper if it is, for every plan.
const ANNUAL_ALWAYS_CHEAPER = PAID_PLANS.every((p) => annualSavings(p));

const CYCLE_NOTES = {
  annual:
    "Annual plans are billed once a year, upfront. Monthly equivalents are shown for comparison only.",
  monthly: ANNUAL_ALWAYS_CHEAPER
    ? "Monthly plans are billed every month. Annual billing costs less over a year on every plan."
    : "Monthly plans are billed every month.",
};

export function BillingToggle({ cycle, onChange }) {
  const name = useId();

  return (
    <fieldset className="flex flex-col items-center">
      <legend className="sr-only">Billing period</legend>
      <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm">
        {BILLING_CYCLES.map((c) => {
          const active = c.id === cycle;
          return (
            <label key={c.id} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={c.id}
                checked={active}
                onChange={() => onChange(c.id)}
                className="peer sr-only"
              />
              <span
                className={`block rounded-full px-5 py-2.5 text-sm font-semibold transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand sm:px-6 ${
                  active
                    ? "bg-gradient-brand text-white shadow-sm"
                    : "text-ink-600 hover:text-ink"
                }`}
              >
                {c.label} billing
              </span>
            </label>
          );
        })}
      </div>
      <p
        aria-live="polite"
        className="mt-3 max-w-md text-center text-sm leading-relaxed text-slate-body"
      >
        {CYCLE_NOTES[cycle]}
      </p>
    </fieldset>
  );
}

function PlanPrice({ plan, cycle }) {
  if (plan.custom) {
    return (
      <div>
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
            Custom
          </span>
          <span className="text-sm font-medium text-slate-body">pricing</span>
        </p>
        <p className="mt-1.5 text-sm text-ink-600">
          Pricing and limits agreed with our team.
        </p>
      </div>
    );
  }

  const monthly = priceFor(plan, "monthly");
  const annual = priceFor(plan, "annual");
  const perMonth = effectiveMonthly(plan);
  const savings = annualSavings(plan);

  if (cycle === "annual") {
    return (
      <div>
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
            {formatPrice(annual)}
          </span>
          <span className="text-sm font-medium text-slate-body">/year</span>
        </p>
        <p className="mt-1.5 text-sm text-ink-600">
          Works out to {formatPrice(perMonth)}/month, billed annually
        </p>
        {savings && (
          <p className="mt-2.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-bold text-success">
              <Icon name="PiggyBank" size={13} /> Save {formatPrice(savings.amount)}{" "}
              vs. monthly billing
            </span>
          </p>
        )}
        <p className="mt-2 text-xs text-slate-body">
          Or {formatPrice(monthly)}/month with monthly billing
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
          {formatPrice(monthly)}
        </span>
        <span className="text-sm font-medium text-slate-body">/month</span>
      </p>
      <p className="mt-1.5 text-sm text-ink-600">Billed monthly</p>
      <p className="mt-2 text-xs text-slate-body">
        Or {formatPrice(annual)}/year with annual billing (
        {formatPrice(perMonth)}/month equivalent)
      </p>
    </div>
  );
}

// Sites, team members and storage — always visible on every card, with the
// key-holder exclusion right where the team-member limit is stated.
function Capacity({ plan }) {
  const addon = plan.id === SITE_ADDON.planId;
  const rows = [
    {
      label: "Active sites",
      value: plan.custom ? "Custom" : addon ? `${plan.sites} included` : plan.sites,
      note: addon ? `Up to ${GROWTH_SITES.max} with add-ons` : null,
    },
    {
      label: "Team members",
      value: plan.custom ? "Custom" : plan.members,
      note: (
        <a
          href="#key-holders"
          className="underline-offset-2 hover:underline"
        >
          {KEY_HOLDER_NOTE.short}
        </a>
      ),
    },
    {
      label: "Storage",
      value: plan.custom ? "Custom" : `${plan.storageGb} GB`,
    },
  ];

  return (
    <dl className="mt-6 divide-y divide-line rounded-xl bg-canvas px-4 text-sm">
      {rows.map((row) => (
        <div key={row.label} className="py-3">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="whitespace-nowrap text-slate-body">{row.label}</dt>
            <dd className="text-right font-semibold text-ink">{row.value}</dd>
          </div>
          {row.note && (
            <dd className="mt-0.5 text-right text-xs font-medium text-brand">
              {row.note}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

function PlanCard({ plan, cycle, location, enterpriseHref }) {
  const headingId = `plan-${plan.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-7 ${
        plan.recommended
          ? "border-brand shadow-xl shadow-brand/10 ring-1 ring-brand/20 xl:py-10"
          : "border-line shadow-sm"
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Icon name="Star" size={13} /> Recommended
        </span>
      )}

      <h3 id={headingId} className="font-display text-xl font-bold text-ink">
        {plan.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
        {plan.tagline}
      </p>

      <div className="mt-6">
        <PlanPrice plan={plan} cycle={cycle} />
      </div>

      <Capacity plan={plan} />

      <ul className="mt-6 space-y-2.5">
        {plan.highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600"
          >
            <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-brand" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        {plan.custom ? (
          <TrackedButton
            href={enterpriseHref}
            event={EVENTS.ENTERPRISE_CTA}
            eventProps={{ location, plan: plan.id }}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            {plan.cta} <Icon name="ArrowRight" size={18} />
          </TrackedButton>
        ) : (
          <SignupButton
            // The app takes the plan choice at /activate after sign-up, so
            // plan intent rides the analytics event, not a query param.
            event={EVENTS.PLAN_CTA}
            eventProps={{ location, plan: plan.id, cycle }}
            variant={plan.recommended ? "primary" : "secondary"}
            size="lg"
            className="w-full"
          >
            {plan.cta}
          </SignupButton>
        )}
      </div>
    </article>
  );
}

export function PricingPlans({
  location = "pricing_page",
  enterpriseHref = "#enterprise",
  className = "",
}) {
  const [cycle, setCycle] = useState(DEFAULT_CYCLE);

  const changeCycle = (next) => {
    setCycle(next);
    track(EVENTS.BILLING_CYCLE_CHANGE, { location, cycle: next });
  };

  return (
    <div className={className}>
      <BillingToggle cycle={cycle} onChange={changeCycle} />

      <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => (
          <div key={plan.id} className={plan.recommended ? "xl:-my-4" : ""}>
            <PlanCard
              plan={plan}
              cycle={cycle}
              location={location}
              enterpriseHref={enterpriseHref}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
