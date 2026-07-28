// Product content for the marketing site, derived from
// docs/marketing-feature-inventory.md (the single source of truth).
//
// RULES:
//  1. Only features marked "Implemented" in the inventory appear here. Anything
//     planned lives in PLANNED and must be labelled as such on the page.
//  2. Every screenshot is the real application UI from docs/marketing-assets,
//     copied into /public/product. No mockups, no stock art.
//  3. Super Admin is internal-only — no Super Admin feature, copy, or screenshot
//     may ever appear on the marketing site.
//
// Visual weight follows a three-tier hierarchy so the strongest differentiators
// lead the page:
//   Tier 1 — full-width sections with a screenshot (hero features)
//   Tier 2 — cards in a grid (major features)
//   Tier 3 — a compact list (supporting capabilities)

const DESKTOP = { width: 3200, height: 2000 };
const MOBILE = { width: 1242, height: 2688 };

function shot(name, alt, size = DESKTOP) {
  return { src: `/product/${name}.png`, alt, ...size };
}

// --- Trust indicators (immediately below the hero) ---
export const TRUST_INDICATORS = [
  { icon: "ShieldCheck", label: "Secure cloud platform" },
  { icon: "Building2", label: "Multi-tenant SaaS" },
  { icon: "MapPin", label: "GPS attendance" },
  { icon: "Lock", label: "Role-based access" },
  { icon: "Smartphone", label: "Mobile friendly" },
  { icon: "ChartNoAxesColumn", label: "Real-time reporting" },
  { icon: "CloudUpload", label: "Cloud storage" },
];

// --- Tier 1: hero features. Full-width alternating rows with a screenshot. ---
export const TIER1_FEATURES = [
  {
    id: "sites",
    eyebrow: "Project & Site Management",
    title: "Every site, and what it needs from you today",
    body: "Run all your projects from one workspace, each with its own Site Hub — progress, timeline, budget, documents, attendance and photos in one place.",
    points: [
      "Site dashboard and project tracking",
      "Active sites with a live progress ring",
      "Site timeline and daily operations",
      "Health score that flags sites needing attention",
    ],
    image: shot("sites-list", "BuildAlly sites list showing active construction projects with progress and budget"),
  },
  {
    id: "attendance",
    eyebrow: "Attendance Management",
    title: "Your team checks in from the site — and you can prove it",
    body: "Every check-in stores the location, the distance from the site centre and the GPS accuracy of the fix. Attendance history feeds straight into payroll.",
    points: [
      "GPS-verified check-in and check-out",
      "Optional selfie capture, enforced server-side",
      "Site roster, member calendar and monthly summary",
      "Auto-checkout for forgotten check-ins",
    ],
    image: shot("attendance-dashboard", "BuildAlly attendance dashboard showing daily check-ins across sites"),
  },
  {
    id: "salary",
    eyebrow: "Salary & Payroll",
    title: "Payroll that comes from attendance, not memory",
    body: "The people who know the work raise it, the people who own the money approve it, and the numbers come from real attendance records.",
    points: [
      "Estimated salary from actual attendance",
      "Salary requests with approval workflow",
      "Payroll runs and branded payslips",
      "Salary reports and exports",
    ],
    image: shot("salary-management", "BuildAlly salary management screen with monthly payroll and approvals"),
  },
  {
    id: "treasury",
    eyebrow: "Company Treasury",
    title: "Company money, separate from site money",
    body: "Most construction software tracks project money and stops there. BuildAlly shows your actual working capital — not the sum of six project balances.",
    points: [
      "Treasury dashboard: balance, received, spent, pending",
      "Inflows, company running costs and full ledger",
      "Two-way transfers between treasury and sites",
      "Director-only access, enforced server-side",
    ],
    image: shot("treasury-dashboard", "BuildAlly company treasury dashboard showing balance and transaction ledger"),
  },
  {
    id: "expenses",
    eyebrow: "Expense Management",
    title: "Costs captured the day they happen",
    body: "Site spend is raised by the people on the ground and approved by the people who own the budget — not reconstructed from receipts at month end.",
    points: [
      "Six fixed categories across every site",
      "Raise, approve or reject with notifications",
      "Approval threshold escalates to the Director",
      "Expense distribution and payments-vs-expenses trends",
    ],
    image: shot("expense-management", "BuildAlly expense management screen with categorised site spend and approvals"),
  },
];

// --- GPS verification: the flagship differentiator, its own emphasised block ---
export const GPS_FEATURES = [
  {
    icon: "LocateFixed",
    title: "Geofencing",
    body: "Draw a circle around your site. Attendance only counts from inside it — the rule is set once per site and enforced by the server on every single check-in.",
    points: [
      "Radius configurable from 20 m to 5,000 m",
      "GPS accuracy limit from 5 m to 100 m",
      "Set coordinates by GPS, map pin or entry",
      "Every change written to an audit log",
    ],
    image: shot("site-overview", "BuildAlly site overview showing geofence configuration and site coordinates"),
  },
  {
    icon: "Camera",
    title: "Geotagging",
    body: "Site photos that can't be faked — taken live through the app's camera, then stamped server-side with the site, the engineer, the time and the GPS position.",
    points: [
      "Camera-only capture, never the camera roll",
      "Location verified before the photo is taken",
      "Watermark resolved server-side, not by the client",
      "Approval workflow and retention policy",
    ],
    image: shot("site-gallery", "BuildAlly site gallery of GPS-verified, watermarked construction site photos"),
  },
];

// --- Tier 2: major features. Cards in a grid, each with a screenshot. ---
export const TIER2_FEATURES = [
  {
    icon: "ChartNoAxesColumn",
    title: "Reports & Analytics",
    body: "Attendance, salary, expense, treasury and site reports — exported to PDF and Excel under your own branding.",
    image: shot("reports-dashboard", "BuildAlly reports dashboard with attendance, salary and expense exports"),
  },
  {
    icon: "FolderLock",
    title: "Document Management",
    body: "Drawings, agreements, BOQs and invoices in seven folders, with version history and an approval workflow.",
    image: shot("document-centre", "BuildAlly document centre with drawings, agreements and version history"),
  },
  {
    icon: "ListChecks",
    title: "Task Management",
    body: "Assign, track and approve site tasks — with completion requests that feed milestone progress.",
    image: shot("task-management", "BuildAlly task management board with assigned site tasks"),
  },
  {
    icon: "Users",
    title: "Team Management",
    body: "Members, roles, departments and permissions across nine roles — including a client-facing Key Holder portal.",
    image: shot("member-management", "BuildAlly member management screen showing team roles and permissions"),
  },
  {
    icon: "Images",
    title: "Site Gallery",
    body: "A verified photo library per site — searchable field evidence of progress, not a shared drive.",
    image: shot("site-photo-library", "BuildAlly site photo library of verified construction progress photos"),
  },
  {
    icon: "CircleCheckBig",
    title: "Approvals",
    body: "Expenses, payments, salary, materials, tasks, documents and photos — all with a configurable escalation threshold.",
    image: shot("approval-workflow", "BuildAlly approval workflow screen with pending expense and payment approvals"),
  },
];

// --- Tier 3: supporting capabilities. Compact list, no screenshots. ---
export const TIER3_FEATURES = [
  { icon: "Bell", title: "Notifications", body: "Web push and email across 18 notification types, so approvals never stall." },
  { icon: "Lock", title: "Role-based access", body: "Nine roles and 60+ permissions, enforced server-side on every request." },
  { icon: "Smartphone", title: "Mobile responsive", body: "Install as a PWA from the browser. Native camera and GPS, works offline." },
  { icon: "KeyRound", title: "Flexible authentication", body: "Password, Google SSO, magic links, OTP and remember-this-device." },
  { icon: "UserPlus", title: "Invite members", body: "Secure invite links that land each person in the right role from day one." },
  { icon: "Settings", title: "Company settings", body: "Working week, approval thresholds, selfie policy and geofence defaults." },
];

// --- Mobile experience ---
export const MOBILE_SHOTS = [
  shot("mobile-dashboard", "BuildAlly dashboard on a mobile phone", MOBILE),
  shot("mobile-attendance-marking", "GPS attendance check-in on a mobile phone", MOBILE),
  shot("mobile-site-photos", "Capturing a verified site photo on a mobile phone", MOBILE),
  shot("mobile-site-hub", "The BuildAlly Site Hub on a mobile phone", MOBILE),
];

// --- Why choose BuildAlly ---
export const WHY_BUILDALLY = [
  { icon: "HardHat", title: "Built for construction companies", body: "Sites, subcontractors, attendance and site finance — modelled the way builders actually work." },
  { icon: "Ruler", title: "Built for interior designers", body: "The same platform, sized for fit-out teams running a handful of concurrent projects." },
  { icon: "Cloud", title: "Cloud based", body: "An isolated workspace per company, reachable from any browser, with nothing to install." },
  { icon: "Smartphone", title: "Mobile friendly", body: "A PWA your field team installs from the browser — camera, GPS and offline capture included." },
  { icon: "ShieldCheck", title: "Secure by default", body: "Per-company tenant isolation, server-enforced permissions and an append-only audit log." },
  { icon: "Eye", title: "Real-time visibility", body: "Dashboards that surface what needs attention before it becomes expensive." },
  { icon: "Sparkles", title: "Easy to use", body: "Field screens simple enough that engineers actually record the work." },
  { icon: "TrendingUp", title: "Built to scale", body: "Start on one site and grow to a portfolio without changing how you work." },
];

// --- Customer journey ---
export const JOURNEY = [
  { step: "01", icon: "UserPlus", title: "Register", body: "Create your account with email, Google or a magic link." },
  { step: "02", icon: "Building2", title: "Create company", body: "Set up your isolated workspace and company profile." },
  { step: "03", icon: "Rocket", title: "Start your trial", body: "₹999 for 7 days, credited back against your subscription." },
  { step: "04", icon: "MapPin", title: "Create sites", body: "Add projects and set each site's geofence." },
  { step: "05", icon: "Users", title: "Invite your team", body: "Secure invites with the right role for each person." },
  { step: "06", icon: "ClipboardList", title: "Manage projects", body: "Attendance, expenses, salary, documents and reports." },
  { step: "07", icon: "TrendingUp", title: "Upgrade anytime", body: "Move up a plan without losing any data." },
];

// --- Planned, NOT yet available. Must always be labelled "Coming soon". ---
export const PLANNED = [
  "API access",
  "White-label branding",
  "Custom integrations",
  "Dedicated account manager",
];
