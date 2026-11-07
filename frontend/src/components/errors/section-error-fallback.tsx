import { type FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/typography';

// Fallback for local error boundaries: a broken section must not break the page.
//
// <ErrorBoundary FallbackComponent={SectionErrorFallback}>
//   <SomeFeatureWidget />
// </ErrorBoundary>
export const SectionErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 border border-dashed bg-card p-6 text-center text-card-foreground"
    >
      <Text variant="muted">No pudimos cargar esta sección.</Text>
      <Button size="sm" variant="outline" onClick={resetErrorBoundary}>
        Intentar de nuevo
      </Button>
    </div>
  );
};
