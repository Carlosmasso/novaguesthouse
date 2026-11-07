# Nova Guest House Central: estado de la web

Actualizado el 5 de noviembre de 2026.

Este documento resume lo que ya está hecho en la web y lo que falta para publicarla con datos reales. Las tareas pendientes están en orden: primero lo que impide publicar.

La referencia del diseño es la [revisión del cliente](https://docs.google.com/document/d/1guAnKY1QC8Uo2H1K-Ia-9j8wBWWUehJx9Rc4ajFOaQI/edit) y su mensaje posterior. Donde se contradicen, manda el mensaje: web sencilla, sin enseñar todas las habitaciones, con botón flotante «Reservar ahora».

---

## Pendiente

### 1. Datos reales del alojamiento

Todos los datos se rellenan en un único archivo: `lib/config.ts`. Mientras un campo esté vacío (`""`), la web lo muestra resaltado como pendiente.

Obligatorios para publicar:

| Campo | Qué poner | Dónde se ve |
|---|---|---|
| `owner` / `nif` | Titular y NIF o CIF | Aviso legal, privacidad |
| `registry` | Nº de registro turístico de la Comunidad de Madrid | Pie de página, aviso legal |
| `email` | Email de contacto | Pie de página, reserva, textos legales |
| `siteUrl` | Dominio definitivo | Google, sitemap, imagen al compartir |
| `bookingUrl` | Enlace a la ficha de Booking.com (el de Airbnb ya está puesto) | Página de reserva |
| `metroWalk` | Minutos reales a pie hasta Alcorcón Central | Ubicación |
| `times[].min` | Tiempos reales a Sol, Atocha, Chamartín y aeropuerto | Ubicación |
| `quietHours` / `visitors` | Horario de silencio y política de visitantes | Habitaciones |

### 2. Por confirmar con el cliente

Hay datos que salen de sus maquetas o que no coinciden con lo que teníamos:

| Dato | En la web | En las maquetas | Qué hacer |
|---|---|---|---|
| Teléfono y WhatsApp | 624 86 75 40 | 620 544 320 y 611 234 567 | Confirmar cuál es real y si tiene WhatsApp |
| Dirección | P.º de Castilla, 41 (posterior), frente a P.º de Extremadura, 3 | Paseo de Extremadura, 3 posterior | Confirmar |
| Email | Pendiente | novaguesthouse@outlook.com y hola@novahouse.es | Confirmar |
| Nº de habitaciones | Cuatro | Cuatro (la web anterior decía dos) | Confirmar |
| Equipamiento | Lista de su maqueta | Secador de pelo solo aparece ahí | Confirmar |
| Autobuses y accesos | Líneas a Madrid; A-5, M-40 y M-50 | Igual | Confirmar |

**Tiempos de sus maquetas.** Se ven en las vistas previas de `lib/demo.ts`, nunca en la web pública:

- Los 20 minutos a Sol parecen optimistas. La maqueta decía «en Metro», pero la L12 no llega al centro, así que la web dice «en transporte público».
- La maqueta decía que la C-5 conecta directa con Sol y Chamartín. Solo está confirmada Atocha, así que la web solo dice Atocha.

### 3. Material que falta

- **Fotos definitivas.** Las actuales son provisionales: el cliente enviará las nuevas al terminar las obras. Convienen fotos horizontales, porque todas las actuales son verticales y pierden nitidez a pantalla completa.
- **Foto real de la zona o de Alcorcón Central.** La de la maqueta está generada por ordenador, así que no se usa. Mientras tanto sale la fachada.
- **Logotipo.** Las maquetas muestran un monograma «NH» y el cartel real dice «NOVAGUESTHOUSE». Sin archivo de logo, la web usa el nombre en texto.
- **Vídeo del carrusel.** El documento lo menciona, pero no hay vídeo. Por ahora el carrusel es de fotos.

### 4. Revisión legal

Los textos de `/aviso-legal`, `/privacidad` y `/cookies` son una base correcta, pero deben revisarlos la gestoría o un abogado antes de publicar. Puntos concretos que confirmar:

- **Titular:** si la web la explota una persona física o una sociedad.
- **Plazos de conservación:** un año para consultas que no acaban en reserva y hasta tres años para el registro de viajeros.
- **Proveedores:** se citan WhatsApp (Meta), Netlify, Booking.com y Airbnb. Añadir cualquier otro que trate datos de huéspedes.
- **Registro turístico:** el formato exacto del número que exige la Comunidad de Madrid.

Los textos legales solo están en español, que es la versión legalmente válida. Desde la versión inglesa se enlaza a ellos indicando «(ES)».

### 5. Publicación

1. Subir los cambios al repositorio.
2. En Netlify, comprobar que la variable `NEXT_PUBLIC_DEMO` **no** existe en producción.
3. Desplegar y revisar la web publicada.
4. Dar de alta el dominio en Google Search Console y enviar `https://<dominio>/sitemap.xml`.
5. Comprobar los datos estructurados con la [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).

---

## Implementado

- **Estilo:** titulares en serif (Libre Caslon Display), resto en Figtree, tonos cálidos con dorado como único acento y mucho aire entre secciones. Solo modo claro.
- **Portada:** foto a pantalla completa con velo ligero, carrusel de habitaciones con cuatro iconos y bloque de ubicación.
- **`/habitaciones/`:** una sola «Habitación Doble» con las mejores fotos, equipamiento con iconos y normas de la casa.
- **`/ubicacion/`:** conexiones (Metro, Cercanías, autobuses, coche), mapa animado con los tiempos a Madrid y servicios cercanos. El mapa sitúa cada destino a escala; sus líneas no son el trazado de una línea de transporte.
- **`/reservar/`:** tres grandes paneles de foto (WhatsApp, destacado; Booking; Airbnb), más contacto de ayuda.
- **Botón flotante «Reservar ahora»:** en todas las páginas salvo la de reserva.
- **Móvil:** menú desplegable, carrusel y fotos que se deslizan con el dedo y botones a tamaño de dedo.
- **Movimiento:** carrusel con profundidad que se arrastra, fotos que se abren al llegar, parallax, y cabecera que se aparta al bajar. Con «reducir movimiento» activado en el dispositivo, todo queda quieto.
- **Visor de fotos:** se abre desde la propia foto; admite teclado, deslizar y arrastrar hacia abajo para cerrar.
- **Página 404** propia en español e inglés.
- **Idiomas y SEO:** versión inglesa bajo `/en/` con `hreflang`, datos estructurados, `sitemap.xml` y `robots.txt`.
- **Privacidad:** sin cookies ni conexiones a terceros al cargar, así que no hace falta banner de cookies.

### Datos de demostración

`lib/demo.ts` contiene datos **de ejemplo** para ver la web completa mientras faltan los reales.

- Se muestran en desarrollo (`npm run dev`) y en los *deploy previews* y ramas de Netlify.
- **No** se muestran en la web pública: ahí los huecos salen resaltados como pendientes.
- En cuanto un dato se rellena en `lib/config.ts`, ese dato real sustituye al de ejemplo.

---

## Retirado

Sigue en el historial de git (commit `07cfe48`): fichas individuales de habitación, formulario con calendario y disponibilidad por iCal, precios, opiniones, preguntas frecuentes, pasos de llegada y mapa incrustado.
