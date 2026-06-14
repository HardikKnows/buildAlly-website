import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of BuildAlly's website and application. Template terms pending review by counsel.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Agreement to terms",
    body: [
      "These Terms of Service (\"Terms\") govern your access to and use of BuildAlly's marketing website at buildally.in and application at app.buildally.in (together, the \"Services\"). By accessing or using the Services, you agree to be bound by these Terms.",
      "If you are using the Services on behalf of an organisation, you represent that you are authorised to bind that organisation to these Terms.",
    ],
  },
  {
    heading: "The Services",
    body: [
      "BuildAlly provides a multi-tenant, cloud-based construction management platform. We may update, improve, or modify the Services over time. Certain features may be offered under different subscription plans.",
    ],
  },
  {
    heading: "Accounts & eligibility",
    body: [
      "You are responsible for safeguarding your account credentials and for all activity under your account. You must provide accurate information and promptly update it as needed. You must be capable of forming a binding contract to use the Services.",
    ],
  },
  {
    heading: "Plans, trials & billing",
    body: [
      "We offer a Free plan and paid plans, including a 14-day free trial on paid plans. Pricing shown on the website is subject to confirmation and change. Paid subscriptions renew according to the plan you select; you may cancel in accordance with your plan terms. Taxes may apply.",
    ],
  },
  {
    heading: "Acceptable use",
    body: ["You agree not to:"],
    list: [
      "Use the Services in violation of any applicable law or regulation.",
      "Attempt to gain unauthorised access to the Services or other accounts.",
      "Interfere with or disrupt the integrity or performance of the Services.",
      "Reverse engineer or misuse the Services except as permitted by law.",
    ],
  },
  {
    heading: "Your data",
    body: [
      "You retain ownership of the data you submit to the Services (\"Customer Data\"). You grant us a limited licence to host, process, and use Customer Data solely to provide and improve the Services. Our handling of personal information is described in our Privacy Policy.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The Services, including all software, design, and content (excluding Customer Data), are owned by BuildAlly and protected by intellectual property laws. These Terms do not grant you any rights other than the limited right to use the Services as permitted.",
    ],
  },
  {
    heading: "Confidentiality & security",
    body: [
      "We apply reasonable technical and organisational measures to protect the Services, including tenant isolation, access controls, and audit logging. You are responsible for configuring access within your workspace appropriately.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The Services are provided \"as is\" and \"as available\" without warranties of any kind, whether express or implied, to the fullest extent permitted by law.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, BuildAlly will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of the Services.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "You may stop using the Services at any time. We may suspend or terminate access if you breach these Terms or to protect the Services. Upon termination, your right to use the Services ends; certain provisions survive termination.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These Terms are governed by the laws applicable in India, without regard to conflict-of-laws principles. Jurisdiction and venue are to be confirmed by counsel.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may modify these Terms from time to time. If we make material changes, we will provide notice as appropriate. Continued use of the Services after changes take effect constitutes acceptance.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these Terms? Contact us at ${CONTACT.general}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="14 June 2026"
      intro="These terms set out the rules for using BuildAlly. Please read them carefully."
      sections={SECTIONS}
    />
  );
}
