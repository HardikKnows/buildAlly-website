import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PRICING, formatPrice } from "@/lib/pricing";

// Small promotional banner for the paid trial. Reads the price and duration
// from the pricing config so it can never drift from the plan cards.

export function TrialBanner({ href = "/pricing", className = "" }) {
  const trialPrice = formatPrice(PRICING.trialCredit);

  return (
    <Link
      href={href}
      className={`group inline-flex max-w-full items-center gap-3 rounded-2xl border border-brand/20 bg-brand-50/70 px-4 py-3 text-left transition-colors hover:border-brand/40 hover:bg-brand-50 sm:rounded-full sm:px-5 ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm">
        <Icon name="Rocket" size={16} />
      </span>
      <span className="text-sm leading-snug text-ink-600">
        <span className="font-semibold text-ink">
          Start your {PRICING.trialDays}-day BuildAlly Trial for just{" "}
          {trialPrice}
        </span>{" "}
        — fully credited towards your subscription.
      </span>
      <Icon
        name="ArrowRight"
        size={16}
        className="hidden shrink-0 text-brand transition-transform group-hover:translate-x-0.5 sm:block"
      />
    </Link>
  );
}
