"use client";

import Link from "next/link";
import { track } from "@/lib/track";

// Inline text link that fires a conversion event on click — the plain-text
// sibling of TrackedButton, so Server Components can track links in copy.
export function TrackedLink({ event, eventProps, onClick, children, ...props }) {
  const handleClick = (e) => {
    if (event) track(event, eventProps);
    onClick?.(e);
  };
  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
