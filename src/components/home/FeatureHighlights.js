import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HOME_FEATURES } from "@/lib/content";

export function FeatureHighlights() {
  return (
    <Section tone="canvas" id="features">
      <SectionHeading
        eyebrow="One platform, everything connected"
        title="Everything you need to run construction"
        lead="Sites, money, people, and documents — unified, real-time, and built around how construction actually works."
      />
      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_FEATURES.map((f) => (
          <RevealItem
            key={f.title}
            className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Icon name={f.icon} size={22} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{f.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="mt-10 text-center">
        <Button href="/features" variant="secondary" size="md">
          Explore all features <Icon name="ArrowRight" size={18} />
        </Button>
      </div>
    </Section>
  );
}
