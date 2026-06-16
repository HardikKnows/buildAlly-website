import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// Section 8 — No public pricing tables. Pricing is tailored → Contact Sales.
export function PricingPreview() {
  return (
    <Section tone="canvas" id="pricing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold text-brand">
          <Icon name="Tag" size={15} /> Pricing
        </span>
        <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
          Pricing tailored to your business
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-body">
          BuildAlly pricing depends on your team size and operational
          requirements. Book a demo to see the platform and get a plan that fits.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedButton
            href={URLS.contactSales}
            event={EVENTS.CONTACT_SALES}
            eventProps={{ location: "pricing_preview" }}
            variant="primary"
            size="lg"
          >
            Contact Sales <Icon name="ArrowRight" size={18} />
          </TrackedButton>
          <TrackedButton
            href={URLS.demo}
            event={EVENTS.TRY_DEMO}
            eventProps={{ location: "pricing_preview" }}
            variant="secondary"
            size="lg"
          >
            <Icon name="MonitorPlay" size={18} /> Try the Demo First
          </TrackedButton>
        </div>
      </Reveal>
    </Section>
  );
}
