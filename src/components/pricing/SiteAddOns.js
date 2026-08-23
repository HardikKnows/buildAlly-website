import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import {
  SITE_ADDONS,
  formatPrice,
  addonExample,
  getPlan,
  planSiteLimit,
  addonRate,
  planCapacity,
} from "@/lib/pricing";

// Additional sites — priced per site, per year, and shown openly. A customer
// should be able to work out what growing costs before they buy, not after.
// Every figure comes from lib/pricing, including the worked example, so the
// arithmetic can never drift from the plan cards above.

const EXAMPLE = addonExample();

const RATE_CARDS = ["starter", "growth"].map((id) => {
  const plan = getPlan(id);
  return {
    id,
    plan,
    rate: addonRate(id),
    included: planSiteLimit(plan),
    capacity: planCapacity(id),
  };
});

function RateCard({ plan, rate, included, capacity }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Icon name="Layers" size={20} />
      </span>
      <p className="mt-4 text-sm font-semibold text-slate-body">
        {plan.shortName}
      </p>
      <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
        {formatPrice(rate)}
        <span className="text-sm font-medium text-slate-body">/site/year</span>
      </p>
      <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-slate-body">
        Includes {included} sites
        {capacity.max
          ? ` · up to ${capacity.max} in total`
          : " · add as many as you need"}
      </p>
      {/* capacity.max is null on every plan today; the branch stays so a
          future capped plan states its ceiling instead of over-promising. */}
    </div>
  );
}

export function SiteAddOns() {
  return (
    <>
      <RevealGroup className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
        {RATE_CARDS.map((card) => (
          <RevealItem key={card.id}>
            <RateCard {...card} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-6 flex max-w-3xl items-start gap-2.5 rounded-2xl border border-line bg-canvas p-5 text-sm leading-relaxed text-slate-body">
        <Icon name="RefreshCw" size={17} className="mt-0.5 shrink-0 text-brand" />
        {SITE_ADDONS.renewalNote}
      </Reveal>

      {/* The economics, spelled out — see §3. No surprises at checkout. */}
      <Reveal className="mx-auto mt-8 max-w-3xl rounded-2xl border border-brand/20 bg-brand-50/50 p-6 sm:p-8">
        <p className="text-sm font-semibold text-ink">
          What adding sites actually costs:
        </p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-600">
              {EXAMPLE.plan.shortName} · {EXAMPLE.base} sites
            </dt>
            <dd className="font-semibold text-ink">
              {formatPrice(EXAMPLE.quote.base)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-600">
              + {EXAMPLE.additional} additional sites ×{" "}
              {formatPrice(EXAMPLE.quote.rate)}
            </dt>
            <dd className="font-semibold text-ink">
              {formatPrice(EXAMPLE.quote.addonCost)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-brand/20 pt-3">
            <dt className="font-semibold text-ink">
              Total · {EXAMPLE.quote.sites} sites
            </dt>
            <dd className="font-display text-lg font-extrabold tracking-tight text-brand">
              {formatPrice(EXAMPLE.quote.total)}
              <span className="text-sm font-medium text-slate-body">/year</span>
            </dd>
          </div>
        </dl>

        <p className="mt-5 border-t border-brand/20 pt-5 text-sm leading-relaxed text-ink-600">
          For comparison, {EXAMPLE.upgrade.shortName} gives you{" "}
          <strong className="font-semibold text-ink">
            {EXAMPLE.upgradeSites} sites for {formatPrice(EXAMPLE.upgradePrice)}
            /year
          </strong>
          . Whichever fits better is the one to pick — your subscription, features
          and renewal date stay exactly as they are either way.
        </p>
      </Reveal>
    </>
  );
}

// Compact version for the homepage "Scale as You Grow" highlight.
export function SiteAddOnStrip({ className = "" }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {RATE_CARDS.map(({ id, plan, rate }) => (
        <div
          key={id}
          className="rounded-xl border border-line bg-white px-4 py-3.5 text-center"
        >
          <p className="text-sm font-semibold text-ink">{plan.shortName}</p>
          <p className="mt-1 font-display text-lg font-extrabold tracking-tight text-brand">
            {formatPrice(rate)}
            <span className="text-xs font-medium text-slate-body">
              /site/year
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
