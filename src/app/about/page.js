import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { Icon } from "@/components/ui/Icon";

export const metadata = {
  title: "About — Building the Operating System for Construction",
  description:
    "BuildAlly is on a mission to give construction companies real-time control of sites, money, people, and documents — enterprise-grade software built for how modern builders actually work.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: "Compass", title: "Built for the work", body: "We design around real construction workflows — sites, receivables, subcontractors, approvals — not generic project management." },
  { icon: "Eye", title: "Clarity over chaos", body: "Owners deserve to see their whole business in real time, without chasing updates across calls and spreadsheets." },
  { icon: "Smartphone", title: "Field-first", body: "Software only works if the people on site use it. We make capture fast, mobile, and reliable — even offline." },
  { icon: "ShieldCheck", title: "Trust by default", body: "Tenant isolation, audit trails, and security built in from day one — so growing teams and enterprises can rely on us." },
];

const STATS = [
  { value: "9", label: "Connected product pillars" },
  { value: "1", label: "Platform replacing WhatsApp + Excel + paper" },
  { value: "₹ L/Cr", label: "Currency formatting built for India" },
  { value: "Offline", label: "Field capture that works with no signal" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BuildAlly"
        title="The operating system for construction companies"
        lead="We're building the platform we wish every builder had — one place to run sites, money, people, and documents, with real-time visibility for owners."
      />

      {/* Mission / Vision */}
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-canvas p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name="Target" size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink">Our mission</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-body">
              Give every construction company real-time control of its business —
              so owners stop finding out about overruns and missed payments too
              late, and teams stop losing work in WhatsApp and spreadsheets.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-line bg-canvas p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name="Telescope" size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink">Our vision</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-body">
              A world where running a construction business is as clear and
              modern as the best software in any other industry — built for
              Indian builders first, with the architecture to go global.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* The story */}
      <Section tone="canvas" containerSize="narrow">
        <SectionHeading
          eyebrow="Why we built it"
          title="Serious businesses deserve serious software"
          align="left"
        />
        <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-slate-body">
          <p>
            Construction is one of the largest, most important industries in the
            world — and one of the least served by modern software. Most builders
            run serious, multi-crore operations on WhatsApp groups, Excel
            trackers, and paper approvals.
          </p>
          <p>
            The result is predictable: information gets lost, money leaks,
            decisions slow down, and owners find out about problems too late.
            BuildAlly exists to fix exactly that — with one unified, real-time
            platform that&apos;s enterprise-grade under the hood but simple enough
            for a three-site firm.
          </p>
          <p>
            We obsess over the details that matter to builders: ₹ Lakh and Crore
            formatting, mobile capture that works offline, site health scores,
            receivables tracking, and approvals that don&apos;t get stuck on
            someone&apos;s phone.
          </p>
        </Reveal>
      </Section>

      {/* Values */}
      <Section tone="white">
        <SectionHeading eyebrow="What we believe" title="Principles that shape the product" />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <RevealItem key={v.title} className="rounded-2xl border border-line bg-canvas p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={v.icon} size={21} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Stats band */}
      <section className="bg-ink py-16 text-white blueprint-grid-dark">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team placeholder */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="The team"
          title="Built by people who take construction seriously"
          lead="A team of product, engineering, and security folk obsessed with making powerful software feel effortless on a job site."
        />
        <Reveal className="mx-auto mt-8 max-w-2xl rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sm text-slate-body">
          {/* PLACEHOLDER: add team members, photos, and credibility details */}
          Team bios and company credibility details — coming soon.
        </Reveal>
        <Reveal className="mt-12 text-center">
          <CTAGroup align="center" />
        </Reveal>
      </Section>
    </>
  );
}
