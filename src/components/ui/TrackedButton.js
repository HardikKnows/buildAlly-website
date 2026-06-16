"use client";

import { Button } from "./Button";
import { track } from "@/lib/track";

// Client wrapper that fires a conversion event on click, then behaves exactly
// like <Button>. Takes a string `event` (serializable) so it can be rendered
// from Server Components — the tracking call happens here on the client.
export function TrackedButton({ event, eventProps, onClick, ...props }) {
  const handleClick = (e) => {
    if (event) track(event, eventProps);
    onClick?.(e);
  };
  return <Button onClick={handleClick} {...props} />;
}
