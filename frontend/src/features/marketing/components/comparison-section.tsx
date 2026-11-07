import { Check, Minus, X } from 'lucide-react';

import { Container } from '@/components/layouts';
import { Logo } from '@/components/ui/logo';
import { Reveal } from '@/components/ui/reveal';
import { Text } from '@/components/ui/typography';
import { cn } from '@/utils/cn';

import { SectionHeading } from './section-heading';

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

const SupportCell = ({ value }: { value: Support }) => {
  const Icon = value === 'yes' ? Check : value === 'partial' ? Minus : X;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm whitespace-nowrap',
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
      {supportLabel[value]}
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
        <Reveal delay={100} className="flex flex-col gap-4">
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

      <Reveal delay={150} className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            Comparación entre el cuaderno, Excel y MecaFix
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[46%] py-4 pr-4 align-bottom">
                <span className="font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Lo que necesita el taller
                </span>
              </th>
              <th
                scope="col"
                className="px-4 py-4 align-bottom font-heading text-base font-extrabold"
              >
                Cuaderno
              </th>
              <th
                scope="col"
                className="px-4 py-4 align-bottom font-heading text-base font-extrabold"
              >
                Excel
              </th>
              <th scope="col" className="bg-inverse px-4 py-4 align-bottom">
                <Logo variant="inverse" alt="MecaFix" className="h-7" />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t">
                <th
                  scope="row"
                  className="py-4 pr-4 text-[0.9375rem] font-medium"
                >
                  {row.label}
                </th>
                <td className="px-4 py-4">
                  <SupportCell value={row.notebook} />
                </td>
                <td className="px-4 py-4">
                  <SupportCell value={row.spreadsheet} />
                </td>
                <td className="border-t border-inverse-border bg-inverse px-4 py-4">
                  <SupportCell value="yes" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Container>
  </section>
);
