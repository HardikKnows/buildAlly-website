// BuildAlly AI, role-based experience, and construction-lifecycle content.
//
// RULES (same as lib/product.js):
//  1. Only capabilities that exist in the product today are described here.
//  2. AI is part of the BuildAlly subscription — never a separate add-on, never
//     a separate price. Fair-use is mentioned, quietly.
//  3. AI assists and recommends; important changes go through BuildAlly's
//     permission and confirmation system. Never describe AI as autonomous.

// --- What BuildAlly AI can do (AI section checklist) ---
export const AI_CAPABILITIES = [
  {
    icon: "MessageSquareText",
    title: "Answers from your real data",
    body: "Ask about any site — progress, delays, expenses, materials — and get answers grounded in your actual BuildAlly data.",
  },
  {
    icon: "SearchCheck",
    title: "Explains what's behind a problem",
    body: "When a site slips, BuildAlly AI lays out the evidence — incomplete work, slower progress, delayed materials — so you see why, not just what.",
  },
  {
    icon: "Lightbulb",
    title: "Identifies what needs attention",
    body: "Summaries of construction activity and site health that surface the items worth your time today.",
  },
  {
    icon: "ClipboardCheck",
    title: "Prepares actions and workflows",
    body: "From a follow-up task to a multi-step action plan — the AI collects the required information and attachments, then hands it to you for review.",
  },
];

// --- The Ask → Execute progression ---
export const AI_FLOW = ["Ask", "Understand", "Analyze", "Recommend", "Review", "Execute"];

// --- Example conversation (AI chat mockup) ---
// An illustrative exchange in the product's voice: evidence-led, no overclaiming.
export const AI_CONVERSATION = {
  user: "Why is Green Heights behind schedule?",
  intro: "Green Heights is currently showing schedule risk. The main evidence is:",
  evidence: [
    "Foundation work remains incomplete.",
    "The latest progress data indicates slower completion.",
    "Steel delivery has been delayed.",
  ],
  conclusion:
    "The available evidence suggests the material delay may be contributing to the schedule risk.",
  followUp: "Would you like me to prepare a follow-up action plan?",
  action: "Review Action Plan",
  confirmNote: "Actions run only after you review and confirm them.",
};

// --- Proactive intelligence alerts ---
export const AI_ALERTS = [
  { tone: "destructive", title: "Steel delivery delayed", meta: "Green Heights · Materials" },
  { tone: "warning", title: "Foundation milestone at risk", meta: "Green Heights · Schedule" },
  { tone: "amber", title: "Follow-up task overdue", meta: "Skyline Towers · Operations" },
];

// --- AI trust message (prominent) ---
export const AI_TRUST = {
  title: "AI that assists. You stay in control.",
  body: "BuildAlly AI can analyze your construction data, recommend actions and prepare workflows. Important changes still go through BuildAlly's permission and confirmation system.",
  points: [
    {
      icon: "UserCheck",
      title: "Your confirmation, always",
      body: "AI does not make important changes on its own — it prepares them for your review.",
    },
    {
      icon: "ShieldCheck",
      title: "The schedule stays protected",
      body: "AI works through approved operational actions; construction schedule changes remain protected.",
    },
    {
      icon: "Lock",
      title: "Permissions still apply",
      body: "AI respects the same role-based access and auditability as everything else in BuildAlly.",
    },
  ],
  includedNote:
    "AI-powered construction intelligence is included with your BuildAlly subscription — subject to fair-use limits.",
};

// --- Role-based experience: "One Platform. Different Roles." ---
export const ROLE_EXPERIENCE = [
  {
    icon: "Crown",
    role: "Director",
    promise: "See the whole business.",
    points: [
      "Every site and its health",
      "Financial oversight and approvals",
      "Construction intelligence and AI workflows",
      "Team and access management",
    ],
  },
  {
    icon: "HardHat",
    role: "Project Manager",
    promise: "Manage the work.",
    points: [
      "Assigned sites and tasks",
      "Expenses and progress",
      "Team coordination",
      "Operational follow-ups",
    ],
  },
  {
    icon: "Wrench",
    role: "Site Engineer",
    promise: "Know what to do.",
    points: [
      "A simple My Work list",
      "Assigned tasks and site information",
      "Photo-first daily workflows",
      "A mobile-first interface",
    ],
  },
  {
    icon: "KeyRound",
    role: "Key Holder / Client",
    promise: "Stay connected to your site.",
    points: [
      "Site progress and updates",
      "Relevant documents",
      "Complaints and communication",
      "Only their own project — nothing else",
    ],
  },
];

// Field-team design points shown beside the My Work phone mockup.
export const FIELD_POINTS = [
  { icon: "Smartphone", label: "Large touch targets" },
  { icon: "ListChecks", label: "Simple task execution" },
  { icon: "Camera", label: "Photo-first workflows" },
];

// --- Construction lifecycle story ---
export const LIFECYCLE = [
  {
    icon: "FileText",
    title: "Before the project",
    lead: "Win the work before the site exists in BuildAlly.",
    steps: ["Agreement", "Quotation", "Client", "Site"],
  },
  {
    icon: "HardHat",
    title: "During construction",
    lead: "Run the build from one platform.",
    steps: ["Construction Schedule", "Teams", "Expenses", "Documents", "Progress", "Approvals"],
  },
  {
    icon: "Sparkles",
    title: "AI throughout",
    lead: "Construction intelligence at every stage.",
    steps: ["Understand", "Analyze", "Recommend", "Review", "Act"],
  },
];

// Agreement + Quotation generators (Director tools, professional PDF output).
export const DOC_GENERATORS = [
  {
    icon: "PenLine",
    title: "Agreement Creator",
    body: "Draft professional construction agreements directly from BuildAlly — ready to share as a polished PDF.",
  },
  {
    icon: "IndianRupee",
    title: "Quotation Generator",
    body: "Build client quotations from the same platform, before the project even exists as a site.",
  },
];

// --- Task system: construction schedule vs operational work ---
export const TASK_SPLIT = [
  {
    icon: "CalendarRange",
    title: "Construction Schedule",
    body: "The backbone of the project — protected from day-to-day noise.",
    points: ["Milestones", "Calculated dates", "Dependencies", "Progress tracking", "Schedule health"],
  },
  {
    icon: "ClipboardList",
    title: "Operational Work",
    body: "The daily coordination that keeps a site moving.",
    points: ["Follow-ups", "Assignments", "Inspections", "Coordination", "Day-to-day tasks"],
  },
];

export const TASK_SPLIT_NOTE =
  "Keeping them separate means operational assignments never distort your construction schedule — milestones and calculated dates stay trustworthy.";
