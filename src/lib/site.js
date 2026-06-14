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
  signup: "https://app.buildally.in",
  login: "https://app.buildally.in",
  api: "https://api.buildally.in",
  bookDemo: "/book-demo",
};

// Reassurance microcopy shown near primary CTAs.
export const CTA_MICROCOPY =
  "Free plan available · No credit card required · 14-day trial on paid plans.";

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
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Mobile app", href: "/features#mobile" },
      { label: "Security", href: "/features#security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/book-demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Book a demo", href: "/book-demo" },
      { label: "Login", href: URLS.login, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
