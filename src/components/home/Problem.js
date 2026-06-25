import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PROBLEMS } from "@/lib/content";

export function Problem() {
  return (
    <Section tone="canvas" id="problem">
      <SectionHeading
        eyebrow="Sound familiar?"
        title="You're running a serious business on WhatsApp and Excel"
        lead="Construction runs on fragmented, informal tools. Information gets lost, money leaks, and you find out about problems too late."
      />
      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p) => (
          <RevealItem
            key={p.title}
            className="group rounded-2xl border border-line bg-white p-6 transition-colors hover:border-destructive/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Icon name="X" size={20} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {p.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{p.body}</p>
          </RevealItem>
        ))}
        <RevealItem className="flex flex-col justify-center rounded-2xl bg-gradient-brand p-6 text-white">
          <h3 className="font-display text-xl font-bold leading-snug">
            There&apos;s a better way to run construction.
          </h3>
          <TrackedButton
            href={URLS.bookDemo}
            event={EVENTS.BOOK_DEMO}
            eventProps={{ location: "problem" }}
            variant="white"
            size="sm"
            className="mt-5 self-start"
          >
            See how <Icon name="ArrowRight" size={16} />
          </TrackedButton>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
