import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { OWNER_OUTCOMES } from "@/lib/content";

export function WhyOwners() {
  return (
    <Section tone="white" id="why-owners">
      <SectionHeading
        eyebrow="Why owners love it"
        title="See everything. Decide faster. Build better."
        lead="BuildAlly gives the builder-owner what spreadsheets and WhatsApp never could — real control over the whole business."
      />
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {OWNER_OUTCOMES.map((o) => (
          <RevealItem
            key={o.title}
            className="rounded-2xl border border-line bg-canvas p-7 text-center"
          >
            <p className="font-display text-4xl font-extrabold text-gradient-brand">{o.stat}</p>
            <h3 className="mt-2 font-display text-xl font-bold text-ink">{o.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-body">{o.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Owner quote — clearly-marked placeholder */}
      <RevealItem className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-line bg-canvas p-8 text-center">
        <Icon name="Quote" size={28} className="mx-auto text-brand/40" />
        <p className="mt-4 text-pretty font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
          &ldquo;For the first time, I can see every site, every payment, and
          every approval without making a single phone call.&rdquo;
        </p>
        <p className="mt-4 text-sm text-slate-body">
          {/* PLACEHOLDER: replace with a real, attributable customer quote */}
          Builder-owner persona · Placeholder testimonial
        </p>
      </RevealItem>
    </Section>
  );
}
