import { useParams } from 'react-router';

import { Head } from '@/components/seo';
import { ModulePage } from '@/features/marketing/components/module-page';
import { findModule } from '@/features/marketing/utils/modules';

import NotFoundRoute from './not-found';

const PlatformModuleRoute = () => {
  const { moduleSlug } = useParams();
  const module = findModule(moduleSlug);

  if (!module) return <NotFoundRoute />;

  return (
    <>
      <Head title={module.name} description={module.description} />
      <ModulePage module={module} />
    </>
  );
};

export default PlatformModuleRoute;
