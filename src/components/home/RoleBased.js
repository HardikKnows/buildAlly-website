import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ROLES } from "@/lib/content";

// Section 4 — Role-based experience. Increases perceived organizational fit.
export function RoleBased() {
  return (
    <Section tone="canvas" id="roles">
      <SectionHeading
        eyebrow="Built for every role"
        title="One platform, the right view for everyone"
        lead="From the director's dashboard to the engineer's phone, BuildAlly gives each team exactly what they need — with role-based access."
      />
      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((r) => (
          <RevealItem
            key={r.role}
            className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
              <Icon name={r.icon} size={22} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{r.role}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{r.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
