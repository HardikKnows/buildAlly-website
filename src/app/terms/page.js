import { LegalPage } from "@/components/site/LegalPage";
import { SUPPORT_EMAIL } from "@/lib/email";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of BuildAlly's website, mobile application, and construction management platform.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Agreement to Terms",
    body: [
      "By accessing or using BuildAlly's services, you accept and agree to be bound by these Terms of Service. If you are using the Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.",
    ],
  },
  {
    heading: "Services",
    body: [
      "BuildAlly provides a cloud-based construction management platform. Features and services may be updated, modified, or discontinued at any time without prior notice.",
    ],
  },
  {
    heading: "Accounts & Eligibility",
    body: [
      "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    ],
  },
  {
    heading: "Subscriptions & Billing",
    body: [
      "BuildAlly offers various subscription plans and trial periods. Subscriptions are billed in advance and renew automatically unless cancelled. Accounts may be suspended for non-payment but customer data will not be automatically deleted upon suspension.",
    ],
  },
  {
    heading: "Acceptable Use",
    body: [
      "You agree not to engage in illegal activities, attempt unauthorized access, distribute malware, reverse engineer the platform, or abuse the Services in any way.",
    ],
  },
  {
    heading: "Customer Data",
    body: [
      "You retain ownership of all data you upload to the Services. BuildAlly receives a limited license solely to host, process, and operate the Services. Our Privacy Policy governs the handling of your personal information.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "BuildAlly owns all software, branding, and platform content, excluding customer data. These Terms do not grant you any rights other than the limited right to use the Services as permitted.",
    ],
  },
  {
    heading: "Confidentiality & Security",
    body: [
      "We implement reasonable technical and organizational safeguards, including role-based access controls and tenant isolation, to protect your data and the integrity of the Services.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "The Services may integrate with third-party providers such as MongoDB Atlas, Cloudinary, Razorpay, Google Play Services, and others, each governed by their own terms and privacy policies.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The Services are provided \"as is\" and \"as available\" without warranties of any kind, either express or implied.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, BuildAlly shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Services.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "You may stop using the Services at any time. BuildAlly may suspend or terminate your account for violations of these Terms or for security reasons.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These Terms are governed by the laws of India without regard to conflict-of-laws principles.",
    ],
  },
  {
    heading: "Changes to Terms",
    body: [
      "We may update these Terms from time to time. Updated terms become effective when published. Continued use of the Services constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions regarding these Terms may be sent to ${SUPPORT_EMAIL}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="13 July 2026"
      intro="These Terms of Service govern your access to and use of BuildAlly's website, mobile application, and related services."
      sections={SECTIONS}
    />
  );
}
