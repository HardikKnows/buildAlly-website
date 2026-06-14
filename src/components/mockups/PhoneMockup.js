import { Icon } from "@/components/ui/Icon";

// Illustrative representation of the BuildAlly mobile field experience.

const QUICK = [
  { icon: "Camera", label: "Photo" },
  { icon: "Receipt", label: "Expense" },
  { icon: "TrendingUp", label: "Progress" },
  { icon: "FileText", label: "Document" },
];

const FEED = [
  { icon: "Camera", title: "Site photo added", meta: "Block C · 2m ago", tone: "brand" },
  { icon: "Receipt", title: "Expense ₹18,400", meta: "Cement · pending", tone: "warning" },
  { icon: "CheckCircle2", title: "Progress 64%", meta: "Slab work · synced", tone: "success" },
];

const toneBg = {
  brand: "bg-brand/10 text-brand",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

export function PhoneMockup() {
  return (
    <div className="flex h-[470px] flex-col bg-canvas text-left">
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2 text-[10px] font-medium text-ink">
        <span>9:41</span>
        <span className="flex items-center gap-1 text-warning">
          <Icon name="WifiOff" size={11} /> Offline
        </span>
      </div>

      {/* header */}
      <div className="px-4 pb-3">
        <p className="text-[11px] text-slate-body">Skyline Towers</p>
        <p className="font-display text-base font-bold text-ink">Site Hub</p>
      </div>

      {/* offline banner */}
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2 text-[10px] text-warning">
        <Icon name="RefreshCw" size={12} />
        2 items queued — will sync when you&apos;re back online
      </div>

      {/* quick actions */}
      <div className="grid grid-cols-4 gap-2 px-4">
        {QUICK.map((q) => (
          <div key={q.label} className="flex flex-col items-center gap-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon name={q.icon} size={18} />
            </div>
            <span className="text-[9px] text-slate-body">{q.label}</span>
          </div>
        ))}
      </div>

      {/* feed */}
      <div className="mt-3 flex-1 space-y-2 overflow-hidden px-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-body">
          Activity
        </p>
        {FEED.map((f) => (
          <div
            key={f.title}
            className="flex items-center gap-3 rounded-xl border border-line bg-white p-2.5"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneBg[f.tone]}`}>
              <Icon name={f.icon} size={15} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-ink">{f.title}</p>
              <p className="truncate text-[10px] text-slate-body">{f.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* bottom nav */}
      <div className="mt-2 flex items-center justify-around border-t border-line bg-white px-2 py-2.5">
        {[
          { icon: "Home", active: true },
          { icon: "Wallet" },
          { icon: "Plus", fab: true },
          { icon: "FolderOpen" },
          { icon: "User" },
        ].map((n, i) => (
          <div
            key={i}
            className={
              n.fab
                ? "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white shadow-md shadow-brand/30"
                : `flex h-8 w-8 items-center justify-center ${n.active ? "text-brand" : "text-slate-400"}`
            }
          >
            <Icon name={n.icon} size={n.fab ? 18 : 19} />
          </div>
        ))}
      </div>
    </div>
  );
}
