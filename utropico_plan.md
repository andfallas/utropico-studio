# Plan de desarrollo — utropico studio
## Sitio web React + Vite + Tailwind v4

---

## Contexto del proyecto

**Cliente:** utropico studio
**Rubro:** Muebles y diseño de interiores de lujo — madera, ratán, materiales naturales, estética tropical premium
**Referencia visual:** Instagram @utropicostudio — ambientes cálidos, madera expuesta, luz natural, arquitectura abierta
**Stack:** React 19 + Vite + Tailwind v4
**Objetivo:** Sitio premium no genérico que transmita artesanía, lujo natural y diseño con propósito

---

## Estética y dirección de diseño

### Paleta de colores
```
--color-bg:        #0E0C0A   /* negro cálido, casi tinta */
--color-surface:   #1A1612   /* superficie elevada */
--color-wood:      #8B5E3C   /* walnut medio — acento principal */
--color-sand:      #C4A882   /* arena cálida — acento secundario */
--color-cream:     #EDE4D3   /* crema — texto principal sobre oscuro */
--color-muted:     #6B5D4F   /* texto secundario */
--color-line:      #2A2219   /* divisores sutiles */
```

### Tipografía
- **Display / headings:** `Cormorant Garamond` — serif editorial, evoca artesanía y lujo atemporal
- **Body / UI:** `DM Sans` — geométrico limpio, contrasta sin competir
- Importar desde Google Fonts

### Filosofía de diseño
- Dark base con acentos tierra — no es oscuro frío sino oscuro cálido como una sala iluminada con velas
- Tipografía grande, audaz, con mucho espacio negativo
- Transiciones lentas y deliberadas — nada "salta", todo "respira"
- Grain overlay sutil en todo el sitio para textura de papel artesanal
- Cursor personalizado (círculo pequeño que sigue el mouse y cambia al hover)

---

## Overlay de carga (Loader)

**Concepto:** El logo se dibuja con un trazo SVG animado, luego hace un fade out lento que revela el sitio.

```
Duración total: ~2.5 segundos
- 0.0s → 1.2s: Trazo SVG del logo se dibuja con stroke-dashoffset
- 1.2s → 1.8s: Fill del logo aparece con fade
- 1.8s → 2.5s: Overlay completo hace fade out hacia arriba (translateY -100%)
- 2.5s: Contenido del sitio visible y animaciones de entrada inician
```

**Implementación:**
```jsx
// src/components/Loader.jsx
// Estado global con useState en App.jsx: isLoading
// Loader usa useEffect con setTimeout para controlar fases
// Al completar llama onComplete() que setIsLoading(false)
// Usar framer-motion AnimatePresence para el exit suave
```

**Dependencia requerida:** `framer-motion`

---

## Estructura del proyecto

```
utropico/
├── public/
│   └── fonts/           # Si se descargan localmente
├── src/
│   ├── components/
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ui/
│   │       ├── CursorFollow.jsx
│   │       ├── RevealText.jsx     # Texto que aparece línea por línea al scroll
│   │       ├── ImageHover.jsx     # Imagen con zoom suave al hover
│   │       └── GrainOverlay.jsx   # SVG feTurbulence grain en posición fixed
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalogo.jsx
│   │   ├── Proceso.jsx
│   │   ├── AboutUs.jsx
│   │   └── Contacto.jsx
│   ├── hooks/
│   │   ├── useScrollReveal.js     # IntersectionObserver para reveals
│   │   └── useCursor.js           # Posición del cursor personalizado
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Variables CSS + base styles
```

---

## Navegación (Navbar)

**Comportamiento:**
- Posición: `fixed top-0` — transparente al inicio
- Al hacer scroll: fondo oscuro semitransparente + blur con transición suave (0.4s)
- Logo a la izquierda: wordmark "utropico studio" en Cormorant Garamond
- Links a la derecha: Home · Catálogo · Proceso · Nosotros · Contacto
- Link activo: subrayado con color `--color-sand` que crece con transition-width
- Mobile: hamburger que abre un fullscreen menu con fondo negro y links grandes centrados
- El menú mobile se abre con una animación de cortina vertical

---

## Página: Home

### Sección 1 — Hero cinematográfico

```
Layout: Fullscreen (100vh)
Fondo: Video loop autoplay muted (placeholder con imagen de alta calidad)
Overlay: gradient de negro a transparent desde abajo

Contenido centrado inferior-izquierda:
  - Subtítulo pequeño uppercase: "DISEÑO · MADERA · ARTESANÍA"  (DM Sans, tracking wide, color sand)
  - Título grande: "Espacios que" / "cuentan historias" (Cormorant Garamond, 96px, color cream)
  - CTA: botón outline cream con hover que invierte colores, texto "Ver catálogo"
  - Indicador de scroll: línea vertical animada que baja

Animación de entrada (después del loader):
  - Subtítulo: fadeIn + slideUp, delay 0.2s
  - Línea 1 del título: fadeIn + slideUp, delay 0.4s
  - Línea 2 del título: fadeIn + slideUp, delay 0.6s
  - CTA: fadeIn, delay 0.9s
```

### Sección 2 — Statement / Filosofía

```
Layout: 2 columnas en desktop, 1 en mobile
Columna izquierda: número grande "01" en Cormorant, muy grande y muted
Columna derecha:
  - Label: "NUESTRA FILOSOFÍA"
  - Párrafo: texto largo sobre diseño natural, materiales honestos
  - Línea decorativa: borde izquierdo color wood

Reveal al scroll: texto aparece línea por línea con stagger
```

### Sección 3 — Catálogo preview (Grid asimétrico)

```
Layout: Masonry o grid manual con 5 imágenes en desktop
  - 1 imagen grande (2 columnas, 2 filas) — proyecto estrella
  - 4 imágenes medianas en grid 2x2 al lado

Hover en cada imagen:
  - Zoom suave de la imagen (scale 1.05, 0.6s ease)
  - Overlay oscuro semitransparente aparece desde abajo
  - Nombre del proyecto + categoría (Sala · Comedor · Dormitorio)
  - Flecha diagonal →

Al clickear: navega a /catalogo con filtro preseleccionado

CTA debajo: "Ver colección completa →" (link, no botón)
```

### Sección 4 — Proceso (Preview)

```
Layout: Horizontal scroll en mobile, 3 columnas en desktop
3 tarjetas con:
  - Número (01, 02, 03)
  - Icono SVG minimalista de línea
  - Título: "Diseño" / "Fabricación" / "Entrega"
  - Descripción corta

CTA: "Conocé nuestro proceso completo →"
```

### Sección 5 — About preview

```
Layout: Full-width con imagen de fondo (taller o proceso artesanal)
Overlay oscuro
Texto centrado:
  - Quote grande en Cormorant: "Cada pieza tiene un origen."
  - Párrafo corto de 2 líneas sobre la empresa
  - CTA: "Nuestra historia →"
```

### Sección 6 — Contacto CTA final

```
Background: color wood (#8B5E3C)
Texto claro:
  - Título: "¿Tenés un proyecto en mente?"
  - Subtítulo: "Hablemos."
  - Botón: fondo cream, texto oscuro
  - WhatsApp y email visibles debajo del botón
```

---

## Página: Catálogo

### Header de página

```
Fondo oscuro, título "Catálogo" en Cormorant grande, centrado
Subtítulo: "Productos y proyectos"
```

### Filtros

```
Tabs horizontales: Todos · Productos · Proyectos
Al cambiar tab: items hacen fade out → reorder → fade in
Estado activo: tab con underline color sand
```

### Grid de items

```
Desktop: 3 columnas
Mobile: 1 columna

Cada card:
  - Imagen ocupa 80% de la card
  - Hover: zoom imagen + overlay con nombre
  - Badge: "Producto" o "Proyecto" en esquina superior
  - Nombre del item
  - Descripción corta (1 línea)
  - Material principal (Ej: Teca · Ratán · Nogal)

Animación al cargar: items aparecen en stagger (50ms entre cada uno)
```

### Modal de detalle (al clickear una card)

```
Se abre sobre la página actual
Fondo: overlay negro semitransparente
Panel desliza desde la derecha (framer-motion)
Contenido del panel:
  - Galería de imágenes con thumbnails
  - Nombre y categoría
  - Descripción completa
  - Materiales utilizados
  - Dimensiones (si aplica)
  - CTA: "Consultar por WhatsApp" y "Solicitar cotización"
  - X para cerrar (esquina superior derecha)
Cierre también al clickear el overlay
```

---

## Página: Proceso

### Header

```
Título grande: "Cómo trabajamos"
Subtítulo editorial
```

### Timeline vertical

```
Línea vertical central (color wood) que conecta los pasos
Cada paso alterna izquierda/derecha en desktop, solo izquierda en mobile

Pasos:
  01 — Consulta inicial
  02 — Diseño y propuesta
  03 — Selección de materiales
  04 — Fabricación artesanal
  05 — Control de calidad
  06 — Entrega e instalación

Cada paso tiene:
  - Número grande (Cormorant, muted)
  - Título en cream
  - Descripción 2-3 líneas
  - Imagen del proceso (placeholder por ahora)

Reveal: al hacer scroll, cada paso aparece con fadeIn desde su lado
```

### Sección de materiales

```
Grid 2x3 con los materiales que usan:
  - Teca, Nogal, Ratán, Bambú, Cemento pulido, Fierro negro
  - Cada uno con imagen de textura (placeholder) + nombre + descripción corta
```

---

## Página: About Us

### Hero

```
Split layout: 50% imagen izquierda, 50% texto derecha
Imagen: foto del taller o equipo
Texto:
  - Label: "NUESTRA HISTORIA"
  - Título Cormorant grande
  - Párrafo sobre los fundadores y la visión
```

### Valores

```
3 columnas con valor + descripción:
  - Materiales honestos
  - Diseño con propósito
  - Artesanía local
```

### Números

```
Stats en línea horizontal:
  - "XX+" proyectos completados
  - "XX" años de experiencia
  - "X" países de exportación
Los números hacen count-up animation al entrar en viewport
```

### Equipo (opcional)

```
Grid de cards con foto en escala de grises + nombre + rol
Hover: foto pasa a color suavemente
```

---

## Página: Contacto

### Layout

```
Split 50/50 en desktop:
  Izquierda: información de contacto
    - Dirección / ciudad
    - WhatsApp (link directo wa.me)
    - Email
    - Instagram (link @utropicostudio)
    - Horario de atención
  Derecha: formulario
```

### Formulario

```
Campos:
  - Nombre completo
  - Email
  - Teléfono / WhatsApp
  - Tipo de consulta: select (Producto · Proyecto · General)
  - Mensaje: textarea
  - Submit: botón con loading state

Estilo de inputs:
  - Sin borde, solo border-bottom color line
  - Label flota hacia arriba al focus (floating label)
  - Focus: border-bottom cambia a color wood con transition
  - Error: texto rojo debajo del campo

Submit: por ahora solo console.log o alert de éxito (sin backend)
```

---

## Componentes globales

### CursorFollow.jsx

```jsx
// Div fixed con z-index alto
// Círculo pequeño (8px) color cream, mix-blend-mode: difference
// Sigue el mouse con lag suave (lerp en requestAnimationFrame)
// Al hover de links/buttons: escala a 32px, opacity baja
// Al hover de imágenes: aparece texto "VER" dentro del cursor grande
// Solo visible en desktop (media query md+)
```

### GrainOverlay.jsx

```jsx
// SVG con feTurbulence generando ruido
// Position fixed, pointer-events none, z-index 9999
// Opacity 0.04 — casi invisible pero perceptible
// Da textura de papel/impresión a toda la página
```

### RevealText.jsx

```jsx
// Recibe texto y lo divide por líneas
// Cada línea tiene overflow hidden + span hijo
// Al entrar en viewport: translateY(100% → 0) con stagger
// Props: delay, duration, stagger
```

### useScrollReveal.js

```js
// IntersectionObserver hook
// Recibe ref y opciones (threshold, rootMargin)
// Retorna isVisible boolean
// Usado para activar animaciones de entrada
```

---

## Animaciones y transiciones

### Page transitions

```
Al cambiar de ruta:
  - Página saliente: fadeOut + scale(0.98), 0.3s
  - Overlay negro: entra y sale (cortina vertical), 0.4s
  - Página entrante: fadeIn + scale(1), 0.3s
Implementado con framer-motion AnimatePresence en App.jsx
```

### Scroll-based reveals

```
Todos los elementos de contenido (secciones, cards, textos):
  - Estado inicial: opacity 0 + translateY 30px
  - Al entrar en viewport (threshold 0.15): transición a opacity 1 + translateY 0
  - Duration: 0.7s ease-out
  - Stagger entre elementos del mismo grupo: 80ms
```

### Hover states

```
Imágenes: scale(1.04) en 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
Botones outline: background fill desde izquierda (::after pseudo-element)
Links de nav: underline que crece desde izquierda
Cards: sutil elevación (box-shadow más pronunciada)
```

---

## Dependencias requeridas

```bash
npm create vite@latest utropico -- --template react
cd utropico
npm install
npm install framer-motion
npm install react-router-dom
```

```css
/* En index.css o en index.html <link> */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
```

**Tailwind v4:** Configuración en `vite.config.js` con el plugin `@tailwindcss/vite`

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## Datos placeholder (para desarrollo)

Crear archivo `src/data/catalogo.js` con array de items:

```js
export const catalogoItems = [
  {
    id: 1,
    tipo: 'proyecto',           // 'proyecto' | 'producto'
    nombre: 'Casa Río Verde',
    descripcion: 'Proyecto residencial completo. Sala, comedor y terraza.',
    material: 'Teca · Ratán',
    imagenes: ['/placeholder-1.jpg'],  // usar Unsplash URLs temporalmente
    dimensiones: null,
  },
  {
    id: 2,
    tipo: 'producto',
    nombre: 'Mesa Nogal XL',
    descripcion: 'Mesa de comedor en nogal macizo, acabado natural.',
    material: 'Nogal',
    imagenes: ['/placeholder-2.jpg'],
    dimensiones: '220 × 90 × 76 cm',
  },
  // ... 8-10 items más para poblar el catálogo
];
```

Para las imágenes placeholder usar URLs de Unsplash con query "wood furniture interior":
```
https://images.unsplash.com/photo-XXXXXXX?w=800&q=80
```

---

## Variables CSS globales (index.css)

```css
@import "tailwindcss";

:root {
  --color-bg:       #0E0C0A;
  --color-surface:  #1A1612;
  --color-wood:     #8B5E3C;
  --color-sand:     #C4A882;
  --color-cream:    #EDE4D3;
  --color-muted:    #6B5D4F;
  --color-line:     #2A2219;

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'DM Sans', sans-serif;

  --ease-premium: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  cursor: none; /* Se reemplaza con CursorFollow */
}

body {
  background-color: var(--color-bg);
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar custom */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-wood); border-radius: 2px; }

/* Selección de texto */
::selection { background: var(--color-wood); color: var(--color-cream); }
```

---

## Notas para Claude Code

1. **Prioridad de ejecución:** Loader → App shell → Home → Navbar → Footer → páginas interiores → componentes UI
2. **Imágenes:** Usar URLs de Unsplash directamente en el código hasta que el cliente provea sus fotos reales
3. **Video del hero:** Usar una imagen estática de alta calidad como fallback mientras no haya video real
4. **El grain overlay es clave** para la sensación premium — no omitirlo
5. **El cursor personalizado** solo aplica en `@media (pointer: fine)` — en touch devices usar cursor normal
6. **framer-motion** para todas las animaciones de entrada y page transitions — no CSS animations para estos casos
7. **React Router v6** para el enrutamiento — usar `<BrowserRouter>` en main.jsx
8. **No usar ninguna librería de componentes UI** (no shadcn, no MUI) — todo custom para mantener la estética
9. **Responsive breakpoints:** mobile first, md (768px), lg (1024px), xl (1280px)
10. **WhatsApp CTA:** El número se pone como placeholder, el cliente lo reemplaza
