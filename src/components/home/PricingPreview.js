import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PricingCards } from "@/components/pricing/PricingCards";

export function PricingPreview() {
  return (
    <Section tone="canvas" id="pricing">
      <SectionHeading
        eyebrow="Simple, transparent pricing"
        title="Start free. Upgrade when you grow."
        lead="A free plan forever, a 14-day trial on paid plans, and no credit card to begin. Cancel anytime."
      />
      <div className="mt-12">
        <PricingCards />
      </div>
      <div className="mt-10 text-center">
        <Button href="/pricing" variant="secondary" size="md">
          See full pricing & comparison <Icon name="ArrowRight" size={18} />
        </Button>
        <p className="mt-4 text-sm text-slate-body">
          14-day trial · no credit card · cancel anytime
        </p>
      </div>
    </Section>
  );
}
