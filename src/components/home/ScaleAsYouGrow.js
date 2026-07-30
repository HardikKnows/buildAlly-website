import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SiteAddOnStrip } from "@/components/pricing/SiteAddOns";
import { SITE_ADDONS, COUPON_NOTE } from "@/lib/pricing";

// Capacity reassurance, right after the pricing teaser: nobody should hesitate
// over a plan because they might outgrow it. The packs themselves are published
// in full on the Pricing page — this is the short version.

const POINTS = [
  {
    icon: "Layers",
    title: "Add capacity, keep your plan",
    body: "Buy a Site Capacity Pack whenever you need more active sites — your subscription, features, and pricing stay exactly as they are.",
  },
  {
    icon: "RefreshCw",
    title: "One renewal date",
    body: SITE_ADDONS.renewalNote,
  },
  {
    icon: "ShieldCheck",
    title: "Nothing is disrupted",
    body: "Extra capacity applies immediately. No migration, no downtime, no re-onboarding your team.",
  },
];

export function ScaleAsYouGrow() {
  return (
    <Section tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
            Scale as you grow
          </p>
          <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Your projects grow. So does your workspace.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-body">
            Start with the plan that fits today, then expand your active site
            capacity whenever you need it — without changing your subscription
            or disrupting your workflow.
          </p>

          <ul className="mt-8 space-y-5">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                  <Icon name={point.icon} size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-body">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href="/pricing#add-ons" variant="secondary" size="lg">
              See site add-ons <Icon name="ArrowRight" size={18} />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-line bg-canvas p-6 sm:p-8">
          <p className="text-sm font-semibold text-ink">
            Site Capacity Packs
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
            Added on top of any subscription. Packs stack, so you can combine
            them as your site count climbs.
          </p>
          <SiteAddOnStrip className="mt-6" />
          <p className="mt-6 flex items-start gap-2.5 border-t border-line pt-5 text-sm leading-relaxed text-slate-body">
            <Icon name="Ticket" size={17} className="mt-0.5 shrink-0 text-brand" />
            {COUPON_NOTE}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
