import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { URLS } from "@/lib/site";
import { PLANS } from "@/lib/content";

export function PricingCards() {
  return (
    <RevealGroup className="grid gap-6 lg:grid-cols-3">
      {PLANS.map((plan) => {
        const featured = plan.featured;
        const href = plan.cta.kind === "primary" ? URLS.signup : URLS.bookDemo;
        return (
          <RevealItem
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-7 ${
              featured
                ? "border-brand bg-white shadow-xl shadow-brand/10 lg:scale-[1.03]"
                : "border-line bg-white"
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-bold text-ink">{plan.name}</h3>
            <p className="mt-1 text-sm text-slate-body">{plan.blurb}</p>
            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-extrabold text-ink">{plan.price}</span>
              <span className="text-sm text-slate-body">/ {plan.cadence}</span>
            </div>
            {plan.priceNote && (
              <p className="mt-1 text-xs font-medium text-warning">{plan.priceNote}</p>
            )}
            <Button
              href={href}
              variant={featured ? "primary" : "secondary"}
              size="md"
              className="mt-6 w-full"
            >
              {plan.cta.label}
            </Button>
            <ul className="mt-7 space-y-3">
              {plan.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] text-ink-600">
                  <Icon name="Check" size={18} className="mt-0.5 shrink-0 text-success" />
                  {h}
                </li>
              ))}
            </ul>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
