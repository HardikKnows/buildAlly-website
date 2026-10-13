import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { EVENTS } from "@/lib/track";
import {
  SITE_ADDON,
  GROWTH_SITES,
  ENTERPRISE_MIN_SITES,
  addonQuote,
  getPlan,
  formatPrice,
  priceFor,
} from "@/lib/pricing";

// Growth site add-ons — what they cost, how far they go, and who can buy
// them. Every figure comes from lib/pricing, including the worked example, so
// the arithmetic can never drift from the plan cards.

const GROWTH = getPlan(SITE_ADDON.planId);
const BUSINESS = getPlan("business");

const RATES = [
  {
    cycle: "monthly",
    title: "On monthly Growth",
    price: formatPrice(SITE_ADDON.prices.monthly),
    unit: "per site, per month",
  },
  {
    cycle: "annual",
    title: "On annual Growth",
    price: formatPrice(SITE_ADDON.prices.annual),
    unit: "per site, per year",
  },
];

const RULES = [
  {
    icon: "Building2",
    text: `${GROWTH_SITES.included} active sites are included with ${GROWTH.name}.`,
  },
  {
    icon: "Plus",
    text: `Add up to ${SITE_ADDON.maxAdditional} more, one site at a time — ${GROWTH_SITES.max} active sites in total, including the ${GROWTH_SITES.included} included sites.`,
  },
  {
    icon: "Repeat",
    text: `Add-ons are billed on the same period as your ${GROWTH.name} subscription: monthly add-ons on a monthly plan, annual add-ons on an annual plan.`,
  },
  {
    icon: "Ban",
    text: `Available on ${GROWTH.name} only. Starter and ${BUSINESS.name} don't offer site add-ons — move up a plan instead.`,
  },
];

// The largest Growth workspace, worked out for both billing periods.
const FULL = ["monthly", "annual"].map((cycle) => ({
  cycle,
  quote: addonQuote(SITE_ADDON.maxAdditional, cycle),
  suffix: cycle === "monthly" ? "/month" : "/year",
}));

export function SiteAddOns() {
  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <RevealGroup className="grid gap-4 sm:grid-cols-2">
        {RATES.map((rate) => (
          <RevealItem
            key={rate.cycle}
            className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-body">{rate.title}</p>
            <p className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-ink">
              {rate.price}
            </p>
            <p className="mt-1 text-sm text-slate-body">{rate.unit}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <ul className="space-y-4">
          {RULES.map((rule) => (
            <li
              key={rule.text}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-600"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                <Icon name={rule.icon} size={17} />
              </span>
              <span className="pt-1">{rule.text}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* The economics at the ceiling, spelled out for both periods. */}
      <Reveal className="mt-6 rounded-2xl border border-brand/20 bg-brand-50/50 p-6 sm:p-8">
        <p className="text-sm font-semibold text-ink">
          Example: {GROWTH.name} with all {GROWTH_SITES.max} active sites
        </p>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {FULL.map(({ cycle, quote, suffix }) => (
            <div key={cycle} className="rounded-xl bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-body">
                {cycle === "monthly" ? "Monthly billing" : "Annual billing"}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-600">
                {formatPrice(quote.base)} + {quote.additional} ×{" "}
                {formatPrice(quote.rate)}
                <span className="mt-1 block font-display text-xl font-extrabold tracking-tight text-ink">
                  {formatPrice(quote.total)}
                  <span className="text-sm font-medium text-slate-body">
                    {suffix}
                  </span>
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 border-t border-brand/20 pt-5 text-sm leading-relaxed text-ink-600">
          Need more than {GROWTH_SITES.max} sites? {BUSINESS.name} includes{" "}
          {BUSINESS.sites} active sites for{" "}
          {formatPrice(priceFor(BUSINESS, "monthly"))}/month or{" "}
          {formatPrice(priceFor(BUSINESS, "annual"))}/year. Running{" "}
          {ENTERPRISE_MIN_SITES} or more?{" "}
          <TrackedLink
            href="#enterprise"
            event={EVENTS.ENTERPRISE_CTA}
            eventProps={{ location: "pricing_addons" }}
            className="font-semibold text-brand underline-offset-2 hover:underline"
          >
            Talk to us about Enterprise
          </TrackedLink>
          .
        </p>
      </Reveal>
    </div>
  );
}
