import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PlanComparison } from "@/components/pricing/PlanComparison";
import { TrialBanner } from "@/components/pricing/TrialBanner";
import { SiteAddOns } from "@/components/pricing/SiteAddOns";
import { CheckoutFlow } from "@/components/pricing/CheckoutFlow";
import { SITE, URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PLAN_FAQS } from "@/lib/content";
import {
  PRICING,
  STORAGE_USES,
  ADDON_TEASER,
  COUPON_NOTE,
  getPlan,
  formatPrice,
  priceFor,
} from "@/lib/pricing";

// Derive all pricing copy from the centralized config — no duplicated numbers.
const trial = getPlan("trial");
const interior = getPlan("interior");
const builder = getPlan("builder");

export const metadata = {
  title: "Pricing — BuildAlly Construction Management Software Plans",
  description: `BuildAlly pricing for builders and interior teams: a ${formatPrice(
    priceFor(trial, "monthly").price,
  )} ${PRICING.trialDays}-day trial credited towards your subscription, Interior from ${formatPrice(
    priceFor(interior, "monthly").price,
  )}/month, and Builder from ${formatPrice(
    priceFor(builder, "monthly").price,
  )}/month (limited-period launch pricing, billed monthly or annually). Site management, attendance, expenses, treasury, documents, and reports in one construction ERP built for Indian builders.`,
  alternates: { canonical: "/pricing" },
};

// Product + Offer structured data so search engines can surface the plans.
// Annual is the default cycle, so that's what we publish.
function PricingStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.name} — Construction Management Software`,
    description: SITE.description,
    brand: { "@type": "Brand", name: SITE.name },
    offers: PRICING.plans
      .map((plan) => ({ plan, billing: priceFor(plan, "annual") }))
      .filter(({ billing }) => billing?.price)
      .map(({ plan, billing }) => ({
        "@type": "Offer",
        name: plan.name,
        price: billing.price,
        priceCurrency: PRICING.currency,
        url: `${SITE.domain}/pricing`,
        availability: "https://schema.org/InStock",
      })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function PricingPage() {
  return (
    <>
      <PricingStructuredData />

      <PageHero
        eyebrow="Pricing"
        title="Plans that scale with your sites"
        lead={`Launch pricing, for a limited period. Start with a ${PRICING.trialDays}-day paid evaluation on your real projects, then pick the plan that matches how much you're building — your trial fee comes straight off your first subscription.`}
      >
        <div className="flex flex-col items-center gap-6">
          <TrialBanner href="#plans" />
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedButton
              href={URLS.signup}
              external
              event={EVENTS.START_TRIAL}
              eventProps={{ location: "pricing_hero" }}
              variant="primary"
              size="lg"
            >
              Start 7-Day Trial <Icon name="ArrowRight" size={18} />
            </TrackedButton>
            <TrackedButton
              href={URLS.bookDemo}
              event={EVENTS.BOOK_DEMO}
              eventProps={{ location: "pricing_hero" }}
              variant="secondary"
              size="lg"
            >
              <Icon name="CalendarCheck" size={18} /> Book a Demo
            </TrackedButton>
          </div>
        </div>
      </PageHero>

      {/* Plan cards */}
      <Section tone="canvas" id="plans" containerSize="wide">
        <PricingPlans location="pricing_page" />
        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3">
          <a
            href="#add-ons"
            className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-50/70 px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-brand/45 hover:bg-brand-50"
          >
            <Icon name="Layers" size={16} />
            {ADDON_TEASER}
          </a>
          <p className="inline-flex items-center gap-2 text-sm text-slate-body">
            <Icon name="Ticket" size={16} className="shrink-0 text-brand" />
            {COUPON_NOTE}
          </p>
          <p className="max-w-2xl text-center text-sm text-slate-body">
            Prices in INR, exclusive of applicable taxes. Upgrade at any time
            without losing data — your sites, documents, and history carry over.
          </p>
        </Reveal>
      </Section>

      {/* Site Capacity Packs — grow without changing plans */}
      <Section tone="white" id="add-ons">
        <SectionHeading
          eyebrow="Site add-ons"
          title="Need more sites?"
          lead="Running out of active sites? Simply expand your capacity without changing your subscription plan."
        />
        <SiteAddOns />
      </Section>

      {/* How checkout works */}
      <Section tone="canvas" containerSize="wide">
        <SectionHeading
          eyebrow="Billing"
          title="How checkout works"
          lead="Five steps from picking a plan to an active workspace — two of them optional, none of them a surprise."
        />
        <CheckoutFlow />
      </Section>

      {/* Why the trial is paid */}
      <Section tone="white" containerSize="narrow">
        <SectionHeading
          eyebrow="The paid trial"
          title="Why is the trial paid?"
          lead={`The ${formatPrice(
            PRICING.trialCredit,
          )} is not an extra charge. It is fully adjusted against your subscription if you continue with BuildAlly.`}
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: "IndianRupee",
              title: "Fully credited",
              body: `Every rupee of the ${formatPrice(
                PRICING.trialCredit,
              )} comes off your first monthly or annual payment.`,
            },
            {
              icon: "HardHat",
              title: "Real projects",
              body: `Run up to ${trial.sites.toLowerCase()} live sites with the complete platform for ${
                PRICING.trialDays
              } days — not a sandbox.`,
            },
            {
              icon: "ShieldCheck",
              title: "Nothing is lost",
              body: "If you don't continue, your workspace turns read-only. No data is deleted.",
            },
          ].map((item) => (
            <RevealItem
              key={item.title}
              className="rounded-2xl border border-line bg-canvas p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={item.icon} size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-body">
                {item.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <blockquote className="rounded-2xl border-l-4 border-brand bg-brand-50/60 p-6">
            <p className="text-pretty text-[17px] font-medium leading-relaxed text-ink">
              Start your BuildAlly journey with a {PRICING.trialDays}-day
              professional evaluation. Your {formatPrice(PRICING.trialCredit)} is
              fully credited toward any monthly or annual subscription.
            </p>
          </blockquote>
        </Reveal>
      </Section>

      {/* Comparison table — the "Compare plans" links on each card land here. */}
      <Section tone="canvas" id="compare" containerSize="wide">
        <SectionHeading
          eyebrow="Compare plans"
          title="Every plan, side by side"
          lead="The complete platform ships with every plan — attendance, expenses, treasury, and documents from day one. Plans differ by capacity, advanced analytics, automation, and support."
        />
        <PlanComparison />
      </Section>

      {/* Storage */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Storage"
          title="Smart cloud storage"
          lead="Every plan includes secure cloud storage, managed automatically. Images are optimized before upload to save space while keeping the quality you need on site."
        />

        <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING.plans.map((plan) => (
            <RevealItem
              key={plan.id}
              className={`rounded-2xl border p-6 text-center ${
                plan.featured
                  ? "border-brand bg-brand-50/50"
                  : "border-line bg-canvas"
              }`}
            >
              <p className="text-sm font-semibold text-slate-body">
                {plan.shortName}
              </p>
              <p className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-ink">
                {plan.storage}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line bg-canvas p-6 sm:p-8">
          <p className="text-sm font-semibold text-ink">
            Your storage covers everything a site generates:
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {STORAGE_USES.map((use) => (
              <li
                key={use}
                className="flex items-center gap-2 text-[15px] text-ink-600"
              >
                <Icon
                  name="CircleCheck"
                  size={18}
                  className="shrink-0 text-brand"
                />
                {use}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-slate-body">
            If you reach your limit, uploads pause until you upgrade your plan or
            remove unused files — nothing already in your workspace is deleted.
          </p>
        </Reveal>
      </Section>

      {/* Pricing FAQ */}
      <Section tone="canvas" containerSize="narrow">
        <SectionHeading eyebrow="Pricing questions" title="Common questions" />
        <Reveal className="mt-10">
          <Accordion items={PLAN_FAQS} />
        </Reveal>
      </Section>

      {/* Closing CTA */}
      <Section tone="white" containerSize="narrow">
        <Reveal className="rounded-2xl border border-line bg-ink p-8 text-center text-white blueprint-grid-dark sm:p-10">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Not sure which plan fits?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-300">
            Book a demo and we&apos;ll map BuildAlly to how you run your sites —
            then start your {PRICING.trialDays}-day trial when it feels right.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedButton
              href={URLS.bookDemo}
              event={EVENTS.BOOK_DEMO}
              eventProps={{ location: "pricing_band" }}
              variant="white"
              size="lg"
            >
              <Icon name="CalendarCheck" size={18} /> Book a Demo
            </TrackedButton>
            <TrackedButton
              href={URLS.contactSales}
              event={EVENTS.CONTACT_SALES}
              eventProps={{ location: "pricing_band" }}
              variant="outlineLight"
              size="lg"
            >
              Contact Sales <Icon name="ArrowRight" size={18} />
            </TrackedButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
