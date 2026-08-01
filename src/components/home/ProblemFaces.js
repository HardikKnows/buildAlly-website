// Expressive faces for the problem cards — one distinct "this is painful"
// emotion per card (overwhelmed, confused, frustrated, worried, stressed;
// deliberately not sad or crying). Drawn in lucide's own geometry — 24×24,
// stroked in currentColor, round caps — so they sit beside the site's real
// lucide icons without looking bolted on.
const FACES = {
  // Wide eyes + wavy mouth: too many channels, no clarity.
  overwhelmed: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="9.5" r="1.25" />
      <circle cx="15" cy="9.5" r="1.25" />
      <path d="M8.5 15.5c.8-.9 1.7-.9 2.5 0s1.7.9 2.5 0 1.7-.9 2.5 0" />
    </>
  ),
  // One raised brow + tilted mouth: which number is right?
  confused: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 6.75c.9-.75 2.1-.75 3 0" />
      <path d="M9 10.5h.01" />
      <path d="M15 10.5h.01" />
      <path d="M9.5 15.75l5-1.5" />
    </>
  ),
  // Knitted brows + tight flat mouth: stuck waiting on a call back.
  frustrated: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 8l2.5 1" />
      <path d="M16.5 8l-2.5 1" />
      <path d="M9 11.25h.01" />
      <path d="M15 11.25h.01" />
      <path d="M9 15.5h6" />
    </>
  ),
  // Inner-raised brows + gentle frown: bad news, already too late.
  worried: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M7 8.25l2.75-1" />
      <path d="M17 8.25l-2.75-1" />
      <path d="M9 10.75h.01" />
      <path d="M15 10.75h.01" />
      <path d="M14.5 15.9c-.55-.7-1.45-1.1-2.5-1.1s-1.95.4-2.5 1.1" />
    </>
  ),
  // Squeezed-shut eyes + frown: everything everywhere at once.
  stressed: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 8.75l2 1.4-2 1.4" />
      <path d="M16.5 8.75l-2 1.4 2 1.4" />
      <path d="M15 16.25s-1.2-1.5-3-1.5-3 1.5-3 1.5" />
    </>
  ),
};

export function ProblemFace({ name, size = 20, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {FACES[name] ?? FACES.worried}
    </svg>
  );
}
