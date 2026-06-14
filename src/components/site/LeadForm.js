"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

// Lead-capture form for Book a Demo / Contact.
// NOTE: There is no form backend wired yet. On submit it shows a success state
// and (for now) opens a mailto fallback so leads are never silently lost.
// PLACEHOLDER: BuildAlly team to connect a forms/email provider or CRM endpoint.

const baseField =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

function Field({ label, name, type = "text", required, placeholder, autoComplete, half }) {
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
        className={baseField}
      />
    </div>
  );
}

export function LeadForm({ variant = "demo", recipient }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [];
    for (const [k, v] of fd.entries()) {
      if (v) lines.push(`${k}: ${v}`);
    }
    const subject =
      variant === "demo"
        ? "Demo request — BuildAlly"
        : "Contact — BuildAlly";
    // mailto fallback so a lead is captured even without a backend.
    if (recipient) {
      const href = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(lines.join("\n"))}`;
      window.location.href = href;
    }
    setSent(true);
  };

  if (sent) {
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
          Your email app should have opened with the details. Our team will get
          back to you shortly. Prefer to start now?
        </p>
        <Button href="https://app.buildally.in" variant="primary" size="md" className="mt-5">
          Start Free Trial <Icon name="ArrowRight" size={18} />
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-6 sm:grid-cols-2 sm:p-8"
    >
      <Field label="Full name" name="name" required placeholder="Your name" autoComplete="name" half />
      <Field label="Company" name="company" required placeholder="Company name" autoComplete="organization" half />
      <Field label="Work email" name="email" type="email" required placeholder="you@company.com" autoComplete="email" half />
      <Field label="Phone" name="phone" type="tel" placeholder="+91 90000 00000" autoComplete="tel" half />

      {variant === "demo" && (
        <div className="sm:col-span-2">
          <label htmlFor="sites" className="mb-1.5 block text-sm font-medium text-ink">
            Active sites / team size
          </label>
          <select id="sites" name="sites" className={baseField} defaultValue="">
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
          {variant === "demo" ? "Anything we should know?" : "How can we help?"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={
            variant === "demo"
              ? "Tell us a little about your business…"
              : "Your message…"
          }
          className={baseField}
        />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" size="lg" className="w-full">
          {variant === "demo" ? "Request my demo" : "Send message"}
          <Icon name="ArrowRight" size={18} />
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
