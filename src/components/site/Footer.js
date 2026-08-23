import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { SignupAnchor, SignupButton } from "@/components/ui/SignupLink";
import { FOOTER_NAV, SITE, URLS, CTA_MICROCOPY } from "@/lib/site";
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from "@/lib/email";
import { EVENTS } from "@/lib/track";
import { PRICING } from "@/lib/pricing";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      {/* Final CTA band */}
      <div className="bg-ink blueprint-grid-dark">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
            Ready to build smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-slate-300">
            Bring your construction operations into one place. Manage sites,
            coordinate teams, understand what&apos;s happening — and act faster.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedButton
              href={URLS.bookDemo}
              event={EVENTS.BOOK_DEMO}
              eventProps={{ location: "footer" }}
              variant="white"
              size="lg"
            >
              <Icon name="CalendarCheck" size={18} /> Book a Demo
            </TrackedButton>
            <SignupButton
              eventProps={{ location: "footer" }}
              variant="outlineLight"
              size="lg"
            >
              Start {PRICING.trialDays}-Day Trial{" "}
              <Icon name="ArrowRight" size={18} />
            </SignupButton>
          </div>
          <p className="mt-4 text-sm text-slate-400">{CTA_MICROCOPY}</p>
        </Container>
      </div>

      {/* Link columns */}
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-body">
              {SITE.tagline}
            </p>
            <a
              href={SUPPORT_MAILTO}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-deep"
            >
              <Icon name="Mail" size={15} /> {SUPPORT_EMAIL}
            </a>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) =>
                  link.signup ? (
                    <li key={link.label}>
                      <SignupAnchor
                        eventProps={{ location: "footer_nav" }}
                        className="text-sm text-slate-body transition-colors hover:text-brand"
                      >
                        {link.label}
                      </SignupAnchor>
                    </li>
                  ) : link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-body transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-body transition-colors hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-slate-body">
            © {new Date().getFullYear()} BuildAlly. All rights reserved.
          </p>
          <p className="text-sm text-slate-body">
            Built for Indian builders · {SITE.domain.replace("https://", "")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
