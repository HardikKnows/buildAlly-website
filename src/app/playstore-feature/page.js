import { BrowserFrame } from "@/components/ui/Frames";
import { LogoMark } from "@/components/ui/Logo";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";

export const metadata = {
  title: "Play Store Feature Graphic",
  description: "Temporary BuildAlly page for exporting the Play Store feature graphic.",
  robots: { index: false, follow: false },
};

export default function PlayStoreFeaturePage() {
  return (
    <main id="main" className="min-h-screen bg-white">
      <section className="blueprint-grid h-[500px] w-[1024px] overflow-hidden bg-white">
        <div className="grid h-full grid-cols-[325px_1fr] items-center gap-7 px-11 py-10">
          <div className="min-w-0">
            <div className="flex items-center gap-4 font-display text-[2.6rem] font-bold tracking-tight">
              <LogoMark size={74} />
              <span className="leading-none">
                <span className="text-ink">Build</span>
                <span className="text-brand">Ally</span>
              </span>
            </div>

            <h1 className="mt-12 text-balance font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink">
              Construction Management Software
            </h1>

            <p className="mt-7 text-xl font-semibold leading-relaxed text-ink-600">
              Projects <span className="text-brand">•</span> Workforce{" "}
              <span className="text-brand">•</span> Expenses{" "}
              <span className="text-brand">•</span> Documents
            </p>
          </div>

          <div className="w-full">
            <BrowserFrame>
              <DashboardMockup />
            </BrowserFrame>
          </div>
        </div>
      </section>
    </main>
  );
}
