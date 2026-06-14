import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { URLS } from "@/lib/site";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 hero-glow" />
      <Container className="relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-7xl font-extrabold text-gradient-brand">404</p>
        <h1 className="mt-4 text-balance text-3xl font-bold text-ink sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-md text-lg text-slate-body">
          The page may have moved. Let&apos;s get you back to building.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg">
            <Icon name="Home" size={18} /> Back to home
          </Button>
          <Button href={URLS.signup} variant="secondary" size="lg">
            Start Free Trial
          </Button>
        </div>
      </Container>
    </section>
  );
}
