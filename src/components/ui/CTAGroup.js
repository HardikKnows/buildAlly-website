import { TrackedButton } from "./TrackedButton";
import { Icon } from "./Icon";
import { URLS, CTA_MICROCOPY } from "@/lib/site";
import { EVENTS } from "@/lib/track";

// Standard demo-first CTA pairing used across the site:
//   Primary  → Try Interactive Demo (the Phase 2 primary objective)
//   Secondary → Book a Demo
// Pass mode="sales" to swap the secondary for "Contact Sales".
export function CTAGroup({
  align = "start",
  size = "lg",
  showMicrocopy = true,
  onDark = false,
  mode = "demo",
  className = "",
}) {
  const justify = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={className}>
      <div className={`flex flex-col gap-3 sm:flex-row ${justify}`}>
        <TrackedButton
          href={URLS.demo}
          event={EVENTS.TRY_DEMO}
          eventProps={{ location: "cta_group" }}
          variant={onDark ? "white" : "primary"}
          size={size}
        >
          <Icon name="MonitorPlay" size={18} /> Try Interactive Demo
        </TrackedButton>

        {mode === "sales" ? (
          <TrackedButton
            href={URLS.contactSales}
            event={EVENTS.CONTACT_SALES}
            eventProps={{ location: "cta_group" }}
            variant={onDark ? "outlineLight" : "secondary"}
            size={size}
          >
            Contact Sales
          </TrackedButton>
        ) : (
          <TrackedButton
            href={URLS.bookDemo}
            event={EVENTS.BOOK_DEMO}
            eventProps={{ location: "cta_group" }}
            variant={onDark ? "outlineLight" : "secondary"}
            size={size}
          >
            Book a Demo
          </TrackedButton>
        )}
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
