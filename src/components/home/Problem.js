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
            className="group rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-brand/30 hover:shadow-sm"
          >
            {/* One line icon per pain point, in the brand's blue on a soft
                blue tile — the same family as every other icon on the site.
                Decorative (Icon sets aria-hidden): the title carries the
                meaning. The hover lift is skipped for reduced motion. */}
            <span className="flex size-22 items-center justify-center rounded-2xl bg-linear-to-br from-brand-50 to-brand-100/70 text-brand-600 ring-1 ring-inset ring-brand-200/60">
              <Icon
                name={p.icon}
                size={42}
                strokeWidth={1.75}
                className="transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5"
              />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink">
              {p.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{p.body}</p>
          </RevealItem>
        ))}
        <RevealItem className="flex flex-col justify-center rounded-2xl bg-gradient-brand p-6 text-white">
          {/* text-white on the heading itself: the base layer colours every
              h3 ink, which would otherwise override the card's white. */}
          <h3 className="font-display text-xl font-bold leading-snug text-white">
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
