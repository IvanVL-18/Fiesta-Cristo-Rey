# Fiesta Patronal 2026 en honor a Cristo Rey

Página de la Fiesta Patronal de Jagüey de Téllez, Hidalgo (20, 21 y 22 de noviembre de 2026): programa completo, lo más estelar del domingo con cuenta regresiva, cómo llegar y botones para invitar por WhatsApp.

**Página:** https://ivanvl-18.github.io/Fiesta-Cristo-Rey/

## Cambiar algo del programa

Todo el programa vive en **`js/programa.js`**. Corrige el texto, guarda y sube el cambio:

```bash
git add js/programa.js
git commit -m "Actualiza el programa"
git push
```

GitHub Pages publica solo en uno o dos minutos.

- `inicio` y `fin` de cada evento sirven para que la página marque sola qué está pasando **ahorita**, **lo que sigue** y lo que **ya pasó**. Usan la hora de México (`-06:00`).
- `mapaExplanada`: pega ahí el link de Google Maps de la Explanada Principal y el botón de ese lugar abrirá justo ahí.
- `liston`: las frases que corren en la franja de arriba.

## Vista previa al compartir

La imagen está en `img/og-image.jpg` (1200 × 630). Si la cambias, sube el número de `?v=1` en las etiquetas `og:image` de `index.html` para que WhatsApp y Facebook no muestren la vieja. Para refrescar Facebook: https://developers.facebook.com/tools/debug/

El cartel original se puede descargar desde la página (`img/programa.jpg`) y el concierto del domingo se agrega al calendario con `bailazo.ics` (iPhone) o Google Calendar (Android).

## Ver la página en tu computadora

```bash
python -m http.server 8000
```

Y abre http://localhost:8000

## Cómo está hecha

HTML, CSS y JavaScript sin dependencias ni paso de compilación.

```
index.html          Estructura, metadatos para compartir e ilustraciones (sprite SVG)
css/styles.css      Estilos
js/programa.js      Programa, horarios y lugares
js/app.js           Programa, cuenta regresiva, estado en vivo, invitar y compartir
img/                Imagen para compartir, íconos y cartel original
bailazo.ics         Evento del Gran Bailazo para el calendario
fonts/              Shrikhand y Baloo 2 (licencia SIL Open Font License)
404.html            Página para enlaces rotos
```
