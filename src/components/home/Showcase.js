import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/Frames";
import { Icon } from "@/components/ui/Icon";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import {
  PanelSiteHub,
  PanelFinance,
  PanelPayroll,
  PanelDocuments,
  PanelApprovals,
} from "@/components/mockups/Panels";

// Section 3 — Product showcase. Grid on desktop, scroll-snap carousel on mobile.
// Visuals are representative product UI; swap in real screenshots when available.
const ITEMS = [
  { title: "Dashboard", caption: "Your whole business at a glance", Panel: DashboardMockup, url: "app.buildally.in" },
  { title: "Site Management", caption: "Every project, progress, and health", Panel: PanelSiteHub, url: "app.buildally.in/sites" },
  { title: "Expense Tracking", caption: "Know where your money is, live", Panel: PanelFinance, url: "app.buildally.in/finance" },
  { title: "Payroll", caption: "Salaries, approvals, and payslips", Panel: PanelPayroll, url: "app.buildally.in/payroll" },
  { title: "Documents", caption: "The latest drawing, always", Panel: PanelDocuments, url: "app.buildally.in/documents" },
  { title: "Approvals", caption: "Decisions in one tap", Panel: PanelApprovals, url: "app.buildally.in/approvals" },
];

export function Showcase() {
  return (
    <Section tone="white" id="product">
      <SectionHeading
        eyebrow="See it in action"
        title="Real software, built for the real workflow"
        lead="From the executive dashboard to payroll and approvals — every screen is shaped around how construction teams actually work."
      />

      <Reveal className="mt-12">
        {/*
          Mobile: horizontal scroll-snap carousel.
          Desktop (lg+): responsive grid.
        */}
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 [scrollbar-width:thin]"
          role="list"
          aria-label="Product screenshots"
        >
          {ITEMS.map((item) => (
            <div
              key={item.title}
              role="listitem"
              className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto lg:shrink"
            >
              <BrowserFrame url={item.url}>
                <div className="h-[280px] overflow-hidden">
                  <item.Panel />
                </div>
              </BrowserFrame>
              <div className="mt-3 px-1">
                <p className="font-display text-base font-semibold text-ink">{item.title}</p>
                <p className="text-sm text-slate-body">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-body lg:hidden">
          <Icon name="MoveHorizontal" size={14} /> Swipe to explore more
        </p>
      </Reveal>
    </Section>
  );
}
