// Single source of truth for BuildAlly public pricing (marketing website).
//
// Update prices ONCE here — every page and component (landing pricing band,
// pricing page, structured data, terms) reads from this config. Do not hardcode
// a rupee amount anywhere else; import from here instead.
//
// Limited-period launch offer:
//   Monthly  ₹6,000  ->  ₹4,499/mo  (25% off)
//   Annual   ₹65,000 ->  ₹49,999/yr (23% off)

export const PRICING = {
  currency: "INR",
  currencySymbol: "₹",
  offerLabel: "Limited Period Offer",
  plans: [
    {
      id: "monthly",
      name: "Monthly",
      tagline: "Flexible billing — pay month to month.",
      originalPrice: 6000,
      price: 4499,
      discountPercent: 25,
      period: "month",
      periodLabel: "/month",
      billingNote: "Billed monthly",
    },
    {
      id: "annual",
      name: "Annual",
      tagline: "Best value for growing teams.",
      originalPrice: 65000,
      price: 49999,
      discountPercent: 23,
      period: "year",
      periodLabel: "/year",
      billingNote: "Billed annually",
      featured: true,
    },
  ],
};

// Format a whole-rupee amount with Indian digit grouping, e.g. 49999 -> "₹49,999".
export function formatPrice(amount) {
  return `${PRICING.currencySymbol}${Number(amount).toLocaleString("en-IN")}`;
}

export function getPlan(id) {
  return PRICING.plans.find((p) => p.id === id);
}

// Per-month equivalent for an annual plan (₹49,999/yr -> ₹4,167/mo). Null otherwise.
export function monthlyEquivalent(plan) {
  if (plan.period !== "year") return null;
  return Math.round(plan.price / 12);
}
