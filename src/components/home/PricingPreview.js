import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SignupButton } from "@/components/ui/SignupLink";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { TrialBanner } from "@/components/pricing/TrialBanner";
import { EVENTS } from "@/lib/track";
import {
  PLANS,
  SITE_ADDON,
  GROWTH_SITES,
  ENTERPRISE_MIN_SITES,
  STARTING_PRICE,
  STARTING_PRICE_QUALIFIER,
  KEY_HOLDER_NOTE,
  AI_INCLUDED_NOTE,
  TRIAL_CTA_LABEL,
  formatPrice,
  priceFor,
} from "@/lib/pricing";

// Section 8 — Pricing teaser. Leads with the starting price and its
// annual-billing qualifier, summarises each plan with BOTH billing periods,
// and sends people to the Pricing page for the full picture.

function TeaserPrice({ plan }) {
  if (plan.custom) {
    return (
      <>
        <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
          Custom
        </p>
        <p className="mt-1 text-xs text-slate-body">Pricing and limits</p>
      </>
    );
  }
  return (
    <>
      <p className="mt-2">
        <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
          {formatPrice(priceFor(plan, "monthly"))}
        </span>
        <span className="text-sm text-slate-body">/month</span>
      </p>
      <p className="mt-1 text-xs text-slate-body">
        or {formatPrice(priceFor(plan, "annual"))}/year, billed annually
      </p>
    </>
  );
}

function teaserLimits(plan) {
  if (plan.custom) {
    return [`More than ${ENTERPRISE_MIN_SITES - 1} active sites`, "Custom limits"];
  }
  return [
    plan.id === SITE_ADDON.planId
      ? `${plan.sites} active sites (up to ${GROWTH_SITES.max} with add-ons)`
      : `${plan.sites} active sites`,
    `${plan.members} team members`,
    `${plan.storageGb} GB storage`,
  ];
}

export function PricingPreview() {
  return (
    <Section tone="canvas" id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-brand">
          <Icon name="Tag" size={15} /> Pricing
        </span>
        <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Plans starting at {formatPrice(STARTING_PRICE.monthlyEquivalent)}/month
        </h2>
        <p className="mt-3 text-base font-semibold text-ink-600">
          {STARTING_PRICE_QUALIFIER} Or {formatPrice(STARTING_PRICE.monthly)}
          /month billed monthly.
        </p>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-body">
          Every plan includes the complete BuildAlly platform. Choose by how
          many active sites you run.
        </p>
      </Reveal>

      <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <RevealItem
            key={plan.id}
            className={`flex flex-col rounded-2xl border bg-white p-5 ${
              plan.recommended ? "border-brand ring-1 ring-brand/15" : "border-line"
            }`}
          >
            <p className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
              {plan.name}
              {plan.recommended && (
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand">
                  Recommended
                </span>
              )}
            </p>
            <TeaserPrice plan={plan} />
            <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
              {teaserLimits(plan).map((limit) => (
                <li
                  key={limit}
                  className="flex items-start gap-2 text-sm text-ink-600"
                >
                  <Icon name="Check" size={15} className="mt-0.5 shrink-0 text-brand" />
                  {limit}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-2 text-center text-sm text-slate-body">
        <span className="inline-flex items-center gap-1.5 font-medium text-ink-600">
          <Icon name="KeyRound" size={15} className="shrink-0 text-brand" />
          {KEY_HOLDER_NOTE.headline}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="Sparkles" size={15} className="shrink-0 text-brand" />
          {AI_INCLUDED_NOTE}
        </span>
      </Reveal>

      <Reveal className="mt-8 flex justify-center">
        <TrialBanner />
      </Reveal>

      <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/pricing" variant="primary" size="lg">
          Compare plans <Icon name="ArrowRight" size={18} />
        </Button>
        <SignupButton
          eventProps={{ location: "pricing_preview" }}
          variant="secondary"
          size="lg"
        >
          {TRIAL_CTA_LABEL}
        </SignupButton>
      </Reveal>

      <Reveal className="mt-5 text-center text-sm text-slate-body">
        Need more than {ENTERPRISE_MIN_SITES - 1} sites?{" "}
        <TrackedLink
          href="/pricing#enterprise"
          event={EVENTS.ENTERPRISE_CTA}
          eventProps={{ location: "pricing_preview" }}
          className="font-semibold text-brand underline-offset-2 hover:underline"
        >
          Talk to our team
        </TrackedLink>
      </Reveal>
    </Section>
  );
}
