import { Container } from "./Container";
import { Reveal } from "./Reveal";

// A vertical section band with consistent rhythm. `tone` controls background.
export function Section({ children, id, tone = "white", className = "", containerSize }) {
  const tones = {
    white: "bg-white",
    canvas: "bg-canvas",
    ink: "bg-ink text-white",
    grid: "bg-canvas blueprint-grid",
  };
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-28 ${tones[tone]} ${className}`}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

// Eyebrow + headline + optional lead, centered or left-aligned.
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
  className = "",
}) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            dark ? "text-brand-300" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-pretty text-lg leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-body"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
