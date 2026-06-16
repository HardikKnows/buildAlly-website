import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PRICING_FACTORS } from "@/lib/content";

export const metadata = {
  title: "Pricing — Tailored to Your Business",
  description:
    "BuildAlly pricing depends on your team size and operational requirements. Try the interactive demo or book a demo to get a plan that fits your construction business.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = [
  {
    q: "Why isn't pricing listed publicly?",
    a: "Construction businesses vary widely in team size, number of sites, and operational needs. We tailor pricing to your setup rather than forcing you into a generic tier — book a demo and we'll walk you through a plan that fits.",
  },
  {
    q: "Can I try BuildAlly before purchasing?",
    a: "Yes. Explore the interactive demo with realistic construction data — no setup or sign-up — and there's a 7-day trial after account verification when you're ready to use it with your own team.",
  },
  {
    q: "What happens if my subscription expires?",
    a: "You retain read-only access to your workspace. Your data is never deleted — view everything and reactivate to start editing again whenever you like.",
  },
  {
    q: "Do you offer plans for smaller contractors?",
    a: "Yes. BuildAlly is designed for growing construction businesses. Start small and scale up as your team and number of sites grow.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing tailored to your business"
        lead="BuildAlly pricing depends on your team size and operational requirements. Book a demo to learn more — or explore the interactive demo first."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedButton
            href={URLS.contactSales}
            event={EVENTS.CONTACT_SALES}
            eventProps={{ location: "pricing_hero" }}
            variant="primary"
            size="lg"
          >
            Contact Sales <Icon name="ArrowRight" size={18} />
          </TrackedButton>
          <TrackedButton
            href={URLS.demo}
            event={EVENTS.TRY_DEMO}
            eventProps={{ location: "pricing_hero" }}
            variant="secondary"
            size="lg"
          >
            <Icon name="MonitorPlay" size={18} /> Try Interactive Demo
          </TrackedButton>
        </div>
      </PageHero>

      {/* What shapes your pricing */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="How pricing works"
          title="A plan that matches how you operate"
          lead="Rather than generic tiers, your plan reflects the way your business actually runs."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {PRICING_FACTORS.map((f) => (
            <RevealItem key={f.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{f.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-12 max-w-2xl rounded-2xl border border-line bg-ink p-8 text-center text-white blueprint-grid-dark">
          <h3 className="font-display text-2xl font-bold text-white">
            Ready to talk numbers?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-slate-300">
            Book a demo and we&apos;ll recommend the right plan for your team and sites.
          </p>
          <TrackedButton
            href={URLS.contactSales}
            event={EVENTS.CONTACT_SALES}
            eventProps={{ location: "pricing_band" }}
            variant="white"
            size="lg"
            className="mt-6"
          >
            Contact Sales <Icon name="ArrowRight" size={18} />
          </TrackedButton>
        </Reveal>
      </Section>

      {/* Pricing FAQ */}
      <Section tone="white" containerSize="narrow">
        <SectionHeading eyebrow="Pricing questions" title="Common questions" />
        <Reveal className="mt-10">
          <Accordion items={PRICING_FAQS} />
        </Reveal>
      </Section>
    </>
  );
}
