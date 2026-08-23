"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Button } from "./Button";
import { track, EVENTS } from "@/lib/track";
import { URLS } from "@/lib/site";
import {
  persistAttribution,
  resolveAttribution,
  withAttribution,
} from "@/lib/attribution";

// Every CTA that sends someone to signup, with referral/campaign attribution
// carried across the origin hop to app.buildally.in.
//
// Why a client wrapper rather than reading searchParams on the page: calling
// useSearchParams in a prerendered route pushes the tree up to the nearest
// Suspense boundary into client-side rendering. Reading window.location in an
// effect keeps every page statically prerendered — the plain signup URL is in
// the served HTML, and the params are added once the page is interactive.
//
// Same shape as TrackedButton, so Server Components can render it directly.

// Attribution is fixed for the lifetime of a page — a ?ref= cannot change
// without a navigation — so there is nothing to subscribe to.
const subscribe = () => () => {};

/** The signup URL for this visit, decorated with any captured attribution. */
export function useSignupUrl(base = URLS.signup) {
  // useSyncExternalStore is the supported way to read something outside React
  // (here: the URL and sessionStorage) without a hydration mismatch. React uses
  // the server snapshot for the hydration pass, so the served HTML and the
  // first client render agree, then re-reads the real value once hydrated.
  // Both snapshots return a string, so referential equality is value equality.
  const url = useSyncExternalStore(
    subscribe,
    () => withAttribution(base, resolveAttribution()),
    () => base,
  );

  // Remember a code that arrived in the URL, so it survives client-side
  // navigation to another page. Write-only — no state update, no re-render.
  useEffect(persistAttribution, []);

  return url;
}

function useTrackedClick(event, eventProps, onClick) {
  return (e) => {
    if (event) track(event, eventProps);
    onClick?.(e);
  };
}

/** Signup CTA styled as a Button. */
export function SignupButton({
  href = URLS.signup,
  event = EVENTS.START_TRIAL,
  eventProps,
  onClick,
  children,
  ...props
}) {
  const url = useSignupUrl(href);
  const handleClick = useTrackedClick(event, eventProps, onClick);

  return (
    <Button href={url} external onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}

/** Signup CTA styled as a plain text link (footer columns, nav drawer). */
export function SignupAnchor({
  href = URLS.signup,
  event = EVENTS.START_TRIAL,
  eventProps,
  onClick,
  className = "",
  children,
  ...props
}) {
  const url = useSignupUrl(href);
  const handleClick = useTrackedClick(event, eventProps, onClick);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
