"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { track, EVENTS, siteBand } from "@/lib/track";
import { SUPPORT_EMAIL, supportMailto } from "@/lib/email";

// Enterprise enquiry form. Submits to /api/contact (variant "enterprise"),
// which delivers the lead through Resend to the official BuildAlly inbox with
// the requested site count in the subject line, so larger leads can be
// prioritised.
//
// A lead is never dropped silently: success is shown only after the server
// confirms delivery, and on any failure the visitor keeps everything they typed
// plus a one-click email fallback that carries the same details.

const PREFILL_EVENT = "buildally:enterprise-prefill";

/** Fill the site count in from elsewhere on the page, e.g. the plan finder. */
export function prefillEnterpriseSites(sites) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { sites } }));
}

// Mirrors the server's rules in src/app/api/contact/route.js, which stays the
// source of truth — this only saves a round trip.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const MAX_SITES = 100000;

const FIELD_ORDER = ["name", "email", "company", "phone", "sites", "message"];
const EMPTY = { name: "", email: "", company: "", phone: "", sites: "", message: "" };

function validate(v) {
  const errors = {};
  if (v.name.length < 2) errors.name = "Please enter your full name.";
  else if (v.name.length > 120) errors.name = "Name is too long.";

  if (!v.email) errors.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(v.email) || v.email.length > 200)
    errors.email = "Please enter a valid email address.";

  if (!v.company) errors.company = "Please enter your company name.";
  else if (v.company.length > 200) errors.company = "Company name is too long.";

  if (v.phone && !PHONE_RE.test(v.phone))
    errors.phone = "Please enter a valid phone number, or leave it blank.";

  const sites = Number(v.sites);
  if (!v.sites) errors.sites = "Please tell us roughly how many active sites you run.";
  else if (!/^\d+$/.test(v.sites) || sites < 1 || sites > MAX_SITES)
    errors.sites = "Please enter a whole number of sites, e.g. 40.";

  if (v.message.length > 5000) errors.message = "Message is too long.";
  return errors;
}

function trimmed(values) {
  return Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, String(v).trim()]),
  );
}

// The same details as an email, for when the form can't send them.
function fallbackMailto(v) {
  const subject = v.sites
    ? `Enterprise enquiry — ${v.sites} active sites`
    : "Enterprise enquiry";
  const body = [
    `Name: ${v.name}`,
    `Company: ${v.company}`,
    `Work email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    `Approximate active sites: ${v.sites}`,
    v.message && `\n${v.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  return supportMailto(subject, body);
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/25";

function inputCls(hasError) {
  return `${inputBase} ${
    hasError
      ? "border-destructive focus:border-destructive"
      : "border-line focus:border-brand"
  }`;
}

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  children,
  className = "",
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            {" "}
            *
          </span>
        )}
        {optional && (
          <span className="font-normal text-slate-body"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-body">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-destructive"
        >
          <Icon name="TriangleAlert" size={14} className="mt-px shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function EnterpriseForm({ location = "pricing_enterprise" }) {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;

  // status: "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const successRef = useRef(null);
  const errorRef = useRef(null);
  // Whether a failed submit should focus the error banner — not when the
  // server flagged a field, which gets focus instead.
  const focusBanner = useRef(false);

  // Accept a site count handed over from the plan finder.
  useEffect(() => {
    const onPrefill = (e) => {
      const sites = Number(e.detail?.sites);
      if (Number.isInteger(sites) && sites > 0) {
        setValues((v) => ({ ...v, sites: String(sites) }));
        setFieldErrors((errs) => ({ ...errs, sites: undefined }));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // Move focus to the outcome so it is announced and keyboard users aren't
  // left on a button that no longer exists.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error" && focusBanner.current) errorRef.current?.focus();
  }, [status]);

  const update = (name) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const focusFirstError = (errors) => {
    const first = FIELD_ORDER.find((name) => errors[name]);
    if (first) document.getElementById(id(first))?.focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return; // no duplicate submissions

    const clean = trimmed(values);
    const errors = validate(clean);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setFormError("");
      setStatus("idle");
      focusFirstError(errors);
      return;
    }

    const honeypot = new FormData(e.currentTarget).get("company_website") || "";

    setStatus("submitting");
    setFieldErrors({});
    setFormError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: "enterprise",
          ...clean,
          sites: Number(clean.sites),
          company_website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        // No personal data in analytics — only where and a coarse size band.
        track(EVENTS.ENTERPRISE_ENQUIRY_SUBMITTED, {
          location,
          sites_band: siteBand(clean.sites),
        });
        setStatus("success");
        return;
      }

      focusBanner.current = !data.errors;
      if (data.errors) {
        setFieldErrors(data.errors);
        focusFirstError(data.errors);
      }
      setFormError(
        data.error ||
          (data.errors
            ? "Please fix the highlighted fields and try again."
            : "We couldn't send your enquiry. Please try again."),
      );
      setStatus("error");
    } catch {
      focusBanner.current = true;
      setFormError("We couldn't reach our server. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center"
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <Icon name="Check" size={26} />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-4 font-display text-xl font-bold text-ink focus:outline-none"
        >
          Thanks — we&apos;ve received your enquiry.
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slate-body">
          The BuildAlly team will get back to you at the work email you
          provided to talk through pricing and limits for your sites.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";
  const describedBy = (name, hasHint) =>
    fieldErrors[name] ? `${id(name)}-error` : hasHint ? `${id(name)}-hint` : undefined;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={`${uid}-title`}
      className="relative grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <div className="sm:col-span-2">
        <h3 id={`${uid}-title`} className="font-display text-lg font-bold text-ink">
          Enterprise enquiry
        </h3>
        <p className="mt-1 text-sm text-slate-body">
          Fields marked <span aria-hidden="true" className="text-destructive">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
      </div>

      {/* Honeypot — hidden from people, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company_website")}>Leave this field empty</label>
        <input
          id={id("company_website")}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field id={id("name")} label="Full name" required error={fieldErrors.name}>
        <input
          id={id("name")}
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={update("name")}
          aria-invalid={fieldErrors.name ? "true" : undefined}
          aria-describedby={describedBy("name")}
          className={inputCls(fieldErrors.name)}
        />
      </Field>

      <Field id={id("email")} label="Work email" required error={fieldErrors.email}>
        <input
          id={id("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="you@company.com"
          value={values.email}
          onChange={update("email")}
          aria-invalid={fieldErrors.email ? "true" : undefined}
          aria-describedby={describedBy("email")}
          className={inputCls(fieldErrors.email)}
        />
      </Field>

      <Field id={id("company")} label="Company name" required error={fieldErrors.company}>
        <input
          id={id("company")}
          type="text"
          autoComplete="organization"
          required
          value={values.company}
          onChange={update("company")}
          aria-invalid={fieldErrors.company ? "true" : undefined}
          aria-describedby={describedBy("company")}
          className={inputCls(fieldErrors.company)}
        />
      </Field>

      <Field id={id("phone")} label="Phone" optional error={fieldErrors.phone}>
        <input
          id={id("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 90000 00000"
          value={values.phone}
          onChange={update("phone")}
          aria-invalid={fieldErrors.phone ? "true" : undefined}
          aria-describedby={describedBy("phone")}
          className={inputCls(fieldErrors.phone)}
        />
      </Field>

      <Field
        id={id("sites")}
        label="Approximate number of active sites"
        required
        hint="Sites under construction at the same time."
        error={fieldErrors.sites}
        className="sm:col-span-2"
      >
        <input
          id={id("sites")}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          required
          placeholder="e.g. 40"
          value={values.sites}
          onChange={update("sites")}
          aria-invalid={fieldErrors.sites ? "true" : undefined}
          aria-describedby={describedBy("sites", true)}
          className={`${inputCls(fieldErrors.sites)} sm:max-w-[12rem]`}
        />
      </Field>

      <Field
        id={id("message")}
        label="Anything else we should know?"
        optional
        error={fieldErrors.message}
        className="sm:col-span-2"
      >
        <textarea
          id={id("message")}
          rows={4}
          placeholder="Team size, rollout timeline, integrations or other requirements…"
          value={values.message}
          onChange={update("message")}
          aria-invalid={fieldErrors.message ? "true" : undefined}
          aria-describedby={describedBy("message")}
          className={inputCls(fieldErrors.message)}
        />
      </Field>

      {status === "error" && formError && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive focus:outline-none sm:col-span-2"
        >
          <Icon name="TriangleAlert" size={18} className="mt-0.5 shrink-0" />
          <span>
            {formError} Your details are still here. You can also{" "}
            <a
              href={fallbackMailto(trimmed(values))}
              className="font-semibold underline underline-offset-2"
            >
              email them to {SUPPORT_EMAIL}
            </a>
            .
          </span>
        </div>
      )}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <>
              <Icon name="LoaderCircle" size={18} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry <Icon name="ArrowRight" size={18} />
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-xs text-slate-body">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="underline hover:text-brand">
            Privacy Policy
          </a>
          . We&apos;ll never share your details.
        </p>
      </div>
    </form>
  );
}
