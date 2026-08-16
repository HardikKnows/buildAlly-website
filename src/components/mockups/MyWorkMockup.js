import { Icon } from "@/components/ui/Icon";

// Illustrative representation of the Site Engineer's mobile "My Work" view —
// deliberately sparse: one clear task, one big action, large touch targets.

const TASKS = [
  {
    title: "Check steel delivery",
    site: "Green Heights",
    due: "Due Today",
    tone: "warning",
    primary: true,
  },
  {
    title: "Upload slab progress photo",
    site: "Green Heights",
    due: "Due Tomorrow",
    tone: "slate",
  },
];

export function MyWorkMockup() {
  return (
    <div className="flex h-105 flex-col bg-canvas text-left">
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2 text-[10px] font-medium text-ink">
        <span>9:41</span>
        <span className="flex items-center gap-1 text-success">
          <Icon name="MapPin" size={11} /> On site
        </span>
      </div>

      {/* header */}
      <div className="px-4 pb-3">
        <p className="text-[11px] text-slate-body">Good morning, Rahul</p>
        <p className="font-display text-lg font-bold text-ink">My Work</p>
      </div>

      {/* tasks */}
      <div className="flex-1 space-y-3 overflow-hidden px-4">
        {TASKS.map((t) => (
          <div
            key={t.title}
            className={`rounded-2xl border bg-white p-4 ${
              t.primary ? "border-brand/30 shadow-md shadow-brand/10" : "border-line"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-[15px] font-semibold leading-snug text-ink">
                {t.title}
              </p>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                  t.tone === "warning"
                    ? "bg-warning/10 text-warning"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {t.due}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-body">
              <Icon name="MapPin" size={11} /> {t.site}
            </p>
            {t.primary && (
              <span className="mt-3.5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand text-sm font-semibold text-white shadow-sm shadow-brand/25">
                Open Task <Icon name="ArrowRight" size={15} />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* bottom nav */}
      <div className="mt-2 flex items-center justify-around border-t border-line bg-white px-2 py-2.5">
        {[
          { icon: "ListChecks", active: true },
          { icon: "Camera" },
          { icon: "Building2" },
          { icon: "User" },
        ].map((n, i) => (
          <div
            key={i}
            className={`flex h-10 w-10 items-center justify-center ${
              n.active ? "text-brand" : "text-slate-400"
            }`}
          >
            <Icon name={n.icon} size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}
