import Link from "next/link";

// Shared button/CTA. Renders <a> for external URLs, next/link for internal,
// or a real <button> when given onClick / type. Touch-friendly (>=44px).

const VARIANTS = {
  primary:
    "bg-gradient-brand text-white shadow-sm shadow-brand/25 hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5",
  secondary:
    "border border-line bg-white text-ink hover:border-brand/40 hover:bg-brand-50/60",
  ghost: "text-ink hover:bg-slate-100",
  white:
    "bg-white text-brand-700 shadow-sm hover:bg-brand-50 hover:-translate-y-0.5",
  outlineLight:
    "border border-white/30 text-white hover:bg-white/10",
};

const SIZES = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-13 px-7 text-base py-3.5",
};

function classes({ variant = "primary", size = "md", className = "" }) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight",
    "transition-all duration-200 ease-out will-change-transform",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    "disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap",
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(" ");
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
  ...props
}) {
  const cls = classes({ variant, size, className });

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
