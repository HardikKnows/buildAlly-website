import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Problem } from "@/components/home/Problem";
import {
  Tier1Features,
  GpsSection,
  Tier2Features,
  Tier3Features,
} from "@/components/home/FeatureSections";
import { AISection } from "@/components/home/AISection";
import { RoleExperience } from "@/components/home/RoleExperience";
import { Lifecycle, TaskSystem } from "@/components/home/Lifecycle";
import { MobileExperience } from "@/components/home/MobileExperience";
import { WhyBuildAlly } from "@/components/home/WhyBuildAlly";
import { CustomerJourney } from "@/components/home/CustomerJourney";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ScaleAsYouGrow } from "@/components/home/ScaleAsYouGrow";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { TeamSection } from "@/components/home/TeamSection";

export const metadata = {
  title: "BuildAlly — Construction Management Software for Modern Builders",
  description:
    "BuildAlly is a construction management platform for construction companies. Manage sites, teams, construction schedules, expenses, documents, agreements and daily operations from one platform — with AI-powered construction intelligence included. Book a demo.",
  alternates: { canonical: "/" },
};

// Section order: platform core first (Tier 1, GPS verification), then the AI
// differentiator, the rest of the platform, roles, mobile, and the lifecycle
// story — pricing and FAQs close the page.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <Tier1Features />
      <GpsSection />
      <AISection />
      <Tier2Features />
      <RoleExperience />
      <MobileExperience />
      <Lifecycle />
      <TaskSystem />
      <Tier3Features />
      <WhyBuildAlly />
      <CustomerJourney />
      <PricingPreview />
      <ScaleAsYouGrow />
      <HomeFAQ />
      <TeamSection />
      {/* Final CTA band + Footer render globally via the root layout's Footer. */}
    </>
  );
}
