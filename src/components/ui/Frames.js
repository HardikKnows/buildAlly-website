// Device frames for product UI mockups (per brand: device-framed screenshots).

export function BrowserFrame({ children, url = "app.buildally.in", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-white shadow-2xl shadow-ink/10 ring-1 ring-ink/5 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex h-6 flex-1 items-center justify-center rounded-md border border-line bg-white px-3 text-xs text-slate-body">
          {url}
        </div>
      </div>
      <div className="bg-canvas">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative mx-auto w-[244px] rounded-[2.2rem] border border-ink/10 bg-ink p-2.5 shadow-2xl shadow-ink/25 ${className}`}
    >
      <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />
      <div className="overflow-hidden rounded-[1.7rem] bg-canvas">{children}</div>
    </div>
  );
}
