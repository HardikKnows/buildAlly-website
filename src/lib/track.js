// Lightweight, provider-agnostic conversion tracking.
//
// Phase 2 requires tracking Try Demo / Book Demo / Contact Sales clicks, using
// the existing PostHog integration "if available". This marketing site has no
// analytics provider yet, so this util fires into PostHog ONLY if it has been
// loaded on the page (e.g. via a snippet added later). Until then it no-ops —
// no new analytics provider is introduced.
//
// To activate later: load PostHog (window.posthog) and these events flow
// automatically. Optionally also forwards to a dataLayer (GTM) if present.

export const EVENTS = {
  TRY_DEMO: "try_demo_click",
  BOOK_DEMO: "book_demo_click",
  CONTACT_SALES: "contact_sales_click",
  START_TRIAL: "start_trial_click",
};

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
