import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { COMPARISON, comparisonPlans } from "@/lib/pricing";

// Full feature comparison, grouped by area. A real table on md+, and native
// <details> blocks per plan on small screens — so it never scrolls sideways.

const PLANS = comparisonPlans();
const COL_COUNT = PLANS.length + 1;

// "Starter, Growth, Business, and Enterprise" — built from the config so the
// screen-reader caption can never name a plan that no longer exists.
const PLAN_NAMES = PLANS.map((p, i) =>
  i === PLANS.length - 1 && PLANS.length > 1 ? `and ${p.name}` : p.name,
).join(PLANS.length > 2 ? ", " : " ");

// A cell value is either `true` (included), falsy (not included), or a string.
function CellValue({ value, label }) {
  if (value === true) {
    return (
      <>
        <Icon
          name="Check"
          size={18}
          className="mx-auto text-brand"
          strokeWidth={2.5}
        />
        <span className="sr-only">{label} included</span>
      </>
    );
  }
  if (!value) {
    return (
      <>
        <span aria-hidden="true" className="text-slate-300">
          —
        </span>
        <span className="sr-only">{label} not included</span>
      </>
    );
  }
  return <span className="text-sm font-medium text-ink-600">{value}</span>;
}

export function PlanComparison() {
  return (
    <Reveal className="mt-12">
      {/* Desktop / tablet: full table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-white md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            BuildAlly plan comparison across {PLAN_NAMES}
          </caption>
          <thead>
            <tr className="border-b border-line bg-canvas">
              <th scope="col" className="w-2/6 px-5 py-4 text-sm font-semibold text-ink">
                Features
              </th>
              {PLANS.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={`px-3 py-4 text-center text-sm font-semibold ${
                    plan.recommended ? "bg-brand-50 text-brand-700" : "text-ink"
                  }`}
                >
                  {plan.name}
                  {plan.recommended && (
                    <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-wide text-brand">
                      Recommended
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          {COMPARISON.groups.map((group) => (
            <tbody key={group.title} className="divide-y divide-line">
              <tr className="border-t border-line bg-canvas/70">
                <th
                  scope="colgroup"
                  colSpan={COL_COUNT}
                  className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-body"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-sm font-medium text-ink-600"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={PLANS[i].id}
                      className={`px-3 py-3.5 text-center ${
                        PLANS[i].recommended ? "bg-brand-50/40" : ""
                      }`}
                    >
                      <CellValue
                        value={value}
                        label={`${row.label} on ${PLANS[i].name}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Mobile: one collapsible block per plan — no horizontal scrolling. */}
      <div className="space-y-3 md:hidden">
        {PLANS.map((plan, planIndex) => (
          <details
            key={plan.id}
            open={plan.recommended}
            className={`group overflow-hidden rounded-2xl border bg-white ${
              plan.recommended ? "border-brand ring-1 ring-brand/15" : "border-line"
            }`}
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 marker:content-none">
              <span className="font-display text-base font-semibold text-ink">
                {plan.name}
                {plan.recommended && (
                  <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand">
                    Recommended
                  </span>
                )}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-brand transition-transform duration-200 group-open:rotate-45">
                <Icon name="Plus" size={16} />
              </span>
            </summary>
            <div className="border-t border-line">
              {COMPARISON.groups.map((group) => (
                <dl key={group.title}>
                  <div className="bg-canvas px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-body">
                    {group.title}
                  </div>
                  {group.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 border-t border-line px-5 py-3"
                    >
                      <dt className="shrink-0 text-sm text-slate-body">{row.label}</dt>
                      <dd className="text-right">
                        <CellValue
                          value={row.values[planIndex]}
                          label={`${row.label} on ${plan.name}`}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              ))}
            </div>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
