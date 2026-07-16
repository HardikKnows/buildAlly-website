import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

// Shared layout for Privacy / Terms. Renders a header, a counsel-review
// disclaimer, and prose sections from a structured `sections` array.
export function LegalPage({ title, updated, intro, sections }) {
  return (
    <article>
      <section className="border-b border-line blueprint-grid">
        <Container size="narrow" className="py-14 sm:py-16">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-body">Last updated: {updated}</p>
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-slate-body">{intro}</p>
          )}
        </Container>
      </section>

      <section className="border-b border-line bg-slate-50/60">
        <Container size="narrow" className="py-4">
          <p className="text-sm text-slate-body">
            This document applies to BuildAlly's website, mobile application, and related services.
          </p>
        </Container>
      </section>

      <Container size="narrow" className="py-12 sm:py-16">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading} id={`s-${i + 1}`}>
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-base leading-8 text-slate-body">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-2 space-y-2">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base leading-8 text-slate-body"
                      >
                        <Icon name="Dot" size={18} className="mt-0.5 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
