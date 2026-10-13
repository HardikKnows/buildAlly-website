import { Resend } from "resend";
import { emailFrom, inboxAddress } from "@/lib/email";

// Production contact / demo / Enterprise enquiry form handler.
// Sends submissions via Resend to the official BuildAlly inbox.
//
// Variants: "contact" (default), "demo", and "enterprise" — the pricing page's
// Enterprise enquiry, which carries the requested active-site count so the
// team can prioritise larger leads.
//
// Required env vars:
//   RESEND_API_KEY — your Resend API key
// Optional env vars (see @/lib/email for defaults):
//   EMAIL_FROM     — verified Resend sender
//   EMAIL_TO       — inbox that receives submissions

export const runtime = "nodejs"; // Resend SDK needs the Node runtime on Vercel.

// Loose but real validation. Server is the source of truth.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const MAX_SITES = 100000;

const VARIANTS = new Set(["contact", "demo", "enterprise"]);

function validate(body, variant) {
  const errors = {};
  const enterprise = variant === "enterprise";
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();
  const company = (body.company || "").toString().trim();
  // A count arrives as a number or a digit string — nothing else coerces.
  const sites =
    typeof body.sites === "number" ||
    (typeof body.sites === "string" && /^\d+$/.test(body.sites.trim()))
      ? Number(body.sites)
      : NaN;

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 200) errors.email = "Email is too long.";

  // Phone is optional on an Enterprise enquiry, required everywhere else.
  if (!phone) {
    if (!enterprise) errors.phone = "Phone number is required.";
  } else if (!PHONE_RE.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  // The message is optional on an Enterprise enquiry — the site count is the
  // signal that matters there.
  if (message.length > 5000) errors.message = "Message is too long.";
  else if (!enterprise && message.length < 5) errors.message = "Please add a short message.";

  if (enterprise) {
    if (!company) errors.company = "Please enter your company name.";
    else if (company.length > 200) errors.company = "Company name is too long.";

    if (!Number.isInteger(sites) || sites < 1 || sites > MAX_SITES) {
      errors.sites = "Please enter a whole number of sites.";
    }
  }

  return { errors, clean: { name, email, phone, message, sites } };
}

function esc(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (body.company_website) {
    return Response.json({ ok: true }, { status: 200 });
  }

  // Every variant reaches the single official inbox; the variant only shapes
  // validation and the subject line so the team can triage.
  const variant = VARIANTS.has(body.variant) ? body.variant : "contact";

  const { errors, clean } = validate(body, variant);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const to = inboxAddress();

  // Config guard — fail clearly if env is missing rather than 500-ing opaquely.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) {
    console.error(
      "Contact form misconfigured: RESEND_API_KEY missing or no destination inbox resolved."
    );
    return Response.json(
      { ok: false, error: "The form isn't configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  // Optional, non-validated context fields.
  const company = (body.company || "").toString().trim().slice(0, 200);
  const teamSize = (body.teamSize || "").toString().trim().slice(0, 120);
  const intendedInbox = (body.intendedInbox || "").toString().trim().slice(0, 200);

  const who = `${clean.name}${company ? ` (${company})` : ""}`;
  // The site count leads an Enterprise subject so the inbox sorts by size.
  const subject = {
    demo: `Demo request — ${who}`,
    enterprise: `Enterprise enquiry — ${clean.sites} active sites — ${who}`,
    contact: `Contact — ${who}`,
  }[variant];

  const heading = {
    demo: "demo request",
    enterprise: "Enterprise enquiry",
    contact: "contact message",
  }[variant];

  const rows = [
    ["Name", clean.name],
    ["Company", company],
    ["Email", clean.email],
    ["Phone", clean.phone],
    variant === "enterprise" ? ["Active sites", String(clean.sites)] : null,
    variant === "demo" ? ["Team size", teamSize] : null,
    ["Message", clean.message],
    variant === "enterprise" ? ["Source", "Pricing page — Enterprise enquiry"] : null,
    intendedInbox ? ["Intended inbox", intendedInbox] : null,
  ].filter(Boolean);

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#0f172a;max-width:560px">
      <h2 style="margin:0 0 4px">New ${heading}</h2>
      <p style="margin:0 0 16px;color:#64748b">via buildally.in</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:600;white-space:nowrap;vertical-align:top">${esc(
                   k
                 )}</td>
                 <td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap">${esc(
                   v || "—"
                 )}</td>
               </tr>`
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: emailFrom("support"), // BuildAlly Support <support@buildally.in>
      to,
      replyTo: clean.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend send error:", error);
      return Response.json(
        { ok: false, error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route exception:", err);
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
