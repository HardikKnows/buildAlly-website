import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { JOURNEY } from "@/lib/product";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PRICING } from "@/lib/pricing";

// Onboarding path, register -> upgrade. An ordered list, so the sequence is
// conveyed to screen readers too, not just by the arrows.
export function CustomerJourney() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Getting started"
        title="From sign-up to your first site in an afternoon"
        lead="No implementation project, no consultants. Create your workspace and invite the team."
      />
      <RevealGroup className="mt-14">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map((s) => (
            <RevealItem
              key={s.step}
              className="relative min-w-0 rounded-2xl border border-line bg-canvas p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                  <Icon name={s.icon} size={18} />
                </span>
                <span className="font-display text-xs font-bold tracking-wider text-slate-body">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-3.5 font-display text-base font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
                {s.body}
              </p>
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>

      <Reveal className="mt-12 flex justify-center">
        <TrackedButton
          href={URLS.signup}
          external
          event={EVENTS.START_TRIAL}
          eventProps={{ location: "journey" }}
          variant="primary"
          size="lg"
        >
          Start {PRICING.trialDays}-Day Trial <Icon name="ArrowRight" size={18} />
        </TrackedButton>
      </Reveal>
    </Section>
  );
}
