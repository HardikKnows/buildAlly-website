import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { COMPARISON, comparisonPlans } from "@/lib/pricing";

// Plan comparison. A real table on md+, and native <details> blocks per plan on
// small screens — so the comparison never scrolls sideways on a phone.

const PLANS = comparisonPlans();

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

function RowLabel({ row }) {
  return (
    <>
      {row.label}
      {row.note && (
        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-body">
          {row.note}
        </span>
      )}
    </>
  );
}

export function PlanComparison() {
  return (
    <Reveal className="mt-12">
      {/* Desktop / tablet: full table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-white md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            BuildAlly plan comparison across Trial, Interior, Builder, and
            Enterprise
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
                    plan.featured ? "bg-brand-50 text-brand-700" : "text-ink"
                  }`}
                >
                  {plan.shortName}
                  {plan.featured && (
                    <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-wide text-brand">
                      Most Popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {COMPARISON.rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="px-5 py-3.5 text-sm font-medium text-ink-600"
                >
                  <RowLabel row={row} />
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={PLANS[i].id}
                    className={`px-3 py-3.5 text-center ${
                      PLANS[i].featured ? "bg-brand-50/40" : ""
                    }`}
                  >
                    <CellValue
                      value={value}
                      label={`${row.label} on ${PLANS[i].shortName}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one collapsible block per plan — no horizontal scrolling. */}
      <div className="space-y-3 md:hidden">
        {PLANS.map((plan, planIndex) => (
          <details
            key={plan.id}
            open={plan.featured}
            className={`group overflow-hidden rounded-2xl border bg-white ${
              plan.featured ? "border-brand ring-1 ring-brand/15" : "border-line"
            }`}
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 marker:content-none">
              <span className="font-display text-base font-semibold text-ink">
                {plan.shortName}
                {plan.featured && (
                  <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand">
                    Popular
                  </span>
                )}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-brand transition-transform duration-200 group-open:rotate-45">
                <Icon name="Plus" size={16} />
              </span>
            </summary>
            <dl className="divide-y divide-line border-t border-line">
              {COMPARISON.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 px-5 py-3"
                >
                  <dt className="text-sm text-slate-body">
                    <RowLabel row={row} />
                  </dt>
                  <dd className="shrink-0 text-right">
                    <CellValue
                      value={row.values[planIndex]}
                      label={`${row.label} on ${plan.shortName}`}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
