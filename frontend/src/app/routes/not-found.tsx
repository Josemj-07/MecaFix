import { Container } from '@/components/layouts';
import { Head } from '@/components/seo';
import { Link } from '@/components/ui/link';
import { Heading, Text } from '@/components/ui/typography';
import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <>
      <Head title="Página no encontrada" />
      <Container className="flex flex-col items-center gap-4 pt-40 pb-24 text-center">
        <Text
          variant="caption"
          className="font-semibold tracking-widest uppercase"
        >
          404
        </Text>
        <Heading level="h1">Página no encontrada</Heading>
        <Text variant="muted">
          La página que buscas no existe o fue movida.
        </Text>
        <Link to={paths.home.getHref()} replace>
          Volver al inicio
        </Link>
      </Container>
    </>
  );
};

export default NotFoundRoute;
