import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { TrackView } from "@/components/ui/TrackView";
import { SignupButton } from "@/components/ui/SignupLink";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PlanComparison } from "@/components/pricing/PlanComparison";
import { SiteAddOns } from "@/components/pricing/SiteAddOns";
import { CheckoutFlow } from "@/components/pricing/CheckoutFlow";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { EnterpriseForm } from "@/components/pricing/EnterpriseForm";
import { SITE, URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { PLAN_FAQS } from "@/lib/content";
import { SUPPORT_EMAIL, supportMailto } from "@/lib/email";
import {
  CURRENCY,
  TRIAL,
  PAID_PLANS,
  GROWTH_SITES,
  ENTERPRISE_MIN_SITES,
  STARTING_PRICE,
  STARTING_PRICE_QUALIFIER,
  KEY_HOLDER_NOTE,
  AI_INCLUDED_NOTE,
  TAX_NOTE,
  CHECKOUT_NOTE,
  TRIAL_CTA_LABEL,
  INCLUDED_ON_EVERY_PLAN,
  formatPrice,
  getPlan,
  priceFor,
  joinOr,
} from "@/lib/pricing";

// Every figure on this page comes from @/lib/pricing — no duplicated numbers.

const STARTING_FROM = `${formatPrice(STARTING_PRICE.monthlyEquivalent)}/month`;
const ENTERPRISE = getPlan("enterprise");
const MAX_STANDARD_SITES = ENTERPRISE_MIN_SITES - 1;

const TITLE = "Pricing — Construction Management Software Plans";
const SOCIAL_TITLE = `BuildAlly Pricing — Plans from ${STARTING_FROM}, billed annually`;
const DESCRIPTION = `BuildAlly plans start at ${STARTING_FROM}, billed annually at ${formatPrice(
  STARTING_PRICE.annual,
)} (${formatPrice(STARTING_PRICE.monthly)}/month billed monthly). Compare ${PAID_PLANS.map(
  (p) => p.name,
).join(", ")} for up to ${MAX_STANDARD_SITES} active sites, talk to us about Enterprise beyond that, or start a ${
  TRIAL.days
}-day paid trial for ${formatPrice(TRIAL.price)}.`;
const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "BuildAlly — Construction Management Software for Modern Builders",
};

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  // A page-level openGraph replaces the layout's entirely, so it is restated
  // in full here rather than only overriding the title and description.
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE.domain}/pricing`,
    siteName: SITE.name,
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
};

// Product + Offer structured data: the trial plus every plan on both billing
// periods, each with its billing duration so a monthly and an annual price can
// never be read as the same thing.
function PricingStructuredData() {
  const offers = [
    {
      "@type": "Offer",
      name: `${TRIAL.name} — ${TRIAL.days}-day paid trial`,
      price: TRIAL.price,
      priceCurrency: CURRENCY.code,
      url: `${SITE.domain}/pricing#trial`,
      availability: "https://schema.org/InStock",
    },
    ...PAID_PLANS.flatMap((plan) =>
      ["monthly", "annual"].map((cycle) => ({
        "@type": "Offer",
        name: `BuildAlly ${plan.name} — ${cycle} billing`,
        price: priceFor(plan, cycle),
        priceCurrency: CURRENCY.code,
        url: `${SITE.domain}/pricing`,
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: priceFor(plan, cycle),
          priceCurrency: CURRENCY.code,
          billingDuration: cycle === "monthly" ? "P1M" : "P1Y",
          unitText: cycle === "monthly" ? "MONTH" : "YEAR",
          valueAddedTaxIncluded: true,
        },
      })),
    ),
  ];

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE.name} — Construction Management Software`,
    description: SITE.description,
    brand: { "@type": "Brand", name: SITE.name },
    offers,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const TRIAL_FACTS = [
  { icon: "IndianRupee", value: formatPrice(TRIAL.price), label: "Trial price" },
  { icon: "CalendarDays", value: `${TRIAL.days} days`, label: "Trial length" },
  { icon: "Building2", value: TRIAL.sites, label: "Active sites" },
  {
    icon: "Users",
    value: TRIAL.members,
    label: "Team members",
    note: KEY_HOLDER_NOTE.short,
  },
];

export default function PricingPage() {
  return (
    <>
      <PricingStructuredData />
      <TrackView
        event={EVENTS.PRICING_VIEW}
        eventProps={{ location: "pricing_page" }}
      />

      {/* A. Hero */}
      <PageHero
        eyebrow="Pricing"
        title="Keep every site, and every rupee, under control"
        lead="BuildAlly brings your sites, teams, expenses and documents into one platform — with plans sized for growing construction companies."
      >
        <div className="flex flex-col items-center gap-7">
          {/* The starting price never appears without its qualifier. */}
          <div className="w-full max-w-xl rounded-2xl border border-brand/20 bg-white/85 px-6 py-5 shadow-sm backdrop-blur">
            <p className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Plans starting at <span className="text-brand">{STARTING_FROM}</span>
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink">
                {STARTING_PRICE_QUALIFIER}
              </strong>{" "}
              Prefer monthly billing? {STARTING_PRICE.planName} is{" "}
              {formatPrice(STARTING_PRICE.monthly)}/month.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <SignupButton
              eventProps={{ location: "pricing_hero" }}
              variant="primary"
              size="lg"
            >
              {TRIAL_CTA_LABEL} <Icon name="ArrowRight" size={18} />
            </SignupButton>
            <TrackedButton
              href="#plans"
              event={EVENTS.EXPLORE_PLANS}
              eventProps={{ location: "pricing_hero" }}
              variant="secondary"
              size="lg"
            >
              Compare plans <Icon name="ArrowDown" size={18} />
            </TrackedButton>
          </div>

          <p className="text-sm text-slate-body">
            The trial is paid: {formatPrice(TRIAL.price)} for {TRIAL.days} days,
            with {TRIAL.sites} active sites and {TRIAL.members} team members.{" "}
            <span className="whitespace-nowrap">
              Already a customer?{" "}
              <a
                href={URLS.login}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline-offset-2 hover:underline"
              >
                Log in
              </a>
            </span>
          </p>
        </div>
      </PageHero>

      {/* B + C. Billing selector and plan cards */}
      <Section tone="canvas" id="plans" containerSize="wide">
        <SectionHeading
          eyebrow="Plans"
          title="Choose by how many sites you run"
          lead="Every plan includes the complete BuildAlly platform. Plans differ by active sites, team members and storage."
        />
        <PricingPlans location="pricing_page" className="mt-12" />

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-body">
          {CHECKOUT_NOTE}
        </p>

        {/* Key holders — explicit, beside the plans that state the limits. */}
        <div id="key-holders" className="mx-auto mt-8 max-w-3xl scroll-mt-24">
          <Reveal className="rounded-2xl border border-brand/25 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name="KeyRound" size={21} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold text-ink">
                  {KEY_HOLDER_NOTE.headline}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                  {KEY_HOLDER_NOTE.body}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">
                  {KEY_HOLDER_NOTE.detail}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-2 text-center text-sm text-slate-body">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="Sparkles" size={15} className="shrink-0 text-brand" />
            {AI_INCLUDED_NOTE}
          </span>
          <span>
            {TAX_NOTE} Already a customer?{" "}
            <a
              href={URLS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Log in to manage your plan
            </a>
            .
          </span>
        </Reveal>
      </Section>

      {/* D. Growth site add-ons */}
      <Section tone="white" id="add-ons">
        <SectionHeading
          eyebrow="Growth site add-ons"
          title={`Need more than ${GROWTH_SITES.included} sites on Growth?`}
          lead={`Add active sites to Growth one at a time — up to ${GROWTH_SITES.max} in total — without moving to a bigger plan.`}
        />
        <SiteAddOns />
      </Section>

      {/* Which plan covers a given number of sites */}
      <Section tone="canvas" id="find-your-plan">
        <SectionHeading
          eyebrow="Find your plan"
          title="Which plan fits your sites?"
          lead="Enter how many active sites you run to see the plan that covers them, with monthly and annual prices."
        />
        <PricingCalculator />
      </Section>

      {/* E. Paid trial */}
      <Section tone="white" id="trial" containerSize="wide">
        <SectionHeading
          eyebrow="Paid trial"
          title={`Try BuildAlly on your real sites for ${TRIAL.days} days`}
          lead={`The trial costs ${formatPrice(
            TRIAL.price,
          )} — it isn't free — and gives your team the complete platform on live projects.`}
        />

        <RevealGroup className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          {TRIAL_FACTS.map((fact) => (
            <RevealItem
              key={fact.label}
              className="rounded-2xl border border-line bg-canvas p-5 text-center"
            >
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={fact.icon} size={20} />
              </span>
              <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink">
                {fact.value}
              </p>
              <p className="mt-0.5 text-sm text-slate-body">{fact.label}</p>
              {fact.note && (
                <p className="mt-1 text-xs font-medium text-brand">{fact.note}</p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-8 max-w-3xl rounded-2xl border-l-4 border-brand bg-brand-50/60 p-6">
          <h3 className="font-display text-base font-semibold text-ink">
            After your trial
          </h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
            When the {TRIAL.days} days end, choose the plan that fits —{" "}
            {joinOr(PAID_PLANS.map((p) => p.name))}, billed monthly or
            annually. Until you subscribe, your workspace is read-only: nothing
            you added is deleted. You can also skip the trial and subscribe to a
            plan straight away.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SignupButton
            eventProps={{ location: "pricing_trial" }}
            variant="primary"
            size="lg"
          >
            {TRIAL_CTA_LABEL} <Icon name="ArrowRight" size={18} />
          </SignupButton>
        </Reveal>

        <h3 className="mt-16 text-center font-display text-xl font-bold text-ink">
          How signing up works
        </h3>
        <CheckoutFlow className="mt-8" />
      </Section>

      {/* Comparison table — capacity side by side. */}
      <Section tone="canvas" id="compare" containerSize="wide">
        <SectionHeading
          eyebrow="Compare plans"
          title="Every plan, side by side"
          lead="Plans differ by capacity — active sites, team members and storage. The platform itself is the same on every plan."
        />
        <PlanComparison />

        <Reveal className="mx-auto mt-10 max-w-4xl rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h3 className="font-display text-base font-semibold text-ink">
            Included on every plan
          </h3>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {INCLUDED_ON_EVERY_PLAN.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15px] text-ink-600"
              >
                <Icon
                  name="CircleCheck"
                  size={18}
                  className="mt-0.5 shrink-0 text-brand"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* F. Enterprise */}
      <Section tone="white" id="enterprise">
        <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
              {ENTERPRISE.name}
            </p>
            <h2 className="text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Need more than {MAX_STANDARD_SITES} sites? Talk to our team.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-body">
              {ENTERPRISE.tagline}
            </p>
            <ul className="mt-6 space-y-3">
              {ENTERPRISE.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] text-ink-600"
                >
                  <Icon name="Check" size={17} className="mt-0.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl border border-line bg-canvas p-5 text-sm leading-relaxed text-slate-body">
              Prefer email? Write to{" "}
              <a
                href={supportMailto("Enterprise enquiry")}
                className="font-semibold text-brand underline-offset-2 hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              with roughly how many active sites you run.
            </p>
          </Reveal>

          <Reveal y={24} delay={0.1} className="lg:col-span-3">
            <EnterpriseForm location="pricing_enterprise" />
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="canvas" id="faq" containerSize="narrow">
        <SectionHeading eyebrow="Pricing questions" title="Common questions" />
        <Reveal className="mt-10">
          <Accordion items={PLAN_FAQS} />
        </Reveal>
      </Section>
    </>
  );
}
