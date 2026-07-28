// Marketing content derived from WEBSITE_CONTEXT.md (single source of truth).
// Benefit-led: every feature is paired with the outcome it delivers.

import { PRICING, formatPrice, annualSavings, getPlan, priceFor } from "./pricing";

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

// --- How it works (4-step workspace flow) ---
export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "Building2",
    title: "Create your company workspace",
    body: "Set up a secure, multi-tenant workspace for your business in minutes — verified by email, isolated from every other company.",
  },
  {
    step: "02",
    icon: "UserPlus",
    title: "Invite your team",
    body: "Bring in directors, admins, PMs, engineers, finance, and HR through secure invite links — each with the right role-based access.",
  },
  {
    step: "03",
    icon: "ClipboardList",
    title: "Manage projects and operations",
    body: "Run sites, expenses, payroll, documents, and approvals from one place — on desktop and in the field.",
  },
  {
    step: "04",
    icon: "Eye",
    title: "Gain complete visibility",
    body: "Leadership sees everything in real time — what's on track, what needs attention, and where the money is.",
  },
];

// --- Built for every role (RoleBased section) ---
export const ROLES = [
  {
    icon: "Crown",
    role: "Directors",
    body: "Real-time visibility across every site, rupee, and approval — make faster decisions without chasing updates.",
  },
  {
    icon: "ShieldCheck",
    role: "Admins",
    body: "Manage the workspace, roles, and access with confidence — invite teams and keep everything organised and secure.",
  },
  {
    icon: "HardHat",
    role: "Project Managers",
    body: "Run sites end to end — progress, timelines, documents, and approvals — from the office or the field.",
  },
  {
    icon: "Wrench",
    role: "Engineers",
    body: "Capture site progress and photos, raise expenses, and access the latest drawings — even offline.",
  },
  {
    icon: "Wallet",
    role: "Finance Teams",
    body: "Track expenses, payments, and receivables, run approvals, and close the books without the spreadsheet chaos.",
  },
  {
    icon: "Users",
    role: "HR Teams",
    body: "Manage members, salary requests, payroll, and payslips with clear, role-aware workflows.",
  },
];

// --- What you get from a personalized demo ---
export const DEMO_HIGHLIGHTS = [
  { icon: "MonitorPlay", title: "Tailored to your workflows", body: "We map the Site Hub, dashboards, and approvals to how your team actually runs projects." },
  { icon: "MessageSquare", title: "Straight answers", body: "Bring your questions on rollout, security, pricing, and migrating off WhatsApp and Excel." },
  { icon: "Rocket", title: "A clear path to start", body: "Leave with a concrete plan to get your first sites and team onto BuildAlly." },
];

// --- How BuildAlly works (4-step "How it works") ---
export const EARLY_ACCESS_POINTS = [
  { icon: "Handshake", title: "Work directly with our team", body: "Get hands-on onboarding and a direct line to the people building BuildAlly." },
  { icon: "MessageSquarePlus", title: "Shape the roadmap", body: "Your workflows and feedback directly influence what we build next." },
  { icon: "Rocket", title: "Early-mover advantage", body: "Get your business onto modern construction software ahead of the curve." },
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
    eyebrow: "Onboarding & Access",
    headline: "Start with a demo, scale when you're ready",
    summary:
      "Email verification, invite-based onboarding, a 7-day trial, pilot accounts, and read-only suspension — set up to grow with you.",
    features: [
      "Email verification and invite-based onboarding",
      "7-day trial and pilot accounts",
      "Read-only suspension keeps your data safe if a subscription lapses",
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

// --- FAQ (Homepage + FAQ page) ---
export const FAQS = [
  {
    q: "Can I see BuildAlly before purchasing?",
    a: "Yes. Book a personalized demo and our team will walk you through BuildAlly with your workflows in mind. When you're ready, a 7-day trial lets you evaluate it with your own team on real sites.",
  },
  {
    q: "Can I invite my team members?",
    a: "Yes. Team members can securely join through invitation links, each with the right role-based access — directors, admins, project managers, engineers, finance, and HR.",
  },
  {
    q: "What happens if my subscription expires?",
    a: "You retain read-only access to your workspace. Your data is never deleted — you can view everything and simply reactivate to start editing again.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Every company gets an isolated workspace, with nine roles and 60+ permissions enforced server-side on every request — not just hidden in the interface. Location and permission changes are written to an append-only audit log, and attendance selfies are encrypted at rest.",
  },
  {
    q: "Is BuildAlly mobile friendly?",
    a: "Yes. BuildAlly is a progressive web app your team installs straight from the browser — no app store. It uses the native camera and GPS for attendance and verified photos, and queues work offline so nothing is lost when signal drops on site.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel whenever you like and you keep access for the rest of the period you've paid for. After that your workspace turns read-only — your data is never deleted.",
  },
  {
    q: "Can BuildAlly work for smaller contractors?",
    a: "Yes. BuildAlly is designed for growing construction businesses — start small and scale up as your team and number of sites grow.",
  },
  {
    q: "Will my field team actually use it?",
    a: "That's the design goal. BuildAlly is mobile-first and WhatsApp-simple: a bottom navigation bar, quick actions, and camera-first capture that works offline and syncs automatically when back online.",
  },
  {
    q: "Can I manage subcontractors and payroll?",
    a: "Yes. Assign subcontractors to sites, track their payments and utilization, and run salary requests, payroll, and payslips — all from the same workspace, with role-based permissions.",
  },
];

// --- Plan, trial & storage FAQ (Pricing page + FAQ page) ---
// Every figure is derived from lib/pricing so the answers can never drift from
// the plan cards.
export const PLAN_FAQS = [
  {
    q: "Why is the trial paid?",
    a: `The ${formatPrice(
      PRICING.trialCredit,
    )} is not an extra charge — it is fully adjusted against your subscription if you continue with BuildAlly. A paid trial keeps evaluations serious while letting you run BuildAlly on real projects for ${
      PRICING.trialDays
    } days.`,
  },
  {
    q: "What happens after my trial ends?",
    a: "Your workspace becomes read-only. Everything you added stays exactly where it is — nothing is deleted. Choose a plan whenever you're ready and you pick up right where you left off.",
  },
  {
    q: `Will my ${formatPrice(PRICING.trialCredit)} be adjusted?`,
    a: `Yes. The full ${formatPrice(
      PRICING.trialCredit,
    )} is deducted from your first subscription payment, on either a monthly or an annual plan.`,
  },
  {
    q: "Can I upgrade during my trial?",
    a: `Yes, you can upgrade at any point during the ${
      PRICING.trialDays
    } days. The ${formatPrice(
      PRICING.trialCredit,
    )} is automatically adjusted against your first payment.`,
  },
  {
    q: "Can I increase my storage?",
    a: "Yes — moving up a plan raises your quota (2 GB on Trial, 25 GB on Interior, 75 GB on Builder). If you reach the limit, uploads pause until you upgrade or remove unused files. Nothing already in your workspace is deleted, and images are optimised on upload so the quota goes further than you'd expect.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. Move up a plan at any time without losing any data — your sites, documents, and history carry over untouched.",
  },
  {
    q: "Is this a limited-period offer?",
    a: `Yes. Interior at ${formatPrice(
      priceFor(getPlan("interior"), "monthly").price,
    )}/month and Builder at ${formatPrice(
      priceFor(getPlan("builder"), "monthly").price,
    )}/month are launch pricing on our standard rates of ${formatPrice(
      priceFor(getPlan("interior"), "monthly").originalPrice,
    )} and ${formatPrice(
      priceFor(getPlan("builder"), "monthly").originalPrice,
    )} a month. Lock it in while it lasts — your rate stays the same for as long as your subscription is active.`,
  },
  {
    q: "What's the difference between monthly and annual billing?",
    a: `It's the same plan either way — annual is simply billed once at a lower effective rate. Interior saves ${formatPrice(
      annualSavings(getPlan("interior")).amount,
    )} a year and Builder saves ${formatPrice(
      annualSavings(getPlan("builder")).amount,
    )} a year compared with paying monthly.`,
  },
  {
    q: "Do you offer custom plans for larger teams?",
    a: "Enterprise is coming soon — unlimited sites and storage, a dedicated account manager, custom integrations, and onboarding assistance. Talk to sales and we'll shape a plan around your rollout.",
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
    answer: "BuildAlly is built for growing construction businesses. Book a quick walkthrough and see it work at your scale.",
  },
  {
    objection: "Switching sounds painful.",
    answer: "Invite your team through secure links and onboard with our team's help. Book a demo first — no commitment.",
  },
  {
    objection: "Is our data safe?",
    answer: "Tenant isolation, role-based access, modern authentication, and encrypted infrastructure — by default.",
  },
  {
    objection: "What if my subscription lapses?",
    answer: "You keep read-only access to your workspace and your data is never deleted. Reactivate anytime.",
  },
];
