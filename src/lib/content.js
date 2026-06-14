// Marketing content derived from WEBSITE_CONTEXT.md (single source of truth).
// Benefit-led: every feature is paired with the outcome it delivers.

// --- Problem cards (Homepage §3 "Sound familiar?") ---
export const PROBLEMS = [
  {
    title: "15 WhatsApp groups, still no clarity",
    body: "Site updates scroll away. Nothing is searchable, and no one is accountable.",
  },
  {
    title: "Expenses live in three spreadsheets",
    body: "Numbers never match, are never current, and one wrong cell hides an overrun.",
  },
  {
    title: "Approvals happen on calls and paper",
    body: "Decisions get stuck on someone's phone. Nothing is traceable.",
  },
  {
    title: "You hear about overruns too late",
    body: "By the time a cost blowout or missed payment reaches you, it has already happened.",
  },
  {
    title: "Drawings are scattered across devices",
    body: "Nobody knows which drawing is the latest — until the wrong one gets built.",
  },
];

// --- How it works (Homepage §4) ---
export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Add your sites",
    body: "Create a Site Hub for every project in minutes — progress, budget, timeline, and health in one place.",
  },
  {
    step: "02",
    title: "Bring in your team",
    body: "Invite directors, engineers, accountants, and subcontractors with the right role-based access.",
  },
  {
    step: "03",
    title: "Run everything from one dashboard",
    body: "See money, approvals, documents, and what needs your attention — in real time, from any device.",
  },
];

// --- The 9 product pillars (Features page + curated homepage cards) ---
// icon = lucide-react icon name
export const PILLARS = [
  {
    id: "sites",
    icon: "LayoutGrid",
    eyebrow: "Site Management",
    headline: "See every project clearly",
    summary:
      "Manage every construction site from one place, with a dedicated command center per project.",
    features: [
      "Multiple sites managed from a single workspace",
      "Site Hub — a dedicated command center per project",
      "Progress tracking, timelines, and completion tracking",
      "Site health score (0–100): Excellent, Good, Needs Attention, Critical",
      "Activity timeline merging photos, updates, documents, and expenses",
    ],
  },
  {
    id: "financial",
    icon: "Wallet",
    eyebrow: "Financial Management",
    headline: "Know where your money is",
    summary:
      "Live expense, payment, and receivables visibility — in ₹ Lakh and Crore formatting your team already uses.",
    features: [
      "Expense management and payment tracking",
      "Outstanding receivables visibility",
      "Budget visibility: contract vs. spent vs. remaining",
      "Indian-formatted currency (₹45K / ₹2.5L / ₹1.25Cr)",
      "Collection efficiency and expense velocity insights",
    ],
  },
  {
    id: "workforce",
    icon: "Users",
    eyebrow: "Workforce Management",
    headline: "Keep your team accountable",
    summary:
      "Role-aware people management — from directors to subcontractors — with payroll and payslips built in.",
    features: [
      "Members with role-based permissions (Director, PM, Accountant, Engineer, Supervisor, Vendor, Sub-Contractor)",
      "Subcontractor management — assignments, payments, utilization",
      "Salary requests, payroll, and payslips",
    ],
  },
  {
    id: "documents",
    icon: "FolderLock",
    eyebrow: "Document Management",
    headline: "One source of truth for every file",
    summary:
      "Centralized, versioned, approvable documents — so the right drawing is always the latest one.",
    features: [
      "Centralized documents with site-level organization",
      "Document approvals and version visibility",
      "Filter by site, category, status, and tag",
    ],
  },
  {
    id: "approvals",
    icon: "BellRing",
    eyebrow: "Approvals & Notifications",
    headline: "Decisions, not delays",
    summary:
      "Structured approval workflows and a live notification center so nothing waits on a phone call.",
    features: [
      "Approval workflows for expenses, payments, documents, photos, progress",
      "Pending approvals dashboard",
      "Live notification center with priority sorting and one-tap actions",
    ],
  },
  {
    id: "executive",
    icon: "LineChart",
    eyebrow: "Executive Intelligence",
    headline: "Run the business, not the spreadsheet",
    summary:
      "Owner-grade dashboards that surface what needs attention before it becomes a problem.",
    features: [
      "KPIs: expenses, payments received, active sites, pending approvals, members",
      "Expense distribution and payments-vs-expenses trends",
      "Attention Required + Upcoming Actions (Today / This Week)",
      "Collection efficiency, expense velocity, approval turnaround",
      "System health and workspace adoption",
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    eyebrow: "Mobile Workforce",
    headline: "Run the site from your pocket",
    summary:
      "An installable app your field team will actually use — even with no signal.",
    features: [
      "Mobile-friendly with bottom navigation and quick actions",
      "Offline queue — capture work with no signal; auto-syncs when back online",
      "Camera-first workflows — open the camera directly, compress before upload",
      "Installable PWA — add to home screen, standalone app feel",
    ],
  },
  {
    id: "security",
    icon: "ShieldCheck",
    eyebrow: "Enterprise & Security",
    headline: "Enterprise-ready from day one",
    summary:
      "Strict tenant isolation, audit logging, and a security center — simple enough for a 3-site firm.",
    features: [
      "Tenant isolation — strict per-company data separation",
      "White-label readiness, subscription tiers, feature flags",
      "Audit logging with a filterable viewer and CSV export",
      "Security Center — MFA adoption, dormant users, active sessions, failed logins",
      "Session management, security policies, SSO readiness (Google Workspace, Microsoft Entra ID)",
    ],
  },
  {
    id: "revenue",
    icon: "CreditCard",
    eyebrow: "Revenue Infrastructure",
    headline: "Start free, upgrade when you grow",
    summary:
      "A billing foundation with a 14-day trial, frictionless upgrades, and enterprise sales readiness.",
    features: [
      "Billing foundation with 14-day trial support",
      "Self-serve upgrade flows",
      "Enterprise sales readiness (Contact Sales)",
    ],
  },
];

// --- Curated homepage feature cards (Homepage §5) ---
export const HOME_FEATURES = [
  {
    icon: "LayoutGrid",
    title: "Multi-site management",
    body: "Every project, one place — progress, budget, and health at a glance.",
  },
  {
    icon: "Wallet",
    title: "Financial dashboards",
    body: "Know where your money is — expenses, payments, and receivables, live.",
  },
  {
    icon: "BellRing",
    title: "Approvals & notifications",
    body: "Decisions, not delays — structured workflows with one-tap actions.",
  },
  {
    icon: "FolderLock",
    title: "Document control",
    body: "One source of truth for every file — centralized and versioned.",
  },
  {
    icon: "Users",
    title: "Workforce & payroll",
    body: "Keep your team accountable — roles, subcontractors, and payslips.",
  },
  {
    icon: "LineChart",
    title: "Executive intelligence",
    body: "See what needs your attention — before it becomes a problem.",
  },
];

// --- What BuildAlly replaces (Homepage §6 positioning) ---
export const REPLACES = [
  { from: "WhatsApp coordination", to: "Structured, searchable, accountable site operations" },
  { from: "Excel trackers", to: "Live financial dashboards" },
  { from: "Paper-based approvals", to: "Digital approval workflows" },
  { from: "Manual follow-ups", to: "Automatic visibility into what needs attention" },
  { from: "Scattered document storage", to: "One centralized, versioned library" },
];

// --- Mobile experience bullets (Homepage §8) ---
export const MOBILE_POINTS = [
  "Install like an app — add to your home screen",
  "Capture photos and progress directly on site",
  "Works offline — syncs automatically when you're back online",
  "Quick actions and a bottom nav built for one-handed use",
];

// --- Why owners love it (Homepage §9) ---
export const OWNER_OUTCOMES = [
  {
    stat: "Real-time",
    title: "Visibility",
    body: "See every site, rupee, and approval as it happens — not weeks later in a report.",
  },
  {
    stat: "End-to-end",
    title: "Accountability",
    body: "Roles, approvals, and audit trails mean every action has an owner.",
  },
  {
    stat: "Faster",
    title: "Decisions",
    body: "The platform surfaces what matters, so you act before small issues become expensive ones.",
  },
];

// --- Pricing (Pricing page + homepage preview) ---
// NOTE: Pricing is a DRAFT — confirm final public pricing with the BuildAlly team.
export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    cadence: "forever",
    blurb: "For trying it out and very small firms.",
    cta: { label: "Start Free Trial", kind: "primary" },
    highlights: [
      "Up to 3 sites",
      "Up to 5 members",
      "Site Hub & progress tracking",
      "Basic financial reports",
      "Mobile app with offline capture",
    ],
    featured: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: "₹2,499",
    cadence: "per month",
    priceNote: "Placeholder — confirm",
    blurb: "For growing builders who need accountability at scale.",
    cta: { label: "Start Free Trial", kind: "primary" },
    highlights: [
      "Unlimited sites & members",
      "Advanced financial dashboards",
      "Approval workflows & notifications",
      "Activity timeline & document control",
      "Subcontractor management & payroll",
      "14-day free trial — no card required",
    ],
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "contact sales",
    blurb: "For 100+ employees with procurement and security needs.",
    cta: { label: "Book a Demo", kind: "secondary" },
    highlights: [
      "Everything in Professional",
      "Custom branding & white-label",
      "Audit logs & Security Center",
      "SSO readiness (Google, Microsoft Entra)",
      "Tenant isolation & data export",
      "Priority support",
    ],
    featured: false,
  },
];

// --- Full pricing comparison matrix ---
export const PRICING_MATRIX = {
  groups: [
    {
      name: "Sites & team",
      rows: [
        { label: "Active sites", free: "3", pro: "Unlimited", enterprise: "Unlimited" },
        { label: "Team members", free: "5", pro: "Unlimited", enterprise: "Unlimited" },
        { label: "Subcontractor management", free: false, pro: true, enterprise: true },
      ],
    },
    {
      name: "Financials",
      rows: [
        { label: "Expense & payment tracking", free: true, pro: true, enterprise: true },
        { label: "Outstanding receivables", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
        { label: "Budget vs. spend dashboards", free: false, pro: true, enterprise: true },
        { label: "Payroll & payslips", free: false, pro: true, enterprise: true },
      ],
    },
    {
      name: "Operations",
      rows: [
        { label: "Approval workflows", free: "Basic", pro: true, enterprise: true },
        { label: "Notification center", free: true, pro: true, enterprise: true },
        { label: "Document control & versioning", free: "Basic", pro: true, enterprise: true },
        { label: "Activity timeline", free: false, pro: true, enterprise: true },
      ],
    },
    {
      name: "Enterprise & security",
      rows: [
        { label: "Role-based access control", free: true, pro: true, enterprise: true },
        { label: "Audit logging & CSV export", free: false, pro: false, enterprise: true },
        { label: "Security Center", free: false, pro: false, enterprise: true },
        { label: "SSO readiness", free: false, pro: false, enterprise: true },
        { label: "Custom branding / white-label", free: false, pro: false, enterprise: true },
        { label: "Priority support", free: false, pro: "Standard", enterprise: true },
      ],
    },
  ],
};

// --- FAQ (Homepage §11 + FAQ page) ---
export const FAQS = [
  {
    q: "Is BuildAlly built for Indian construction?",
    a: "Yes. BuildAlly is built for how Indian builders actually work — ₹ Lakh and Crore currency formatting, mobile-first field workflows, receivables and collection tracking, subcontractor and payroll management, and pricing for the market. It speaks the language of your sites, not generic project management.",
  },
  {
    q: "Will my field team actually use it?",
    a: "That's the design goal. BuildAlly is mobile-first and WhatsApp-simple: a bottom navigation bar, quick actions, and camera-first capture. Supervisors snap a photo or log an expense in seconds — no training manual required.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. BuildAlly is an installable app with an offline queue. Your team can capture photos, progress, and expenses on site with no signal, and everything syncs automatically the moment they're back online.",
  },
  {
    q: "How secure is my data?",
    a: "BuildAlly is enterprise-grade under the hood: strict tenant isolation keeps every company's data separated, with audit logging, session management, a Security Center, and SSO readiness (Google Workspace and Microsoft Entra ID). Your data stays yours.",
  },
  {
    q: "Can I start for free?",
    a: "Yes. There's a Free plan forever (up to 3 sites and 5 members) and a 14-day free trial on paid plans — no credit card required. Start with one site in minutes and bring in your team as you go.",
  },
  {
    q: "How long does setup take?",
    a: "Minutes, not weeks. Create your first Site Hub, invite your team, and start capturing work. There's nothing to install on a server, and free-tier limits never delete data — they simply prompt an upgrade when you outgrow them.",
  },
  {
    q: "Can I manage subcontractors and payroll?",
    a: "Yes. Assign subcontractors to sites, track their payments and utilization, and run salary requests, payroll, and payslips — all from the same workspace, with role-based permissions.",
  },
  {
    q: "Can I manage multiple sites?",
    a: "Absolutely — that's the core of BuildAlly. Every project gets its own Site Hub with progress, budget, timeline, and a health score, and owners get a portfolio-wide executive dashboard across all of them in real time.",
  },
];

// --- Trust signals (real, never fabricated) ---
export const TRUST_SIGNALS = [
  { icon: "ShieldCheck", label: "Bank-grade security" },
  { icon: "HardHat", label: "Built for construction" },
  { icon: "Smartphone", label: "Works on every device" },
  { icon: "WifiOff", label: "Works offline" },
];

// --- Objection handling (Features / FAQ supporting copy) ---
export const OBJECTIONS = [
  {
    objection: "My team won't use new software.",
    answer: "Mobile-first and WhatsApp-simple. Quick actions, camera capture, and it works offline.",
  },
  {
    objection: "We're too small for this.",
    answer: "Start free with one site in minutes. The Free plan is built for small firms.",
  },
  {
    objection: "Switching sounds painful.",
    answer: "Start free, no card required. Import as you go, with guided onboarding.",
  },
  {
    objection: "Is our data safe?",
    answer: "Tenant isolation, audit logs, session control, and a security center — by default.",
  },
  {
    objection: "It'll be too expensive.",
    answer: "Free to start. It pays for itself by preventing one missed collection or rework.",
  },
];
