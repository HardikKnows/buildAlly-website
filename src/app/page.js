import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { Problem } from "@/components/home/Problem";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { ProductScreenshots } from "@/components/home/ProductScreenshots";
import { DashboardShowcase } from "@/components/home/DashboardShowcase";
import { MobileExperience } from "@/components/home/MobileExperience";
import { WhyOwners } from "@/components/home/WhyOwners";
import { PricingPreview } from "@/components/home/PricingPreview";
import { HomeFAQ } from "@/components/home/HomeFAQ";

export const metadata = {
  title: "BuildAlly — Construction Management Software for Modern Builders",
  description:
    "Run your entire construction business from one place. BuildAlly unifies sites, money, teams, and documents with real-time visibility and a mobile app built for the field. Free plan available.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <FeatureHighlights />
      <ProductScreenshots />
      <DashboardShowcase />
      <MobileExperience />
      <WhyOwners />
      <PricingPreview />
      <HomeFAQ />
      {/* Section 12 (Final CTA Band) + Section 13 (Footer) render globally via the root layout's Footer. */}
    </>
  );
}
