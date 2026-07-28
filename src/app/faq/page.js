import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { FAQS, PLAN_FAQS, OBJECTIONS } from "@/lib/content";

export const metadata = {
  title: "FAQ — Common Questions About BuildAlly",
  description:
    "Answers to common questions about BuildAlly: booking a personalized demo, how the ₹999 7-day trial is credited to your subscription, plan limits and storage, inviting your team, data security, and support for smaller contractors.",
  alternates: { canonical: "/faq" },
};

// Combine the homepage FAQs with plan/trial pricing answers and
// objection-handling for a fuller list.
const ALL = [
  ...FAQS,
  ...PLAN_FAQS,
  ...OBJECTIONS.map((o) => ({ q: o.objection, a: o.answer })),
];

function FaqStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FAQPage() {
  return (
    <>
      <FaqStructuredData />
      <PageHero
        eyebrow="FAQ"
        title="Questions? We've got answers."
        lead="Everything a practical builder wants to know before switching from WhatsApp, spreadsheets, and paper."
      />

      <Section tone="canvas" containerSize="narrow">
        <Reveal>
          <Accordion items={ALL} />
        </Reveal>
      </Section>

      <Section tone="white" containerSize="narrow">
        <SectionHeading
          title="Still have a question?"
          lead="Book a personalized demo, or talk to our team."
        />
        <Reveal className="mt-8 flex justify-center">
          <CTAGroup align="center" />
        </Reveal>
      </Section>
    </>
  );
}
