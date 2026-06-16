import { Container } from "@/components/ui/Container";
import { CTAGroup } from "@/components/ui/CTAGroup";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame, PhoneFrame } from "@/components/ui/Frames";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { Icon } from "@/components/ui/Icon";

const TRUST = [
  { icon: "MapPin", label: "Built for Indian builders" },
  { icon: "WifiOff", label: "Works offline" },
  { icon: "ShieldCheck", label: "Enterprise-grade security" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] hero-glow" />
      <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-600 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-success" />
              The operating system for construction companies
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Run your construction business{" "}
              <span className="text-gradient-brand">from one place</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-body sm:text-xl">
              Manage projects, expenses, payroll, documents, approvals, and
              teams with BuildAlly — one platform with real-time visibility for
              every role.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CTAGroup align="center" className="mt-9" />
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {TRUST.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-1.5 text-sm font-medium text-ink-600"
                >
                  <Icon name={t.icon} size={16} className="text-brand" />
                  {t.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Product visual */}
        <Reveal delay={0.15} y={28} className="relative mx-auto mt-14 max-w-4xl">
          <BrowserFrame>
            <DashboardMockup />
          </BrowserFrame>
          {/* Overlapping phone hints at mobile */}
          <div className="absolute -bottom-8 -right-2 hidden w-[180px] scale-90 sm:block lg:-right-10 lg:scale-100">
            <PhoneFrame>
              <PhoneMockup />
            </PhoneFrame>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
