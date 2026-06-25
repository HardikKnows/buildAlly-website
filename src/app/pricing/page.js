import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { getPlan, formatPrice, monthlyEquivalent } from "@/lib/pricing";

// Derive all pricing copy from the centralized config — no duplicated numbers.
const monthly = getPlan("monthly");
const annual = getPlan("annual");

export const metadata = {
  title: "Pricing — Simple Plans, Limited-Period Launch Offer",
  description: `BuildAlly pricing: ${formatPrice(monthly.price)}/month or ${formatPrice(
    annual.price,
  )}/year (limited-period launch offer). One platform, everything included. Book a personalized demo, then start a 7-day trial.`,
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = [
  {
    q: "Is this a limited-period offer?",
    a: `Yes. The launch pricing (${formatPrice(monthly.price)}/month and ${formatPrice(
      annual.price,
    )}/year) is a limited-period offer on our standard rates of ${formatPrice(
      monthly.originalPrice,
    )}/month and ${formatPrice(annual.originalPrice)}/year. Lock it in while it lasts.`,
  },
  {
    q: "Can I see BuildAlly before purchasing?",
    a: "Yes. Book a personalized demo and our team will walk you through BuildAlly with your workflows in mind. There's also a 7-day trial after account verification when you're ready to use it with your own team.",
  },
  {
    q: "What's the difference between monthly and annual?",
    a: `It's the same platform with everything included — only the billing cadence differs. Annual is billed once a year at a lower effective rate (about ${formatPrice(
      monthlyEquivalent(annual),
    )}/month), while monthly gives you maximum flexibility.`,
  },
  {
    q: "What happens if my subscription expires?",
    a: "You retain read-only access to your workspace. Your data is never deleted — view everything and reactivate to start editing again whenever you like.",
  },
  {
    q: "Do you offer custom plans for larger teams?",
    a: "If you have specific onboarding, security, or scale requirements, talk to sales and we'll put together a plan that fits. Either way, you can start small and grow.",
  },
];

// Everything-included highlights — pricing is one plan, all features.
const INCLUDED = [
  "Unlimited sites and projects",
  "All team roles — directors, admins, PMs, engineers, finance, HR",
  "Financial dashboards — expenses, payments, receivables",
  "Payroll, salary requests, and payslips",
  "Document control with versioning and approvals",
  "Mobile app (PWA) with offline capture",
  "Approvals and notifications",
  "Role-based access and per-company data isolation",
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="One platform. Everything included."
        lead="Simple, transparent pricing with a limited-period launch offer. Book a personalized demo, start a 7-day trial, and upgrade when you're ready."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedButton
            href={URLS.bookDemo}
            event={EVENTS.BOOK_DEMO}
            eventProps={{ location: "pricing_hero" }}
            variant="primary"
            size="lg"
          >
            <Icon name="CalendarCheck" size={18} /> Book a Demo
          </TrackedButton>
          <TrackedButton
            href={URLS.contactSales}
            event={EVENTS.CONTACT_SALES}
            eventProps={{ location: "pricing_hero" }}
            variant="secondary"
            size="lg"
          >
            Talk to Sales <Icon name="ArrowRight" size={18} />
          </TrackedButton>
        </div>
      </PageHero>

      {/* Plan cards */}
      <Section tone="canvas">
        <PricingPlans location="pricing_page" />
        <Reveal className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-body">
          Prices in INR, exclusive of applicable taxes. A personalized demo and
          a 7-day trial (after verification) let you evaluate BuildAlly before
          you pay.
        </Reveal>
      </Section>

      {/* Everything included */}
      <Section tone="white">
        <SectionHeading
          eyebrow="What's included"
          title="No tiers, no feature gates"
          lead="Every plan includes the full platform — you're choosing how you'd like to be billed, not which features you get."
        />
        <RevealGroup className="mx-auto mt-12 grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <RevealItem
              key={item}
              className="flex items-start gap-3 text-[15px] text-ink-600"
            >
              <Icon
                name="CircleCheck"
                size={20}
                className="mt-0.5 shrink-0 text-brand"
              />
              {item}
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-14 max-w-2xl rounded-2xl border border-line bg-ink p-8 text-center text-white blueprint-grid-dark">
          <h3 className="font-display text-2xl font-bold text-white">
            Want a closer look first?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-slate-300">
            Book a demo and we&apos;ll walk you through BuildAlly with your
            workflows in mind — then start your trial when it feels right.
          </p>
          <TrackedButton
            href={URLS.contactSales}
            event={EVENTS.CONTACT_SALES}
            eventProps={{ location: "pricing_band" }}
            variant="white"
            size="lg"
            className="mt-6"
          >
            Talk to Sales <Icon name="ArrowRight" size={18} />
          </TrackedButton>
        </Reveal>
      </Section>

      {/* Pricing FAQ */}
      <Section tone="canvas" containerSize="narrow">
        <SectionHeading eyebrow="Pricing questions" title="Common questions" />
        <Reveal className="mt-10">
          <Accordion items={PRICING_FAQS} />
        </Reveal>
      </Section>
    </>
  );
}
