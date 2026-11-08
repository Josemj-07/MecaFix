# Guía de estilo — MecaFix

Identidad visual **"Facetado"**. Todo el sistema sale del logo: las facetas triangulares de la M, la
pendiente de la X, la tuerca sobre la i y el acero de la llave. El resultado debe sentirse **preciso,
confiable, robusto, industrial y empresarial**: una herramienta de taller bien hecha, no una app genérica.

Los valores técnicos viven en `src/styles/theme.css` (tokens) y `src/styles/globals.css` (utilidades de
marca). Si algo de esta guía cambia, se edita aquí y en esos archivos a la vez.

---

## 1. Esencia

- **Nombre**: MecaFix
- **Frase**: "Tu taller, a toda máquina."
- **Personalidad**: preciso, confiable, robusto, industrial, empresarial.
- **Qué evitar**: verse genérico; superficies recargadas; tarjetas con una sola esquina cortada; todo en
  tipografía mono; degradados decorativos; esquinas redondeadas; iconos sueltos sin socket.
- **Modo**: solo claro. La profundidad la dan las bandas oscuras (carbón y noche), no un modo oscuro.

## 2. Los cuatro elementos del logo

Cada pieza visual nueva usa al menos uno de estos elementos y ninguno más que no salga de aquí.

| Elemento      | Origen             | Uso                                                                                                                                                       | Implementación                                                 |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Faceta**    | Triángulos de la M | Esquina facetada en superficies destacadas (pantallas de producto, bandas oscuras, tarjetas recomendadas), cortes del hero, cierres de sección            | `<Facet>` (tamaños `sm`, `md`, `lg`; tonos `primary`, `steel`) |
| **Pendiente** | Trazo de la X, 76° | Dirección de toda acción y movimiento: de abajo-izquierda hacia arriba-derecha. Botones en paralelogramo, barras activas inclinadas, entradas en diagonal | `clip-slant` (`--slant`), `-skew-x-[14deg]`                    |
| **Tuerca**    | Punto de la i      | Marca de cada eyebrow, viñetas, estado activo, sockets de iconos, avatares, confirmaciones (se "aprieta" al girar)                                        | `<Nut>`, `<Eyebrow>`, `clip-hex`, `nut-edge-top/bottom`        |
| **Acero**     | Llave              | Reglas, cotas, marcas de registro, regla de medición y texto técnico                                                                                      | `bg-ruler`, `crop-marks`, tokens `steel*`                      |

**Regla de oro**: las tarjetas y superficies son siempre **rectas**. La geometría se **suma** encima
(faceta, cuña, marcas de registro, regla) y nunca recorta la silueta de una tarjeta.

## 3. Color

Solo se usan tokens semánticos (`bg-primary`, `text-muted-foreground`...). Cada color de fondo tiene su
`-foreground` con contraste AA (≥ 4.5:1).

### Marca

| Token            | Valor     | Uso                                                                                             |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------- |
| `primary`        | `#A52A2F` | Rojo de la M. Acciones principales, estado activo, viñetas, sockets de iconos. 7.2:1 con blanco |
| `primary-hover`  | `#7E1F23` | Hover y bloque de flecha del botón principal                                                    |
| `primary-bright` | `#E0484E` | Rojo sobre carbón y noche (5.1:1 sobre noche). Eyebrows y acentos en bandas oscuras             |
| `primary-soft`   | `#C4464C` | Tono de faceta, solo ilustración                                                                |
| `primary-tint`   | `#F5E4E4` | Fondo suave de lo destacado ("Con MecaFix", plan recomendado, chips de rol)                     |

### Superficies (de claro a oscuro)

| Token                 | Valor     | Uso                                                              |
| --------------------- | --------- | ---------------------------------------------------------------- |
| `card`                | `#FFFFFF` | Hojas: tarjetas, formularios, pantallas de producto              |
| `background`          | `#FBFAF8` | Papel: fondo general                                             |
| `mist`                | `#F6F5F2` | Filas alternas sutiles                                           |
| `secondary` / `muted` | `#F4F2EF` | Humo: secciones alternas y rellenos tranquilos                   |
| `band`                | `#F0EDE8` | Bandas alternas de la vitrina de módulos                         |
| `inverse`             | `#1E2126` | Carbón: bandas oscuras, marcos de pantallas, columnas destacadas |
| `inverse-muted`       | `#2A2E35` | Relleno sobre carbón (pista, sockets apagados)                   |
| `night`               | `#14161A` | Noche: hero, testimonios, resultados de la calculadora, footer   |

Texto: `foreground` `#1E2126` · `muted-foreground` `#4E535B` (7.6:1 sobre papel) · sobre oscuro
`inverse-foreground` `#F4F2EF` y `inverse-muted-foreground` `#B3B8BE` (8.2:1 sobre carbón).

### Acero y líneas

`steel` `#8B9198` · `steel-light` `#BFC3C8` · `steel-pale` `#E3E4E6` · `border` `#DCD8D2` ·
`input` `#BFC3C8` · `grid` `#ECEAE6` · `inverse-border` `#3A3F47`.

### Estados y datos

`success` `#2E7A4E` · `warning` `#9A6200` · `info` `#2F5D8A` · `destructive` `#B42318` ·
`plate` `#F2C230` (solo placas colombianas en las pantallas de producto).

- El rojo de marca y `destructive` son cercanos: **un error nunca se comunica solo con color**, siempre
  con icono y texto.
- Estados suaves con opacidad del token: `bg-success/15 text-success`, `bg-warning/15 text-warning`.
- **Degradados**: solo el velo oscuro sobre el video del hero, para legibilidad.

### Ritmo de bandas

Las secciones alternan superficie para separar sin líneas: papel → humo → carbón → papel... Una banda
oscura (carbón o noche) aparece cada pocas secciones para dar peso y nunca dos seguidas.

## 4. Tipografía

| Rol                                           | Fuente                                 | Detalle                                                      |
| --------------------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| Títulos                                       | **Archivo Black** (400, su único peso) | Interlineado 1.05, tracking −0.02em, sin mayúsculas forzadas |
| Interfaz y texto                              | **Inter** (variable)                   | Base 16px, cuerpo con interlineado 1.75                      |
| Etiquetas, eyebrows, órdenes, placas, valores | **IBM Plex Mono** 500/600              | Etiquetas en MAYÚSCULAS con tracking 0.06–0.08em             |

Siempre con `<Heading level>` y `<Text variant>`; nunca estilizar `h1`/`p` a mano.

**Escala de títulos** (móvil → escritorio):

- `hero`: 2.375rem → 3.75rem (sm) → 4.25rem (lg), interlineado 1.02
- `h1`: 1.875rem → 2.25rem
- `h2` (título de sección): 1.875rem → 2.25rem (sm) → 2.75rem (lg)
- `h3`: 1.25rem · `h4`: 1.125rem

**Texto**: `lead` 1.125rem (introducciones de sección) · `body` 1rem · `small` 0.875rem ·
`caption` 0.75rem · `label` mono 0.8125rem, semibold, mayúsculas.

- Cifras, importes y placas con `tabular-nums` y formateados con `@/utils/format`.
- En celular los títulos de bloque bajan un paso (p. ej. `text-2xl` en vez de `text-4xl`) para que el
  bloque quepa en una pantalla.
- Logo dentro de un título: `<Logo>` en línea a `1.1em` de alto.

## 5. Forma y superficies

- **Esquinas**: rectas (radio 0) en todo.
- **Recortes de marca** (`globals.css`):
  - `clip-slant`: paralelogramo a 76° (acciones, bloques de flecha).
  - `clip-hex`: tuerca (sockets de iconos, avatares, viñetas).
  - `clip-bolt`: chips de estado.
  - `clip-chamfer`: campos de formulario y placas.
  - `shape-outline`: contorno de una forma recortada.
- **Bordes entre bandas**: tuercas (`nut-edge-top`), dientes (`teeth-edge-top`), sierra
  (`saw-edge-top`), cuña inclinada o cuña facetada en SVG. Cada fila de módulos tiene el suyo.
- **Fondos con textura**:
  - `bg-blueprint`: plano técnico, retícula de 48px.
  - `bg-hex-mesh`: malla hexagonal, solo sobre oscuro.
  - `bg-tread`: lámina antideslizante, solo sobre rojo.
  - `bg-ruler`: regla de medición.
  - `crop-marks`: marcas de registro en las esquinas de lo enmarcado.
- **Sombras**: solo en capas flotantes (navbar, menús, diálogos, toasts) y en las pantallas de producto
  (sombra larga y suave hacia abajo). Las tarjetas son hojas planas con borde de 1px.

## 6. Componentes de marca

- **`<CtaButton>`**: acción de marketing. Paralelogramo a 76° con bloque de flecha que crece al pasar el
  cursor y un brillo diagonal que lo cruza.
  - Tonos: `primary`, `dark`, `light`, `outline` y `outline-inverse` (los de contorno van sin flecha).
  - Tamaños: `sm` (40px), `md` (48px) y `lg` (56px).
  - Textos cortos, en mayúsculas automáticas: "Ver más", "Agendar mi demo". Nunca ocupa todo el ancho
    salvo en el envío de un formulario en celular.
- **`<Button>`**: recto, para formularios y la app.
- **`<Eyebrow>`**: tuerca + etiqueta mono sobre cada título de sección. Tonos `default`, `inverse` y `onPrimary`.
- **`<Nut>`**: viñetas de listas (rellena en rojo).
- **`<Facet>`**: esquina facetada en superficies destacadas.
- **`<Logo>`**: variantes `default` (claro), `inverse` (oscuro) y `mark` (la M con la llave).
- **`<Tabs>`**: el activo se marca con una barra roja inclinada a la pendiente de la X.
- **Iconos**: lucide, siempre dentro de un socket hexagonal (`clip-hex`) rojo o carbón, nunca sueltos.
  Tamaño 16–20px; decorativos con `aria-hidden`.
- **Pantallas de producto** (`AppWindow` + escenas): ventana blanca con barra de título humo, tres
  tuercas (roja, acero, acero) y título en mono mayúsculas. Se apoyan sobre un marco carbón con malla
  hexagonal y faceta roja, o sobre plano técnico. Datos de ejemplo realistas: placas, nombres y pesos
  colombianos.
- **Formularios**: campos con `clip-chamfer`, etiqueta mono en mayúsculas encima, error con icono y texto.

## 7. Movimiento

Toda animación va detrás de `motion-safe:`. Con movimiento reducido, todo aparece en su estado final.

- **Curvas**:
  - `ease-brand` `cubic-bezier(0.2, 0.8, 0.2, 1)`: entradas.
  - `ease-bolt` `cubic-bezier(0.3, 1.4, 0.5, 1)`: rebote corto al "apretar".
- **Dirección**: las entradas suben desde abajo-izquierda, siguiendo la pendiente de la X.
- **Entradas**: `Reveal` al hacer scroll; `rise` (0.8s) para bloques y `rise-sm` (0.45s) para filas y
  chips. Escalonado corto: 60–150ms entre elementos, total por debajo de 500ms.
- **Pantallas de producto**: se reproducen una vez al aparecer, como un video corto, y quedan quietas.
  - Primero la causa, luego el efecto: un cursor llega, el botón se hunde (`press`, 0.24s) y entonces
    cambia el estado.
  - Valores que se tachan (`strike`), barras que crecen (`grow-x` y `grow-y`) y chips que aparecen
    con rebote (`pop`).
- **Microinteracciones**:
  - Brillo diagonal en los botones de acción.
  - Facetas que cambian de tono al pasar el cursor.
  - La tuerca del eyebrow se aprieta una vez (`tighten`).
  - Balizas de estado (`beacon`).
- **Pista de confianza**: un carro de carreras recorre una pista y enciende cada compromiso que pasa.
  En escritorio la pista es horizontal y sigue al cursor. En celular es un carril vertical: el carro baja
  con el scroll y la meta es la última parada.
- **Prohibido**:
  - Scroll secuestrado y secciones fijadas.
  - Animaciones en bucle que distraigan.
  - Botones para pausar animaciones: no hacen falta, porque nada se repite indefinidamente.

## 8. Imágenes

- **Hero**: video de taller en bucle bajo un velo oscuro, con cuñas rojas facetadas en los bordes.
- **Ilustraciones**: no se usan ilustraciones dibujadas. El producto se muestra con pantallas
  construidas en código con datos de ejemplo.
- **Retratos de testimonios**: formato 4:5 en WebP.
  - Van enmarcados con marcas de registro y faceta; en el selector se recortan en tuerca.
  - Mientras no sean clientes reales se marcan como "Ejemplo".
  - Se reemplazan por fotos reales, con permiso escrito, usando el mismo nombre de archivo.
- Todas las imágenes llevan `alt`, dimensiones o `aspect-*`, y carga diferida fuera del primer pantallazo.

## 9. Estructura y diseño de página

- **Ancho máximo del contenido**: 76rem (`<Container>`), con margen lateral de 16px en celular.
- **Espaciado** en múltiplos de 4.
  - Secciones: `py-16` en celular, `sm:py-24` y `lg:py-28` en pantallas grandes.
  - Separación entre título de sección y contenido: `gap-10` a `gap-12`.
- **Encabezado de sección**: eyebrow → título → lead opcional (`SectionHeading`), alineado a la izquierda.
- **Navbar**: barra blanca flotante y fija, separada de los bordes, con sombra. Contiene logo, menú
  Plataforma con los módulos, Precios, Preguntas y la acción "Prueba una demo gratis".
- **Footer**: noche, con una cinta roja inclinada arriba, columnas de enlaces, contacto y créditos.
- **Escritorio**: texto y pantalla de producto lado a lado. El texto se centra verticalmente con la
  pantalla, y las filas alternan el lado de la pantalla.

### En celular (prioridad)

La landing se diseña primero para el celular. Cada bloque debe entenderse en **una sola pantalla**
(unos 620px útiles bajo la navbar).

- **Orden de lectura**: título → pantalla de producto → descripción → acción. Nunca obligar a bajar
  para ver la imagen y subir para leer.
- **Recortar, no apretar**: en celular se ocultan los textos secundarios (listas de puntos, frases de
  problema, párrafos que la tabla ya explica). Las escenas muestran menos filas y las pantallas se
  escalan un poco (`zoom` 0.82).
- **Navegación horizontal**: pasos y testimonios se cambian deslizando el dedo y con flechas al alcance.
  El siguiente elemento asoma por el borde para indicar que se puede deslizar.
- **Tablas**: caben completas en el ancho de la pantalla, sin desplazamiento lateral. Celdas con icono,
  el texto queda para lectores de pantalla y hay una leyenda debajo.
- **Nada se desborda**: ninguna página se desplaza de lado. Los botones y las cifras grandes se
  ajustan al ancho.

## 10. Voz y contenido

- **Tono**: cercano y profesional, como un colega que conoce el taller. Frases cortas y concretas.
- **Trato**: tú.
- **Idioma y formatos**: español de Colombia.
  - Fechas como "30 oct 2026".
  - Pesos colombianos con punto de miles: "$ 450.000".
- **Vocabulario del taller**: carro, orden, elevador, repuestos, quincena, placa, cotización.
- **Beneficio antes que función**: "Sabes en qué va cada carro sin bajar al taller", no "Módulo de
  seguimiento de órdenes".
- **Sin cifras inventadas**: solo compromisos que el equipo cumple hoy.
- **Botones**: verbo + objeto, cortos: "Registrar vehículo", "Crear cotización", "Guardar cambios",
  "Ver más".
- **Errores**: claros y sin culpar: "No pudimos guardar la cotización. Inténtalo de nuevo."
- **Estados vacíos**: con una acción: "Aún no hay vehículos registrados. Registra el primero."

## 11. Accesibilidad

- Contraste AA en cada par de color y foco siempre visible: contorno rojo con separación de 4px en
  las acciones de marketing.
- HTML semántico, títulos en orden y secciones con `aria-labelledby`.
- Botones de solo icono con `aria-label`.
- Carruseles con región y anuncio del elemento activo.
- Se respeta el movimiento reducido en todo.
