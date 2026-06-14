import { Icon } from "@/components/ui/Icon";

// Small illustrative product panels for the alternating feature rows.

export function PanelSiteHub() {
  const sites = [
    { name: "Skyline Towers", pct: 64, health: "Good", tone: "success" },
    { name: "Green Acres Villas", pct: 38, health: "Needs Attention", tone: "warning" },
    { name: "Metro Plaza", pct: 91, health: "Excellent", tone: "success" },
  ];
  const toneText = { success: "text-success", warning: "text-warning" };
  const toneBg = { success: "bg-success", warning: "bg-warning" };
  return (
    <div className="space-y-3 p-5 text-left">
      <p className="text-sm font-semibold text-ink">Your sites</p>
      {sites.map((s) => (
        <div key={s.name} className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{s.name}</span>
            <span className={`text-xs font-semibold ${toneText[s.tone]}`}>{s.health}</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full ${toneBg[s.tone]}`} style={{ width: `${s.pct}%` }} />
            </div>
            <span className="text-xs font-semibold text-slate-body">{s.pct}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PanelFinance() {
  const rows = [
    { label: "Contract value", value: "₹3.20Cr", tone: "ink" },
    { label: "Spent to date", value: "₹1.86Cr", tone: "ink" },
    { label: "Outstanding receivable", value: "₹42.0L", tone: "destructive" },
    { label: "Collection efficiency", value: "88%", tone: "success" },
  ];
  const toneText = {
    ink: "text-ink",
    destructive: "text-destructive",
    success: "text-success",
  };
  return (
    <div className="p-5 text-left">
      <p className="text-sm font-semibold text-ink">Skyline Towers — money</p>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3"
          >
            <span className="text-sm text-slate-body">{r.label}</span>
            <span className={`font-display text-sm font-bold ${toneText[r.tone]}`}>{r.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-brand-50 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-brand">
          <Icon name="TrendingUp" size={14} /> Expense velocity ₹62K/day
        </div>
      </div>
    </div>
  );
}

export function PanelDocuments() {
  const docs = [
    { name: "Structural drawing — Rev C", status: "Approved", tone: "success", icon: "FileCheck2" },
    { name: "RCC contract.pdf", status: "Pending", tone: "warning", icon: "FileClock" },
    { name: "Soil test report", status: "Approved", tone: "success", icon: "FileCheck2" },
    { name: "Site layout — Rev B", status: "Superseded", tone: "slate", icon: "FileX2" },
  ];
  const toneCls = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    slate: "bg-slate-100 text-slate-500",
  };
  return (
    <div className="p-5 text-left">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Documents</p>
        <span className="rounded-md border border-line bg-white px-2 py-1 text-[11px] text-slate-body">
          All sites · Approved
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {docs.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
              <Icon name={d.icon} size={17} />
            </span>
            <span className="flex-1 truncate text-sm text-ink">{d.name}</span>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${toneCls[d.tone]}`}>
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PanelApprovals() {
  const items = [
    { title: "Expense ₹84,200 — steel", who: "Eng. Rahul", tone: "warning" },
    { title: "Payment ₹2.4L — vendor", who: "Acc. Priya", tone: "brand" },
    { title: "Progress photo — Block C", who: "Sup. Imran", tone: "brand" },
  ];
  return (
    <div className="p-5 text-left">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-warning/10 text-warning">
          <Icon name="BellRing" size={15} />
        </span>
        <p className="text-sm font-semibold text-ink">Pending approvals · 3</p>
      </div>
      <div className="mt-4 space-y-2">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border border-line bg-white p-3">
            <p className="text-sm font-medium text-ink">{it.title}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-body">Raised by {it.who}</span>
              <div className="flex gap-1.5">
                <span className="rounded-md bg-success/10 px-2 py-1 text-[11px] font-medium text-success">
                  Approve
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                  Reject
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
