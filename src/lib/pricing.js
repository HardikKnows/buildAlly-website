// Single source of truth for BuildAlly public pricing (marketing website).
//
// Update prices, limits and storage ONCE here — the pricing page, the billing
// selector, the plan cards, the comparison table, the add-on explainer, the plan
// finder, the homepage teaser, the FAQs and the structured data all read from
// this config. Do not hardcode a rupee amount, a site limit, a team-member
// limit or a storage figure anywhere else.
//
//   Trial       ₹499 for 7 days · 3 active sites · 10 team members
//   Starter     ₹1,499/month · ₹14,999/year ·  3 sites ·  10 team members ·  10 GB
//   Growth      ₹4,999/month · ₹44,999/year · 10 sites ·  40 team members ·  50 GB
//               (up to 18 sites with paid site add-ons — Growth only)
//   Business    ₹9,999/month · ₹89,999/year · 25 sites · 100 team members · 200 GB
//   Enterprise  custom pricing and limits — a conversation with our team
//
// Key holders are excluded from every plan's team-member limit.
//
// This website is a PRESENTATION LAYER. Everything here is display copy and
// display arithmetic. Subscription state, Razorpay, tax, coupons, proration
// and entitlements belong to the BuildAlly application — never to this repo.
//
// Every plan includes the complete platform: plans differ by capacity (active
// sites, team members, storage), never by withheld features.

export const CURRENCY = { code: "INR", symbol: "₹" };

export const BILLING_CYCLES = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Annual" },
];

export const DEFAULT_CYCLE = "annual";

// --- Paid trial ---------------------------------------------------------------
// One payment for a fixed seven-day window. Not free, and not described as a
// credit or as converting automatically into a subscription — neither is part
// of the published offer.
export const TRIAL = {
  name: "BuildAlly Trial",
  price: 499,
  days: 7,
  sites: 3,
  members: 10,
};

// --- Growth site add-ons --------------------------------------------------------
// Extra active sites bought on top of Growth — and only Growth. The add-on is
// billed on the same period as the Growth subscription it attaches to.
export const SITE_ADDON = {
  planId: "growth",
  prices: { monthly: 375, annual: 3999 },
  maxAdditional: 8,
};

const GROWTH_INCLUDED_SITES = 10;

// --- Plans --------------------------------------------------------------------
// `prices` are whole rupees per billing period. `sites` is the number of
// ACTIVE sites included; `members` the team-member limit (key holders are not
// counted); `storageGb` the included storage. Enterprise has no public price.
export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For smaller builders and interior teams running a few sites at a time.",
    prices: { monthly: 1499, annual: 14999 },
    sites: 3,
    members: 10,
    storageGb: 10,
    highlights: [
      "The complete BuildAlly platform",
      "BuildAlly AI included (fair use)",
      "Android app and mobile web for site teams",
    ],
    cta: "Choose Starter",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For growing construction companies running several sites at once.",
    prices: { monthly: 4999, annual: 44999 },
    sites: GROWTH_INCLUDED_SITES,
    members: 40,
    storageGb: 50,
    recommended: true,
    highlights: [
      "The complete BuildAlly platform",
      "BuildAlly AI included (fair use)",
      `Add up to ${SITE_ADDON.maxAdditional} more sites as you grow (${
        GROWTH_INCLUDED_SITES + SITE_ADDON.maxAdditional
      } max)`,
    ],
    cta: "Choose Growth",
  },
  {
    id: "business",
    name: "Business",
    tagline: "For established builders managing a large portfolio of active sites.",
    prices: { monthly: 9999, annual: 89999 },
    sites: 25,
    members: 100,
    storageGb: 200,
    highlights: [
      "The complete BuildAlly platform",
      "BuildAlly AI included (fair use)",
      "25 active sites included from day one",
    ],
    cta: "Choose Business",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For companies running more than 25 active sites, or with requirements beyond our standard plans.",
    custom: true,
    highlights: [
      "Custom pricing",
      "Custom limits for sites, team members and storage",
      "Plan your rollout directly with the BuildAlly team",
    ],
    cta: "Talk to our team",
  },
];

// The plans with a public price, in display order.
export const PAID_PLANS = PLANS.filter((p) => !p.custom);

// Above Business's 25 sites, the conversation is Enterprise.
export const ENTERPRISE_MIN_SITES =
  PLANS.find((p) => p.id === "business").sites + 1;

// --- Display arithmetic -------------------------------------------------------
// Everything below answers "which plan is right for me?" — never "what will I
// be charged?", which the application settles at checkout.

// Whole rupees with Indian digit grouping: 119988 -> "₹1,19,988".
export function formatPrice(amount) {
  return `${CURRENCY.symbol}${Number(amount).toLocaleString("en-IN")}`;
}

export function getPlan(id) {
  return PLANS.find((p) => p.id === id) || null;
}

/** The plan's price for a billing period in whole rupees, or null (Enterprise). */
export function priceFor(plan, cycle = DEFAULT_CYCLE) {
  return plan?.prices?.[cycle] ?? null;
}

/**
 * What an annual plan works out to per month, rounded to the rupee:
 * ₹14,999/year -> 1250. A comparison figure only — annual plans are billed
 * once a year, so this must always be shown next to the annual amount.
 */
export function effectiveMonthly(plan) {
  const annual = priceFor(plan, "annual");
  return annual ? Math.round(annual / 12) : null;
}

/**
 * What annual billing saves against twelve monthly payments.
 * Starter -> { twelveMonths: 17988, amount: 2989 }. Null when there is no saving,
 * so a card can never show a saving that isn't real.
 */
export function annualSavings(plan) {
  const monthly = priceFor(plan, "monthly");
  const annual = priceFor(plan, "annual");
  if (!monthly || !annual) return null;
  const twelveMonths = monthly * 12;
  const amount = twelveMonths - annual;
  return amount > 0 ? { twelveMonths, amount } : null;
}

// The cheapest plan, for the "Plans starting at …" headline. The per-month
// figure is the ANNUAL plan's monthly equivalent, so it is always published
// together with the annual amount and the month-to-month price.
const ENTRY_PLAN = PAID_PLANS.reduce((a, b) =>
  priceFor(b, "annual") < priceFor(a, "annual") ? b : a,
);

export const STARTING_PRICE = {
  planId: ENTRY_PLAN.id,
  planName: ENTRY_PLAN.name,
  monthlyEquivalent: effectiveMonthly(ENTRY_PLAN),
  annual: priceFor(ENTRY_PLAN, "annual"),
  monthly: priceFor(ENTRY_PLAN, "monthly"),
};

// Growth's site range: 10 included, 18 at most with every add-on.
export const GROWTH_SITES = {
  included: getPlan(SITE_ADDON.planId).sites,
  max: getPlan(SITE_ADDON.planId).sites + SITE_ADDON.maxAdditional,
};

/**
 * Growth plus `additional` add-on sites for one billing period.
 * -> { cycle, additional, sites, base, rate, addonCost, total }
 * Null when the combination isn't sellable (negative, fractional, or above
 * the add-on ceiling), so an invalid quote can never be rendered.
 */
export function addonQuote(additional, cycle = DEFAULT_CYCLE) {
  const extra = Number(additional);
  if (!Number.isInteger(extra) || extra < 0) return null;
  if (extra > SITE_ADDON.maxAdditional) return null;
  const base = priceFor(getPlan(SITE_ADDON.planId), cycle);
  const rate = SITE_ADDON.prices[cycle];
  if (!base || !rate) return null;
  return {
    cycle,
    additional: extra,
    sites: GROWTH_SITES.included + extra,
    base,
    rate,
    addonCost: extra * rate,
    total: base + extra * rate,
  };
}

/**
 * The plan that covers a number of active sites, cheapest first:
 *   1–3 Starter · 4–10 Growth · 11–18 Growth + add-ons · 19–25 Business ·
 *   26+ Enterprise.
 * -> { planId, sites, additional, quotes: { monthly, annual } }
 *    or { planId: "enterprise", sites } above Business, or null for bad input.
 */
export function planForSites(siteCount) {
  const sites = Math.floor(Number(siteCount));
  if (!Number.isFinite(sites) || sites < 1) return null;

  for (const plan of PAID_PLANS) {
    if (sites <= plan.sites) {
      return {
        planId: plan.id,
        sites,
        additional: 0,
        quotes: { monthly: plan.prices.monthly, annual: plan.prices.annual },
      };
    }
    if (plan.id === SITE_ADDON.planId && sites <= GROWTH_SITES.max) {
      const additional = sites - plan.sites;
      return {
        planId: plan.id,
        sites,
        additional,
        quotes: {
          monthly: addonQuote(additional, "monthly").total,
          annual: addonQuote(additional, "annual").total,
        },
      };
    }
  }
  return { planId: "enterprise", sites };
}

// --- Shared copy ----------------------------------------------------------------
// Sentences that carry a number, so the figure is stated in one place.

export const TRIAL_CTA_LABEL = `Start ${TRIAL.days}-Day Trial · ${formatPrice(
  TRIAL.price,
)}`;

export const TRIAL_SUMMARY = `${formatPrice(TRIAL.price)} for ${
  TRIAL.days
} days · ${TRIAL.sites} active sites · ${TRIAL.members} team members`;

export const STARTING_PRICE_QUALIFIER = `Billed annually at ${formatPrice(
  STARTING_PRICE.annual,
)}.`;

export const KEY_HOLDER_NOTE = {
  short: "Key holders not counted",
  headline: "Key holders are excluded from your plan's team-member limit.",
  body: "Your plan's team-member limit applies to eligible team accounts. Key holders are excluded from this limit.",
  detail:
    "Key Holder is BuildAlly's client role — the access you give a project's client so they can follow their own project. Being an owner, director, admin or manager doesn't make someone a key holder.",
};

// AI is part of every subscription — never a separate add-on or price.
export const AI_INCLUDED_NOTE =
  "BuildAlly AI included with every plan, subject to fair-use limits.";

// The application's listed prices are GST-inclusive: tax is carved out of the
// listed amount on the invoice, never added on top.
export const TAX_NOTE = "Prices in INR, inclusive of GST.";

// Codes and discount percentages are deliberately not published.
export const COUPON_NOTE =
  "Have a promotional code? Apply it securely at checkout.";

// How a plan CTA actually works today: the app takes the plan choice after the
// account exists, so no plan or payment is implied by the click itself.
export const CHECKOUT_NOTE =
  "Plan buttons take you to create your BuildAlly account. You choose your plan and billing period, and pay securely, inside the app.";

// "Starter, Growth or Business".
export function joinOr(items) {
  return items.length > 1
    ? `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`
    : items[0] || "";
}

// --- Checkout path ----------------------------------------------------------------
// Mirrors the application: register -> verify email -> choose trial or plan
// at activation -> pay. Nothing is active until the app confirms the payment.
export const CHECKOUT_STEPS = [
  {
    icon: "UserPlus",
    title: "Create your account",
    body: "Register your company at app.buildally.in and verify your email.",
  },
  {
    icon: "LayoutGrid",
    title: "Choose the trial or a plan",
    body: `Start the ${formatPrice(TRIAL.price)} trial, or pick ${joinOr(
      PAID_PLANS.map((p) => p.name),
    )}, billed monthly or annually.`,
  },
  {
    icon: "ShieldCheck",
    title: "Pay securely",
    body: `Pay through our secure payment gateway. ${COUPON_NOTE}`,
  },
  {
    icon: "Rocket",
    title: "Start working",
    body: "Your trial or plan starts once the payment is confirmed in the app.",
  },
];

// --- Comparison table -------------------------------------------------------------
// Values follow COMPARISON.columns. `true` renders a checkmark, a falsy value an
// em dash, and a string renders as-is.

const COLUMN_IDS = ["starter", "growth", "business", "enterprise"];
const COLUMN_PLANS = COLUMN_IDS.map(getPlan);

function perPlan(fn, fallback = "Custom") {
  return COLUMN_PLANS.map((plan) => (plan.custom ? fallback : fn(plan)));
}

export const COMPARISON = {
  columns: COLUMN_IDS,
  groups: [
    {
      title: "Pricing",
      rows: [
        {
          label: "Monthly billing",
          values: perPlan((p) => `${formatPrice(p.prices.monthly)}/month`),
        },
        {
          label: "Annual billing",
          values: perPlan((p) => `${formatPrice(p.prices.annual)}/year`),
        },
        {
          label: "Annual, monthly equivalent",
          values: perPlan((p) => `${formatPrice(effectiveMonthly(p))}/month`),
        },
      ],
    },
    {
      title: "Capacity",
      rows: [
        {
          label: "Active sites included",
          values: perPlan((p) => String(p.sites)),
        },
        {
          label: "Site add-ons",
          values: perPlan((p) =>
            p.id === SITE_ADDON.planId
              ? `Up to ${SITE_ADDON.maxAdditional} more · ${formatPrice(
                  SITE_ADDON.prices.monthly,
                )}/site/month or ${formatPrice(SITE_ADDON.prices.annual)}/site/year`
              : false,
          ),
        },
        {
          label: "Maximum active sites",
          values: perPlan((p) =>
            String(p.id === SITE_ADDON.planId ? GROWTH_SITES.max : p.sites),
          ),
        },
        {
          label: "Team members",
          values: perPlan((p) => String(p.members)),
        },
        {
          label: "Key holders",
          values: COLUMN_PLANS.map(() => "Not counted"),
        },
        {
          label: "Storage",
          values: perPlan((p) => `${p.storageGb} GB`),
        },
      ],
    },
    {
      title: "Included on every plan",
      rows: [
        { label: "Complete BuildAlly platform", values: COLUMN_PLANS.map(() => true) },
        { label: "BuildAlly AI (fair use)", values: COLUMN_PLANS.map(() => true) },
      ],
    },
  ],
};

export function comparisonPlans() {
  return COLUMN_PLANS;
}

// What every plan includes — the platform is never split across tiers.
export const INCLUDED_ON_EVERY_PLAN = [
  "Sites, Site Hub and construction schedules",
  "GPS attendance and geofencing",
  "Expenses, payments, treasury and payroll",
  "Documents, drawings, agreements and quotations",
  "Approvals and notifications",
  "Client portal for key holders",
  "BuildAlly AI, subject to fair use",
  "Android app and mobile web",
];
