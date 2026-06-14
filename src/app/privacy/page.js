import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How BuildAlly collects, uses, and protects your information. Template policy pending review by counsel.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Introduction",
    body: [
      "BuildAlly (\"BuildAlly\", \"we\", \"us\", or \"our\") provides construction management software. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our marketing website at buildally.in or use our application at app.buildally.in (together, the \"Services\").",
      "By using the Services, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    heading: "Information we collect",
    body: ["We may collect the following categories of information:"],
    list: [
      "Account and contact information you provide (name, company, email, phone) when signing up, booking a demo, or contacting us.",
      "Business data you add to the application (sites, expenses, payments, documents, team members).",
      "Usage and device information, such as pages visited, actions taken, browser type, and IP address, collected via cookies and similar technologies.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We use the information we collect to:"],
    list: [
      "Provide, operate, maintain, and improve the Services.",
      "Respond to demo requests, support enquiries, and other communications.",
      "Send service-related and, with your consent, marketing communications.",
      "Monitor and analyse usage to improve security, performance, and features.",
      "Comply with legal obligations and enforce our terms.",
    ],
  },
  {
    heading: "Data security & tenant isolation",
    body: [
      "BuildAlly is designed with security in mind, including strict per-company tenant isolation, role-based access control, audit logging, and session management. We apply administrative, technical, and physical safeguards appropriate to the sensitivity of the data.",
      "No method of transmission or storage is completely secure; we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Data sharing & disclosure",
    body: [
      "We do not sell your personal information. We may share information with service providers who process data on our behalf, when required by law, or in connection with a business transfer, subject to appropriate safeguards.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain information for as long as your account is active or as needed to provide the Services, comply with legal obligations, resolve disputes, and enforce agreements. Free-tier limits do not delete your data.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Subject to applicable law, you may have the right to access, correct, export, or delete your personal information, and to object to or restrict certain processing. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use cookies and similar technologies to operate the site, remember preferences, and measure performance. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "The Services are intended for businesses and are not directed to children under the age required by applicable law. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. We will post the updated version with a revised \"Last updated\" date.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have questions about this Privacy Policy or our data practices, contact us at ${CONTACT.general}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="14 June 2026"
      intro="Your trust matters. This policy explains what information we collect and how we use and protect it."
      sections={SECTIONS}
    />
  );
}
