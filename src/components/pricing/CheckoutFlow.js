import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CHECKOUT_STEPS, COUPON_NOTE } from "@/lib/pricing";

// The checkout path, start to finish: plan → optional coupon → optional site
// capacity → payment → activation. An ordered list, so the sequence reaches
// screen readers too and not only the connector arrows.

export function CheckoutFlow() {
  return (
    <>
      <RevealGroup className="mt-12">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CHECKOUT_STEPS.map((step, i) => (
            <RevealItem
              key={step.title}
              className="relative flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                  <Icon name={step.icon} size={18} />
                </span>
                <span className="font-display text-xs font-bold tracking-wider text-slate-body">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.optional && (
                  <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-body">
                    Optional
                  </span>
                )}
              </div>
              <h3 className="mt-3.5 font-display text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
                {step.body}
              </p>

              {/* Connector — decorative, and only between cards on wide grids. */}
              {i < CHECKOUT_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-brand/50 lg:block"
                >
                  <Icon name="ChevronRight" size={18} />
                </span>
              )}
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>

      <Reveal className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2.5 rounded-full border border-line bg-canvas px-5 py-3 text-center text-sm text-slate-body">
        <Icon name="Ticket" size={17} className="shrink-0 text-brand" />
        {COUPON_NOTE}
      </Reveal>
    </>
  );
}
