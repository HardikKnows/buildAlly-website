import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { HOW_IT_WORKS } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function HowItWorks() {
  return (
    <Section tone="white" id="how-it-works">
      <SectionHeading
        eyebrow="How BuildAlly works"
        title="From sign-up to full visibility in four steps"
        lead="No servers to set up, no training manual. Stand up a secure workspace, bring your team in, and start running operations."
      />

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.map((s, i) => (
          <RevealItem key={s.step} className="relative">
            <div className="relative flex h-full flex-col rounded-2xl border border-line bg-canvas p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-display text-4xl font-extrabold text-brand/15">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{s.body}</p>
            </div>
            {/* connector arrow between steps (desktop) */}
            {i < HOW_IT_WORKS.length - 1 && (
              <div className="absolute right-[-17px] top-[42px] z-10 hidden lg:block">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm">
                  <Icon name="ArrowRight" size={15} />
                </span>
              </div>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
