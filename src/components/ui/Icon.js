import * as Lucide from "lucide-react";

// lucide v1 removed every brand icon (Linkedin, Github, Twitter, …), so those
// names silently fell through to the Square fallback. Redraw the ones we need
// here, in lucide's own geometry — 24×24, stroked in currentColor, round caps —
// so they sit beside the real lucide icons without looking bolted on.
const BRAND = {
  Linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

// Render a lucide icon by name. Falls back to a neutral square if missing.
export function Icon({ name, className = "", size = 20, strokeWidth = 2 }) {
  const brand = BRAND[name];
  if (brand) {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {brand}
      </svg>
    );
  }

  const Cmp = Lucide[name] ?? Lucide.Square;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
