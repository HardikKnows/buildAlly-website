import { Resend } from "resend";

// Production contact/demo form handler.
// Sends submissions via Resend to CONTACT_EMAIL.
//
// Required env vars:
//   RESEND_API_KEY     — your Resend API key
//   CONTACT_EMAIL      — inbox that receives submissions
// Optional env vars:
//   RESEND_FROM_EMAIL  — verified sender, e.g. "BuildAlly <hello@buildally.in>".
//                        Defaults to Resend's onboarding sender (test mode only).

export const runtime = "nodejs"; // Resend SDK needs the Node runtime on Vercel.

const FROM = process.env.RESEND_FROM_EMAIL || "BuildAlly <onboarding@resend.dev>";

// Loose but real validation. Server is the source of truth.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

function validate(body) {
  const errors = {};
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 120) errors.name = "Name is too long.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 200) errors.email = "Email is too long.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";

  if (message.length < 5) errors.message = "Please add a short message.";
  else if (message.length > 5000) errors.message = "Message is too long.";

  return { errors, clean: { name, email, phone, message } };
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

  const { errors, clean } = validate(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  // Route by intent: demo requests -> sales, contact messages -> support.
  // Each falls back to CONTACT_EMAIL if its dedicated inbox isn't configured.
  const variant = body.variant === "demo" ? "demo" : "contact";
  const fallback = process.env.CONTACT_EMAIL;
  const to =
    variant === "demo"
      ? process.env.SALES_EMAIL || fallback
      : process.env.SUPPORT_EMAIL || fallback;

  // Config guard — fail clearly if env is missing rather than 500-ing opaquely.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) {
    console.error(
      "Contact form misconfigured: RESEND_API_KEY or a destination inbox (SALES_EMAIL / SUPPORT_EMAIL / CONTACT_EMAIL) missing."
    );
    return Response.json(
      { ok: false, error: "The form isn't configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  // Optional, non-validated context fields.
  const company = (body.company || "").toString().trim().slice(0, 200);
  const sites = (body.sites || "").toString().trim().slice(0, 120);
  const intendedInbox = (body.intendedInbox || "").toString().trim().slice(0, 200);

  const subject =
    variant === "demo"
      ? `Demo request — ${clean.name}${company ? ` (${company})` : ""}`
      : `Contact — ${clean.name}${company ? ` (${company})` : ""}`;

  const rows = [
    ["Name", clean.name],
    ["Company", company],
    ["Email", clean.email],
    ["Phone", clean.phone],
    variant === "demo" ? ["Sites / team size", sites] : null,
    ["Message", clean.message],
    intendedInbox ? ["Intended inbox", intendedInbox] : null,
  ].filter(Boolean);

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#0f172a;max-width:560px">
      <h2 style="margin:0 0 4px">New ${variant === "demo" ? "demo request" : "contact message"}</h2>
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
      from: FROM,
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
