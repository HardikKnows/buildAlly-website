import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { EVENTS } from "@/lib/track";
import {
  PLANS,
  SITE_ADDON,
  GROWTH_SITES,
  ENTERPRISE_MIN_SITES,
  formatPrice,
  getPlan,
} from "@/lib/pricing";

// Capacity reassurance, right after the pricing teaser: how far each plan
// stretches and what the next step is, so nobody hesitates over outgrowing a
// plan. Site add-ons are a Growth feature only, and are presented that way.

const GROWTH = getPlan(SITE_ADDON.planId);

const POINTS = [
  {
    icon: "Layers",
    title: `Add sites on ${GROWTH.name}`,
    body: `${GROWTH.name} includes ${GROWTH_SITES.included} active sites. Add up to ${
      SITE_ADDON.maxAdditional
    } more at ${formatPrice(SITE_ADDON.prices.monthly)}/site/month or ${formatPrice(
      SITE_ADDON.prices.annual,
    )}/site/year, billed on the same period as your plan.`,
  },
  {
    icon: "TrendingUp",
    title: "Move up when you need to",
    body: "Upgrade to a bigger plan at any time — your sites, documents and history carry over untouched.",
  },
  {
    icon: "CircleCheck",
    title: "Completed sites free their slot",
    body: "Plan limits count active sites only, so finishing a project makes room for the next one.",
  },
];

// Starter → Growth → Business → Enterprise, by active sites.
const LADDER = PLANS.map((plan) => ({
  id: plan.id,
  name: plan.name,
  sites: plan.custom
    ? `More than ${ENTERPRISE_MIN_SITES - 1} active sites`
    : plan.id === SITE_ADDON.planId
      ? `${plan.sites} active sites, up to ${GROWTH_SITES.max} with add-ons`
      : `Up to ${plan.sites} active sites`,
}));

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
            Start with the plan that fits today and move up as you take on more
            sites — from a few projects to a full portfolio.
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
          <p className="text-sm font-semibold text-ink">Active sites by plan</p>
          <ol className="mt-5 space-y-3">
            {LADDER.map((step, i) => (
              <li
                key={step.id}
                className="flex items-center gap-3.5 rounded-xl border border-line bg-white px-4 py-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-display text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold text-ink">
                    {step.name}
                  </p>
                  <p className="text-sm text-slate-body">{step.sites}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-slate-body">
            Need more than {ENTERPRISE_MIN_SITES - 1} sites?{" "}
            <TrackedLink
              href="/pricing#enterprise"
              event={EVENTS.ENTERPRISE_CTA}
              eventProps={{ location: "home_scale" }}
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Talk to our team
            </TrackedLink>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
