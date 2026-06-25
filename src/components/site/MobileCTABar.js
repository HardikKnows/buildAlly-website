"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { URLS } from "@/lib/site";
import { track, EVENTS } from "@/lib/track";

// Sticky bottom CTA bar — mobile only. Keeps Book a Demo one tap away.
export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <Button
          href={URLS.contactSales}
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => track(EVENTS.CONTACT_SALES, { location: "mobile_bar" })}
        >
          Contact Sales
        </Button>
        <Button
          href={URLS.bookDemo}
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => track(EVENTS.BOOK_DEMO, { location: "mobile_bar" })}
        >
          <Icon name="CalendarCheck" size={16} /> Book a Demo
        </Button>
      </div>
    </div>
  );
}
