import { Head } from '@/components/seo';
import { PricingFaq } from '@/features/marketing/components/pricing/pricing-faq';
import { PricingFeatureTable } from '@/features/marketing/components/pricing/pricing-feature-table';
import { PricingPlans } from '@/features/marketing/components/pricing/pricing-plans';

const PricingRoute = () => {
  return (
    <>
      <Head
        title="Precios"
        description="Planes de MecaFix en pesos colombianos para talleres de 1 a 10 elevadores y redes de talleres. Todos incluyen atención humana 24/7 y migración de datos."
      />
      <PricingPlans />
      <PricingFeatureTable />
      <PricingFaq />
    </>
  );
};

export default PricingRoute;
