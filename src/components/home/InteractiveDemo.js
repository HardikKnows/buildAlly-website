import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { DEMO_HIGHLIGHTS } from "@/lib/content";

// Section 2 — Interactive demo promotion. Reduce friction; encourage exploration.
export function InteractiveDemo() {
  return (
    <section id="demo" className="relative overflow-hidden bg-ink py-20 text-white blueprint-grid-dark sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 hero-glow" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-300">
              <Icon name="MonitorPlay" size={15} /> Interactive demo
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
              Explore BuildAlly instantly
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 text-pretty text-lg leading-relaxed text-slate-300">
              Experience BuildAlly using realistic construction data. No setup,
              no sign-up — just open the demo and click around.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TrackedButton
                href={URLS.demo}
                event={EVENTS.TRY_DEMO}
                eventProps={{ location: "demo_section" }}
                variant="white"
                size="lg"
              >
                <Icon name="MonitorPlay" size={18} /> Try Demo
              </TrackedButton>
              <TrackedButton
                href={URLS.bookDemo}
                event={EVENTS.BOOK_DEMO}
                eventProps={{ location: "demo_section" }}
                variant="outlineLight"
                size="lg"
              >
                Book a Demo
              </TrackedButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {DEMO_HIGHLIGHTS.map((h) => (
              <li
                key={h.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand-300">
                  <Icon name={h.icon} size={21} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{h.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-400">{h.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
