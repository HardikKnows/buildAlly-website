import Link from "next/link";

// BA house mark: a roof + window motif (per brand guidelines), in BuildAlly Blue.
export function LogoMark({ className = "", size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="BuildAlly"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="url(#ba-grad)" />
      {/* roof */}
      <path
        d="M16 7.5 25 14v0.8a0.7 0.7 0 0 1-0.7 0.7H7.7A0.7 0.7 0 0 1 7 14.8V14l9-6.5Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* house body + window */}
      <path
        d="M9.5 16h13v7.8a0.7 0.7 0 0 1-0.7 0.7H10.2a0.7 0.7 0 0 1-0.7-0.7V16Z"
        fill="white"
        fillOpacity="0.75"
      />
      <rect x="14.4" y="18.4" width="3.2" height="6.1" rx="0.6" fill="url(#ba-grad)" />
      <defs>
        <linearGradient id="ba-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Full lockup: mark + two-tone wordmark (Build = ink, Ally = brand blue).
export function Logo({ className = "", dark = false, size = 30 }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight ${className}`}
      aria-label="BuildAlly home"
    >
      <LogoMark size={size} />
      <span className="leading-none">
        <span className={dark ? "text-white" : "text-ink"}>Build</span>
        <span className="text-brand">Ally</span>
      </span>
    </Link>
  );
}
