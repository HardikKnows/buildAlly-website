import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/site/LeadForm";
import { CONTACT, URLS } from "@/lib/site";

export const metadata = {
  title: "Contact — Talk to the BuildAlly Team",
  description:
    "Get in touch with BuildAlly for sales, support, or general questions about construction management software for modern builders.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: "Briefcase",
    title: "Sales",
    body: "Pricing, demos, and rollout for your team.",
    action: { label: CONTACT.sales, href: `mailto:${CONTACT.sales}` },
  },
  {
    icon: "LifeBuoy",
    title: "Support",
    body: "Already using BuildAlly? We're here to help.",
    action: { label: CONTACT.support, href: `mailto:${CONTACT.support}` },
  },
  {
    icon: "LogIn",
    title: "Login",
    body: "Access your workspace at the BuildAlly app.",
    action: { label: "app.buildally.in", href: URLS.login, external: true },
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 hero-glow" />
      <Container className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Contact</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              We&apos;d love to hear from you
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-slate-body">
              Questions about the product, pricing, or getting your team
              onboarded? Send us a note and we&apos;ll get back to you quickly.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 lg:grid-cols-5">
          {/* Channels */}
          <div className="space-y-3 lg:col-span-2">
            {CHANNELS.map((c) => (
              <Reveal key={c.title} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-ink">{c.title}</h2>
                    <p className="mt-0.5 text-sm text-slate-body">{c.body}</p>
                    <a
                      href={c.action.href}
                      target={c.action.external ? "_blank" : undefined}
                      rel={c.action.external ? "noopener noreferrer" : undefined}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-deep"
                    >
                      {c.action.label}
                      <Icon name="ArrowUpRight" size={14} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal className="rounded-2xl border border-dashed border-line bg-white/70 p-5 text-sm text-slate-body backdrop-blur">
              {/* PLACEHOLDER: add registered business address & phone for trust/procurement */}
              Registered office address & phone — to be added by the BuildAlly team.
            </Reveal>
          </div>

          {/* Form */}
          <Reveal y={24} delay={0.1} className="lg:col-span-3">
            {/* PLACEHOLDER: connect a forms/email provider. Falls back to mailto for now. */}
            <LeadForm variant="contact" recipient={CONTACT.general} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
