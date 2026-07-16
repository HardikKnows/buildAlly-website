import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BuildAlly collects, uses, stores, and protects your information when you use our website and construction management platform.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Introduction",
    body: [
      "BuildAlly provides construction management software via buildally.in and app.buildally.in. Use of the Services constitutes acceptance of this Privacy Policy.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "We collect various types of information to provide and improve our Services:",
    ],
    list: [
      "Account information: name, email, phone, company, member ID, role.",
      "Project/business data: sites, expenses, payments, attendance, documents, photos, comments.",
      "Device information: device type, operating system, browser, IP address, app version, diagnostics.",
      "Location information: used with your permission for attendance verification, geofencing, site verification, and location-based photo validation.",
    ],
  },
  {
    heading: "Camera and Photos",
    body: [
      "We may request camera access to capture construction progress and site photos. Photos may include capture time and location metadata where required for verification purposes.",
    ],
  },
  {
    heading: "Documents and Files",
    body: [
      "Users may upload PDFs, images, drawings, contracts, and office documents. These files are stored securely and accessible only to authorized users according to role-based permissions.",
    ],
  },
  {
    heading: "How We Use Information",
    body: [
      "We use collected information to:",
    ],
    list: [
      "Provide and operate our Services.",
      "Authenticate users and manage access.",
      "Support project and attendance management.",
      "Manage documents, expenses, and payments.",
      "Enhance security and prevent fraud.",
      "Provide customer support.",
      "Improve performance and features.",
      "Comply with legal obligations.",
    ],
  },
  {
    heading: "Data Storage",
    body: [
      "Data may be securely stored using trusted cloud providers including MongoDB Atlas, Cloudinary, Railway, Vercel, and Razorpay (for payment processing).",
    ],
  },
  {
    heading: "Data Sharing",
    body: [
      "BuildAlly does not sell personal information. We only share data with authorized organization users, trusted infrastructure providers, or when legally required.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We implement administrative, technical, and organizational safeguards to protect your data. However, no internet transmission or storage is completely secure.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We retain data only as necessary to provide our Services, meet legal obligations, maintain security, and support business operations.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You have rights to access, correct, delete, and export your data, and to withdraw permissions where applicable. Contact BuildAlly to exercise these rights or for privacy inquiries.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "BuildAlly is intended for business and professional use and is not directed to children under 13 years of age.",
    ],
  },
  {
    heading: "Third-Party Services",
    body: [
      "Our integrations may include Google Play Services, Razorpay, Cloudinary, and MongoDB Atlas, each governed by their own privacy policies.",
    ],
  },
  {
    heading: "Changes to this Policy",
    body: [
      "We may update this Privacy Policy from time to time. Updates will be posted with a revised \"Last Updated\" date.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      `For questions about this Privacy Policy or our privacy practices, contact us at ${CONTACT.general}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="13 July 2026"
      intro="This Privacy Policy explains how BuildAlly collects, uses, stores, and protects information when you use our website, mobile application, and related services."
      sections={SECTIONS}
    />
  );
}
