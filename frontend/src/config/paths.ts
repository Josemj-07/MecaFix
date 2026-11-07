// Every route of the application is declared here.
// `path` is used by the router, `getHref` by links and navigation.
// Never hardcode a URL string in a component: use paths.x.getHref().
export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  platformModule: {
    path: '/plataforma/:moduleSlug',
    getHref: (moduleSlug: string) => `/plataforma/${moduleSlug}`,
  },
  pricing: {
    path: '/precios',
    getHref: (cycle?: 'mensual' | 'anual') =>
      cycle ? `/precios?ciclo=${cycle}` : '/precios',
  },
} as const;
