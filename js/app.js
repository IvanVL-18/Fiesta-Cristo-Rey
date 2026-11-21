/* Fiesta de Cristo Rey: arma el programa, la cuenta regresiva y lo que está pasando ahorita. */
(() => {
  'use strict';

  const F = window.FIESTA;
  if (!F) return;
  document.documentElement.classList.add('js');

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const icono = (id) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const NOMBRE_DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  const canonica = $('link[rel="canonical"]');
  const URL_PAGINA = canonica ? canonica.href : location.origin + location.pathname;

  const eventos = F.eventos.map((e) => ({ ...e, t0: Date.parse(e.inicio), t1: Date.parse(e.fin) }));
  const estelar = eventos.find((e) => e.estelar);

  /* ---------- Fecha de hoy en Jagüey de Téllez ---------- */

  const fechaMx = (ms) => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date(ms));
  const diasEntre = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);

  const cuando = (e, ahora) => {
    const dif = diasEntre(fechaMx(ahora), e.inicio.slice(0, 10));
    const dia = dif === 0 ? 'hoy' : dif === 1 ? 'mañana' : `el ${NOMBRE_DIA[new Date(`${e.inicio.slice(0, 10)}T12:00:00Z`).getUTCDay()]}`;
    if (e.ampm.startsWith('a ')) return `${dia} de ${e.hora} ${e.ampm}`;
    return `${dia} ${e.hora.startsWith('1:') ? 'a la' : 'a las'} ${e.hora} ${e.ampm}`;
  };

  /* ---------- Listón ---------- */

  const destello = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-destello"/></svg>';
  const vuelta = (F.liston || []).map((t) => `<span class="liston__item">${esc(t)}${destello}</span>`).join('');
  $('#liston').innerHTML = vuelta + vuelta;

  /* ---------- Programa ---------- */

  const boleto = (e) => {
    const datos = (e.datos || []).map((d) => `<li>${icono(d.icono)}<span>${esc(d.texto)}</span></li>`).join('');
    const artistas = e.artistas ? `<ul class="artistas">${e.artistas.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : '';
    const lista = e.lista ? `<p class="chips-titulo">${esc(e.lista.titulo)}</p><ul class="chips">${e.lista.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
    const rol = e.rol ? `<table class="rol"><caption>Rol de partidos</caption><tbody>${e.rol.map(([h, p]) => `<tr><td>${esc(h)}</td><td>${esc(p)}</td></tr>`).join('')}</tbody></table>` : '';
    return `
      <article class="boleto${e.estelar ? ' boleto--estelar' : ''}" id="ev-${e.id}" data-evento="${e.id}" aria-labelledby="t-${e.id}">
        <div class="boleto__talon">
          <span class="boleto__hora">${esc(e.hora)}</span>
          <span class="boleto__ampm">${esc(e.ampm)}</span>
          <span class="boleto__estado"></span>
        </div>
        <div class="boleto__cuerpo">
          <h4 class="boleto__titulo" id="t-${e.id}">${esc(e.titulo)}</h4>
          ${e.etiqueta ? `<span class="boleto__etiqueta">${esc(e.etiqueta)}</span>` : ''}
          <p class="boleto__frase">${esc(e.frase)}</p>
          ${artistas}
          <ul class="datos">${datos}</ul>
          ${lista}${rol}
          ${e.estelar ? '<a class="boleto__mas" href="#estelar">Ver la cuenta regresiva</a>' : ''}
          <div class="boleto__sticker" aria-hidden="true">
            <svg class="s-sello" viewBox="0 0 120 120"><use href="#i-sello"/></svg>
            ${e.foto ? `<img class="s-foto" src="${esc(e.foto)}" alt="" width="240" height="240" loading="lazy">` : `<svg class="s-dibujo" viewBox="0 0 120 120"><use href="#i-${e.icono}"/></svg>`}
          </div>
        </div>
      </article>`;
  };

  $('#programa-contenido').innerHTML = F.dias.map((d) => `
    <section class="dia" id="dia-${d.id}" aria-labelledby="dt-${d.id}">
      <h3 class="dia__titulo" id="dt-${d.id}">${esc(d.nombre)}<span class="dia__hoy" hidden>Hoy</span></h3>
      ${eventos.filter((e) => e.dia === d.id).map(boleto).join('')}
    </section>`).join('');

  $('#dias').innerHTML = F.dias.map((d) => `
    <li><a class="dia-chip" href="#dia-${d.id}" data-dia="${d.id}" aria-current="false">${esc(d.corto)}<span class="dia-chip__hoy" hidden>Hoy</span></a></li>`).join('');

  /* ---------- Lugares ---------- */

  $('#lugares').innerHTML = F.lugares.map((l) => {
    const propio = l.mapa || (l.nombre === 'Explanada Principal' ? F.mapaExplanada : '');
    const url = propio || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${l.nombre}, Jagüey de Téllez, Hidalgo`)}`;
    return `<li><a class="lugar" href="${esc(url)}" target="_blank" rel="noopener">${icono('pin')}
      <span><span class="lugar__nombre">${esc(l.nombre)}</span><span class="lugar__para">${esc(l.para)}</span>
      <span class="lugar__abrir">Abrir en Google Maps</span></span></a></li>`;
  }).join('');

  /* ---------- Qué está pasando ahorita ---------- */

  const actualizarEstados = () => {
    const ahora = Date.now();
    const enCurso = eventos.filter((e) => e.t0 <= ahora && ahora < e.t1);
    const proximo = eventos.filter((e) => e.t0 > ahora).sort((a, b) => a.t0 - b.t0)[0];

    eventos.forEach((e) => {
      const el = $(`[data-evento="${e.id}"]`);
      let estado = '';
      let texto = '';
      if (ahora >= e.t1) { estado = 'paso'; texto = 'Ya pasó'; }
      else if (ahora >= e.t0) { estado = 'ahorita'; texto = 'Ahorita'; }
      else if (proximo && proximo.id === e.id) { estado = 'sigue'; texto = 'Lo que sigue'; }
      el.dataset.estado = estado;
      $('.boleto__estado', el).textContent = texto;
    });

    const hoy = fechaMx(ahora);
    F.dias.forEach((d) => {
      const esHoy = d.fecha === hoy;
      $(`#dia-${d.id} .dia__hoy`).hidden = !esHoy;
      $(`.dia-chip[data-dia="${d.id}"] .dia-chip__hoy`).hidden = !esHoy;
    });

    const pildora = $('#en-vivo');
    const texto = $('#en-vivo-texto');
    if (enCurso.length) {
      const e = enCurso.sort((a, b) => b.t0 - a.t0)[0];
      pildora.dataset.estado = 'ahorita';
      texto.textContent = `Ahorita: ${e.titulo}, en ${e.lugar}.`;
    } else if (proximo) {
      pildora.dataset.estado = 'sigue';
      const frase = `Lo que sigue: ${proximo.titulo}, ${cuando(proximo, ahora)}`;
      texto.textContent = frase.endsWith('.') ? frase : `${frase}.`;
    } else {
      pildora.dataset.estado = 'fin';
      texto.textContent = '¡Gracias por venir! Nos vemos en la fiesta del próximo año.';
    }
  };
  actualizarEstados();
  setInterval(actualizarEstados, 30000);

  /* ---------- Cuenta regresiva al Gran Bailazo ---------- */

  const dos = (n) => String(n).padStart(2, '0');
  const cuenta = () => {
    if (!estelar) return;
    const ahora = Date.now();
    const caja = $('#cuenta');
    const titulo = $('#cuenta-titulo');
    if (ahora < estelar.t0) {
      let s = Math.floor((estelar.t0 - ahora) / 1000);
      const d = Math.floor(s / 86400); s -= d * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      caja.dataset.estado = 'faltan';
      titulo.textContent = 'Faltan';
      $('#c-dias').textContent = d;
      $('#c-horas').textContent = dos(h);
      $('#c-min').textContent = dos(m);
      $('#c-seg').textContent = dos(s);
    } else if (ahora < estelar.t1) {
      caja.dataset.estado = 'ya';
      titulo.textContent = '¡Ya empezó! Vente a la Explanada Principal.';
    } else {
      caja.dataset.estado = 'ya';
      titulo.textContent = '¡Gracias por venir! Nos vemos el próximo año.';
    }
  };
  cuenta();
  setInterval(cuenta, 1000);

  /* ---------- Invitar y calendario ---------- */

  const invitacion = [
    '¡Vámonos a la Fiesta Patronal de Cristo Rey en Jagüey de Téllez! 🎉',
    'Viernes 20, sábado 21 y domingo 22 de noviembre.',
    'Lo más estelar: el domingo 22 a las 8:30 p.m., Marco Flores y la Banda Jerez en la Explanada Principal.',
    `Aquí está todo el programa: ${URL_PAGINA}`
  ].join('\n');
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(invitacion)}`;
  $('#invitar').href = whatsapp;
  $('#flotante').href = whatsapp;

  const esApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
  if (!esApple && estelar) {
    const utc = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Marco Flores y la Banda Jerez en la Fiesta de Cristo Rey',
      dates: `${utc(estelar.t0)}/${utc(estelar.t1)}`,
      details: `Gran Bailazo de Lujo de la Fiesta Patronal 2026 en honor a Cristo Rey. También: Dalia Sosa y su Ritmo Colombiano y Código Especial. Programa: ${URL_PAGINA}`,
      location: 'Explanada Principal, Jagüey de Téllez, Hidalgo'
    });
    const cal = $('#calendario');
    cal.href = `https://calendar.google.com/calendar/render?${params}`;
    cal.target = '_blank';
    cal.rel = 'noopener';
  }

  /* ---------- Día activo en la barra ---------- */

  const chips = new Map($$('.dia-chip').map((a) => [a.dataset.dia, a]));
  const marcarDia = (id) => chips.forEach((a, k) => a.setAttribute('aria-current', k === id ? 'true' : 'false'));

  if ('IntersectionObserver' in window) {
    const espia = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if (e.isIntersecting) marcarDia(e.target.id.slice(4)); });
    }, { rootMargin: '-30% 0px -65% 0px' });
    $$('.dia').forEach((s) => espia.observe(s));

    // Botón flotante: aparece cuando ya pasaste la portada y el bloque estelar, y se esconde en el pie.
    const visibles = new Set();
    const flotante = $('#flotante');
    const vigia = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if (e.isIntersecting) visibles.add(e.target); else visibles.delete(e.target); });
      flotante.hidden = visibles.size > 0;
    });
    ['.portada', '#estelar', '#pie'].forEach((s) => vigia.observe($(s)));
  }

  /* ---------- Compartir ---------- */

  let temporizadorAviso;
  const aviso = (texto) => {
    const el = $('#aviso');
    el.textContent = texto;
    el.classList.add('ver');
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => el.classList.remove('ver'), 2800);
  };

  $('#compartir').addEventListener('click', async () => {
    const datos = {
      title: 'Fiesta Patronal de Cristo Rey 2026',
      text: 'Fiesta de Cristo Rey en Jagüey de Téllez. Domingo 22, 8:30 p.m.: Marco Flores y la Banda Jerez.',
      url: URL_PAGINA
    };
    if (navigator.share) {
      try { await navigator.share(datos); } catch (e) { /* el usuario canceló */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(URL_PAGINA);
      aviso('Link copiado. Pégalo en WhatsApp o Facebook.');
    } catch (e) {
      aviso(URL_PAGINA);
    }
  });

  if (sinMovimiento) document.documentElement.classList.add('quieto');
})();
