# Nova Guest House Central: estado de la web

Actualizado el 2 de noviembre de 2026.

Este documento resume lo que ya está hecho en la web y lo que falta para publicarla con datos reales. Las tareas pendientes están en orden: primero lo que impide publicar.

---

## Pendiente

### 1. Datos reales del alojamiento

Todos los datos se rellenan en un único archivo: `lib/config.ts`. Mientras un campo esté vacío (`""`), la web lo muestra resaltado como pendiente.

Obligatorios para publicar:

| Campo | Qué poner | Dónde se ve |
|---|---|---|
| `owner` | Nombre o razón social del titular | Aviso legal, privacidad |
| `nif` | NIF o CIF del titular | Aviso legal, privacidad |
| `registry` | Nº de registro turístico de la Comunidad de Madrid | Pie de página, aviso legal |
| `email` | Email de contacto | Pie de página, textos legales |
| `siteUrl` | Dominio definitivo, p. ej. `https://novaguesthouse.com` | Google, sitemap, imagen al compartir |
| `rooms.roble.price` / `rooms.lino.price` | Precio por noche, p. ej. `"62 €"` | Tarjetas, fichas, barra de reserva |
| `rooms.roble.size` / `rooms.lino.size` | Metros cuadrados, p. ej. `"14"` | Fichas de habitación |

Recomendados (la web funciona sin ellos, pero se ven huecos):

| Campo | Qué poner |
|---|---|
| `bookingUrl` / `airbnbUrl` | Enlace a la ficha pública de cada plataforma |
| `rating` / `ratingSource` | Puntuación real y fuente, p. ej. `"9,4"` y `"Booking.com · 120 opiniones"` |
| `reviews` | Tres reseñas **reales**, copiadas de Booking o Airbnb, con nombre, país y fecha |
| `nearby` | Minutos reales a metro, Cercanías, comercios y centro de Madrid |
| `faq` | Respuestas sobre aparcamiento, mascotas, cancelación, equipaje y limpieza (en español e inglés) |
| `whatsapp` | Confirmar que el número `624 86 75 40` tiene WhatsApp |

Las reseñas y la puntuación tienen que ser reales. Publicar reseñas inventadas para un negocio real es ilegal en España y la UE. Los datos de ejemplo de `lib/demo.ts` nunca salen en la web pública (ver «Datos de demostración» más abajo).

### 2. Calendarios de disponibilidad

La web marca como ocupadas las noches que ya están reservadas en Booking y Airbnb. Para ello necesita el enlace iCal de cada habitación en cada plataforma.

**Cómo conseguir los enlaces** (los nombres de los menús pueden variar un poco):

- **Booking.com (extranet):** Tarifas y disponibilidad → Sincronizar calendarios → elegir la habitación → Exportar calendario → copiar el enlace `.ics`.
- **Airbnb:** Calendario → elegir el anuncio → Disponibilidad → Sincronizar calendarios → Exportar calendario → copiar el enlace.

**Dónde ponerlos:** en Netlify, Site configuration → Environment variables. Se crean dos variables y, si hay enlace de las dos plataformas, se separan con una coma:

```
ICAL_ROBLE = https://admin.booking.com/...ics, https://www.airbnb.es/calendar/ical/...ics
ICAL_LINO  = https://admin.booking.com/...ics, https://www.airbnb.es/calendar/ical/...ics
```

Después hay que volver a desplegar la web.

> Los enlaces llevan un código privado: no deben ponerse en el código ni compartirse.

**Importante:** la web *lee* los calendarios, pero no los modifica. Cuando entra una reserva directa por WhatsApp hay que bloquear esas noches a mano en Booking y Airbnb para evitar dobles reservas. También conviene que Booking y Airbnb se importen el calendario el uno al otro si no lo hacen ya.

La disponibilidad se actualiza cada 15 minutos aproximadamente.

### 3. Revisión legal

Los textos de `/aviso-legal`, `/privacidad` y `/cookies` son una base correcta, pero deben revisarlos la gestoría o un abogado antes de publicar. Puntos concretos que confirmar:

- **Titular:** si la web la explota una persona física o una sociedad (cambia los datos del aviso legal).
- **Plazos de conservación:** la privacidad indica un año para consultas que no acaban en reserva y hasta tres años para el registro de viajeros. Confirmar que coincide con lo que hacéis.
- **Proveedores:** se citan WhatsApp (Meta), Netlify, Booking.com y Airbnb. Añadir cualquier otro que trate datos de huéspedes (gestoría, programa de check-in, cerraduras digitales…).
- **Política de cancelación:** la FAQ de ejemplo dice «gratis hasta 48 h antes» para reservas directas. Poner la real.
- **Registro turístico:** confirmar el formato exacto del número que exige la Comunidad de Madrid.

Los textos legales solo están en español, que es la versión legalmente válida. Desde la versión inglesa se enlaza a ellos indicando «(ES)».

### 4. Publicación

1. Subir los cambios al repositorio. Ahora mismo no hay nada confirmado (commit) desde el primer commit.
2. En Netlify, comprobar que la variable `NEXT_PUBLIC_DEMO` **no** existe en producción.
3. Desplegar y revisar la web publicada.
4. Dar de alta el dominio en Google Search Console y enviar `https://<dominio>/sitemap.xml`.
5. Comprobar los datos estructurados con la [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).

---

## Implementado

### Reservas

- **Barra de reserva bajo la portada:** fechas de llegada y salida, precio «desde» y botón «Ver disponibilidad», que baja al formulario con las fechas ya puestas. Si la habitación elegida está ocupada esas noches, cambia sola a una que esté libre.
- **Disponibilidad en el calendario:** las noches ocupadas salen rayadas y no se pueden elegir, y no se puede reservar una estancia que cruce una noche ocupada. La de salida sí puede ser el día en que empieza otra reserva.
- **Aviso de habitación ocupada:** si se cambia de habitación con unas fechas que no están libres, el formulario lo avisa y ofrece cambiar a la otra.
- **Envío directo a WhatsApp:** el botón «Pedir por WhatsApp» abre WhatsApp con el mensaje ya escrito. Debajo queda el texto con opción de copiarlo, por si no se abre.
- **Calendario más compacto:** ya no se sale del formulario ni provoca scroll horizontal. Muestra uno o dos meses según el espacio disponible.
- **Enlaces a Booking y Airbnb:** ocupan todo el ancho de la columna.

### Idiomas y SEO

- **Versión inglesa con URL propia:** `/en/` y `/en/habitaciones/…`. Antes el inglés solo existía en el navegador y Google no lo veía. Cada página indica a Google cuál es su equivalente en el otro idioma (`hreflang`).
- **Datos estructurados para Google:** tipo de alojamiento, dirección, teléfono, horarios de entrada y salida, rango de precios y servicios. La puntuación solo se incluye cuando es real.
- **`sitemap.xml` y `robots.txt`**, generados automáticamente.
- **Favicon.**
- **Imagen y descripción al compartir** cada habitación por WhatsApp o redes, en los dos idiomas.

### Legal y privacidad

- **Páginas de aviso legal, privacidad y cookies**, enlazadas desde el pie de página. Los datos del titular se rellenan desde `lib/config.ts`.
- **Fuentes tipográficas servidas desde la propia web:** el navegador del visitante ya no se conecta a Google al cargarla.
- **Mapa de Google bajo demanda:** solo se carga cuando el visitante pulsa «Ver mapa interactivo». Por eso la web no instala ninguna cookie y no necesita banner de cookies.

### Detalles

- **Carrusel de la portada:** tiene botón de pausa, y cada foto se anuncia para lectores de pantalla («Foto 2 de 4»).
- **Títulos de sección:** ya no salen con las palabras pegadas («Cuéntanostusfechas»).
- **Título de la sección de reserva:** alineado a la izquierda.

### Datos de demostración

Para ver la web «llena» mientras faltan los datos reales, `lib/demo.ts` contiene precios, reseñas, puntuación, respuestas de la FAQ, ocupación del calendario y datos de titular **ficticios**.

- Se muestran en desarrollo (`npm run dev`) y en los *deploy previews* y ramas de Netlify, para enseñar la web al cliente.
- **No** se muestran en la web pública: ahí los huecos salen resaltados como pendientes.
- En cuanto un dato se rellena en `lib/config.ts`, ese dato real sustituye al de ejemplo.

---

## Fuera de alcance por ahora

- **Imágenes en varios tamaños para móvil:** las fotos ya pesan poco (unos 130 KB cada una), así que la mejora sería pequeña.
- **Idioma de la página `/en/`:** el atributo que lo indica se corrige al cargar la página, no en el HTML inicial. Google se guía sobre todo por `hreflang`, así que no debería afectar al posicionamiento.
