import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { TrialBanner } from "@/components/pricing/TrialBanner";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PRICING, formatPrice } from "@/lib/pricing";

// Section 8 — Pricing teaser. Shows the entry price per plan and sends people
// to the Pricing page, which is the single place plans are published in full.
const TEASERS = PRICING.plans.filter((p) => p.id !== "trial");

export function PricingPreview() {
  return (
    <Section tone="canvas" id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-brand">
          <Icon name="Tag" size={15} /> Pricing
        </span>
        <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Plans that scale with your sites
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-body">
          Pick the plan that matches how much you&apos;re building — from
          interior fit-outs to multi-site construction. Every plan includes the
          full platform.
        </p>
      </Reveal>

      <RevealGroup className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
        {TEASERS.map((plan) => (
          <RevealItem
            key={plan.id}
            className={`rounded-2xl border bg-white p-5 text-center ${
              plan.featured ? "border-brand ring-1 ring-brand/15" : "border-line"
            }`}
          >
            <p className="text-sm font-semibold text-ink">{plan.shortName}</p>
            <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
              {plan.price ? formatPrice(plan.price) : plan.priceLabel}
            </p>
            <p className="mt-1 text-xs text-slate-body">
              {plan.originalPrice && (
                <span className="text-slate-400 line-through">
                  {formatPrice(plan.originalPrice)}
                </span>
              )}{" "}
              {plan.price ? plan.periodLabel : "Coming soon"}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 flex justify-center">
        <TrialBanner />
      </Reveal>

      <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/pricing" variant="primary" size="lg">
          See all plans <Icon name="ArrowRight" size={18} />
        </Button>
        <TrackedButton
          href={URLS.bookDemo}
          event={EVENTS.BOOK_DEMO}
          eventProps={{ location: "pricing_preview" }}
          variant="secondary"
          size="lg"
        >
          <Icon name="CalendarCheck" size={18} /> Book a Demo
        </TrackedButton>
      </Reveal>
    </Section>
  );
}
