import { Button } from "./Button";
import { Icon } from "./Icon";
import { URLS, CTA_MICROCOPY } from "@/lib/site";

// Standard primary + secondary CTA pairing used across the site.
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
        <Button href={URLS.signup} variant={onDark ? "white" : "primary"} size={size}>
          Start Free Trial <Icon name="ArrowRight" size={18} />
        </Button>
        <Button
          href={URLS.bookDemo}
          variant={onDark ? "outlineLight" : "secondary"}
          size={size}
        >
          Book a Demo
        </Button>
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
