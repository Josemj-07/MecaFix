import type * as React from 'react';

import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type MainLayoutProps = {
  children: React.ReactNode;
  headerActions?: React.ReactNode;
};

export const MainLayout = ({ children, headerActions }: MainLayoutProps) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <SiteHeader actions={headerActions} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};
