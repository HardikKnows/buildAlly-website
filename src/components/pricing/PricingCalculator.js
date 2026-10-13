"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SignupButton } from "@/components/ui/SignupLink";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { prefillEnterpriseSites } from "@/components/pricing/EnterpriseForm";
import { EVENTS } from "@/lib/track";
import {
  PAID_PLANS,
  SITE_ADDON,
  GROWTH_SITES,
  ENTERPRISE_MIN_SITES,
  KEY_HOLDER_NOTE,
  formatPrice,
  getPlan,
  priceFor,
  planForSites,
} from "@/lib/pricing";

// "Which plan covers my sites, and what would it cost?" — answered from the
// published list prices. Presentation arithmetic, not billing: the final
// amount (GST split, promotional codes, mid-cycle changes) is confirmed by the
// application at checkout.
//
// Every figure comes from planForSites() in lib/pricing, which never returns
// a combination a plan can't serve — Growth stops at its add-on ceiling, and
// anything above Business becomes an Enterprise conversation.

const MIN_SITES = 1;
const SLIDER_MAX = 30; // the box takes larger numbers; the slider stays usable
const INPUT_MAX = 100000;
const DEFAULT_SITES = 5;

// Site ranges per plan, built from the config: Starter 1–3, Growth 4–10,
// Growth + add-ons 11–18, Business 19–25, Enterprise 26+.
const BANDS = (() => {
  const bands = [];
  let from = MIN_SITES;
  for (const plan of PAID_PLANS) {
    bands.push({ id: plan.id, label: plan.name, from, to: plan.sites });
    from = plan.sites + 1;
    if (plan.id === SITE_ADDON.planId) {
      bands.push({
        id: `${plan.id}-addons`,
        label: `${plan.name} + add-ons`,
        from,
        to: GROWTH_SITES.max,
      });
      from = GROWTH_SITES.max + 1;
    }
  }
  bands.push({ id: "enterprise", label: "Enterprise", from, to: null });
  return bands;
})();

function bandId(result) {
  if (!result) return null;
  return result.additional > 0 ? `${result.planId}-addons` : result.planId;
}

function sitesLabel(n) {
  return `${n} active site${n === 1 ? "" : "s"}`;
}

function PlanResult({ result }) {
  const plan = getPlan(result.planId);
  const withAddons = result.additional > 0;
  const business = getPlan("business");

  return (
    <div className="rounded-2xl border border-brand bg-white p-6 shadow-lg shadow-brand/10 ring-1 ring-brand/20 sm:p-8">
      <p className="text-sm font-semibold text-brand">
        {withAddons
          ? `${plan.name} with ${result.additional} add-on site${
              result.additional === 1 ? "" : "s"
            }`
          : plan.name}
      </p>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {["monthly", "annual"].map((cycle) => (
          <div key={cycle} className="rounded-xl bg-canvas p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-body">
              {cycle === "monthly" ? "Monthly billing" : "Annual billing"}
            </dt>
            <dd className="mt-1.5">
              <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
                {formatPrice(result.quotes[cycle])}
              </span>
              <span className="text-sm font-medium text-slate-body">
                {cycle === "monthly" ? "/month" : "/year"}
              </span>
              {withAddons && (
                <span className="mt-1 block text-xs text-slate-body">
                  {formatPrice(priceFor(plan, cycle))} + {result.additional} ×{" "}
                  {formatPrice(SITE_ADDON.prices[cycle])}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm leading-relaxed text-slate-body">
        Includes {plan.members} team members ({KEY_HOLDER_NOTE.short.toLowerCase()})
        and {plan.storageGb} GB storage.
        {withAddons &&
          ` Or ${business.name}: ${business.sites} sites, ${business.members} team members and ${
            business.storageGb
          } GB for ${formatPrice(priceFor(business, "monthly"))}/month or ${formatPrice(
            priceFor(business, "annual"),
          )}/year.`}
      </p>

      <SignupButton
        event={EVENTS.PLAN_CTA}
        eventProps={{ location: "plan_finder", plan: plan.id }}
        variant="primary"
        size="lg"
        className="mt-6 w-full sm:w-auto"
      >
        {plan.cta} <Icon name="ArrowRight" size={18} />
      </SignupButton>
    </div>
  );
}

function EnterpriseResult({ sites }) {
  return (
    <div className="rounded-2xl border border-brand bg-white p-6 shadow-lg shadow-brand/10 ring-1 ring-brand/20 sm:p-8">
      <p className="text-sm font-semibold text-brand">Enterprise</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
        Above {ENTERPRISE_MIN_SITES - 1} active sites, pricing and limits are set
        together with our team — tell us about your sites and we&apos;ll come back
        with a plan.
      </p>
      <TrackedButton
        href="#enterprise"
        event={EVENTS.ENTERPRISE_CTA}
        eventProps={{ location: "plan_finder" }}
        onClick={() => prefillEnterpriseSites(sites)}
        variant="primary"
        size="lg"
        className="mt-6 w-full sm:w-auto"
      >
        Talk to our team <Icon name="ArrowRight" size={18} />
      </TrackedButton>
    </div>
  );
}

export function PricingCalculator() {
  const inputId = useId();
  const hintId = useId();
  const [raw, setRaw] = useState(String(DEFAULT_SITES));

  const trimmedRaw = raw.trim();
  const valid = /^\d+$/.test(trimmedRaw) && Number(trimmedRaw) >= MIN_SITES;
  const sites = valid ? Math.min(INPUT_MAX, Number(trimmedRaw)) : null;
  const result = sites ? planForSites(sites) : null;
  const activeBand = bandId(result);

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            How many active sites do you run?
          </label>
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            value={raw}
            onChange={(e) => setRaw(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
            onBlur={() => !valid && setRaw(String(DEFAULT_SITES))}
            aria-describedby={hintId}
            className="h-12 w-24 rounded-xl border border-line bg-canvas px-3 text-center font-display text-lg font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
        </div>
        <p id={hintId} className="mt-2 text-xs text-slate-body">
          Count sites under construction at the same time — a completed site
          doesn&apos;t use a slot.
        </p>

        <input
          type="range"
          aria-label="Number of active sites"
          aria-valuetext={sites ? sitesLabel(sites) : undefined}
          min={MIN_SITES}
          max={SLIDER_MAX}
          value={Math.min(sites ?? DEFAULT_SITES, SLIDER_MAX)}
          onChange={(e) => setRaw(e.target.value)}
          className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-body">
          <span>{MIN_SITES} site</span>
          <span>{SLIDER_MAX}+ sites</span>
        </div>

        {/* The whole plan ladder, with the visitor's band highlighted. */}
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Sites covered by each plan">
          {BANDS.map((band) => {
            const active = band.id === activeBand;
            return (
              <li
                key={band.id}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-canvas text-ink-600"
                }`}
              >
                {band.label} ·{" "}
                {band.to == null
                  ? `${band.from}+`
                  : band.from === band.to
                    ? band.from
                    : `${band.from}–${band.to}`}
                {active && <span className="sr-only"> (your sites)</span>}
              </li>
            );
          })}
        </ul>
      </div>

      <p aria-live="polite" className="mt-6 text-center text-[15px] text-ink">
        {result ? (
          <>
            For <strong className="font-semibold">{sitesLabel(sites)}</strong>:{" "}
            <strong className="font-semibold">
              {getPlan(result.planId).name}
              {result.additional > 0 && " with site add-ons"}
            </strong>
          </>
        ) : (
          "Enter the number of active sites you run."
        )}
      </p>

      {result && (
        <div className="mt-4">
          {result.planId === "enterprise" ? (
            <EnterpriseResult sites={sites} />
          ) : (
            <PlanResult result={result} />
          )}
        </div>
      )}

      <p className="mt-6 text-center text-xs leading-relaxed text-slate-body">
        Based on list prices, inclusive of GST. Your final amount — including any
        promotional code — is confirmed at checkout in the app.
      </p>
    </div>
  );
}
