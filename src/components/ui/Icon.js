import * as Lucide from "lucide-react";

// Render a lucide icon by name. Falls back to a neutral square if missing.
export function Icon({ name, className = "", size = 20, strokeWidth = 2 }) {
  const Cmp = Lucide[name] ?? Lucide.Square;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
