import { Container } from "./Container";
import { Reveal } from "./Reveal";

// Compact inner-page hero on the blueprint-grid motif.
export function PageHero({ eyebrow, title, lead, children, align = "center" }) {
  const center = align === "center";
  return (
    <section className="relative overflow-hidden border-b border-line blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 hero-glow" />
      <Container className="relative py-16 sm:py-20">
        <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow && (
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.1}>
              <p
                className={`mt-5 text-pretty text-lg leading-relaxed text-slate-body sm:text-xl ${
                  center ? "mx-auto max-w-2xl" : ""
                }`}
              >
                {lead}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={0.15}>
              <div className="mt-8">{children}</div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
