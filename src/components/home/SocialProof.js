import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TRUST_SIGNALS } from "@/lib/content";

// Real trust signals (never fabricated). Clearly-marked placeholder for logos.
export function SocialProof() {
  return (
    <section className="border-y border-line bg-white py-12">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-body">
            {/* PLACEHOLDER: BuildAlly team can drop in customer logos / metrics here */}
            Trusted foundations for serious construction businesses
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST_SIGNALS.map((s) => (
              <li
                key={s.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="text-sm font-semibold text-ink">{s.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
