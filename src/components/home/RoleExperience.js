import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/Frames";
import { MyWorkMockup } from "@/components/mockups/MyWorkMockup";
import { ROLE_EXPERIENCE, FIELD_POINTS } from "@/lib/ai";

// "One Platform. Different Roles." — each role sees exactly the slice of the
// business they're responsible for, with the Site Engineer's deliberately
// simple field experience shown beside the role cards.
export function RoleExperience() {
  return (
    <Section tone="white" id="roles">
      <SectionHeading
        eyebrow="Role-based experience"
        title="One platform. Different roles."
        lead="From the Director's overview to the Site Engineer's task list, everyone gets a view built for their job — and only the access their role allows."
      />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-3 lg:gap-12">
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          {ROLE_EXPERIENCE.map((r) => (
            <RevealItem
              key={r.role}
              className="min-w-0 rounded-2xl border border-line bg-canvas p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={r.icon} size={21} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {r.role}
                  </h3>
                  <p className="text-sm font-medium text-brand">{r.promise}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2.5">
                {r.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm leading-relaxed text-ink-600"
                  >
                    <Icon
                      name="CircleCheck"
                      size={16}
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Field-team differentiator: the Site Engineer's My Work view */}
        <Reveal y={26} delay={0.1} className="mx-auto w-full max-w-xs lg:max-w-none">
          <PhoneFrame>
            <MyWorkMockup />
          </PhoneFrame>
          <div className="mx-auto mt-6 max-w-60 text-center lg:max-w-none">
            <p className="font-display text-base font-semibold text-ink">
              Simple enough for the construction site
            </p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {FIELD_POINTS.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-ink-600"
                >
                  <Icon name={f.icon} size={14} className="shrink-0 text-brand" />
                  {f.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-slate-body">
              Designed for field teams — open a task, do the work, attach the
              photo, done.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
