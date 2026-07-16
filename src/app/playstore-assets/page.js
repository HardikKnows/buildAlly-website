import { BrowserFrame, PhoneFrame } from "@/components/ui/Frames";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import {
  PanelApprovals,
  PanelDocuments,
  PanelFinance,
  PanelPayroll,
  PanelSiteHub,
} from "@/components/mockups/Panels";

export const metadata = {
  title: "Play Store Assets",
  description: "Temporary BuildAlly page for generating Google Play Store assets.",
  robots: { index: false, follow: false },
};

const PRODUCT_PANELS = [
  { id: "site-hub", url: "app.buildally.in/sites", Panel: PanelSiteHub },
  { id: "finance", url: "app.buildally.in/finance", Panel: PanelFinance },
  { id: "payroll", url: "app.buildally.in/payroll", Panel: PanelPayroll },
  { id: "documents", url: "app.buildally.in/documents", Panel: PanelDocuments },
  { id: "approvals", url: "app.buildally.in/approvals", Panel: PanelApprovals },
];

function AssetSection({ id, children }) {
  return (
    <section
      id={id}
      className="flex min-h-screen items-center justify-center bg-white px-6 py-24"
    >
      {children}
    </section>
  );
}

export default function PlayStoreAssetsPage() {
  return (
    <main id="main" className="bg-white">
      <AssetSection id="hero-phone-mockup">
        <PhoneFrame>
          <PhoneMockup />
        </PhoneFrame>
      </AssetSection>

      <AssetSection id="dashboard-mockup">
        <div className="w-full max-w-5xl">
          <BrowserFrame>
            <DashboardMockup />
          </BrowserFrame>
        </div>
      </AssetSection>

      <AssetSection id="product-screenshots">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCT_PANELS.map(({ id, url, Panel }) => (
            <BrowserFrame key={id} url={url}>
              <Panel />
            </BrowserFrame>
          ))}
        </div>
      </AssetSection>

      <AssetSection id="mobile-experience">
        <PhoneFrame>
          <PhoneMockup />
        </PhoneFrame>
      </AssetSection>

      <AssetSection id="dashboard-showcase">
        <div className="w-full max-w-6xl">
          <BrowserFrame>
            <DashboardMockup />
          </BrowserFrame>
        </div>
      </AssetSection>
    </main>
  );
}
