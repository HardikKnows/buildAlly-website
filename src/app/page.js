import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { InteractiveDemo } from "@/components/home/InteractiveDemo";
import { Problem } from "@/components/home/Problem";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { Showcase } from "@/components/home/Showcase";
import { RoleBased } from "@/components/home/RoleBased";
import { DashboardShowcase } from "@/components/home/DashboardShowcase";
import { MobileExperience } from "@/components/home/MobileExperience";
import { WhyOwners } from "@/components/home/WhyOwners";
import { EarlyAccess } from "@/components/home/EarlyAccess";
import { PricingPreview } from "@/components/home/PricingPreview";
import { HomeFAQ } from "@/components/home/HomeFAQ";

export const metadata = {
  title: "BuildAlly — Construction Management Software for Modern Builders",
  description:
    "Run your construction business from one place. Manage projects, expenses, payroll, documents, approvals, and teams with BuildAlly. Try the interactive demo — no setup required.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <InteractiveDemo />
      <Problem />
      <HowItWorks />
      <FeatureHighlights />
      <Showcase />
      <RoleBased />
      <DashboardShowcase />
      <MobileExperience />
      <WhyOwners />
      <EarlyAccess />
      <PricingPreview />
      <HomeFAQ />
      {/* Final CTA band + Footer render globally via the root layout's Footer. */}
    </>
  );
}
