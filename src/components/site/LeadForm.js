"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

// Lead-capture form for Book a Demo / Contact.
// Submits to /api/contact, which delivers via Resend to CONTACT_EMAIL.

const baseField =
  "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/20";

function fieldCls(hasError) {
  return `${baseField} ${
    hasError ? "border-destructive focus:border-destructive" : "border-line focus:border-brand"
  }`;
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  half,
  error,
}) {
  return (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={fieldCls(error)}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadForm({ variant = "demo", recipient }) {
  // status: "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    // Prevent duplicate submissions while a request is in flight.
    if (status === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      variant,
      intendedInbox: recipient || "",
      name: fd.get("name") || "",
      company: fd.get("company") || "",
      email: fd.get("email") || "",
      phone: fd.get("phone") || "",
      sites: fd.get("sites") || "",
      message: fd.get("message") || "",
      company_website: fd.get("company_website") || "", // honeypot
    };

    setStatus("submitting");
    setFormError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (data.errors) setFieldErrors(data.errors);
      setFormError(
        data.error ||
          (data.errors
            ? "Please fix the highlighted fields and try again."
            : "Something went wrong. Please try again.")
      );
      setStatus("error");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <Icon name="Check" size={26} />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">Thanks — we&apos;ve got it.</h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-slate-body">
          Your message is on its way to our team and we&apos;ll get back to you
          shortly. Want to look around in the meantime?
        </p>
        <Button href="https://app.buildally.in/demo" variant="primary" size="md" className="mt-5">
          <Icon name="MonitorPlay" size={18} /> Try Interactive Demo
        </Button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-6 sm:grid-cols-2 sm:p-8"
    >
      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Full name" name="name" required placeholder="Your name" autoComplete="name" half error={fieldErrors.name} />
      <Field label="Company" name="company" required placeholder="Company name" autoComplete="organization" half error={fieldErrors.company} />
      <Field label="Work email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" half error={fieldErrors.email} />
      <Field label="Phone" name="phone" type="tel" required placeholder="+91 90000 00000" autoComplete="tel" half error={fieldErrors.phone} />

      {variant === "demo" && (
        <div className="sm:col-span-2">
          <label htmlFor="sites" className="mb-1.5 block text-sm font-medium text-ink">
            Active sites / team size
          </label>
          <select id="sites" name="sites" className={fieldCls(false)} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            <option>1–5 sites</option>
            <option>5–25 sites</option>
            <option>25+ sites</option>
            <option>Enterprise (100+ employees)</option>
          </select>
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          {variant === "demo" ? "Anything we should know?" : "How can we help?"}{" "}
          <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-invalid={fieldErrors.message ? "true" : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          placeholder={
            variant === "demo"
              ? "Tell us a little about your business…"
              : "Your message…"
          }
          className={fieldCls(fieldErrors.message)}
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1.5 text-xs font-medium text-destructive">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && formError && (
        <div
          role="alert"
          className="sm:col-span-2 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-3.5 text-sm text-destructive"
        >
          <Icon name="TriangleAlert" size={18} className="mt-0.5 shrink-0" />
          <span>{formError}</span>
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
              {variant === "demo" ? "Request my demo" : "Send message"}
              <Icon name="ArrowRight" size={18} />
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
