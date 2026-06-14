import { Icon } from "@/components/ui/Icon";

// Illustrative representation of the BuildAlly Executive Dashboard.
// Not a live screenshot — the BuildAlly team can swap in real captures.

const KPIS = [
  { label: "Active sites", value: "12", trend: "+2", tone: "brand" },
  { label: "Payments received", value: "₹1.25Cr", trend: "+8%", tone: "success" },
  { label: "Expenses (MTD)", value: "₹84.6L", trend: "+3%", tone: "ink" },
  { label: "Pending approvals", value: "7", trend: "3 urgent", tone: "warning" },
];

const TREND = [38, 52, 44, 61, 55, 72, 68, 81];

const ATTENTION = [
  { label: "Skyline Towers — budget at 92%", tone: "warning" },
  { label: "₹4.2L receivable overdue 14 days", tone: "destructive" },
  { label: "3 documents awaiting approval", tone: "brand" },
];

const toneText = {
  brand: "text-brand",
  success: "text-success",
  ink: "text-ink",
  warning: "text-warning",
  destructive: "text-destructive",
};
const toneDot = {
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

export function DashboardMockup() {
  return (
    <div className="grid grid-cols-12 gap-3 p-4 text-left sm:p-5">
      {/* Top bar */}
      <div className="col-span-12 mb-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Executive Dashboard</p>
          <p className="text-xs text-slate-body">Real-time · all sites</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
        </div>
      </div>

      {/* KPI cards */}
      {KPIS.map((k) => (
        <div
          key={k.label}
          className="col-span-6 rounded-lg border border-line bg-white p-3 sm:col-span-3"
        >
          <p className="truncate text-[11px] text-slate-body">{k.label}</p>
          <p className="mt-1 font-display text-lg font-bold text-ink">{k.value}</p>
          <p className={`mt-0.5 text-[11px] font-medium ${toneText[k.tone]}`}>{k.trend}</p>
        </div>
      ))}

      {/* Payments vs expenses trend */}
      <div className="col-span-12 rounded-lg border border-line bg-white p-3 sm:col-span-7">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-ink">Payments vs. expenses</p>
          <div className="flex gap-3 text-[10px] text-slate-body">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-brand" /> Payments
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-300" /> Expenses
            </span>
          </div>
        </div>
        <div className="flex h-24 items-end gap-2">
          {TREND.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col justify-end gap-1">
              <div
                className="w-full rounded-sm bg-gradient-to-t from-brand-deep to-brand"
                style={{ height: `${h}%` }}
              />
              <div
                className="w-full rounded-sm bg-slate-200"
                style={{ height: `${Math.max(12, h - 22)}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Expense distribution donut */}
      <div className="col-span-12 rounded-lg border border-line bg-white p-3 sm:col-span-5">
        <p className="mb-2 text-xs font-semibold text-ink">Expense distribution</p>
        <div className="flex items-center gap-4">
          <div
            className="h-20 w-20 shrink-0 rounded-full"
            style={{
              background:
                "conic-gradient(var(--color-cat-blue) 0 42%, var(--color-cat-violet) 42% 66%, var(--color-cat-teal) 66% 84%, var(--color-cat-amber) 84% 100%)",
            }}
          >
            <div className="m-[18px] h-[44px] w-[44px] rounded-full bg-white" />
          </div>
          <ul className="space-y-1.5 text-[11px]">
            <li className="flex items-center gap-1.5 text-slate-body">
              <span className="h-2 w-2 rounded-full bg-cat-blue" /> Materials 42%
            </li>
            <li className="flex items-center gap-1.5 text-slate-body">
              <span className="h-2 w-2 rounded-full bg-cat-violet" /> Labour 24%
            </li>
            <li className="flex items-center gap-1.5 text-slate-body">
              <span className="h-2 w-2 rounded-full bg-cat-teal" /> Subcontract 18%
            </li>
            <li className="flex items-center gap-1.5 text-slate-body">
              <span className="h-2 w-2 rounded-full bg-cat-amber" /> Other 16%
            </li>
          </ul>
        </div>
      </div>

      {/* Attention required */}
      <div className="col-span-12 rounded-lg border border-line bg-white p-3">
        <div className="mb-2 flex items-center gap-1.5">
          <Icon name="TriangleAlert" size={14} className="text-warning" />
          <p className="text-xs font-semibold text-ink">Attention required</p>
        </div>
        <ul className="space-y-1.5">
          {ATTENTION.map((a) => (
            <li key={a.label} className="flex items-center gap-2 text-[11px] text-slate-body">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[a.tone]}`} />
              {a.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
