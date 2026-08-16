import { Icon } from "@/components/ui/Icon";
import { AI_CONVERSATION, AI_ALERTS } from "@/lib/ai";

// Illustrative representation of the BuildAlly AI assistant, in the product's
// own visual language (brand tokens, evidence-led answers, explicit review
// step). Not a live screenshot — the BuildAlly team can swap in real captures.

export function AIChatMockup() {
  const c = AI_CONVERSATION;
  return (
    <div className="flex flex-col text-left">
      {/* Assistant header */}
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand text-white">
            <Icon name="Sparkles" size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">BuildAlly AI</p>
            <p className="text-[11px] text-slate-body">Construction Intelligence</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Connected to your workspace
        </span>
      </div>

      <div className="space-y-3 bg-canvas p-4 sm:p-5">
        {/* Director's question */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-brand px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm shadow-brand/20">
            {c.user}
          </div>
        </div>
        <p className="text-right text-[10px] font-medium uppercase tracking-wide text-slate-body">
          Director
        </p>

        {/* AI answer */}
        <div className="flex items-start gap-2.5">
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
            <Icon name="Sparkles" size={14} />
          </span>
          <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-line bg-white p-4 shadow-sm">
            <p className="text-sm leading-relaxed text-ink">{c.intro}</p>
            <ul className="mt-3 space-y-2">
              {c.evidence.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm leading-relaxed text-ink-600">
                  <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-slate-body">
              {c.conclusion}
            </p>
          </div>
        </div>

        {/* Follow-up with explicit review step */}
        <div className="flex items-start gap-2.5">
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
            <Icon name="Sparkles" size={14} />
          </span>
          <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-line bg-white p-4 shadow-sm">
            <p className="text-sm leading-relaxed text-ink">{c.followUp}</p>
            <span className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand/25">
              <Icon name="ClipboardCheck" size={16} /> {c.action}
            </span>
            <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-body">
              <Icon name="ShieldCheck" size={12} className="shrink-0 text-success" />
              {c.confirmNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// The proactive side of BuildAlly AI: meaningful changes surfaced without
// being asked. Recommendations only — the Director stays in control.
export function AIAlertsMockup() {
  const toneDot = {
    destructive: "bg-destructive",
    warning: "bg-warning",
    amber: "bg-cat-amber",
  };
  return (
    <div className="p-5 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand">
            <Icon name="Radar" size={15} />
          </span>
          <p className="text-sm font-semibold text-ink">Needs your attention</p>
        </div>
        <span className="rounded-md border border-line bg-white px-2 py-1 text-[11px] text-slate-body">
          Today
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {AI_ALERTS.map((a) => (
          <div
            key={a.title}
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${toneDot[a.tone]}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{a.title}</p>
              <p className="truncate text-[11px] text-slate-body">{a.meta}</p>
            </div>
            <span className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand">
              Review
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-slate-body">
        <Icon name="Sparkles" size={14} className="mt-0.5 shrink-0 text-brand" />
        BuildAlly detects meaningful changes and brings them to your attention.
      </p>
    </div>
  );
}
