"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { URLS } from "@/lib/site";

// Sticky bottom CTA bar — mobile only. Keeps the primary action one tap away.
export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <Button href={URLS.bookDemo} variant="secondary" size="sm" className="flex-1">
          Book a Demo
        </Button>
        <Button href={URLS.signup} variant="primary" size="sm" className="flex-1">
          Start Free Trial <Icon name="ArrowRight" size={16} />
        </Button>
      </div>
    </div>
  );
}
