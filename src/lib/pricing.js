// Single source of truth for BuildAlly public pricing (marketing website).
//
// Update prices, limits, storage, and features ONCE here — the pricing page,
// the billing toggle, the homepage teaser, the comparison table, and the
// structured data all read from this config. Do not hardcode a rupee amount,
// a site limit, or a storage figure anywhere else.
//
// Plans:
//   Trial       ₹999 / 7 days  — fully credited towards any paid subscription
//   Interior    ₹2,899/mo  ·  ₹29,999/yr
//   Builder     ₹4,499/mo  ·  ₹49,999/yr   (recommended)
//   Enterprise  custom pricing — coming soon
//
// Each paid plan carries a per-cycle `billing` block. `originalPrice` is the
// standard rate shown struck through for the limited-period launch offer; the
// discount badge is computed from it, never hardcoded.
//
// Active-site limits are 7 (Trial), 8 (Interior), 15 (Builder). A company that
// outgrows its limit does not have to change plans — see SITE_ADDONS below.
//
// Coupons: never publish codes or discount percentages here. Promotional codes
// belong to influencer, referral, launch, and sales campaigns; the website only
// says they can be applied at checkout (COUPON_NOTE).
//
// Feature philosophy: every plan ships the complete platform — construction
// teams need attendance, expenses, treasury, and documents from day one. Plans
// differ by capacity (sites, storage), advanced analytics and automation,
// support tier, and premium capabilities. Core features are never withheld.

export const BILLING_CYCLES = [
  { id: "annual", label: "Annual Billing" },
  { id: "monthly", label: "Monthly Billing" },
];

export const DEFAULT_CYCLE = "annual";

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
      bestFor: ["Teams evaluating BuildAlly on a live site"],
      // Same price on either cycle — a trial has no billing cadence.
      billing: {
        annual: {
          price: 999,
          periodLabel: "for 7 days",
          note: "One-time · Credited to your subscription",
        },
        monthly: {
          price: 999,
          periodLabel: "for 7 days",
          note: "One-time · Credited to your subscription",
        },
      },
      sites: "Up to 7",
      storage: "2 GB",
      members: "Included",
      support: "Email support",
      highlights: [
        "Full platform access",
        "Up to 7 active sites",
        "2 GB cloud storage",
        "Project, site & member management",
        "Attendance & task management",
        "Expenses, salary & treasury",
        "Documents, reports & notifications",
        "Mobile responsive access",
        "₹999 credited towards your subscription",
      ],
      cta: { label: "Start 7-Day Trial", action: "trial" },
    },
    {
      id: "interior",
      name: "BuildAlly Interior",
      shortName: "Interior",
      tagline: "Everything a design-led team needs to run projects end to end.",
      bestFor: ["Interior designers", "Renovation contractors", "Small builders"],
      billing: {
        annual: {
          price: 29999,
          originalPrice: 39999,
          periodLabel: "/year",
          note: "Billed annually · Cancel anytime",
        },
        monthly: {
          price: 2899,
          originalPrice: 3899,
          periodLabel: "/month",
          note: "Billed monthly · Cancel anytime",
        },
      },
      sites: "Up to 8",
      storage: "25 GB",
      members: "Unlimited",
      support: "Priority email",
      inherits: "Everything in Trial, plus…",
      highlights: [
        "Up to 8 active sites",
        "25 GB cloud storage",
        "Unlimited team members",
        "Geofencing attendance",
        "Geotagged site photos",
        "Estimated salary & payroll",
        "Expense approval workflow",
        "Treasury dashboard & advanced financial reports",
        "Priority email support",
        "Expand active sites anytime with Site Capacity Packs",
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
        "Residential & commercial builders",
      ],
      billing: {
        annual: {
          price: 49999,
          originalPrice: 65000,
          periodLabel: "/year",
          note: "Billed annually · Cancel anytime",
        },
        monthly: {
          price: 4499,
          originalPrice: 6000,
          periodLabel: "/month",
          note: "Billed monthly · Cancel anytime",
        },
      },
      sites: "Up to 15",
      storage: "75 GB",
      members: "Unlimited",
      support: "Faster priority",
      inherits: "Everything in Interior, plus…",
      highlights: [
        "Up to 15 active sites",
        "75 GB cloud storage",
        "Advanced project analytics",
        "Company-wide financial dashboard",
        "Advanced treasury controls",
        "Multi-level approval workflows",
        "Detailed reporting & analytics",
        "Faster priority support",
        "Early access to new features",
        "Expand active sites anytime with Site Capacity Packs",
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
      bestFor: ["Large builders & multi-company groups"],
      priceLabel: "Custom Pricing",
      comingSoon: true,
      billingNote: "Tailored to your scale and rollout",
      sites: "Unlimited",
      storage: "Unlimited",
      members: "Unlimited",
      support: "SLA-backed",
      inherits: "Everything in Builder, plus…",
      highlights: [
        "Unlimited active sites",
        "Unlimited cloud storage",
        "Dedicated account manager",
        "Custom onboarding & integrations",
        "API access",
        "White labelling",
        "Advanced security controls",
        "Custom roles & permissions",
        "SLA-backed priority support",
      ],
      cta: { label: "Contact Sales", action: "contact" },
    },
  ],
};

// Grouped feature comparison. `true` renders a checkmark, a falsy value renders
// an em dash, and a string renders as-is. Values follow COMPARISON.columns.
//
// Core construction features (attendance, expenses, treasury, documents) are
// available on every plan by design — see the feature philosophy note above.
export const COMPARISON = {
  columns: ["trial", "interior", "builder", "enterprise"],
  groups: [
    {
      title: "Usage Limits",
      rows: [
        { label: "Active Sites", values: ["7", "8", "15", "Unlimited"] },
        { label: "Storage", values: ["2 GB", "25 GB", "75 GB", "Unlimited"] },
        {
          label: "Team Members",
          values: ["Included", "Unlimited", "Unlimited", "Unlimited"],
        },
        {
          label: "Site Capacity Packs",
          values: [false, true, true, "Not needed"],
        },
      ],
    },
    {
      title: "Project Management",
      rows: [
        { label: "Project Dashboard", values: [true, true, true, true] },
        { label: "Site Progress", values: [true, true, true, true] },
        { label: "Site Gallery", values: [true, true, true, true] },
        { label: "Task Management", values: [true, true, true, true] },
        {
          label: "Advanced Project Analytics",
          values: [false, false, true, true],
        },
      ],
    },
    {
      title: "Workforce",
      rows: [
        { label: "Attendance", values: [true, true, true, true] },
        { label: "Geofencing", values: [false, true, true, true] },
        { label: "Geotagging", values: [false, true, true, true] },
        { label: "Salary Management", values: [true, true, true, true] },
        { label: "Estimated Salary", values: [false, true, true, true] },
      ],
    },
    {
      title: "Finance",
      rows: [
        { label: "Expenses", values: [true, true, true, true] },
        { label: "Treasury", values: [true, true, true, true] },
        {
          label: "Financial Reports",
          values: ["Standard", "Advanced", "Company-wide", "Enterprise"],
        },
        {
          label: "Approval Workflow",
          values: ["Standard", "Standard", "Multi-level", "Multi-level"],
        },
      ],
    },
    {
      title: "Documents",
      rows: [
        { label: "Document Management", values: [true, true, true, true] },
        { label: "Agreements", values: [true, true, true, true] },
        { label: "Drawings", values: [true, true, true, true] },
        { label: "Reports", values: [true, true, true, true] },
      ],
    },
    {
      title: "Platform",
      rows: [
        { label: "Notifications", values: [true, true, true, true] },
        { label: "Mobile Friendly", values: [true, true, true, true] },
        { label: "Role-Based Access", values: [true, true, true, true] },
        {
          label: "Priority Support",
          values: [false, "Email", "Faster", "SLA-backed"],
        },
        {
          label: "Early Access Features",
          values: [false, false, true, true],
        },
        { label: "API Access", values: [false, false, false, true] },
        { label: "White Label", values: [false, false, false, true] },
      ],
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

// --- Site Capacity Packs ---
// Extra active sites bought on top of a subscription. A company that outgrows
// its plan does not have to upgrade: packs add capacity to the plan it already
// has, stack with each other, and renew alongside the main subscription.
// Priced per year, matching the annual subscription cycle.
export const SITE_ADDONS = {
  packs: [
    { sites: 5, price: 8499 },
    { sites: 10, price: 15999 },
    { sites: 15, price: 25999 },
  ],
  renewalNote:
    "Additional site packs renew together with your main subscription for a seamless billing experience.",
  // Worked example for the "can I buy more than one?" question, built from the
  // Builder plan so the arithmetic is always consistent with the plan cards.
  example: { planId: "builder", packs: [5, 10] },
};

// Checkout flow shown on the pricing page. Optional steps are marked so the
// illustration reads correctly for someone buying a plan and nothing else.
export const CHECKOUT_STEPS = [
  {
    icon: "LayoutGrid",
    title: "Choose your plan",
    body: "Pick Interior or Builder, billed monthly or annually.",
  },
  {
    icon: "Tag",
    title: "Apply a promotional code",
    optional: true,
    body: "Have a code from a campaign or our team? Enter it securely at checkout.",
  },
  {
    icon: "Layers",
    title: "Add site capacity",
    optional: true,
    body: "Need more active sites than your plan includes? Add a pack in the same checkout.",
  },
  {
    icon: "ShieldCheck",
    title: "Pay securely",
    body: "Encrypted payment through our payment gateway. No hidden charges.",
  },
  {
    icon: "Rocket",
    title: "Workspace activated",
    body: "Your capacity is live immediately — invite your team and start adding sites.",
  },
];

// Public coupon messaging. Codes and discount percentages are deliberately not
// published: they belong to influencer, referral, launch, and sales campaigns.
export const COUPON_NOTE =
  "Have a promotional code? Apply it securely during checkout.";

// Reassurance under the plan cards, so nobody hesitates over outgrowing a plan.
export const ADDON_TEASER =
  "Need more than your plan includes? Purchase additional site capacity anytime.";

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

// Every comparison row, flattened — used by the mobile per-plan view.
export function comparisonRows() {
  return COMPARISON.groups.flatMap((g) =>
    g.rows.map((row) => ({ ...row, group: g.title })),
  );
}

/**
 * The billing block for a plan on a given cycle, e.g.
 * priceFor(interior, "annual") -> { price: 29999, originalPrice: 39999, ... }
 * Returns null for plans without published pricing (Enterprise).
 */
export function priceFor(plan, cycle = DEFAULT_CYCLE) {
  if (!plan?.billing) return null;
  return plan.billing[cycle] || plan.billing[DEFAULT_CYCLE] || null;
}

// Launch-offer discount off the standard rate for a cycle, e.g. 25 (%).
export function discountPercent(plan, cycle = DEFAULT_CYCLE) {
  const b = priceFor(plan, cycle);
  if (!b?.originalPrice || !b?.price) return null;
  const off = Math.round((1 - b.price / b.originalPrice) * 100);
  return off > 0 ? off : null;
}

// What paying annually saves against 12 monthly payments.
// -> { amount: 4789, percent: 14, monthsFree: 1.7 } — null if not applicable.
export function annualSavings(plan) {
  const monthly = priceFor(plan, "monthly");
  const annual = priceFor(plan, "annual");
  if (!monthly?.price || !annual?.price) return null;
  // A trial costs the same either way; there is nothing to save.
  if (monthly.price === annual.price) return null;
  const twelveMonths = monthly.price * 12;
  const amount = twelveMonths - annual.price;
  if (amount <= 0) return null;
  return {
    amount,
    percent: Math.round((amount / twelveMonths) * 100),
    monthsFree: Math.round((amount / monthly.price) * 10) / 10,
  };
}

// A plan's active-site limit as a number ("Up to 15" -> 15). Null for
// Enterprise, whose capacity is unlimited.
export function planSiteLimit(plan) {
  const match = /\d+/.exec(plan?.sites || "");
  return match ? Number(match[0]) : null;
}

/**
 * The stacking example, computed rather than written out:
 * -> { plan, packs: [5, 10], base: 15, total: 30 }
 */
export function addonExample() {
  const plan = getPlan(SITE_ADDONS.example.planId);
  const base = planSiteLimit(plan);
  const packs = SITE_ADDONS.example.packs;
  return {
    plan,
    packs,
    base,
    total: base + packs.reduce((sum, n) => sum + n, 0),
  };
}

// Per-month equivalent of an annual plan (₹29,999/yr -> ₹2,500/mo). Null otherwise.
export function monthlyEquivalent(plan) {
  const annual = priceFor(plan, "annual");
  const monthly = priceFor(plan, "monthly");
  if (!annual?.price || !monthly?.price || annual.price === monthly.price) return null;
  return Math.round(annual.price / 12);
}
