# MecaFix — Reglas del proyecto

Proyecto React estructurado según **Bulletproof React**. Estas reglas son obligatorias
para cualquier cambio (humano o IA). Para añadir cualquier cosa (feature, pantalla,
navbar, footer, componente, formulario...) usa la skill **`bulletproof-feature`**.

**`BRAND.md`** define la identidad del producto (colores, tipografía, estilo, voz, mapa de pantallas).
Todo cambio visual o de contenido debe respetarlo; los valores técnicos viven en `src/styles/theme.css`.

## Contexto del monorepo

- Este frontend vive en `frontend/` dentro del repo MecaFix. **No se toca nada fuera de `frontend/`** (`server/`, `db/`, CI).
- Backend: Spring Boot REST en `http://localhost:8080` (`server/`). Login en `/auth/*`, recursos en `/api/v1/*`.
  Contrato de referencia: `../MecaFix_Postman_Collection.json`, modelo de datos en `../doc/` y `../db/initdb.sql`.
- Roles: `ADMIN` (operación diaria) y `OWNER` (todo lo de admin + finanzas y estadísticas).
- `server/docker-compose.yml` hace build de `../frontend` y expone el puerto **5173**: no cambies ese puerto.

## Stack

Vite + React 19 + TypeScript estricto · Tailwind CSS v4 (design tokens) · React Router 7
· TanStack Query (estado del servidor) · Zustand (estado global) · React Hook Form + Zod
(formularios) · Axios (cliente API único) · Radix UI (primitivas accesibles) · lucide-react
(iconos) · Vitest + Testing Library + MSW (tests y API mock).

## Comandos

```bash
npm run dev          # servidor de desarrollo (http://localhost:5173)
npm run validate     # tipos + lint + formato + tests  ← debe pasar antes de dar algo por terminado
npm run lint:fix     # autocorrige lint (ESLint con caché) + formato (Prettier)
npx eslint --fix --cache --cache-location node_modules/.cache/eslint/ <archivos>  # lint rápido solo de lo tocado
npm run build        # build de producción
```

## Estructura

```
src/
├── app/            # capa de aplicación: router, providers, rutas (páginas)
│   ├── routes/     # una ruta = un archivo; compone features. export default + clientLoader opcional
│   ├── provider.tsx
│   └── router.tsx
├── assets/         # estáticos globales (imágenes, svgs)
├── components/     # componentes COMPARTIDOS sin lógica de negocio
│   ├── ui/         # librería de diseño: button, card, form, dialog, typography...
│   ├── layouts/    # main-layout, site-header, site-footer, content-layout, container
│   ├── errors/     # fallbacks de error
│   ├── seo/        # <Head />
│   └── theme/      # sincroniza el tema (la app es solo modo claro)
├── config/         # env.ts (variables validadas), paths.ts (rutas), site.ts (marca y navegación)
├── features/       # módulos de negocio, uno por dominio  ← aquí vive la mayor parte del código
├── hooks/          # hooks compartidos
├── lib/            # librerías preconfiguradas (api-client, react-query)
├── stores/         # estado global (zustand)
├── styles/         # theme.css (TOKENS) y globals.css
├── testing/        # utilidades de test y mocks MSW
├── types/          # tipos compartidos
└── utils/          # funciones utilitarias compartidas (cn, format)
```

Una feature solo contiene las carpetas que necesita:

```
src/features/<feature>/
├── api/         # requests + hooks de react-query + schemas zod de esa feature
├── components/  # componentes de la feature
├── hooks/  stores/  types/  utils/  assets/
```

## Reglas de arquitectura (las hace cumplir ESLint)

1. **Flujo unidireccional**: `shared (components, hooks, lib, stores, types, utils, config) → features → app`.
   Lo compartido nunca importa de features ni de app; las features nunca importan de app.
2. **Sin imports entre features**. Si dos features deben combinarse, se componen en una ruta
   de `src/app/routes`. Si algo lo usan varias features, se mueve a la capa compartida.
3. **Imports absolutos** con `@/` (nada de `../../`). Dentro de un mismo módulo se permite `./` y `../`.
4. **kebab-case** para archivos y carpetas. Componentes en PascalCase, funciones/variables en camelCase.
5. **Sin barrel files en features**: importa el archivo directamente
   (`@/features/payments/components/payment-list`). Solo `components/ui/*` tiene `index.ts`.
6. **Named exports** en todo, excepto el componente de página en `app/routes/*` (export default).
7. **Nunca** desactives una regla de lint para que pase: corrige el código.
8. **Sin dependencias circulares** entre módulos (ESLint no lo comprueba por rendimiento; respétalo tú).
9. Mientras desarrollas, lintea solo los archivos tocados; la pasada completa (`lint:fix` o `validate`) una vez al final.

## Diseño y estilos

- La identidad visual vive en **`src/styles/theme.css`** (colores, fuentes, radios). Cambiar la marca = editar ese archivo.
- Usa **solo tokens semánticos**: `bg-background`, `text-foreground`, `bg-primary text-primary-foreground`,
  `text-muted-foreground`, `border-border`, `bg-card`, `text-destructive`, `bg-success`... Los colores crudos
  (`bg-blue-500`, `text-[#fff]`) están prohibidos por ESLint. Si falta un color, añade un token (con su `-foreground`).
- Tipografía: usa `<Heading level="display|h1|h2|h3|h4">` y `<Text variant="lead|body|small|muted|caption|label">`
  de `@/components/ui/typography`. No estilices `h1`/`p` a mano.
- Layout: cada página usa `<ContentLayout title=...>` o `<Container>`; espaciado con la escala de Tailwind
  (múltiplos de 4: `gap-4`, `py-8`, `py-12`...). Mobile-first (`sm:`, `md:`, `lg:`).
- Antes de crear un componente, revisa `src/components/ui`. Reutiliza; extiende con variantes `cva`
  en vez de duplicar. Componer con `children`/slots en vez de muchas props.
- Clases condicionales siempre con `cn()` de `@/utils/cn`.
- La app es **solo modo claro** (decisión de `BRAND.md`); no hay toggle. No uses variantes `dark:`.
- Identidad **"Facetado"** (ver `BRAND.md`): esquinas rectas; la geometría sale del logo y se **suma** sobre superficies
  rectas, nunca recorta la silueta de una tarjeta (nada de una sola esquina cortada). Utilidades de marca en `globals.css`:
  `clip-slant` (paralelogramo a 76°, `--slant`), `clip-hex` (tuerca: sockets de iconos, avatares), `clip-bolt` (chips de estado),
  `clip-chamfer` (campos), `shape-outline`, `crop-marks`, `bg-ruler`, `bg-blueprint`, `bg-hex-mesh` (solo oscuro), `bg-tread`,
  `nut-edge-top/bottom` (borde de tuercas entre bandas) y `range-nut` (control deslizante).
- Piezas de marca en `components/ui`: `<CtaButton>` (acciones de marketing: paralelogramo + bloque de flecha; tonos
  `primary|dark|light|outline|outline-inverse`), `<Eyebrow>` (tuerca + etiqueta mono sobre cada título de sección), `<Nut>` (viñetas y marcas),
  `<Facet>` (esquina facetada de la M, en superficies destacadas), `<Logo variant="default|inverse|mark">`, `<Tabs>`.
  `<Button>` queda para formularios y la app.
- Superficies: `bg-background` (papel), `bg-secondary` (humo), `bg-card`, `bg-inverse` (carbón), `bg-night` (hero y footer).
  Sobre oscuro usa `text-inverse-foreground` / `text-inverse-muted-foreground` y el rojo `text-primary-bright`.
- Datos (órdenes, placas, valores) y etiquetas en mono (`<Text variant="label">`); placas con el token `plate`.
- Animación al hacer scroll con `<Reveal>` (`@/components/ui/reveal`) o `useInView` (`@/hooks/use-in-view`); entradas de carga
  con `animate-rise` (+ `animationDelay`), siempre detrás de `motion-safe:`. Curvas `ease-brand` y `ease-bolt`.
- El rojo de marca (`primary`) y `destructive` son tonos cercanos: un error nunca se comunica solo con color, siempre con icono y texto.

## Datos y estado

- **Estado del servidor** → TanStack Query. Cada endpoint en `features/<f>/api/<verbo>-<recurso>.ts` con:
  schema/tipos → función fetcher que usa `api` de `@/lib/api-client` → `queryOptions` → hook `use<Algo>`.
- **Estado de componente** → `useState`/`useReducer`, lo más cerca posible de donde se usa.
- **Estado global** → zustand en `src/stores` (o en `features/<f>/stores` si es de una feature). Solo si de verdad es global.
- **Formularios** → `<Form schema={zodSchema}>` + `Input`/`Textarea`/`Select` de `@/components/ui/form`.
- **Estado en URL** → filtros, paginación, ids: `useParams` / `useSearchParams`.
- Nunca guardes datos del servidor en zustand.
- Rutas: declaradas en `src/config/paths.ts`; enlaces con `paths.x.getHref()`, nunca strings sueltos.
- Variables de entorno: prefijo `VITE_APP_`, declaradas y validadas en `src/config/env.ts`.
- Tests: crea handlers MSW en `src/testing/mocks/handlers/<feature>.ts` que imiten las respuestas reales del backend.

## Calidad obligatoria en cada pantalla/componente

- Estados de **carga** (`<Spinner />` o skeleton), **vacío** y **error** contemplados.
- `ErrorBoundary` local (`SectionErrorFallback`) alrededor de secciones que pueden fallar.
- Accesibilidad: HTML semántico, `alt` en imágenes, `aria-label` en botones de solo icono,
  foco visible, labels en inputs (los componentes de `ui/form` ya lo resuelven).
- Seguridad: nunca `dangerouslySetInnerHTML` sin sanitizar con DOMPurify. Tokens en cookies HttpOnly.
- Rendimiento: rutas con `lazy` (ya configurado), estado colocado, `children` para evitar re-renders,
  imágenes con `loading="lazy"` y dimensiones.
- Tests: tests de integración en `__tests__/` junto a la ruta/feature, probando comportamiento
  como un usuario (Testing Library + MSW), no detalles de implementación.
- Formato de fechas/monedas solo con `@/utils/format`.
