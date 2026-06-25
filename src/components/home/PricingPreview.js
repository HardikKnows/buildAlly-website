import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// Section 8 — Pricing teaser. No prices on the homepage; send people to the
// Pricing page (the single place plans are published) or to book a demo.
export function PricingPreview() {
  return (
    <Section tone="canvas" id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-brand">
          <Icon name="Tag" size={15} /> Pricing
        </span>
        <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
          One platform, everything included
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-body">
          Simple, transparent pricing — no tiers or feature gates. Book a
          personalized demo, then start a 7-day trial whenever you&apos;re ready.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/pricing" variant="primary" size="lg">
            See plans <Icon name="ArrowRight" size={18} />
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
        </div>
      </Reveal>
    </Section>
  );
}
