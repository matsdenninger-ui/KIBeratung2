// Legt eine echte WebGL-Liquid-Glass-Flaeche HINTER jedes Element mit
// [data-glass-bg]. Der Radius (in px) steht als Attributwert, z.B.
// data-glass-bg="10". Das eigentliche <a>/<button> bleibt komplett
// unangetastet (kein Ersetzen, kein Entfernen von IDs/Listenern) — es wird
// nur in einen position:relative-Wrapper gesteckt und bekommt per CSS
// (.glass-host > a, .glass-host > button) einen hoeheren z-index, damit es
// weiter normal klickbar/fokussierbar ist und Formulare/Demo-Button
// unveraendert funktionieren. Schlaegt WebGL fehl, bleibt einfach die
// bisherige (undurchsichtige) Hintergrundfarbe des Buttons sichtbar.
(function () {
  function glassifyOne(el, radius, shape) {
    if (!el || el.dataset.glassBgApplied) return;
    el.dataset.glassBgApplied = 'true';

    // Block-Elemente (Ueberschriften-Panels etc.) brauchen einen Block-Host,
    // damit die Breite/Zeilenumbrueche des Inhalts erhalten bleiben.
    const isBlock = getComputedStyle(el).display !== 'inline' && el.tagName !== 'A' && el.tagName !== 'BUTTON';
    const host = document.createElement(isBlock ? 'div' : 'span');
    host.className = 'glass-host' + (isBlock ? ' glass-host-block' : '');
    if (shape === 'circle') host.classList.add('glass-host-circle');
    el.parentNode.insertBefore(host, el);
    host.appendChild(el);

    try {
      const bg = new Container({ type: shape || 'rounded', borderRadius: radius, tintOpacity: 0.45 });
      bg.element.setAttribute('aria-hidden', 'true');
      host.insertBefore(bg.element, el);
    } catch (err) {
      console.error('liquid-glass: Hintergrund konnte nicht erzeugt werden', err);
    }
  }

  function init() {
    if (typeof Container === 'undefined') return;
    document.querySelectorAll('[data-glass-bg]').forEach((el) => {
      const radius = parseInt(el.getAttribute('data-glass-bg'), 10) || 10;
      const shape = el.getAttribute('data-glass-shape') || 'rounded';
      glassifyOne(el, radius, shape);
    });
  }

  // Erst nach vollstaendigem Laden (inkl. Fonts/Bilder) + kurzer Pause
  // mounten, damit die html2canvas-Momentaufnahme einen fertig
  // gerenderten Zustand der Seite einfaengt statt eines Zwischenstands.
  function start() {
    setTimeout(init, 250);
  }

  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start);
  }

  // Fuer dynamisch nachtraeglich eingefuegte Buttons (z. B. "Nachricht
  // kopieren", das erst nach dem Formular-Absenden entsteht).
  window.glassifyLater = function (el, radius, shape) {
    if (typeof Container === 'undefined' || !el) return;
    glassifyOne(el, radius || 8, shape || 'rounded');
  };
})();
