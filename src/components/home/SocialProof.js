import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TRUST_SIGNALS } from "@/lib/content";

// Real trust signals only — no fabricated testimonials. Future-safe wording.
export function SocialProof() {
  return (
    <section className="border-y border-line bg-white py-12">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-body">
            Trusted by growing construction teams
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST_SIGNALS.map((s) => (
              <li key={s.label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="text-sm font-semibold text-ink">{s.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Customer stories placeholder — clearly marked, never fabricated */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2.5 rounded-xl border border-dashed border-line bg-canvas px-5 py-3 text-center text-sm text-slate-body">
            <Icon name="MessageSquareQuote" size={16} className="shrink-0 text-brand/50" />
            {/* PLACEHOLDER: BuildAlly team to add real customer logos & stories */}
            Customer stories coming soon.
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
