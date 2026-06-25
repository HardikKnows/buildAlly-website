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
// Demos are scheduled with our team via /book-demo (no public/anonymous demo).
export const URLS = {
  app: "https://app.buildally.in",
  signup: "https://app.buildally.in", // self-serve 7-day trial (tertiary CTA)
  login: "https://app.buildally.in",
  api: "https://api.buildally.in",
  bookDemo: "/book-demo", // demo request form — primary CTA
  contactSales: "/contact",
};

// Reassurance microcopy shown near the primary (Book a Demo) CTA.
export const CTA_MICROCOPY =
  "A personalized walkthrough with our team · See BuildAlly mapped to your workflows.";

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
