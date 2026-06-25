import { TrackedButton } from "./TrackedButton";
import { Icon } from "./Icon";
import { URLS, CTA_MICROCOPY } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// Standard CTA pairing used across the site:
//   Primary   → Book a Demo (request a personalized walkthrough)
//   Secondary → Contact Sales
export function CTAGroup({
  align = "start",
  size = "lg",
  showMicrocopy = true,
  onDark = false,
  className = "",
}) {
  const justify = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={className}>
      <div className={`flex flex-col gap-3 sm:flex-row ${justify}`}>
        <TrackedButton
          href={URLS.bookDemo}
          event={EVENTS.BOOK_DEMO}
          eventProps={{ location: "cta_group" }}
          variant={onDark ? "white" : "primary"}
          size={size}
        >
          <Icon name="CalendarCheck" size={18} /> Book a Demo
        </TrackedButton>

        <TrackedButton
          href={URLS.contactSales}
          event={EVENTS.CONTACT_SALES}
          eventProps={{ location: "cta_group" }}
          variant={onDark ? "outlineLight" : "secondary"}
          size={size}
        >
          Contact Sales
        </TrackedButton>
      </div>
      {showMicrocopy && (
        <p
          className={`mt-4 text-sm ${align === "center" ? "text-center" : ""} ${
            onDark ? "text-slate-400" : "text-slate-body"
          }`}
        >
          {CTA_MICROCOPY}
        </p>
      )}
    </div>
  );
}
