import { Check, Minus, X } from 'lucide-react';

import { Container } from '@/components/layouts';
import { Logo } from '@/components/ui/logo';
import { Reveal } from '@/components/ui/reveal';
import { Text } from '@/components/ui/typography';
import { cn } from '@/utils/cn';

import { SectionHeading } from '../section-heading';

type Support = 'yes' | 'partial' | 'no';

type Row = {
  label: string;
  notebook: Support;
  spreadsheet: Support;
};

// Every row is supported by MecaFix; the two other columns are the status quo.
const rows: Row[] = [
  {
    label: 'Repuestos y mano de obra sumados en la orden',
    notebook: 'no',
    spreadsheet: 'partial',
  },
  {
    label: 'Historial del vehículo por placa',
    notebook: 'no',
    spreadsheet: 'partial',
  },
  {
    label: 'Inventario actualizado con cada orden',
    notebook: 'no',
    spreadsheet: 'partial',
  },
  {
    label: 'Factura electrónica DIAN desde la orden',
    notebook: 'no',
    spreadsheet: 'no',
  },
  {
    label: 'Avisos al cliente por WhatsApp',
    notebook: 'no',
    spreadsheet: 'no',
  },
  {
    label: 'Nómina y comisiones de los mecánicos',
    notebook: 'partial',
    spreadsheet: 'partial',
  },
  {
    label: 'Copia de seguridad de la información',
    notebook: 'no',
    spreadsheet: 'partial',
  },
];

const supportLabel: Record<Support, string> = {
  yes: 'Sí',
  partial: 'A mano',
  no: 'No',
};

// On a phone the status columns show only the icon (the word stays for
// screen readers) and a legend under the table explains them.
const statusHead =
  'w-16 px-1 py-3 align-bottom font-heading text-[0.6875rem] font-extrabold max-sm:text-center sm:w-auto sm:px-4 sm:py-4 sm:text-base';
const statusCell = 'px-1 py-3 sm:px-4 sm:py-4';

const legend = [
  {
    icon: Check,
    label: supportLabel.yes,
    tone: 'bg-primary-bright text-night',
  },
  { icon: Minus, label: supportLabel.partial, tone: 'bg-steel-pale' },
  { icon: X, label: supportLabel.no, tone: 'bg-steel-pale' },
];

const SupportCell = ({ value }: { value: Support }) => {
  const Icon = value === 'yes' ? Check : value === 'partial' ? Minus : X;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm whitespace-nowrap max-sm:justify-center',
        value === 'yes' && 'font-semibold text-inverse-foreground',
        value === 'partial' && 'text-muted-foreground',
        value === 'no' && 'text-muted-foreground',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid h-6 w-7 place-items-center clip-hex',
          value === 'yes' && 'bg-primary-bright text-night',
          value === 'partial' && 'bg-steel-pale',
          value === 'no' && 'bg-steel-pale',
        )}
      >
        <Icon className="size-3.5" />
      </span>
      <span className="max-sm:sr-only">{supportLabel[value]}</span>
    </span>
  );
};

// Status quo comparison with an honest concession: the notebook is free
// and familiar, it just stops scaling.
export const ComparisonSection = () => (
  <section
    aria-labelledby="comparison-title"
    className="py-20 sm:py-24 lg:py-28"
  >
    <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div className="flex flex-col gap-6">
        <SectionHeading
          id="comparison-title"
          eyebrow="Cuaderno, Excel o MecaFix"
          title="¿Por qué no seguir con el cuaderno?"
        />
        {/* On a phone the table speaks for itself. */}
        <Reveal delay={100} className="flex flex-col gap-4 max-sm:hidden">
          <Text className="text-muted-foreground">
            El cuaderno es gratis y ya lo conoces. Funciona mientras todo pase
            por tus manos.
          </Text>
          <Text className="text-muted-foreground">
            Cuando tienes varios mecánicos y carros entrando todo el día, la
            información se queda repartida entre personas, papeles y archivos.
            Ahí es donde se pierden cobros y repuestos.
          </Text>
        </Reveal>
      </div>

      <Reveal delay={150} className="flex flex-col gap-4">
        <table className="w-full table-fixed border-collapse text-left sm:table-auto">
          <caption className="sr-only">
            Comparación entre el cuaderno, Excel y MecaFix
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3 pr-2 align-bottom sm:w-[46%] sm:py-4 sm:pr-4"
              >
                <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase sm:text-xs">
                  Lo que necesita el taller
                </span>
              </th>
              <th scope="col" className={statusHead}>
                Cuaderno
              </th>
              <th scope="col" className={statusHead}>
                Excel
              </th>
              <th
                scope="col"
                className="w-16 bg-inverse px-1 py-3 align-bottom max-sm:text-center sm:w-auto sm:px-4 sm:py-4"
              >
                <Logo
                  variant="inverse"
                  alt="MecaFix"
                  className="inline-block h-3.5 sm:h-7"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t">
                <th
                  scope="row"
                  className="py-3 pr-2 text-sm font-medium sm:py-4 sm:pr-4 sm:text-[0.9375rem]"
                >
                  {row.label}
                </th>
                <td className={statusCell}>
                  <SupportCell value={row.notebook} />
                </td>
                <td className={statusCell}>
                  <SupportCell value={row.spreadsheet} />
                </td>
                <td className="border-t border-inverse-border bg-inverse px-1 py-3 sm:px-4 sm:py-4">
                  <SupportCell value="yes" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul
          aria-hidden="true"
          className="flex gap-5 text-xs text-muted-foreground sm:hidden"
        >
          {legend.map(({ icon: Icon, label, tone }) => (
            <li key={label} className="flex items-center gap-1.5">
              <span
                className={cn('grid h-5 w-6 place-items-center clip-hex', tone)}
              >
                <Icon className="size-3" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </section>
);
