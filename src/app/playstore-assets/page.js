import { BrowserFrame, PhoneFrame } from "@/components/ui/Frames";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import {
  PanelDocuments,
  PanelFinance,
  PanelSiteHub,
} from "@/components/mockups/Panels";

export const metadata = {
  title: "Play Store Assets",
  description: "Temporary BuildAlly page for generating Google Play Store assets.",
  robots: { index: false, follow: false },
};

function AssetSection({ id, children }) {
  return (
    <section
      id={id}
      data-export
      className="flex min-h-screen items-center justify-center bg-white px-6 py-24"
    >
      {children}
    </section>
  );
}

export default function PlayStoreAssetsPage() {
  return (
    <main id="main" className="bg-white">
      <AssetSection id="dashboard-mockup">
        <div className="w-full max-w-5xl">
          <BrowserFrame>
            <DashboardMockup />
          </BrowserFrame>
        </div>
      </AssetSection>

      <AssetSection id="mobile-experience">
        <PhoneFrame>
          <PhoneMockup />
        </PhoneFrame>
      </AssetSection>

      <AssetSection id="projects-screenshot">
        <div className="w-full max-w-3xl">
          <BrowserFrame url="app.buildally.in/sites">
            <PanelSiteHub />
          </BrowserFrame>
        </div>
      </AssetSection>

      <AssetSection id="documents-screenshot">
        <div className="w-full max-w-3xl">
          <BrowserFrame url="app.buildally.in/documents">
            <PanelDocuments />
          </BrowserFrame>
        </div>
      </AssetSection>

      <AssetSection id="expenses-screenshot">
        <div className="w-full max-w-3xl">
          <BrowserFrame url="app.buildally.in/finance">
            <PanelFinance />
          </BrowserFrame>
        </div>
      </AssetSection>
    </main>
  );
}
