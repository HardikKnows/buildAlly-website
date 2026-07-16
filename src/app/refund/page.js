import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = {
  title: "Refund Policy",
  description:
    "BuildAlly's refund policy for subscriptions, billing, cancellations, and payment disputes.",
  alternates: { canonical: "/refund" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Overview",
    body: [
      "This policy applies to all paid BuildAlly subscriptions and related services.",
    ],
  },
  {
    heading: "Free Trial & Demo",
    body: [
      "Customers are encouraged to evaluate the platform through demos and any available trial before purchasing.",
    ],
  },
  {
    heading: "Subscription Billing",
    body: [
      "Subscriptions are billed in advance on monthly or annual plans and renew unless cancelled.",
    ],
  },
  {
    heading: "Refund Eligibility",
    body: [
      "Fees are generally non-refundable because customers can evaluate before purchase, but BuildAlly may approve refunds for duplicate charges, billing errors caused by BuildAlly, or prolonged service outages attributable to BuildAlly.",
    ],
  },
  {
    heading: "Non-Refundable Charges",
    body: [
      "Unused subscription periods, missed cancellations before renewal, implementation, onboarding, consulting, custom development, and third-party fees are non-refundable.",
    ],
  },
  {
    heading: "Cancellations",
    body: [
      "Customers may cancel future renewals at any time. Cancellation does not refund the current billing cycle, and customer data is not automatically deleted after cancellation or suspension.",
    ],
  },
  {
    heading: "Refund Request Process",
    body: [
      `Refund requests should be submitted to ${CONTACT.support} with account details, payment information, and the reason for the request. We aim to review requests promptly.`,
    ],
  },
  {
    heading: "Refund Processing",
    body: [
      "Approved refunds are returned to the original payment method and processing time depends on the payment provider.",
    ],
  },
  {
    heading: "Changes to this Policy",
    body: [
      "Updates become effective when published with a revised Last Updated date.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions regarding billing or refunds may be sent to ${CONTACT.support}.`,
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="13 July 2026"
      intro="This Refund Policy explains how subscription billing, cancellations, and refund requests are handled for BuildAlly services."
      sections={SECTIONS}
    />
  );
}
