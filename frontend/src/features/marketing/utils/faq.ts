export type FaqItem = {
  question: string;
  answer: string;
};

// Real objections of a workshop owner, ordered from the most frequent.
export const landingFaq: FaqItem[] = [
  {
    question: '¿Necesito saber de computadores para usar MecaFix?',
    answer:
      'No. Si manejas WhatsApp, puedes manejar MecaFix. Capacitamos a cada persona en la parte que le toca y el soporte te responde las 24 horas.',
  },
  {
    question:
      '¿Qué pasa con la información que tengo en Excel o en el cuaderno?',
    answer:
      'La migramos nosotros. Nos envías tus archivos o fotos del cuaderno y cargamos clientes, vehículos y repuestos. Te avisamos cuando todo esté listo para revisar.',
  },
  {
    question: '¿Sirve para la facturación electrónica de la DIAN?',
    answer:
      'Sí. Facturas desde la orden cerrada con tu resolución de facturación electrónica, y la factura le llega al correo del cliente.',
  },
  {
    question: '¿Puedo calcular la nómina de mis mecánicos?',
    answer:
      'Sí. MecaFix liquida salario, comisiones por servicio, horas extra y anticipos con base en las órdenes que hizo cada persona. Tú revisas y apruebas la quincena.',
  },
  {
    question: '¿Qué hace el asistente con IA?',
    answer:
      'Se encarga de tareas repetitivas: prepara borradores de cotización, responde a los clientes con el estado real de su orden y te avisa qué órdenes están frenadas. Tú revisas antes de que algo se envíe.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Depende del tamaño de tu taller. En la página de precios ves cada plan en pesos y lo que incluye.',
  },
];

// TODO: confirmar estas respuestas con el equipo junto con los precios.
export const pricingFaq: FaqItem[] = [
  {
    question: '¿Cómo escojo el plan?',
    answer:
      'Por el número de elevadores y de personas que van a usar el sistema. Si tienes dudas, en la demo te recomendamos el plan que encaja con tu operación.',
  },
  {
    question: '¿La migración de datos tiene costo?',
    answer:
      'No. Está incluida en todos los planes, igual que la capacitación y la atención humana 24/7.',
  },
  {
    question: '¿Qué incluye la demo gratis?',
    answer:
      'Una sesión con el equipo donde ves el sistema con ejemplos de un taller como el tuyo y resuelves tus dudas antes de decidir.',
  },
  {
    question: '¿Cómo funciona el pago anual?',
    answer:
      'Pagas 10 meses y usas MecaFix durante 12. El precio mensual que ves con el ciclo anual es el equivalente por mes.',
  },
];
