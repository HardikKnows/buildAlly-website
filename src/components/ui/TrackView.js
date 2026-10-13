"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// Fires one analytics event when a page mounts, e.g. a pricing-page visit.
// Renders nothing, so a Server Component page can drop it in anywhere. Like
// every event here it no-ops until an analytics provider is loaded.
export function TrackView({ event, eventProps }) {
  useEffect(() => {
    track(event, eventProps);
    // Once per mount: the event describes the visit, not a re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
