import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FAQS } from "@/lib/content";

export function HomeFAQ() {
  return (
    <Section tone="white" id="faq" containerSize="narrow">
      <SectionHeading
        eyebrow="Questions, answered"
        title="Everything you're wondering about"
      />
      <Reveal className="mt-10">
        <Accordion items={FAQS.slice(0, 6)} />
      </Reveal>
      <div className="mt-8 text-center">
        <Button href="/faq" variant="ghost" size="md">
          See all FAQs <Icon name="ArrowRight" size={18} />
        </Button>
      </div>
    </Section>
  );
}
