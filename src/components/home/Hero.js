import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PRICING, formatPrice } from "@/lib/pricing";

const HERO_SHOT = {
  src: "/product/dashboard-overview.png",
  alt: "The BuildAlly company overview dashboard showing total expenses, payments received, active sites, pending approvals, expense distribution and upcoming actions",
  width: 3200,
  height: 2000,
};

const MOBILE_SHOT = {
  src: "/product/mobile-attendance-marking.png",
  alt: "GPS attendance check-in on the BuildAlly mobile app",
  width: 1242,
  height: 2688,
};

export function Hero() {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] hero-glow" />
      <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-600 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-success" />
              Built for construction companies &amp; interior designers
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Construction management software{" "}
              <span className="text-gradient-brand">built for modern builders</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-body sm:text-xl">
              Manage projects, teams, attendance, salaries, expenses, treasury,
              documents and site progress — all from one platform.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TrackedButton
                href={URLS.signup}
                external
                event={EVENTS.START_TRIAL}
                eventProps={{ location: "hero" }}
                variant="primary"
                size="lg"
              >
                Start {PRICING.trialDays}-Day Trial{" "}
                <Icon name="ArrowRight" size={18} />
              </TrackedButton>
              <TrackedButton
                href="/pricing"
                event={EVENTS.EXPLORE_PLANS}
                eventProps={{ location: "hero" }}
                variant="secondary"
                size="lg"
              >
                Explore Plans
              </TrackedButton>
            </div>
            <p className="mt-4 text-sm text-slate-body">
              {formatPrice(PRICING.trialCredit)} for {PRICING.trialDays} days ·
              Fully credited towards your subscription
            </p>
          </Reveal>
        </div>

        {/* Real product UI — the LCP element, so it loads eagerly. */}
        <Reveal delay={0.15} y={28} className="relative mx-auto mt-14 max-w-5xl">
          <Screenshot
            image={HERO_SHOT}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
          {/* Decorative companion shot. Hidden below sm — the `1px` sizes branch
              stops the browser grabbing a full-width candidate it never paints. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-2 hidden w-37.5 sm:block lg:-right-12 lg:w-45"
          >
            <figure className="relative rounded-[1.8rem] border border-ink/10 bg-ink p-1.5 shadow-2xl shadow-ink/25">
              <div className="overflow-hidden rounded-3xl bg-canvas">
                <Image
                  src={MOBILE_SHOT.src}
                  alt={MOBILE_SHOT.alt}
                  width={MOBILE_SHOT.width}
                  height={MOBILE_SHOT.height}
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 150px, 1px"
                  className="h-auto w-full"
                />
              </div>
            </figure>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
