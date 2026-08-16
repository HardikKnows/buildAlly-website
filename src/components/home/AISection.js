import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { BrowserFrame } from "@/components/ui/Frames";
import { AIChatMockup, AIAlertsMockup } from "@/components/mockups/AIChatMockup";
import { AI_CAPABILITIES, AI_FLOW, AI_TRUST } from "@/lib/ai";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// BuildAlly AI — the platform's construction intelligence. Three beats:
//   1. The assistant: grounded answers + prepared actions (chat mockup)
//   2. Proactive intelligence: it doesn't wait to be asked (alerts mockup)
//   3. Trust: AI assists, the user confirms — schedule stays protected
export function AISection() {
  return (
    <Section tone="white" id="ai">
      <SectionHeading
        eyebrow="BuildAlly AI · Included"
        title="Your Construction Intelligence Assistant"
        lead="BuildAlly AI understands your real construction data — sites, schedules, expenses, materials and documents — so you can ask, understand, and act from one place."
      />

      {/* Beat 1 — the assistant */}
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <RevealGroup className="min-w-0 space-y-6">
          {AI_CAPABILITIES.map((c) => (
            <RevealItem key={c.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={c.icon} size={19} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-body">
                  {c.body}
                </p>
              </div>
            </RevealItem>
          ))}

          {/* Ask → Execute progression */}
          <RevealItem className="rounded-2xl border border-line bg-canvas p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-body">
              How a request moves
            </p>
            <ol className="mt-3 flex flex-wrap items-center gap-y-2">
              {AI_FLOW.map((step, i) => (
                <li key={step} className="flex items-center">
                  <span
                    className={`rounded-lg px-2.5 py-1.5 text-[13px] font-semibold ${
                      i === AI_FLOW.length - 1
                        ? "bg-gradient-brand text-white"
                        : "bg-white text-ink ring-1 ring-line"
                    }`}
                  >
                    {step}
                  </span>
                  {i < AI_FLOW.length - 1 && (
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="mx-1 shrink-0 text-slate-400"
                    />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-body">
              Every step up to Execute is a recommendation. Nothing important
              happens without your confirmation.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal y={26} delay={0.05} className="min-w-0">
          <BrowserFrame url="app.buildally.in/ai">
            <AIChatMockup />
          </BrowserFrame>
        </Reveal>
      </div>

      {/* Beat 2 — proactive intelligence */}
      <div className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal y={26} delay={0.05} className="order-2 min-w-0 lg:order-1">
          <BrowserFrame url="app.buildally.in/dashboard">
            <AIAlertsMockup />
          </BrowserFrame>
        </Reveal>
        <Reveal className="order-1 min-w-0 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Proactive intelligence
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            BuildAlly doesn&apos;t just wait for you to ask
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-body">
            A delayed delivery, a milestone drifting towards risk, a follow-up
            nobody closed — BuildAlly detects meaningful changes across your
            sites and brings them to your attention.
          </p>
          <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-canvas p-4 text-[15px] leading-relaxed text-ink-600">
            <Icon
              name="ShieldCheck"
              size={18}
              className="mt-0.5 shrink-0 text-brand"
            />
            AI identifies and recommends. The decision — and the control — stays
            with you.
          </p>
        </Reveal>
      </div>

      {/* Beat 3 — trust band */}
      <Reveal className="mt-20 rounded-2xl bg-ink p-8 text-white blueprint-grid-dark sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {AI_TRUST.title}
          </h3>
          <p className="mt-3 text-pretty leading-relaxed text-slate-300">
            {AI_TRUST.body}
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {AI_TRUST.points.map((p) => (
            <div key={p.title} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-brand-300">
                <Icon name={p.icon} size={18} />
              </span>
              <h4 className="mt-3 font-display text-[15px] font-semibold text-white">
                {p.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {p.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <TrackedButton
            href={URLS.bookDemo}
            event={EVENTS.BOOK_DEMO}
            eventProps={{ location: "ai_section" }}
            variant="white"
            size="lg"
          >
            <Icon name="CalendarCheck" size={18} /> See BuildAlly AI in a Demo
          </TrackedButton>
          <p className="text-center text-sm text-slate-400">
            {AI_TRUST.includedNote}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
