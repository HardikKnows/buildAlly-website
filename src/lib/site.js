// Central site configuration — URLs, CTAs, navigation, contact.
// Keep all external destinations here so CTAs stay consistent site-wide.

export const SITE = {
  name: "BuildAlly",
  domain: "https://buildally.in",
  tagline: "Construction management software built for modern builders.",
  description:
    "BuildAlly is construction management software for builders and interior designers. Manage projects, GPS attendance, salaries, treasury, expenses, documents and site progress from one platform — built for Indian construction companies.",
};

// Trial signup and login live in the app, not the marketing site.
// Demos are scheduled with our team via /book-demo (no public/anonymous demo).
export const URLS = {
  app: "https://app.buildally.in",
  signup: "https://app.buildally.in", // self-serve 7-day paid trial (tertiary CTA)
  login: "https://app.buildally.in",
  api: "https://api.buildally.in",
  bookDemo: "/book-demo", // demo request form — primary CTA
  contactSales: "/contact",
};

// Reassurance microcopy shown near the primary (Start Trial) CTA.
export const CTA_MICROCOPY =
  "₹999 for 7 days on your real sites · Fully credited towards your subscription.";

// Contact email lives in @/lib/email — one official address for the whole
// product. Import SUPPORT_EMAIL / supportMailto from there, not from here.

export const MAIN_NAV = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/faq" },
];

export const FOOTER_NAV = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Mobile", href: "/#mobile" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Delete Account", href: "/delete-account" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Support", href: "/contact" },
      { label: "Start 7-Day Trial", href: URLS.signup, external: true },
      { label: "Login", href: URLS.login, external: true },
    ],
  },
];
