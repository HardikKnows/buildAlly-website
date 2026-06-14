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

      <Container size="narrow" className="py-12 sm:py-16">
        {/* Counsel-review disclaimer */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/5 p-5">
          <Icon name="TriangleAlert" size={20} className="mt-0.5 shrink-0 text-warning" />
          <p className="text-sm leading-relaxed text-ink-600">
            <strong className="font-semibold text-ink">Template — review with counsel.</strong>{" "}
            This is a starting-point document for the BuildAlly team. It is not
            legal advice and must be reviewed and finalised by a qualified lawyer
            before publishing.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading} id={`s-${i + 1}`}>
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {i + 1}. {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-[15px] leading-relaxed text-slate-body">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-2 space-y-2">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-body"
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
