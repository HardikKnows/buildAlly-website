import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { TRUST_INDICATORS } from "@/lib/product";

// Trust indicators, immediately below the hero. Deliberately plain — these are
// claims about the platform, not decoration.
export function TrustBar() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST_INDICATORS.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-2 text-sm font-medium text-ink-600"
            >
              <Icon name={t.icon} size={16} className="shrink-0 text-brand" />
              {t.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
