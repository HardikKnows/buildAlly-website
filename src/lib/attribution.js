// Referral & campaign attribution passthrough.
//
// Signup lives on a different origin (app.buildally.in), and every outbound CTA
// carries rel="noreferrer" — so the Referer header is stripped and attribution
// can only survive in the query string. This module carries it across.
//
// The app is the one that validates and attributes: `?ref=` is read by its
// signup page (frontend/src/lib/referral.js), normalised, and recorded
// server-side. Nothing here decides anything — it only forwards what arrived.
//
// Only known keys travel. An allowlist keeps a stray query string on a
// marketing URL from being reflected into an outbound link.

export const ATTRIBUTION_PARAMS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

// Where the captured params live for the rest of the visit. Session-scoped:
// a referral is a property of this visit, and the app keeps its own 30-day
// copy once the visitor actually lands on signup.
export const ATTRIBUTION_STORAGE_KEY = "ba_attribution";

// Long enough for any real code or campaign name, short enough that a hostile
// URL cannot build an absurd outbound link.
const MAX_VALUE_LENGTH = 128;

/**
 * The allowlisted attribution params in a query string.
 * readAttribution("?ref=ABC12&x=1") -> { ref: "ABC12" }
 * Returns an empty object for anything unparseable.
 */
export function readAttribution(search) {
  const found = {};
  if (!search) return found;
  try {
    const params = new URLSearchParams(search);
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, MAX_VALUE_LENGTH);
    }
  } catch {
    return {};
  }
  return found;
}

/**
 * Append attribution to a URL, preserving any query string it already has.
 * withAttribution("https://x.in/signup", { ref: "ABC12" })
 *   -> "https://x.in/signup?ref=ABC12"
 * Params already present on the URL win — an explicit link is never rewritten.
 */
export function withAttribution(url, params) {
  const entries = Object.entries(params || {}).filter(
    ([key, value]) => ATTRIBUTION_PARAMS.includes(key) && value,
  );
  if (!url || !entries.length) return url;

  const [base, hash = ""] = String(url).split("#");
  const [path, existing = ""] = base.split("?");
  const query = new URLSearchParams(existing);
  for (const [key, value] of entries) {
    if (!query.has(key)) query.set(key, String(value).slice(0, MAX_VALUE_LENGTH));
  }

  const queryString = query.toString();
  return `${path}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`;
}

/** The attribution held for this visit. Pure read — never writes. */
export function readStoredAttribution() {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") return {};
    // Re-filter on read: stored data is still untrusted input.
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([key, value]) => ATTRIBUTION_PARAMS.includes(key) && value,
      ),
    );
  } catch {
    return {};
  }
}

/**
 * The attribution to use right now, without side effects.
 *
 * The current URL wins, so a fresh code always beats a stale one. Otherwise
 * fall back to what this visit already captured — a visitor landing on
 * `/?ref=ABC12` and clicking through to `/pricing` loses the query string on
 * client-side navigation, and the stored copy carries it the rest of the way.
 *
 * Safe to call during render: it only reads.
 */
export function resolveAttribution() {
  if (typeof window === "undefined") return {};
  const fromUrl = readAttribution(window.location.search);
  return Object.keys(fromUrl).length ? fromUrl : readStoredAttribution();
}

/**
 * Remember the attribution in the current URL for the rest of the visit.
 *
 * Write-only, so it belongs in an effect. A no-op where storage is unavailable
 * (private windows, blocked site data) — attribution is a nice-to-have, and the
 * URL param still works for that page either way.
 */
export function persistAttribution() {
  if (typeof window === "undefined") return;
  const fromUrl = readAttribution(window.location.search);
  if (!Object.keys(fromUrl).length) return;
  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(fromUrl),
    );
  } catch {
    /* storage unavailable — the URL param still works this visit */
  }
}
