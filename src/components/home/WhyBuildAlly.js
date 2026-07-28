import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { WHY_BUILDALLY } from "@/lib/product";

export function WhyBuildAlly() {
  return (
    <Section tone="canvas">
      <SectionHeading
        eyebrow="Why BuildAlly"
        title="Construction software that field teams actually use"
        lead="Built around how builders and interior teams work — not a generic project tool with a hard hat on the homepage."
      />
      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_BUILDALLY.map((w) => (
          <RevealItem
            key={w.title}
            className="min-w-0 rounded-2xl border border-line bg-white p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name={w.icon} size={21} />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-ink">
              {w.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-body">
              {w.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
