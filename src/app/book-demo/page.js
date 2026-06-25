import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/site/LeadForm";
import { CONTACT } from "@/lib/site";

export const metadata = {
  title: "Book a Demo — See BuildAlly for Your Business",
  description:
    "Request a personalized BuildAlly demo. Our team will schedule a live walkthrough of how to run your sites, money, team, and documents from one platform — tailored to how your construction business works.",
  alternates: { canonical: "/book-demo" },
};

const REASONS = [
  { icon: "MonitorPlay", title: "A walkthrough tailored to you", body: "See the Site Hub, financial dashboards, and approvals mapped to how you run your projects." },
  { icon: "MessageSquare", title: "Straight answers", body: "Bring your questions on rollout, security, pricing, and migrating off WhatsApp and Excel." },
  { icon: "Rocket", title: "A clear path to start", body: "Leave with a concrete plan to get your first sites and team onto BuildAlly." },
];

export default function BookDemoPage() {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 hero-glow" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch */}
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Book a demo
              </p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                See BuildAlly built around your business
              </h1>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-slate-body">
                Request a live walkthrough and our team will schedule a
                30-minute, no-pressure session with someone who knows
                construction — tailored to how your business runs.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-5">
              {REASONS.map((r) => (
                <Reveal as="li" key={r.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <Icon name={r.icon} size={21} />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-ink">{r.title}</h2>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-body">{r.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-8 rounded-2xl border border-line bg-white/70 p-5 backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <Icon name="MessageSquare" size={16} className="text-brand" />
                Prefer to talk first?
              </p>
              <p className="mt-1 text-sm text-slate-body">
                Have questions about rollout, security, or pricing? Reach our
                sales team directly.
              </p>
              <a
                href={`mailto:${CONTACT.sales}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep"
              >
                <Icon name="Mail" size={15} /> {CONTACT.sales}
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal y={24} delay={0.1}>
            {/* PLACEHOLDER: connect a scheduling tool (e.g. Calendly) or CRM endpoint.
                Until then, this form composes a mailto to the sales inbox. */}
            <LeadForm variant="demo" recipient={CONTACT.sales} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
