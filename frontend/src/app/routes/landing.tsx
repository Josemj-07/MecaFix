import { ErrorBoundary } from 'react-error-boundary';

import { SectionErrorFallback } from '@/components/errors';
import { Head } from '@/components/seo';
import { DemoRequestForm } from '@/features/demo-requests/components/demo-request-form';
import { ClosingCta } from '@/features/marketing/components/landing/closing-cta';
import { ComparisonSection } from '@/features/marketing/components/landing/comparison-section';
import { FaqSection } from '@/features/marketing/components/landing/faq-section';
import { Hero } from '@/features/marketing/components/landing/hero';
import { ModulesShowcase } from '@/features/marketing/components/landing/modules-showcase';
import { PlatformTour } from '@/features/marketing/components/landing/platform-tour';
import { TestimonialsSection } from '@/features/marketing/components/landing/testimonials-section';
import { TrustStrip } from '@/features/marketing/components/landing/trust-strip';
import { ValueSection } from '@/features/marketing/components/landing/value-section';
import { PricingTeaser } from '@/features/marketing/components/pricing/pricing-teaser';
import { SavingsCalculator } from '@/features/marketing/components/pricing/savings-calculator';

// Order follows the decision path of a workshop owner (see the landing
// research): promise → reframe and before/after → the product → trust →
// modules in depth → proof → status quo → price → their own
// numbers → doubts → action.
const LandingRoute = () => {
  return (
    <>
      <Head description="MecaFix es el software para talleres automotrices en Colombia: órdenes de trabajo, inventario, nómina de mecánicos y factura electrónica DIAN en un solo sistema. Prueba una demo gratis." />
      <Hero />
      <ValueSection />
      <PlatformTour />
      <TrustStrip />
      <ModulesShowcase />
      <TestimonialsSection />
      <ComparisonSection />
      <PricingTeaser />
      <SavingsCalculator />
      <FaqSection />
      <ClosingCta
        form={
          <ErrorBoundary FallbackComponent={SectionErrorFallback}>
            <DemoRequestForm />
          </ErrorBoundary>
        }
      />
    </>
  );
};

export default LandingRoute;
