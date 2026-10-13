// Lightweight, provider-agnostic conversion tracking.
//
// We track CTA clicks, pricing-page engagement and Enterprise enquiries, using
// the existing PostHog integration "if available". This marketing site has no
// analytics provider yet, so this util fires into PostHog ONLY if it has been
// loaded on the page (e.g. via a snippet added later). Until then it no-ops —
// no new analytics provider is introduced.
//
// Never pass personal data (names, emails, phone numbers, company names, free
// text) as event props — only locations, plan ids, billing periods and coarse
// buckets.
//
// To activate later: load PostHog (window.posthog) and these events flow
// automatically. Optionally also forwards to a dataLayer (GTM) if present.

export const EVENTS = {
  BOOK_DEMO: "book_demo_click",
  CONTACT_SALES: "contact_sales_click",
  START_TRIAL: "start_trial_click",
  EXPLORE_PLANS: "explore_plans_click",
  GET_ANDROID_APP: "google_play_click",
  PRICING_VIEW: "pricing_page_view",
  BILLING_CYCLE_CHANGE: "billing_cycle_change",
  PLAN_CTA: "plan_cta_click",
  ENTERPRISE_CTA: "enterprise_cta_click",
  ENTERPRISE_ENQUIRY_SUBMITTED: "enterprise_enquiry_submitted",
};

// A coarse bucket for a site count, so analytics can segment Enterprise
// interest without recording the exact figure a visitor typed.
export function siteBand(sites) {
  const n = Number(sites);
  if (!Number.isFinite(n) || n < 1) return "unknown";
  if (n <= 25) return "1-25";
  if (n <= 50) return "26-50";
  if (n <= 100) return "51-100";
  return "100+";
}

export function track(event, props = {}) {
  if (typeof window === "undefined") return;
  try {
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(event, props);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
  } catch {
    // Never let analytics break a navigation.
  }
}
