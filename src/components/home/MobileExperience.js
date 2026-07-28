import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { PhoneShot } from "@/components/ui/Screenshot";
import { PlayStoreBadge } from "@/components/ui/PlayStoreBadge";
import { MOBILE_SHOTS } from "@/lib/product";

// Verified against inventory §24 "Mobile Experience" — every claim here is
// implemented today.
const POINTS = [
  { icon: "Download", title: "Install from the browser", body: "A PWA with app shortcuts — or get the Android app from Google Play." },
  { icon: "Camera", title: "Native camera & GPS", body: "Check in and capture verified site photos straight from the phone." },
  { icon: "WifiOff", title: "Works offline", body: "A queue replays what your team recorded once signal comes back." },
  { icon: "LayoutGrid", title: "Every role, reflowed", body: "Dashboards, the 12-tab Site Hub and the client portal, all on mobile." },
];

export function MobileExperience() {
  return (
    <Section tone="canvas" id="mobile">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 min-w-0 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Mobile workforce
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Built for the site, not just the site office
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-body">
            The people generating the data — engineers and supervisors — are never
            at a desk. If it doesn&apos;t work on a phone, it doesn&apos;t get
            recorded.
          </p>
          <ul className="mt-8 space-y-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={p.icon} size={18} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-body">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PlayStoreBadge />
            <p className="text-sm text-slate-body">
              Or install straight from your browser — no app store needed.
            </p>
          </div>
        </Reveal>

        <Reveal y={26} className="order-1 min-w-0 lg:order-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 mx-auto my-auto h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
              {MOBILE_SHOTS.map((image, i) => (
                <PhoneShot
                  key={image.src}
                  image={image}
                  className={i % 2 === 1 ? "sm:mt-10" : ""}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
