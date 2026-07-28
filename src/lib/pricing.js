// Single source of truth for BuildAlly public pricing (marketing website).
//
// Update prices, site limits, and storage ONCE here — the pricing page, the
// homepage teaser, the comparison table, and the structured data all read from
// this config. Do not hardcode a rupee amount or a storage figure anywhere else.
//
// Plans:
//   Trial       ₹999 / 7 days  — fully credited towards any paid subscription
//   Interior    ₹2,899/mo  ·  ₹29,999/yr
//   Builder     ₹4,499/mo  ·  ₹49,999/yr   (recommended)
//   Enterprise  custom pricing — coming soon
//
// Limited-period launch offer on the two paid plans. `originalPrice` /
// `originalAnnualPrice` are the standard rates shown struck through; the
// discount badge is computed from them, never hardcoded.

export const PRICING = {
  currency: "INR",
  currencySymbol: "₹",
  trialDays: 7,
  trialCredit: 999,
  offerLabel: "Limited Period Offer",
  plans: [
    {
      id: "trial",
      name: "BuildAlly Trial",
      shortName: "Trial",
      tagline: "A 7-day professional evaluation on your real projects.",
      price: 999,
      periodLabel: "for 7 days",
      billingNote: "One-time · Credited to your subscription",
      sites: "Up to 5",
      sitesShort: "5",
      storage: "2 GB",
      support: "Email support",
      features: [
        "Full platform access",
        "Up to 5 active sites",
        "2 GB storage",
        "Complete feature access",
        "₹999 credited towards any paid subscription",
        "Read-only after the trial expires",
        "No data is deleted",
      ],
      cta: { label: "Start 7-Day Trial", action: "trial" },
    },
    {
      id: "interior",
      name: "BuildAlly Interior",
      shortName: "Interior",
      tagline: "Everything a design-led team needs to run projects end to end.",
      bestFor: ["Interior designers", "Renovation contractors", "Small builders"],
      originalPrice: 3899,
      price: 2899,
      periodLabel: "/month",
      originalAnnualPrice: 39999,
      annualPrice: 29999,
      billingNote: "Billed monthly or annually · Cancel anytime",
      sites: "Up to 7",
      sitesShort: "7",
      storage: "25 GB",
      support: "Priority email support",
      features: [
        "Up to 7 active sites",
        "25 GB storage",
        "Complete project management",
        "Attendance",
        "Expenses",
        "Salary",
        "Treasury",
        "Documents",
        "Reports",
        "Task management",
        "Photo management",
        "Priority email support",
      ],
      cta: { label: "Choose Interior", action: "subscribe" },
    },
    {
      id: "builder",
      name: "BuildAlly Builder",
      shortName: "Builder",
      tagline: "Built for construction companies running multiple live sites.",
      bestFor: [
        "Construction companies",
        "Civil contractors",
        "Turnkey builders",
        "Residential builders",
        "Commercial builders",
      ],
      originalPrice: 6000,
      price: 4499,
      periodLabel: "/month",
      originalAnnualPrice: 65000,
      annualPrice: 49999,
      billingNote: "Billed monthly or annually · Cancel anytime",
      sites: "Up to 12",
      sitesShort: "12",
      storage: "75 GB",
      support: "Priority support",
      features: [
        "Up to 12 active sites",
        "75 GB storage",
        "Everything in Interior",
        "Priority support",
        "Best value",
      ],
      featured: true,
      badge: "Most Popular",
      cta: { label: "Choose Builder", action: "subscribe" },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      shortName: "Enterprise",
      tagline: "For large builders with custom scale, security, and integrations.",
      priceLabel: "Custom Pricing",
      comingSoon: true,
      billingNote: "Tailored to your scale and rollout",
      sites: "Unlimited",
      sitesShort: "Unlimited",
      storage: "Unlimited",
      support: "Dedicated manager",
      features: [
        "Unlimited active sites",
        "Unlimited storage",
        "Dedicated account manager",
        "Priority support",
        "Custom integrations",
        "Enterprise security",
        "Onboarding assistance",
      ],
      cta: { label: "Contact Sales", action: "contact" },
    },
  ],
};

// Plan-by-plan feature comparison. `true` renders a checkmark, a falsy value
// renders an em dash, and a string renders as-is. Column order follows
// COMPARISON.columns, which must stay in sync with the plan ids above.
export const COMPARISON = {
  columns: ["trial", "interior", "builder", "enterprise"],
  rows: [
    { label: "Active Sites", values: ["5", "7", "12", "Unlimited"] },
    { label: "Storage", values: ["2 GB", "25 GB", "75 GB", "Unlimited"] },
    { label: "Attendance", values: [true, true, true, true] },
    { label: "Expenses", values: [true, true, true, true] },
    { label: "Salary", values: [true, true, true, true] },
    { label: "Treasury", values: [true, true, true, true] },
    { label: "Documents", values: [true, true, true, true] },
    { label: "Reports", values: [true, true, true, true] },
    { label: "Team Management", values: [true, true, true, true] },
    { label: "Notifications", values: [true, true, true, true] },
    {
      label: "Customer Support",
      values: ["Email", "Priority email", "Priority", "Dedicated manager"],
    },
    {
      label: "White Label",
      note: "Future",
      values: [false, false, false, "Coming soon"],
    },
    {
      label: "API Access",
      note: "Future",
      values: [false, false, false, "Coming soon"],
    },
  ],
};

// What every plan's cloud storage is used for.
export const STORAGE_USES = [
  "Site photos",
  "Drawings",
  "Agreements",
  "Documents",
  "Reports",
];

// Format a whole-rupee amount with Indian digit grouping, e.g. 49999 -> "₹49,999".
export function formatPrice(amount) {
  return `${PRICING.currencySymbol}${Number(amount).toLocaleString("en-IN")}`;
}

export function getPlan(id) {
  return PRICING.plans.find((p) => p.id === id);
}

// Plans in the order they appear in COMPARISON.columns.
export function comparisonPlans() {
  return COMPARISON.columns.map((id) => getPlan(id));
}

// Launch-offer discount off the standard monthly rate, e.g. 25 (%).
// Null for plans without a published standard rate.
export function discountPercent(plan) {
  if (!plan?.originalPrice || !plan?.price) return null;
  const off = Math.round((1 - plan.price / plan.originalPrice) * 100);
  return off > 0 ? off : null;
}

// What an annual subscription saves against 12 monthly payments.
// -> { amount: 4789, percent: 14 } — null for plans without annual billing.
export function annualSavings(plan) {
  if (!plan?.annualPrice || !plan?.price) return null;
  const twelveMonths = plan.price * 12;
  const amount = twelveMonths - plan.annualPrice;
  if (amount <= 0) return null;
  return { amount, percent: Math.round((amount / twelveMonths) * 100) };
}
