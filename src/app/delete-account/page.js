import { LegalPage } from "@/components/site/LegalPage";
import { SUPPORT_EMAIL } from "@/lib/email";

export const metadata = {
  title: "Delete Account",
  description:
    "Learn how to request deletion of your BuildAlly account and associated personal information.",
  alternates: { canonical: "/delete-account" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    heading: "Request Account Deletion",
    body: [
      "Users who wish to permanently delete their BuildAlly account may submit an account deletion request.",
    ],
  },
  {
    heading: "How to Request Deletion",
    body: [
      `To request account deletion, email ${SUPPORT_EMAIL} with the subject line "Account Deletion Request". Include the following details:`,
    ],
    list: [
      "Registered email address",
      "Company name",
      "Member ID (if available)",
    ],
  },
  {
    heading: "What Will Be Deleted",
    body: [
      "BuildAlly will delete or anonymize personal account information including:",
    ],
    list: [
      "User profile",
      "Login credentials",
      "Personal information",
      "Device tokens",
      "Notification preferences",
    ],
  },
  {
    heading: "What May Be Retained",
    body: [
      "Because BuildAlly is a multi-company construction management platform, some business records may be retained where necessary, including:",
      "These records may remain available to the organization for legal, accounting, audit, contractual, or operational purposes.",
    ],
    list: [
      "Project history",
      "Expense approvals",
      "Payment approvals",
      "Attendance records",
      "Site activity logs",
      "Documents uploaded on behalf of an organization",
    ],
  },
  {
    heading: "Processing Time",
    body: [
      "Deletion requests are typically processed within 7 business days after identity verification.",
    ],
  },
  {
    heading: "Contact",
    body: [
      SUPPORT_EMAIL,
      "If additional verification is required, the BuildAlly support team may contact the requester.",
    ],
  },
];

export default function DeleteAccountPage() {
  return (
    <LegalPage
      title="Delete Account"
      updated="13 July 2026"
      intro="This page explains how BuildAlly users can request deletion of their account and associated personal information."
      sections={SECTIONS}
    />
  );
}
