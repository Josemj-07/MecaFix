import andresPhoto from '../assets/testimonials/andres-p.webp';
import dianaPhoto from '../assets/testimonials/diana-r.webp';
import julianPhoto from '../assets/testimonials/julian-r.webp';

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  workshop: string;
  city: string;
  // Portrait, 4:5. Keep the face in the upper half: the avatar crops it.
  photo: string;
  // What the photo shows (it is a stock photo, not the person quoted).
  photoAlt: string;
  // The task that changed, measured before and after MecaFix.
  result: {
    task: string;
    before: string;
    after: string;
  };
  // Placeholder content is labelled on screen until it is replaced.
  isExample: boolean;
};

// TODO: reemplazar por testimonios reales (foto, nombre completo, taller,
// ciudad y un resultado verificable, con permiso escrito) antes de publicar.
// Mientras isExample sea true, la historia se marca como "Ejemplo".
//
// Fotos de stock con licencia Unsplash (uso libre, sin atribución
// obligatoria). Son personas reales que no son clientes de MecaFix: por eso
// se marcan como ejemplo. Créditos:
// - diana-r: Darren Richardson, unsplash.com/photos/iY0GFYADmU0
// - andres-p: Quilia, unsplash.com/photos/2K_-PG95qlI
// - julian-r: Remco Guijs, unsplash.com/photos/ylfZM6-ok1U
export const testimonials: Testimonial[] = [
  {
    id: 'diana-r',
    quote:
      'Antes perdíamos órdenes en el tablero de corcho. Ahora el cliente recibe la cotización por WhatsApp y la aprueba desde su celular.',
    name: 'Diana R.',
    role: 'Jefa de taller',
    workshop: 'Taller de mecánica general',
    city: 'Medellín',
    photo: dianaPhoto,
    photoAlt: 'Mecánica sonriendo en un taller, con una llave en la mano',
    result: {
      task: 'Aprobar una cotización',
      before: '2 a 3 días',
      after: 'El mismo día',
    },
    isExample: true,
  },
  {
    id: 'andres-p',
    quote:
      'La quincena me tomaba una tarde entera con el Excel. Con las comisiones saliendo de las órdenes, la reviso y la apruebo.',
    name: 'Andrés P.',
    role: 'Dueño',
    workshop: 'Serviteca',
    city: 'Cali',
    photo: andresPhoto,
    photoAlt: 'Mecánico con gorra sonriendo junto al motor abierto de un carro',
    result: {
      task: 'Liquidar la quincena',
      before: 'Una tarde',
      after: '20 minutos',
    },
    isExample: true,
  },
  {
    id: 'julian-r',
    quote:
      'Por fin sé qué repuestos tengo sin ir a la bodega. El sistema me avisa antes de que se acaben los filtros.',
    name: 'Julián R.',
    role: 'Encargado de bodega',
    workshop: 'Taller de frenos y suspensión',
    city: 'Bogotá',
    photo: julianPhoto,
    photoAlt: 'Mecánico con overol rojo apoyado en una caja de herramientas',
    result: {
      task: 'Repuestos agotados sin aviso',
      before: 'Cada semana',
      after: 'Ninguno',
    },
    isExample: true,
  },
];
