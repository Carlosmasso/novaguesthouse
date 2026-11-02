# Nova Guest House Central — web (Next.js)

Guest house boutique en Alcorcón, Madrid. Proyecto Next.js 15 (App Router + TypeScript) con exportación estática.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Publicar

```bash
npm run build      # genera la carpeta /out (web estática)
```

- **Netlify (recomendado):** conecta el repositorio; `netlify.toml` ya indica `npm run build` y la carpeta `out`. También puedes arrastrar la carpeta `out` a app.netlify.com/drop.
- **Vercel:** importa el repositorio, sin configuración extra.

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| Datos del negocio: dirección, teléfono, WhatsApp, email, registro, precios, m², reseñas, lugares cercanos, respuestas FAQ | `lib/config.ts` |
| Textos en español e inglés | `lib/dict.ts` |
| Habitaciones (fotos, equipamiento), galería e iconos | `lib/data.ts` |
| Fotos | `public/img/` |
| Estilos (colores, tipografía, layout) | `app/globals.css` (tokens en `:root`) |

Todo lo que esté vacío en `lib/config.ts` aparece en la web resaltado como **[pendiente]**.

## Estructura

```
app/
  layout.tsx                 fuentes, metadatos, proveedores (idioma, visor de fotos)
  page.tsx                   portada
  habitaciones/[id]/page.tsx ficha de cada habitación (/habitaciones/roble, /habitaciones/lino)
components/                  Header (menú móvil), Hero, Facts, Gallery, Rooms, Location (Google Maps),
                             Arrival, Reviews, Faq, Booking (+ DateRange, Select), Closer, Footer,
                             RoomDetail, Lightbox, ui (Reveal, iconos…)
lib/                         config, dict (i18n), data, utils, i18n (contexto de idioma)
```

## Notas

- Idioma por defecto: español. El selector ES/EN recuerda la elección durante la sesión.
- La reserva no tiene backend: el formulario prepara el mensaje y lo abre en WhatsApp (`CONFIG.whatsapp`).
- El enlace «Reservar esta habitación» de cada ficha abre `/?habitacion=<id>#reservar` con la habitación ya elegida.
# novaguesthouse
