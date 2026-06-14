import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { BrowserFrame } from "@/components/ui/Frames";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { Icon } from "@/components/ui/Icon";

const POINTS = [
  { icon: "Activity", title: "KPIs at a glance", body: "Expenses, payments received, active sites, pending approvals — one screen." },
  { icon: "TriangleAlert", title: "Attention Required", body: "Budget overruns and overdue receivables surface before they cost you." },
  { icon: "CalendarClock", title: "Upcoming Actions", body: "What needs doing Today and This Week, prioritized for you." },
];

export function DashboardShowcase() {
  return (
    <section id="dashboard" className="relative overflow-hidden bg-ink py-20 text-white blueprint-grid-dark sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 hero-glow" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">
              For owners & directors
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl">
              Your whole business, at a glance
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Stop chasing updates across calls and spreadsheets. The Executive
              Dashboard gives you real-time control of every site, rupee, and
              decision — so you act before small issues become expensive ones.
            </p>
            <ul className="mt-8 space-y-5">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-400">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <CTAGroup className="mt-9" onDark showMicrocopy={false} />
          </Reveal>
          <Reveal y={26} delay={0.08}>
            <BrowserFrame>
              <DashboardMockup />
            </BrowserFrame>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
