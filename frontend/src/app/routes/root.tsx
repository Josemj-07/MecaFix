import { Outlet } from 'react-router';

import { MainLayout } from '@/components/layouts';

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AppRoot;
