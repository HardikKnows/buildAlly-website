import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/Frames";
import { Icon } from "@/components/ui/Icon";
import {
  PanelSiteHub,
  PanelFinance,
  PanelDocuments,
  PanelApprovals,
} from "@/components/mockups/Panels";

const ROWS = [
  {
    eyebrow: "Site Hub",
    title: "A command center for every project",
    body: "Each site gets its own hub with progress, timeline, budget, and a deterministic health score — so you know at a glance which projects need you.",
    points: ["Progress & completion tracking", "Site health: Excellent → Critical", "Activity timeline, newest first"],
    Panel: PanelSiteHub,
    url: "app.buildally.in/sites",
  },
  {
    eyebrow: "Financials",
    title: "Know where your money is — live",
    body: "Contract vs. spent vs. remaining, outstanding receivables, and collection efficiency — all in the ₹ Lakh and Crore format your team already uses.",
    points: ["Budget vs. spend, in real time", "Outstanding receivables & overdue", "Collection efficiency & expense velocity"],
    Panel: PanelFinance,
    url: "app.buildally.in/finance",
    reverse: true,
  },
  {
    eyebrow: "Documents",
    title: "The latest drawing, always",
    body: "Centralized, versioned, approvable documents organized by site — so no one builds the wrong revision again.",
    points: ["Version visibility & approvals", "Filter by site, category, status, tag", "One source of truth for every file"],
    Panel: PanelDocuments,
    url: "app.buildally.in/documents",
  },
  {
    eyebrow: "Approvals",
    title: "Decisions, not delays",
    body: "Structured approval workflows for expenses, payments, documents, and progress — with one-tap actions from anywhere.",
    points: ["Approve or reject in one tap", "Workflows for every request type", "Nothing stuck on someone's phone"],
    Panel: PanelApprovals,
    url: "app.buildally.in/approvals",
    reverse: true,
  },
];

export function ProductScreenshots() {
  return (
    <Section tone="white" id="product">
      <SectionHeading
        eyebrow="See it in action"
        title="Real software, built for the real workflow"
        lead="No generic project management bolted onto construction — every screen is shaped around how builders actually work."
      />
      <div className="mt-16 space-y-20 sm:space-y-24">
        {ROWS.map((row) => (
          <div
            key={row.title}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <Reveal className={row.reverse ? "lg:order-2" : ""}>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                {row.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                {row.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-body">{row.body}</p>
              <ul className="mt-6 space-y-3">
                {row.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-ink-600">
                    <Icon name="CircleCheck" size={18} className="mt-0.5 shrink-0 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal y={26} delay={0.05} className={row.reverse ? "lg:order-1" : ""}>
              <BrowserFrame url={row.url}>
                <row.Panel />
              </BrowserFrame>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
