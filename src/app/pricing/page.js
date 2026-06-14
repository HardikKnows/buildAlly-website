import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { PricingCards } from "@/components/pricing/PricingCards";
import { PRICING_MATRIX } from "@/lib/content";

export const metadata = {
  title: "Pricing — Start Free, Upgrade as You Grow",
  description:
    "Transparent BuildAlly pricing: a Free plan forever, a Professional plan for growing builders, and Enterprise for procurement-grade needs. 14-day trial, no credit card required.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = [
  {
    q: "Is there really a free plan?",
    a: "Yes — the Free plan is free forever, with up to 3 sites and 5 members. No credit card required to start, and free-tier limits never delete your data; they simply prompt an upgrade when you outgrow them.",
  },
  {
    q: "How does the 14-day trial work?",
    a: "Paid plans include a 14-day free trial with full access. There are no automatic charges without action on your part, so you can evaluate BuildAlly with your real sites and team before committing.",
  },
  {
    q: "Is the Professional price final?",
    a: "The price shown is a placeholder while we finalise public pricing. Please confirm the current Professional price with our team before relying on it — book a demo and we'll walk you through the latest plans.",
  },
  {
    q: "What's included in Enterprise?",
    a: "Everything in Professional plus custom branding and white-label, audit logs and the Security Center, SSO readiness (Google Workspace and Microsoft Entra ID), tenant isolation, data export, and priority support. Pricing is custom — contact sales.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans are month-to-month and you can cancel anytime. Your data remains yours, with export available on Enterprise.",
  },
];

function Cell({ value }) {
  if (value === true)
    return <Icon name="Check" size={18} className="mx-auto text-success" />;
  if (value === false)
    return <Icon name="Minus" size={16} className="mx-auto text-slate-300" />;
  return <span className="text-sm text-ink-600">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple plans that grow with you"
        lead="Start free, upgrade when you're ready. No credit card to begin, a 14-day trial on paid plans, and cancel anytime."
      />

      <Section tone="canvas">
        <PricingCards />
        <Reveal className="mt-8 text-center text-sm text-slate-body">
          {/* PLACEHOLDER: confirm final public pricing with the BuildAlly team before publishing */}
          Prices shown in INR (₹). Professional pricing is a draft pending final confirmation.
        </Reveal>
      </Section>

      {/* Comparison matrix */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Compare plans"
          title="Everything in each plan"
        />
        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-160 border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white p-4 text-left text-sm font-semibold text-ink">
                  Feature
                </th>
                <th className="p-4 text-center text-sm font-semibold text-ink">Free</th>
                <th className="rounded-t-xl bg-brand-50 p-4 text-center text-sm font-bold text-brand">
                  Professional
                </th>
                <th className="p-4 text-center text-sm font-semibold text-ink">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_MATRIX.groups.map((group) => (
                <MatrixGroup key={group.name} group={group} />
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* Pricing FAQ */}
      <Section tone="canvas" containerSize="narrow">
        <SectionHeading eyebrow="Pricing questions" title="The fine print, in plain language" />
        <Reveal className="mt-10">
          <Accordion items={PRICING_FAQS} />
        </Reveal>
      </Section>
    </>
  );
}

// Renders a group header row + its feature rows.
function MatrixGroup({ group }) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="border-b border-line bg-canvas px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-body"
        >
          {group.name}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label} className="border-b border-line">
          <td className="sticky left-0 bg-white p-4 text-left text-sm text-ink-600">
            {row.label}
          </td>
          <td className="p-4 text-center">
            <Cell value={row.free} />
          </td>
          <td className="bg-brand-50/40 p-4 text-center">
            <Cell value={row.pro} />
          </td>
          <td className="p-4 text-center">
            <Cell value={row.enterprise} />
          </td>
        </tr>
      ))}
    </>
  );
}
