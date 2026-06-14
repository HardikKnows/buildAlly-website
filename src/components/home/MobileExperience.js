import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/ui/Frames";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { Icon } from "@/components/ui/Icon";
import { MOBILE_POINTS } from "@/lib/content";

const ICONS = ["Download", "Camera", "WifiOff", "Zap"];

export function MobileExperience() {
  return (
    <Section tone="canvas" id="mobile">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Mobile workforce
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Built for the field — even with no signal
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-body">
            The #1 reason construction software fails is that field teams won&apos;t
            use it. BuildAlly is mobile-first and WhatsApp-simple, so capturing
            work on site takes seconds.
          </p>
          <ul className="mt-8 space-y-4">
            {MOBILE_POINTS.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={ICONS[i]} size={18} />
                </span>
                <span className="text-[15px] text-ink-600">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal y={26} className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-0 mx-auto my-auto h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
            <PhoneFrame className="relative z-10">
              <PhoneMockup />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
