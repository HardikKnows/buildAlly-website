import Link from "next/link";
import Image from "next/image";

export function LogoMark({ className = "", size = 32 }) {
  return (
    <Image
      src="/logo.png"
      alt="BuildAlly"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

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
