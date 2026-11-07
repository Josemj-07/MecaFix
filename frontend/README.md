# MecaFix

Software de gestión para talleres mecánicos en Medellín: clientes, vehículos, cotizaciones, órdenes de servicio y pagos en un solo lugar.

Frontend de MecaFix. El backend (Spring Boot) vive en `../server` y se espera en `http://localhost:8080`.

## Empezar

```bash
npm install
npm run dev        # http://localhost:5173
```

| Comando            | Descripción                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Servidor de desarrollo           |
| `npm run build`    | Build de producción              |
| `npm run validate` | Tipos + lint + formato + tests   |
| `npm run test`     | Tests en modo watch              |
| `npm run lint:fix` | Autocorrección de lint y formato |

Variables de entorno en `.env` (ver `.env.example`). Con `VITE_APP_ENABLE_API_MOCKING=true`
la API se simula con MSW (`src/testing/mocks`).

Arquitectura y reglas del proyecto: ver [`CLAUDE.md`](./CLAUDE.md).
