"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  SITE_ADDONS,
  formatPrice,
  getPlan,
  planSiteLimit,
  planTotalFor,
  planCapacity,
  recommendPlan,
  crossoverSites,
} from "@/lib/pricing";

// "How much would BuildAlly cost for my sites?" — answered honestly.
//
// This is presentation arithmetic, not billing: it compares two published list
// prices so someone can choose a plan. What they are actually charged (tax,
// proration, coupons, credit) is settled by the application at checkout.
//
// Every figure comes from planTotalFor() in lib/pricing, which returns null for
// a combination a plan cannot serve — so an invalid plan can never be rendered.

const PLAN_IDS = ["starter", "growth"];
const MIN_SITES = 1;
// Far enough past the Enterprise conversation point to show that Growth keeps
// working, without implying a ceiling that does not exist.
const MAX_SITES = 30;

const CROSSOVER = crossoverSites();
// Where the slider starts: the sites Starter already includes.
const DEFAULT_SITES = planCapacity("starter").base;

function PlanQuote({ planId, quote, best, blockedReason }) {
  const plan = getPlan(planId);

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 transition-colors ${
        best
          ? "border-brand bg-white shadow-lg shadow-brand/10 ring-1 ring-brand/20"
          : "border-line bg-white shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-base font-bold text-ink">
          {plan.shortName}
        </h3>
        {best && (
          <span className="shrink-0 rounded-full bg-gradient-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Better value
          </span>
        )}
      </div>

      {quote ? (
        <>
          <p className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink">
            {formatPrice(quote.total)}
            <span className="text-sm font-medium text-slate-body">/year</span>
          </p>

          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-body">
                Plan · {quote.sites - quote.additional} sites
              </dt>
              <dd className="font-medium text-ink">
                {formatPrice(quote.base)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-slate-body">
                {quote.additional > 0
                  ? `+ ${quote.additional} additional × ${formatPrice(quote.rate)}`
                  : "No additional sites needed"}
              </dt>
              <dd className="font-medium text-ink">
                {quote.additional > 0 ? formatPrice(quote.addonCost) : "—"}
              </dd>
            </div>
          </dl>
        </>
      ) : (
        <div className="mt-4 flex flex-1 flex-col justify-center rounded-xl bg-canvas p-4 text-sm leading-relaxed text-slate-body">
          <span className="flex items-start gap-2">
            <Icon
              name="Info"
              size={16}
              className="mt-0.5 shrink-0 text-slate-body"
            />
            {blockedReason}
          </span>
        </div>
      )}
    </div>
  );
}

export function PricingCalculator() {
  const [sites, setSites] = useState(DEFAULT_SITES);
  const inputId = useId();

  const best = recommendPlan(sites);
  const quotes = PLAN_IDS.map((id) => ({ id, quote: planTotalFor(id, sites) }));

  const clamp = (value) => {
    const n = Math.floor(Number(value));
    if (!Number.isFinite(n)) return MIN_SITES;
    return Math.min(MAX_SITES, Math.max(MIN_SITES, n));
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      {/* Input */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-ink"
          >
            How many active sites do you run?
          </label>
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            min={MIN_SITES}
            max={MAX_SITES}
            value={sites}
            onChange={(e) => setSites(clamp(e.target.value))}
            className="h-12 w-24 rounded-xl border border-line bg-canvas px-3 text-center font-display text-lg font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          />
        </div>

        <input
          type="range"
          aria-label="Number of active sites"
          min={MIN_SITES}
          max={MAX_SITES}
          value={sites}
          onChange={(e) => setSites(clamp(e.target.value))}
          className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        />
        <div className="mt-2 flex justify-between text-xs text-slate-body">
          <span>{MIN_SITES} site</span>
          <span>{MAX_SITES}+ sites</span>
        </div>
      </div>

      {/* Quotes */}
      <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2">
        {quotes.map(({ id, quote }) => (
          <PlanQuote
            key={id}
            planId={id}
            quote={quote}
            best={Boolean(best) && best.planId === id && quotes.length > 1}
            blockedReason={`${getPlan(id).shortName} doesn't cover ${sites} sites.`}
          />
        ))}
      </div>

      {/* Verdict */}
      {best && (
        <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-50/50 p-6">
          <p className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
            <Icon
              name="CircleCheck"
              size={18}
              className="mt-0.5 shrink-0 text-brand"
            />
            <span>
              For <strong className="font-semibold">{sites} sites</strong>,{" "}
              <strong className="font-semibold">
                {getPlan(best.planId).shortName}
              </strong>{" "}
              works out at{" "}
              <strong className="font-semibold">
                {formatPrice(best.total)}/year
              </strong>
              {/* Name what the alternative includes, so a lower price is never
                  presented as a saving without its trade-off. */}
              {best.alternative && best.saving > 0 && (
                <>
                  {" "}
                  — {formatPrice(best.saving)} less than{" "}
                  {getPlan(best.alternative.planId).shortName}, which includes{" "}
                  {planSiteLimit(getPlan(best.alternative.planId))} sites.
                </>
              )}
              {best.alternative && best.saving === 0 && (
                <>
                  {" "}
                  — the same as {getPlan(best.alternative.planId).shortName} at
                  this size.
                </>
              )}
              {!best.alternative && "."}
            </span>
          </p>

          {best.suggestEnterprise && (
            <p className="mt-4 flex items-start gap-2.5 border-t border-brand/20 pt-4 text-sm leading-relaxed text-slate-body">
              <Icon
                name="Building2"
                size={17}
                className="mt-0.5 shrink-0 text-brand"
              />
              <span>
                Running {SITE_ADDONS.enterpriseSuggestedFrom}+ sites? Growth still
                covers you at this size — but it&apos;s worth talking to us about
                Enterprise for dedicated onboarding, custom integrations and
                SLA-backed support.
              </span>
            </p>
          )}
        </div>
      )}

      {CROSSOVER && (
        <p className="mt-4 text-center text-sm text-slate-body">
          Growth becomes the better-value option from{" "}
          <strong className="font-semibold text-ink">
            {CROSSOVER} sites
          </strong>{" "}
          onward.
        </p>
      )}

      <p className="mt-6 text-center text-xs leading-relaxed text-slate-body">
        An estimate of list prices to help you choose a plan. Your final amount —
        including any promotional code, trial credit or mid-cycle adjustment — is
        confirmed at checkout.
      </p>
    </div>
  );
}
