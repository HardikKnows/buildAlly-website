import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Problem } from "@/components/home/Problem";
import {
  Tier1Features,
  GpsSection,
  Tier2Features,
  Tier3Features,
} from "@/components/home/FeatureSections";
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
    "BuildAlly is construction management software for builders and interior designers. Manage projects, GPS attendance, salaries, treasury, expenses, documents and site progress from one platform. Start a 7-day trial.",
  alternates: { canonical: "/" },
};

// Section order follows the Tier 1/2/3 feature hierarchy: the strongest
// differentiators (sites, attendance, payroll, treasury, spend, then GPS
// verification) come first, supporting capabilities come later.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Problem />
      <Tier1Features />
      <GpsSection />
      <Tier2Features />
      <MobileExperience />
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
