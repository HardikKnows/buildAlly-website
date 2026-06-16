import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { URLS } from "@/lib/site";
import { EVENTS } from "@/lib/track";
import { EARLY_ACCESS_POINTS } from "@/lib/content";

// Section 6 — Early Access. Frame BuildAlly as an evolving product.
export function EarlyAccess() {
  return (
    <section id="early-access" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-line bg-canvas">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand">
                <Icon name="Sparkles" size={15} /> Early Access Program
              </span>
              <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Help shape the future of construction management
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-body">
                BuildAlly is growing fast. Join our early access program to work
                closely with our team, get hands-on onboarding, and influence
                what we build next.
              </p>
              <TrackedButton
                href={URLS.bookDemo}
                event={EVENTS.BOOK_DEMO}
                eventProps={{ location: "early_access" }}
                variant="primary"
                size="lg"
                className="mt-7"
              >
                Book a Demo <Icon name="ArrowRight" size={18} />
              </TrackedButton>
            </Reveal>

            <Reveal y={22} delay={0.08}>
              <ul className="space-y-4">
                {EARLY_ACCESS_POINTS.map((p) => (
                  <li
                    key={p.title}
                    className="flex gap-4 rounded-2xl border border-line bg-white p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                      <Icon name={p.icon} size={21} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-slate-body">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
