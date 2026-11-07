import { Button } from '@/components/ui/button';
import { Heading, Text } from '@/components/ui/typography';

// Last-resort fallback for errors not caught by a closer error boundary.
export const MainErrorFallback = () => {
  return (
    <div
      role="alert"
      className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <Heading level="h2">Algo salió mal</Heading>
      <Text variant="muted">
        Ocurrió un error inesperado. Recarga la página para continuar.
      </Text>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Recargar página
      </Button>
    </div>
  );
};
