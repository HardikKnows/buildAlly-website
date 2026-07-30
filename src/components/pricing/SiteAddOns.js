import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SITE_ADDONS, formatPrice, addonExample } from "@/lib/pricing";

// Site Capacity Packs — extra active sites without changing the subscription.
// Every figure comes from lib/pricing, including the stacking example, so the
// packs can never drift from the plan cards above them.

const EXAMPLE = addonExample();

export function SiteAddOns() {
  return (
    <>
      <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
        {SITE_ADDONS.packs.map((pack) => (
          <RevealItem
            key={pack.sites}
            className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm"
          >
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name="Layers" size={20} />
            </span>
            <p className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
              +{pack.sites} Sites
            </p>
            <p className="mt-2 text-lg font-bold text-brand">
              {formatPrice(pack.price)}
              <span className="text-sm font-medium text-slate-body">/year</span>
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-6 flex max-w-4xl items-start gap-2.5 rounded-2xl border border-line bg-canvas p-5 text-sm leading-relaxed text-slate-body">
        <Icon
          name="RefreshCw"
          size={17}
          className="mt-0.5 shrink-0 text-brand"
        />
        {SITE_ADDONS.renewalNote}
      </Reveal>

      {/* Packs stack — the arithmetic, spelled out. */}
      <Reveal className="mx-auto mt-8 max-w-4xl rounded-2xl border border-brand/20 bg-brand-50/50 p-6 sm:p-8">
        <p className="text-sm font-semibold text-ink">
          Packs stack. Buy as many as you need:
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink">
            {EXAMPLE.plan.shortName} Plan
            <span className="ml-1.5 font-bold text-brand">
              {EXAMPLE.base}
            </span>
          </span>
          {EXAMPLE.packs.map((sites) => (
            <span key={sites} className="flex items-center gap-3">
              <Icon name="Plus" size={16} className="text-slate-body" />
              <span className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink">
                +{sites} Pack
              </span>
            </span>
          ))}
          <Icon name="Equal" size={16} className="text-slate-body" />
          <span className="rounded-xl bg-gradient-brand px-3.5 py-2 text-sm font-bold text-white shadow-sm">
            {EXAMPLE.total} Active Sites
          </span>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-slate-body">
          Your subscription stays exactly as it is — same plan, same features,
          same renewal date. Only your active-site capacity changes.
        </p>
      </Reveal>
    </>
  );
}

// Compact version for the homepage "Scale as You Grow" highlight.
export function SiteAddOnStrip({ className = "" }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      {SITE_ADDONS.packs.map((pack) => (
        <div
          key={pack.sites}
          className="rounded-xl border border-line bg-white px-4 py-3.5 text-center"
        >
          <p className="font-display text-lg font-extrabold tracking-tight text-ink">
            +{pack.sites} Sites
          </p>
          <p className="mt-0.5 text-sm font-semibold text-brand">
            {formatPrice(pack.price)}
            <span className="text-xs font-medium text-slate-body">/year</span>
          </p>
        </div>
      ))}
    </div>
  );
}
