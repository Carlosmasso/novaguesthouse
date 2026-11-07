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
| Datos del negocio: contacto, enlaces de reserva, tiempos de transporte, normas | `lib/config.ts` |
| Textos en español e inglés | `lib/dict.ts` |
| Qué foto sale en cada sección e iconos | `lib/data.ts` |
| Fotos | `public/img/` |
| Estilos (colores, tipografía, layout) | `app/globals.css` (tokens en `:root`) |

Todo lo que esté vacío en `lib/config.ts` aparece en la web resaltado como **[pendiente]**.

## Estructura

```
app/
  layout.tsx            fuentes, metadatos
  page.tsx              portada
  habitaciones/         fotos, equipamiento y normas de la casa
  ubicacion/            conexiones y tiempos a Madrid
  reservar/             WhatsApp, Booking y Airbnb
  en/                   las mismas páginas en inglés
components/             Header, Hero, RoomsTeaser, LocationTeaser, RoomsPage, LocationPage, Reserve,
                        BookFab (botón flotante «Reservar ahora»), Footer, Lightbox, Legal, ui
lib/                    config, dict (i18n), data, meta, utils, i18n (contexto de idioma)
```

## Notas

- Idioma por defecto: español. El inglés vive en `/en/`.
- La web no tiene formularios ni backend: las reservas se hacen por WhatsApp, Booking o Airbnb.
# novaguesthouse
