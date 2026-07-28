// Central email configuration for BuildAlly.
//
// One official address for the entire product — support@buildally.in. Only the
// sender *display name* varies by email type. Nothing outside this file should
// hardcode a sender, an inbox, or a mailto target.
//
// Env vars (all optional — the defaults below are the production values):
//   NEXT_PUBLIC_SUPPORT_EMAIL — address shown on the site and used in mailto links
//   EMAIL_FROM                — verified Resend sender, e.g. "BuildAlly <support@buildally.in>"
//   EMAIL_TO                  — inbox that receives contact / demo submissions

// Public-facing address. Must be read as a static `process.env.NEXT_PUBLIC_*`
// lookup — Next.js inlines these at build time and skips dynamic lookups.
export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@buildally.in";

// Ready-to-use mailto for links and buttons.
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}`;

/** Build a mailto with a prefilled subject, so one inbox can still triage intent. */
export function supportMailto(subject) {
  return subject
    ? `${SUPPORT_MAILTO}?subject=${encodeURIComponent(subject)}`
    : SUPPORT_MAILTO;
}

// Sender display name per email type. The address is always SUPPORT_EMAIL.
// Add new email types here rather than writing a literal into a template.
export const SENDER_NAMES = {
  auth: "BuildAlly Authentication", // OTP, email verification, login verification
  security: "BuildAlly Security", // password reset
  team: "BuildAlly Team", // member / company / workspace invitations
  billing: "BuildAlly Billing", // trial, subscription, invoices, payments
  support: "BuildAlly Support", // contact form, support replies
  general: "BuildAlly", // welcome, announcements, product notifications
};

// Server-side only. Accepts either a bare address or a full "Name <addr>"
// string in EMAIL_FROM, so one env var configures the whole system.
function senderAddress() {
  const raw = (process.env.EMAIL_FROM || "").trim();
  if (!raw) return SUPPORT_EMAIL;
  const angled = raw.match(/<([^>]+)>/);
  return (angled ? angled[1] : raw).trim();
}

/**
 * Sender header for an outgoing email, e.g. emailFrom("billing")
 * -> "BuildAlly Billing <support@buildally.in>".
 * Always pass a type from SENDER_NAMES — never a literal address.
 */
export function emailFrom(type = "general") {
  const name = SENDER_NAMES[type] || SENDER_NAMES.general;
  return `${name} <${senderAddress()}>`;
}

/** Inbox that receives inbound mail (contact form, demo requests). */
export function inboxAddress() {
  return (process.env.EMAIL_TO || "").trim() || SUPPORT_EMAIL;
}
