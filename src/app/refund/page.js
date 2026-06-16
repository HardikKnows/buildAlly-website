import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = {
  title: "Refund Policy",
  description:
    "BuildAlly's refund policy for subscriptions and trials. Template policy pending review by counsel.",
  alternates: { canonical: "/refund" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Overview",
    body: [
      "This Refund Policy explains how refunds work for paid subscriptions to BuildAlly (the \"Services\"). It applies alongside our Terms of Service. By subscribing, you agree to this policy.",
    ],
  },
  {
    heading: "Try before you pay",
    body: [
      "We encourage you to evaluate BuildAlly before purchasing. You can explore our interactive demo at no cost, and a 7-day trial is available after account verification. This lets you confirm BuildAlly fits your business before any payment is made.",
    ],
  },
  {
    heading: "Subscription charges",
    body: [
      "Paid subscriptions are billed in advance for the applicable billing period (for example, monthly or annually). Charges begin when you start a paid subscription after your trial or upon selecting a paid plan.",
    ],
  },
  {
    heading: "Refund eligibility",
    body: [
      "Because a free interactive demo and a trial are available before purchase, fees are generally non-refundable except where required by applicable law. We may, at our discretion, consider refund requests in cases such as:",
    ],
    list: [
      "A duplicate or accidental charge.",
      "A technical billing error attributable to BuildAlly.",
      "A documented inability to access the Services caused by us and not resolved within a reasonable time.",
    ],
  },
  {
    heading: "Non-refundable items",
    body: ["The following are generally not eligible for a refund:"],
    list: [
      "Partial or unused portions of a billing period after cancellation.",
      "Renewals where cancellation was not made before the renewal date.",
      "Add-ons, custom onboarding, or professional services already delivered.",
    ],
  },
  {
    heading: "Cancellations",
    body: [
      "You can cancel your subscription at any time. Cancellation stops future renewals; it does not automatically refund the current billing period. After a subscription ends, you retain read-only access to your workspace, and your data is not deleted.",
    ],
  },
  {
    heading: "How to request a refund",
    body: [
      `To request a refund, contact us at ${CONTACT.support} with your account details and the reason for the request, ideally within 7 days of the charge. We aim to review and respond to refund requests promptly.`,
    ],
  },
  {
    heading: "Processing",
    body: [
      "Approved refunds are issued to the original payment method. The time for the refund to appear depends on your payment provider.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Refund Policy from time to time. We will post the updated version with a revised \"Last updated\" date.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about refunds? Contact us at ${CONTACT.support}.`],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="17 June 2026"
      intro="How refunds work for BuildAlly subscriptions and trials."
      sections={SECTIONS}
    />
  );
}
