import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { Icon } from "@/components/ui/Icon";
import { PILLARS, OBJECTIONS } from "@/lib/content";

export const metadata = {
  title: "Features — Everything to Run Construction in One Platform",
  description:
    "Explore BuildAlly's platform: site management, financial dashboards, workforce & payroll, document control, approvals, executive intelligence, a mobile field app, and enterprise-grade security.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="The platform"
        title="One platform for sites, money, people, and documents"
        lead="BuildAlly replaces the tangle of WhatsApp, spreadsheets, and paper with nine connected pillars — each built around how construction actually works."
      >
        <CTAGroup align="center" />
      </PageHero>

      {/* Pillar quick-nav */}
      <section className="border-b border-line bg-white py-6">
        <Container>
          <ul className="flex flex-wrap justify-center gap-2">
            {PILLARS.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Icon name={p.icon} size={15} />
                  {p.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Pillars */}
      {PILLARS.map((pillar, i) => (
        <Section
          key={pillar.id}
          id={pillar.id}
          tone={i % 2 === 0 ? "white" : "canvas"}
        >
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                <Icon name={pillar.icon} size={24} />
              </span>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-brand">
                {pillar.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink">
                {pillar.headline}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-body">
                {pillar.summary}
              </p>
            </Reveal>
            <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {pillar.features.map((f) => (
                <RevealItem
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white p-4"
                >
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-success" />
                  <span className="text-[15px] leading-relaxed text-ink-600">{f}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      ))}

      {/* Objection handling */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Honest answers"
          title="Already wondering about a few things?"
          lead="The questions every practical builder asks before switching — answered straight."
        />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OBJECTIONS.map((o) => (
            <RevealItem
              key={o.objection}
              className="rounded-2xl border border-line bg-canvas p-6"
            >
              <p className="font-display text-base font-semibold text-ink">
                &ldquo;{o.objection}&rdquo;
              </p>
              <p className="mt-2.5 flex items-start gap-2 text-[15px] leading-relaxed text-slate-body">
                <Icon name="ArrowRight" size={16} className="mt-1 shrink-0 text-brand" />
                {o.answer}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-12 text-center">
          <CTAGroup align="center" />
        </Reveal>
      </Section>
    </>
  );
}
