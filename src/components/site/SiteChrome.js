"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileCTABar } from "@/components/site/MobileCTABar";

const CHROMELESS_ROUTES = new Set(["/playstore-assets"]);

export function SiteChrome({ children }) {
  const pathname = usePathname();
  const chromeless = CHROMELESS_ROUTES.has(pathname);

  if (chromeless) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileCTABar />
      <div className="h-17 md:hidden" aria-hidden="true" />
    </>
  );
}
