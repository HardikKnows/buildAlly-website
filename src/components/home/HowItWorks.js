import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { HOW_IT_WORKS, REPLACES } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function HowItWorks() {
  return (
    <Section tone="white" id="how-it-works">
      <SectionHeading
        eyebrow="How BuildAlly works"
        title="Up and running in three steps"
        lead="No servers to set up, no training manual. Start with one site and bring your whole operation online as you go."
      />

      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {HOW_IT_WORKS.map((s, i) => (
          <RevealItem key={s.step} className="relative">
            <div className="relative h-full rounded-2xl border border-line bg-canvas p-7">
              <span className="font-display text-5xl font-extrabold text-brand/15">
                {s.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{s.body}</p>
            </div>
            {i < HOW_IT_WORKS.length - 1 && (
              <div className="absolute right-[-18px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm">
                  <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            )}
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Before -> after replacement narrative */}
      <div className="mt-16 overflow-hidden rounded-2xl border border-line">
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="bg-canvas p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-body">
              Replace
            </p>
            <ul className="mt-4 space-y-3">
              {REPLACES.map((r) => (
                <li key={r.from} className="flex items-center gap-2.5 text-[15px] text-ink-600">
                  <Icon name="Minus" size={16} className="shrink-0 text-slate-400" />
                  {r.from}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-7 text-white blueprint-grid-dark">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
              With BuildAlly
            </p>
            <ul className="mt-4 space-y-3">
              {REPLACES.map((r) => (
                <li key={r.to} className="flex items-start gap-2.5 text-[15px] text-slate-100">
                  <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-success" />
                  {r.to}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
