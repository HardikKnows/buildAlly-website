"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MAIN_NAV, URLS } from "@/lib/site";
import { track, EVENTS } from "@/lib/track";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {MAIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-brand" : "text-ink-600 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={URLS.login}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink"
          >
            Login
          </a>
          <Button
            href={URLS.contactSales}
            variant="secondary"
            size="sm"
            onClick={() => track(EVENTS.CONTACT_SALES, { location: "nav" })}
          >
            Contact Sales
          </Button>
          <Button
            href={URLS.bookDemo}
            variant="primary"
            size="sm"
            onClick={() => track(EVENTS.BOOK_DEMO, { location: "nav" })}
          >
            <Icon name="CalendarCheck" size={16} /> Book a Demo
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink md:hidden"
        >
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-canvas"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={URLS.login}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-canvas"
              >
                Login
              </a>
              <a
                href={URLS.signup}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track(EVENTS.START_TRIAL, { location: "nav_mobile" });
                  closeMenu();
                }}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-canvas"
              >
                Start free trial
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  href={URLS.contactSales}
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    track(EVENTS.CONTACT_SALES, { location: "nav_mobile" });
                    closeMenu();
                  }}
                >
                  Contact Sales
                </Button>
                <Button
                  href={URLS.bookDemo}
                  variant="primary"
                  size="md"
                  onClick={() => {
                    track(EVENTS.BOOK_DEMO, { location: "nav_mobile" });
                    closeMenu();
                  }}
                >
                  <Icon name="CalendarCheck" size={18} /> Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
