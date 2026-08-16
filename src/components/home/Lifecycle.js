import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { LIFECYCLE, DOC_GENERATORS, TASK_SPLIT, TASK_SPLIT_NOTE } from "@/lib/ai";

// The construction lifecycle story: agreements and quotations before the site
// exists, the build itself, and AI throughout — followed by the task-system
// separation that keeps the construction schedule trustworthy.

export function Lifecycle() {
  return (
    <Section tone="ink" className="blueprint-grid-dark" id="lifecycle">
      <SectionHeading
        dark
        eyebrow="The construction lifecycle"
        title="Create agreements & quotations before the site even starts"
        lead="Sometimes a project doesn't exist in BuildAlly yet. Directors can draft the agreement and the quotation directly from the platform — then carry the same client straight into a live site."
      />

      {/* Agreement + Quotation generators */}
      <RevealGroup className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
        {DOC_GENERATORS.map((g) => (
          <RevealItem
            key={g.title}
            className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-brand-300">
              <Icon name={g.icon} size={21} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">
              {g.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-300">
              {g.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* The three rails: before → during → AI throughout */}
      <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
        {LIFECYCLE.map((rail) => (
          <RevealItem
            key={rail.title}
            className="min-w-0 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <Icon name={rail.icon} size={19} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  {rail.title}
                </h3>
                <p className="text-[13px] text-slate-400">{rail.lead}</p>
              </div>
            </div>
            <ol className="mt-5 flex flex-wrap items-center gap-y-2.5">
              {rail.steps.map((step, i) => (
                <li key={step} className="flex items-center">
                  <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[13px] font-medium text-white">
                    {step}
                  </span>
                  {i < rail.steps.length - 1 && (
                    <Icon
                      name="ChevronRight"
                      size={14}
                      className="mx-1 shrink-0 text-slate-500"
                    />
                  )}
                </li>
              ))}
            </ol>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

// Construction schedule vs operational work — the separation that keeps
// milestone dates and progress trustworthy.
export function TaskSystem() {
  return (
    <Section tone="canvas" id="tasks">
      <SectionHeading
        eyebrow="The task system"
        title="Your construction schedule, protected"
        lead="BuildAlly keeps the construction schedule and day-to-day operational work separate — two kinds of work, two systems, one clear picture."
      />
      <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
        {TASK_SPLIT.map((t) => (
          <RevealItem
            key={t.title}
            className="rounded-2xl border border-line bg-white p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name={t.icon} size={21} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              {t.title}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-slate-body">
              {t.body}
            </p>
            <ul className="mt-4 space-y-2">
              {t.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-sm text-ink-600"
                >
                  <Icon
                    name="CircleCheck"
                    size={16}
                    className="shrink-0 text-brand"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mx-auto mt-8 max-w-3xl text-center text-[15px] leading-relaxed text-slate-body">
        {TASK_SPLIT_NOTE}
      </Reveal>
    </Section>
  );
}
