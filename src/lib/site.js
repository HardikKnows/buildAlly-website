// Central site configuration — URLs, CTAs, navigation, contact.
// Keep all external destinations here so CTAs stay consistent site-wide.

export const SITE = {
  name: "BuildAlly",
  domain: "https://buildally.in",
  tagline: "Construction management software built for modern builders.",
  description:
    "BuildAlly is the operating system for construction companies. Manage sites, money, teams, and documents in one real-time platform — built for Indian builders.",
};

// Trial signup and login live in the app, not the marketing site.
export const URLS = {
  app: "https://app.buildally.in",
  demo: "https://app.buildally.in/demo", // interactive demo environment (primary CTA)
  signup: "https://app.buildally.in", // self-serve 7-day trial (tertiary CTA)
  login: "https://app.buildally.in",
  api: "https://api.buildally.in",
  bookDemo: "/book-demo",
  contactSales: "/contact",
};

// Reassurance microcopy shown near the primary (Try Demo) CTA.
export const CTA_MICROCOPY =
  "No setup required · Explore realistic demo data · 7-day trial after sign-up.";

export const CONTACT = {
  sales: "sales.buildally@gmail.com",
  support: "support.buildally@gmail.com",
  general: "hardiktiwari895@gmail.com", // admin / general / contact routing
};

export const MAIN_NAV = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export const FOOTER_NAV = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Try Demo", href: URLS.demo, external: true },
      { label: "Book a Demo", href: "/book-demo" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Sales", href: "/contact" },
      { label: "Start Free Trial", href: URLS.signup, external: true },
      { label: "Login", href: URLS.login, external: true },
    ],
  },
];
