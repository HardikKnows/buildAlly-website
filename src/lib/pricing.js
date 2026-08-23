// Single source of truth for BuildAlly public pricing (marketing website).
//
// Update prices, limits, storage, and features ONCE here — the pricing page,
// the billing toggle, the homepage teaser, the comparison table, the site
// calculator, and the structured data all read from this config. Do not
// hardcode a rupee amount, a site limit, or a storage figure anywhere else.
//
// Plans:
//   Trial       ₹999 / 7 days  — fully credited towards any paid subscription
//   Starter     ₹2,899/mo  ·  ₹29,999/yr   ·  8 sites
//   Growth      ₹4,499/mo  ·  ₹49,999/yr   ·  15 sites   (recommended)
//   Enterprise  custom pricing — coming soon
//
// This website is a PRESENTATION LAYER. Everything here is display copy and
// display arithmetic. Subscription state, Razorpay, proration, tax, coupons and
// entitlements belong to the BuildAlly application/backend — never to this repo.
//
// Each paid plan carries a per-cycle `billing` block. `originalPrice` is the
// standard rate shown struck through for the limited-period launch offer; the
// discount badge is computed from it, never hardcoded.
//
// Active-site limits are 7 (Trial), 8 (Starter), 15 (Growth). A company that
// outgrows its plan adds sites individually — see SITE_ADDONS below.
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
        "AI construction intelligence included",
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
      id: "starter",
      name: "BuildAlly Starter",
      shortName: "Starter",
      tagline: "For smaller construction companies getting organized.",
      bestFor: ["Interior designers", "Renovation contractors", "Small builders"],
      billing: {
        annual: {
          price: 29999,
          originalPrice: 39000,
          periodLabel: "/year",
          note: "Billed annually · Cancel anytime",
        },
        monthly: {
          price: 2899,
          originalPrice: 3800,
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
        "AI construction intelligence included",
        "Up to 8 active sites",
        "25 GB cloud storage",
        "Unlimited team members",
        "Geofencing attendance",
        "Geotagged site photos",
        "Estimated salary & payroll",
        "Expense approval workflow",
        "Treasury dashboard & advanced financial reports",
        "Priority email support",
        "Add more active sites anytime, per site",
      ],
      cta: { label: "Get Started", action: "subscribe" },
    },
    {
      id: "growth",
      name: "BuildAlly Growth",
      shortName: "Growth",
      tagline:
        "For growing construction companies managing multiple active sites.",
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
      storage: "50 GB",
      members: "Unlimited",
      support: "Faster priority",
      inherits: "Everything in Starter, plus…",
      highlights: [
        "AI construction intelligence included",
        "Up to 15 active sites",
        "50 GB cloud storage",
        "Advanced project analytics",
        "Company-wide financial dashboard",
        "Advanced treasury controls",
        "Multi-level approval workflows",
        "Detailed reporting & analytics",
        "Faster priority support",
        "Early access to new features",
        "Add more active sites anytime, at a lower per-site rate",
      ],
      featured: true,
      badge: "Most Popular",
      cta: { label: "Start with Growth", action: "subscribe" },
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
      inherits: "Everything in Growth, plus…",
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

// --- Additional sites ---
// Extra active sites bought on top of a subscription, priced per site per year.
// A company that outgrows its plan does not have to upgrade: added sites attach
// to the plan it already has and renew alongside the main subscription.
//
// Growth is deliberately cheaper per site than Starter — nobody should feel
// punished for growing. Neither plan has a site ceiling: past the crossover we
// point out that Growth is the better deal (see crossoverSites()) rather than
// blocking, so no plan ever becomes a dead end.
export const SITE_ADDONS = {
  perSite: { starter: 3500, growth: 3000 },
  // Additional sites a plan may add. null = no ceiling, which is every plan
  // today — kept so a future capped plan has somewhere to say so.
  maxAdditional: { starter: null, growth: null },
  // Where we start suggesting a conversation — a prompt, never a block.
  enterpriseSuggestedFrom: 25,
  renewalNote:
    "Additional sites renew together with your main subscription for a seamless billing experience.",
  // Worked example for "what does adding sites actually cost?", built from the
  // Starter plan so the arithmetic is always consistent with the plan cards.
  example: { planId: "starter", additional: 5 },
};

// Grouped feature comparison. `true` renders a checkmark, a falsy value renders
// an em dash, and a string renders as-is. Values follow COMPARISON.columns.
//
// Core construction features (attendance, expenses, treasury, documents) are
// available on every plan by design — see the feature philosophy note above.
export const COMPARISON = {
  columns: ["trial", "starter", "growth", "enterprise"],
  groups: [
    {
      title: "Usage Limits",
      rows: [
        { label: "Active Sites", values: ["7", "8", "15", "Unlimited"] },
        { label: "Storage", values: ["2 GB", "25 GB", "50 GB", "Unlimited"] },
        {
          label: "Team Members",
          values: ["Included", "Unlimited", "Unlimited", "Unlimited"],
        },
        {
          label: "Additional Sites",
          values: [
            false,
            `${formatPrice(SITE_ADDONS.perSite.starter)}/site/year`,
            `${formatPrice(SITE_ADDONS.perSite.growth)}/site/year`,
            "Custom",
          ],
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
      title: "BuildAlly AI",
      rows: [
        { label: "AI Assistant", values: [true, true, true, true] },
        {
          label: "Construction Intelligence & proactive alerts",
          values: [true, true, true, true],
        },
        {
          label: "AI Actions & Workflows (with your confirmation)",
          values: [true, true, true, true],
        },
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

// Checkout flow shown on the pricing page. Optional steps are marked so the
// illustration reads correctly for someone buying a plan and nothing else.
export const CHECKOUT_STEPS = [
  {
    icon: "LayoutGrid",
    title: "Choose your plan",
    body: "Pick Starter or Growth, billed monthly or annually.",
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
    body: "Need more active sites than your plan includes? Add them in the same checkout.",
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

// AI is part of the subscription — never a separate add-on or price. The
// fair-use mention stays quiet and secondary by design.
export const AI_INCLUDED_NOTE =
  "AI-powered construction intelligence included with every plan. Subject to fair-use limits.";

// Prices are GST-inclusive across the platform: the tax is carved out of the
// listed amount at invoice time, never added on top. Say so plainly.
export const TAX_NOTE =
  "Prices in INR, inclusive of GST. Upgrade at any time without losing data — your sites, documents, and history carry over.";

// --- Display arithmetic -----------------------------------------------------
// Everything below is presentation maths for the pricing page. It answers
// "which plan is right for me?" — never "what will I be charged?", which is the
// application's job.

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
 * priceFor(starter, "annual") -> { price: 29999, originalPrice: 39000, ... }
 * Returns null for plans without published pricing (Enterprise).
 */
export function priceFor(plan, cycle = DEFAULT_CYCLE) {
  if (!plan?.billing) return null;
  return plan.billing[cycle] || plan.billing[DEFAULT_CYCLE] || null;
}

// Launch-offer discount off the standard rate for a cycle, e.g. 23 (%).
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

// A plan's included active-site limit as a number ("Up to 15" -> 15). Null for
// Enterprise, whose capacity is unlimited.
export function planSiteLimit(plan) {
  const match = /\d+/.exec(plan?.sites || "");
  return match ? Number(match[0]) : null;
}

// Per-year price of one additional site on a plan. Null where sites can't be
// bought individually (Trial, Enterprise).
export function addonRate(planId) {
  const rate = SITE_ADDONS.perSite[planId];
  return typeof rate === "number" ? rate : null;
}

/**
 * How far a plan stretches:
 * -> { base: 8, max: 15 }  ·  max === null means uncapped (Growth).
 */
export function planCapacity(planId) {
  const base = planSiteLimit(getPlan(planId));
  if (base == null) return null;
  const extra = SITE_ADDONS.maxAdditional[planId];
  return { base, max: typeof extra === "number" ? base + extra : null };
}

/**
 * What a plan costs per year for a given number of active sites.
 * -> { planId, sites, base, additional, rate, addonCost, total }
 * Returns null when the plan cannot serve that many sites, so a caller can
 * never render an invalid combination.
 */
export function planTotalFor(planId, siteCount) {
  const billing = priceFor(getPlan(planId), "annual");
  const capacity = planCapacity(planId);
  const rate = addonRate(planId);
  if (!billing?.price || !capacity || rate == null) return null;

  const sites = Math.floor(Number(siteCount));
  if (!Number.isFinite(sites) || sites < 1) return null;
  if (capacity.max != null && sites > capacity.max) return null;

  const additional = Math.max(0, sites - capacity.base);
  const addonCost = additional * rate;
  return {
    planId,
    sites,
    base: billing.price,
    additional,
    rate,
    addonCost,
    total: billing.price + addonCost,
  };
}

// The paid plans that can be sized by site count, cheapest base first.
const SIZEABLE_PLANS = ["starter", "growth"];

/**
 * The best-value plan for a site count, with the runner-up for comparison.
 * -> { ...planTotalFor(best), alternative, saving, suggestEnterprise }
 * `saving` is the honest difference against the alternative — never a
 * percentage off an invented list price.
 */
export function recommendPlan(siteCount) {
  const quotes = SIZEABLE_PLANS.map((id) => planTotalFor(id, siteCount)).filter(
    Boolean,
  );
  if (!quotes.length) return null;

  quotes.sort((a, b) => a.total - b.total);
  const [best, alternative = null] = quotes;
  return {
    ...best,
    alternative,
    saving: alternative ? alternative.total - best.total : 0,
    suggestEnterprise:
      Math.floor(Number(siteCount)) >= SITE_ADDONS.enterpriseSuggestedFrom,
  };
}

/**
 * The first site count at which Growth costs the same or less than Starter.
 * Computed, so it stays correct if any rate changes. -> 14
 */
export function crossoverSites() {
  const capacity = planCapacity("starter");
  if (!capacity) return null;
  // Neither plan is capped, so bound the search: the crossover lands a handful
  // of sites past the included count, and the loop must terminate regardless.
  const limit = capacity.max ?? capacity.base + 100;
  for (let n = capacity.base + 1; n <= limit; n += 1) {
    const starter = planTotalFor("starter", n);
    const growth = planTotalFor("growth", n);
    if (starter && growth && growth.total <= starter.total) return n;
  }
  return null;
}

/**
 * The worked "what do extra sites cost?" example, computed rather than written
 * out, so the arithmetic can never drift from the plan cards.
 * -> { plan, additional, quote, upgrade, upgradeSites, upgradePrice }
 */
export function addonExample() {
  const { planId, additional } = SITE_ADDONS.example;
  const plan = getPlan(planId);
  const base = planSiteLimit(plan);
  const upgrade = getPlan("growth");
  return {
    plan,
    base,
    additional,
    quote: planTotalFor(planId, base + additional),
    upgrade,
    upgradeSites: planSiteLimit(upgrade),
    upgradePrice: priceFor(upgrade, "annual")?.price ?? null,
  };
}

// Per-month equivalent of an annual plan (₹29,999/yr -> ₹2,500/mo). Null otherwise.
export function monthlyEquivalent(plan) {
  const annual = priceFor(plan, "annual");
  const monthly = priceFor(plan, "monthly");
  if (!annual?.price || !monthly?.price || annual.price === monthly.price) return null;
  return Math.round(annual.price / 12);
}

// Reassurance under the plan cards, so nobody hesitates over outgrowing a plan.
// Add-on pricing is stated openly here by design — see §16: no pricing surprises.
export const ADDON_TEASER = `Need more sites? Add them anytime — ${formatPrice(
  SITE_ADDONS.perSite.starter,
)}/site/year on Starter, ${formatPrice(
  SITE_ADDONS.perSite.growth,
)}/site/year on Growth.`;

// The "which one is right for me?" nudge shown near the plan cards. States the
// fact and lets the reader decide — no urgency, no invented savings.
export const GROWTH_CALLOUT = {
  title: "Managing multiple sites?",
  body: `Growth includes ${planSiteLimit(getPlan("growth"))} sites for ${formatPrice(
    priceFor(getPlan("growth"), "annual").price,
  )}/year, making it the better fit for growing construction businesses.`,
};
