import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Screenshot } from "@/components/ui/Screenshot";
import {
  TIER1_FEATURES,
  GPS_FEATURES,
  TIER2_FEATURES,
  TIER3_FEATURES,
} from "@/lib/product";

// The homepage feature hierarchy. Visual weight drops deliberately across the
// three tiers so the strongest differentiators lead:
//   Tier 1 — full-width rows with a screenshot
//   Tier 2 — a card grid with smaller screenshots
//   Tier 3 — a compact text grid
//
// GPS verification (geofencing + geotagging) sits between tiers 1 and 2 on a dark
// band, because it is the single strongest differentiator BuildAlly has.

// --- Tier 1 -----------------------------------------------------------------
export function Tier1Features() {
  return (
    <Section tone="white" id="features">
      <SectionHeading
        eyebrow="The platform"
        title="Everything a construction business runs on"
        lead="Sites, attendance, payroll, treasury and spend — one workspace, real-time, for every role on the project."
      />
      <div className="mt-16 space-y-20 sm:space-y-28">
        {TIER1_FEATURES.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={f.id}
              id={f.id}
              className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* min-w-0 keeps the screenshot from widening the auto grid track */}
              <Reveal className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
                <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                  {f.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-body">
                  {f.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-[15px] text-ink-600"
                    >
                      <Icon
                        name="CircleCheck"
                        size={18}
                        className="mt-0.5 shrink-0 text-brand"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal
                y={26}
                delay={0.05}
                className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}
              >
                <Screenshot image={f.image} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// --- GPS verification (flagship) --------------------------------------------
export function GpsSection() {
  return (
    <Section tone="ink" className="blueprint-grid-dark" id="gps">
      <SectionHeading
        dark
        eyebrow="GPS verification"
        title="Attendance and photos you can actually prove"
        lead="Two capabilities most construction software simply doesn't have — and the reason BuildAlly pays for itself."
      />
      <div className="mt-14 space-y-14">
        {GPS_FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <Reveal className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <Icon name={f.icon} size={24} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
                {f.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {f.body}
              </p>
              <ul className="mt-6 space-y-3">
                {f.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-[15px] text-slate-300"
                  >
                    <Icon
                      name="CircleCheck"
                      size={18}
                      className="mt-0.5 shrink-0 text-brand-300"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              y={26}
              delay={0.05}
              className={`min-w-0 ${i % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <Screenshot image={f.image} />
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}

// --- Tier 2 -----------------------------------------------------------------
export function Tier2Features() {
  return (
    <Section tone="canvas">
      <SectionHeading
        eyebrow="More of the platform"
        title="The rest of the day-to-day, handled"
        lead="Reporting, documents, tasks, people and approvals — all in the same workspace, under the same permissions."
      />
      <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TIER2_FEATURES.map((f) => (
          <RevealItem
            key={f.title}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white"
          >
            <div className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={f.icon} size={21} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-body">
                {f.body}
              </p>
            </div>
            <Screenshot
              image={f.image}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
              className="mx-6 mb-6 mt-auto rounded-lg shadow-lg"
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

// --- Tier 3 -----------------------------------------------------------------
export function Tier3Features() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Also included"
        title="The supporting cast"
        lead="Quietly important things that every plan ships with."
      />
      <RevealGroup className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {TIER3_FEATURES.map((f) => (
          <RevealItem key={f.title} className="flex min-w-0 gap-3.5">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
              <Icon name={f.icon} size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-body">
                {f.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
