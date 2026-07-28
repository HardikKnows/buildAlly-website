import { URLS } from "@/lib/site";

// "Get it on Google Play" badge.
//
// Reads URLS.playStore. With a URL set it is a real external link; with null it
// renders the same badge, dimmed and non-interactive, labelled "Coming soon" —
// so the layout is identical either way and the page never ships a dead link.
//
// NOTE: Google's Play brand guidelines ask that you use the official badge
// artwork from the Play Console. This is a faithful stand-in; swap in the
// official asset when the listing goes live.

// The Play triangle, drawn as four polygons so it stays crisp at any size.
function PlayMark({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <polygon points="3,2 13,12 3,22" fill="#00A0FF" />
      <polygon points="3,2 16.5,9.8 13,12" fill="#00E377" />
      <polygon points="3,22 13,12 16.5,14.2" fill="#FF3A44" />
      <polygon points="16.5,9.8 20,12 16.5,14.2 13,12" fill="#FFCE00" />
    </svg>
  );
}

function BadgeInner({ available }) {
  return (
    <>
      <PlayMark />
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/70">
          {available ? "Get it on" : "Coming soon to"}
        </span>
        <span className="mt-0.5 block font-display text-base font-semibold text-white">
          Google Play
        </span>
      </span>
    </>
  );
}

export function PlayStoreBadge({ className = "" }) {
  const href = URLS.playStore;
  const base =
    "inline-flex items-center gap-3 rounded-xl border border-white/15 bg-ink px-4 py-2.5";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${base} opacity-60 ${className}`}
      >
        <BadgeInner available={false} />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get BuildAlly on Google Play"
      className={`${base} transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-lg ${className}`}
    >
      <BadgeInner available />
    </a>
  );
}
