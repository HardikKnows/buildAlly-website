"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { URLS } from "@/lib/site";
import { track, EVENTS } from "@/lib/track";

// App-store badges for the BuildAlly mobile app.
//
// A client component, like TrackedButton, so the Google Play click can fire a
// conversion event (`location` says which placement was clicked — hero,
// mobile section, footer). Server Components render it directly.
//
// Both badges read their destination from @/lib/site so the URLs live in one
// place:
//   URLS.playStore — the live Google Play listing. Rendered with Google's
//     official "Get it on Google Play" artwork (public/badges/google-play-badge.svg,
//     from the Play badge kit, used unmodified) and linked to the listing.
//     Android hands play.google.com links straight to the Play Store app;
//     desktop browsers open the web listing in a new tab.
//   URLS.appStore — the iOS listing. While it is null (the app is not on the
//     App Store yet) the badge renders dimmed, non-interactive and labelled
//     "Coming soon on the App Store"; set the URL and it becomes a live
//     "Download on the App Store" link. The layout is identical either way, so
//     the page never ships a dead link.
//
// Apple publishes no "coming soon" badge and does not allow its real badge to
// be altered, so the App Store badge is drawn here in the official badge's
// proportions (black, 1px grey border, Apple mark, two-line label).

// Google's guidelines set a 40px minimum badge height; both badges share it so
// they read as a matched pair.
const BADGE_HEIGHT = "h-10";

// The official artwork is 180 x 53.333 (3.375 : 1), so 40px tall is 135px wide.
const PLAY_BADGE = {
  src: "/badges/google-play-badge.svg",
  width: 135,
  height: 40,
};

export function GooglePlayBadge({ className = "", location }) {
  const href = URLS.playStore;
  const handleClick = () => track(EVENTS.GET_ANDROID_APP, { location });
  const image = (
    <Image
      src={PLAY_BADGE.src}
      alt="Get it on Google Play"
      width={PLAY_BADGE.width}
      height={PLAY_BADGE.height}
      className={`${BADGE_HEIGHT} w-auto`}
    />
  );

  if (!href) {
    return (
      <span className={`inline-block select-none opacity-60 ${className}`}>
        {image}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get BuildAlly on Google Play"
      onClick={handleClick}
      className={`inline-block rounded-[5px] transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {image}
    </a>
  );
}

// The Apple mark, drawn to lucide's 24x24 grid so it sizes like our icons.
function AppleMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export function AppStoreBadge({ className = "" }) {
  const href = URLS.appStore;
  // Colours match the official Google Play artwork beside it.
  const base = `inline-flex ${BADGE_HEIGHT} items-center gap-1.5 rounded-[6px] border border-[#a2a2a1] bg-[#100f0d] pl-2 pr-3 text-white`;
  const inner = (
    <>
      <AppleMark className="h-5.5 w-5.5 shrink-0" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[9px] leading-none tracking-wide">
          {href ? "Download on the" : "Coming soon on the"}
        </span>
        <span className="mt-0.5 text-[17px] font-medium leading-none tracking-tight">
          App Store
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <span className={`${base} cursor-default select-none opacity-60 ${className}`}>
        {inner}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download BuildAlly on the App Store"
      className={`${base} transition-transform duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {inner}
    </a>
  );
}

// Both badges side by side. With `captions` (the default) each badge carries a
// status line beneath it — "Available on Google Play" / "Coming Soon on the App
// Store" — so the wording is the same everywhere the pair appears. Pass
// `captions={false}` where space is tight (the hero corner, the footer); the
// badges' own labels still say which store is live.
export function StoreBadges({ captions = true, className = "", location }) {
  if (!captions) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <GooglePlayBadge location={location} />
        <AppStoreBadge />
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-start gap-x-5 gap-y-4 ${className}`}>
      <div className="flex flex-col items-start gap-2">
        <GooglePlayBadge location={location} />
        <p className="flex items-center gap-1.5 text-sm text-ink-600">
          <Icon
            name="Check"
            size={15}
            strokeWidth={2.5}
            className="shrink-0 text-success"
          />
          Available on Google Play
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <AppStoreBadge />
        <p className="text-sm text-slate-body">Coming Soon on the App Store</p>
      </div>
    </div>
  );
}
