# Brief de marca y producto — MecaFix

## Identidad visual: "Facetado"

> Todo el sistema sale del logo (`src/assets/logo*.webp`). Referencias: Siesa (estructura del hero y navbar),
> Tekmetric (estilo propio y coherente; NO copiar sus tarjetas de una esquina cortada). Exploración completa:
> artifact "Sistema de marca MecaFix".

- **Faceta** (triángulos de la M): esquina facetada en superficies destacadas, cortes del hero, cierres. Componente `<Facet>`.
- **Pendiente de la X**: dirección de las acciones y del movimiento (abajo-izquierda → arriba-derecha).
- **Tuerca** (punto de la i): marca de cada eyebrow, estado activo, viñetas, sockets de iconos y confirmación ("se aprieta" al girar). `<Nut>`, `<Eyebrow>`, `clip-hex`. También dibuja el borde entre bandas (`nut-edge-top/bottom`).
- **Acero** (llave): reglas, cotas, marcas de registro y texto técnico.
- **Acciones**: paralelogramo a 76° con bloque de flecha (`<CtaButton>`), brillo diagonal al pasar el cursor.
- **Tarjetas**: siempre rectas; la geometría se suma (faceta, cuña, marcas de registro, regla, remaches). Nunca una sola esquina cortada.
- **Fondos**: plano técnico, malla hexagonal (oscuro), lámina antideslizante (rojo), remaches.
- **Separadores**: cotas, regla de medición, cadena de tuercas, cuña facetada.

> `/bulletproof-feature` consulta este archivo en cada cambio. Si algo cambia, edítalo aquí.

---

## 1. Identidad

- **Nombre de la app**: MecaFix
- **Tagline (frase corta)**: Tu taller, a toda máquina.
- **Descripción (1-2 frases, se usa en SEO)**: Software de gestión para talleres automotrices en Colombia: órdenes de trabajo, inventario, clientes, nómina de mecánicos y facturación electrónica DIAN en un solo sistema.
- **Problema que resuelve / propósito**: Los talleres llevan clientes, cotizaciones, órdenes y pagos en papel, WhatsApp y hojas de cálculo. MecaFix centraliza la operación diaria del taller y da al dueño visibilidad financiera.
- **Público objetivo**: Dueños y administradores de talleres automotrices pequeños y medianos en Colombia (contexto completo en `../../.claude/product-marketing.md`).
- **Idioma de la interfaz**: es
- **Locale para fechas y números**: es-CO
- **Moneda por defecto**: COP
- **Formato de fecha preferido**: "30 oct 2026" (decidido por Claude)

## 2. Personalidad y estilo visual

- **Sistema de diseño base**: propio, "Facetado" (ver bloque superior)
- **Adjetivos**: preciso, confiable, robusto, industrial, empresarial
- **Referencias**: Siesa (hero con video y cortes, navbar flotante), Tekmetric (coherencia de marca)
- **Lo que NO quieres**: verse genérico ni copiar a Tekmetric (tarjetas con una sola esquina cortada, todo en mono); nada recargado.
- **Densidad**: normal
- **Modo oscuro**: solo claro (con bandas oscuras de carbón y noche)

## 3. Colores

- **Rojo primario** `#A52A2F` (acción, marca) · hover `#7E1F23` · sobre oscuro `#E0484E` · facetas `#C4464C` · tinte `#F5E4E4`
- **Carbón** `#1E2126` (bandas oscuras) · **Noche** `#14161A` (hero, footer)
- **Gris acero** `#8B9198` (+ `#BFC3C8`, `#E3E4E6`)
- **Blanco humo** `#F4F2EF` (secciones alternas) · banda `#F0EDE8` (filas de módulos) · papel `#FBFAF8` · hojas `#FFFFFF`
- **Placa** `#F2C230` (solo previews de placas colombianas)
- **Gradientes**: solo el velo oscuro sobre el video del hero para legibilidad.

## 4. Tipografía

- **Títulos**: Montserrat Alternates ExtraBold (800), tracking −0.025em, sin mayúsculas forzadas
- **Interfaz y texto**: Inter (variable)
- **Etiquetas, eyebrows, órdenes, placas y valores**: IBM Plex Mono 500/600, MAYÚSCULAS con tracking en etiquetas
- **Tamaño base del texto**: 16px

## 5. Forma, profundidad y movimiento

- **Esquinas**: rectas (radio 0); la geometría de marca viene de `clip-*`
- **Botones**: `<CtaButton>` en marketing (paralelogramo + bloque de flecha); `<Button>` recto en la app
- **Sombras**: solo capas flotantes (navbar, menús, toasts) y la pantalla de producto
- **Animaciones**: entrada `rise` escalonada, `Reveal` al hacer scroll, brillo diagonal en botones, facetas que cambian de tono en hover, tuerca que gira. Las pantallas de producto (`scene-kit.tsx`) se reproducen una vez al aparecer, como un video corto, y quedan quietas. Nada de scroll secuestrado ni pantallas fijadas. Siempre con `motion-safe:`
- **Ancho máximo del contenido**: 76rem

## 6. Logo, iconos e imágenes

- **Logo**: `src/assets/logo.webp` (claro, "Fix" en carbón), `logo-inverse.webp` (oscuro), `logo-mark.webp` (M con llave). Componente `<Logo>`. Favicon en `public/favicon.png`.
- **Iconos**: lucide, dentro de sockets hexagonales (`clip-hex`)
- **Video del hero**: `src/features/marketing/assets/hero-workshop*` (clips de Mixkit, licencia gratuita) hasta tener video propio; mismo nombre de archivo para reemplazarlo
- **Ilustraciones**: pantallas del producto dibujadas con código (`platform-previews.tsx`) con datos de ejemplo

## 7. Estructura y navegación

- **Tipo de sitio**: landing + página de precios + app con sidebar (pendiente)
- **Header**: barra blanca flotante fija (estructura Siesa): logo, Plataforma ▾ (módulos), Cómo empezar, Precios, Preguntas, CTA "Prueba una demo gratis"
- **Footer**: noche, cinta roja diagonal arriba, columnas, contacto y créditos

## 8. Mapa de pantallas

- `/` · Landing (hecha): Hero con video ("Tu taller, a toda máquina."; CTAs "Prueba una demo gratis" y "Mira la plataforma") → Reencuadre visible sin scroll ("Cobra todo lo que tu taller ya trabaja.") + Con cuaderno y Excel / Con MecaFix → Mira la plataforma (`#plataforma`: 6 pasos de un día del taller en pestañas) → Confianza como pista de carreras con la meta "Un taller que funciona mejor" → 6 módulos (`#modulos`, `#modulo-<slug>`: filas alternas blanco / banda con borde de tuercas; texto y pantalla entran por lados opuestos; la pantalla se repite como video corto mientras está a la vista) → Cómo empezar → Calculadora (`#calculadora`, "¿Cuánta plata se le escapa a tu taller al año?") → Testimonios (de ejemplo) → Cuaderno vs Excel vs MecaFix → Precios (resumen) → Preguntas → Demo (`#demo`)
- `/plataforma/:modulo` · Página de módulo (plantilla base para ordenes, inventario, facturacion, nomina, asistente-ia, reportes; cada una se ampliará)
- `/precios` · Precios (hecha): planes con ciclo mensual/anual en la URL (`?ciclo=anual`), tabla comparativa, preguntas. Precios provisionales.
- `/auth/login` · Inicio de sesión (pendiente)
- `/app` · Panel del taller (pendiente)

## 9. Voz y contenido

- **Tono**: cercano y profesional
- **Trato al usuario**: tú
- **Ejemplos de textos de botones**: "Registrar vehículo", "Crear cotización", "Guardar cambios"
- **Cómo hablar en errores**: claro y sin culpar: "No pudimos guardar la cotización. Inténtalo de nuevo."
- **Estados vacíos**: con una acción: "Aún no hay vehículos registrados. Registra el primero."

## 10. Datos, backend y autenticación

- **URL de la API**: http://localhost:8080 (Spring Boot REST, en `server/`). Colección Postman en `MecaFix_Postman_Collection.json`.
- **Entidades principales**: usuario, cliente, vehículo, mecánico, servicio, categoría, producto, cotización (con detalle de servicios y productos), orden de servicio, tarea, pago.
- **Autenticación**: email + contraseña (backend existente)
- **Roles**: ADMIN (operación diaria) y OWNER (todo lo de admin + finanzas y estadísticas)
- **Integraciones externas** (producto): agentes de IA, WhatsApp, facturación electrónica DIAN. Formulario de demo → `POST /api/v1/demo-requests` (pendiente en backend; mock MSW).

## 11. SEO y compartir

- **Título de la pestaña**: MecaFix
- **Imagen para compartir en redes (OG)** (ruta):
- **Palabras clave**: taller mecánico, software para talleres, gestión de taller, Medellín, órdenes de servicio, cotizaciones

## 12. Calidad y extras

- **Prioridad de dispositivo**: ambos (el panel se usa en escritorio; la landing debe ser impecable en móvil)
- **Accesibilidad**: AA estándar
- **Extras a instalar**: ninguno por ahora

## 13. Notas libres

- Proyecto de portafolio: la arquitectura y cada detalle deben estar cuidados.
- El frontend vive en `frontend/`. `server/docker-compose.yml` hace build de `../frontend` y expone el puerto 5173. No se toca nada del backend (`server/`, `db/`).
