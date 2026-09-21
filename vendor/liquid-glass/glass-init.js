// Ersetzt Elemente mit [data-glass] durch einen echten liquid-glass-js
// Button. Läuft erst nach dem Laden von html2canvas/container.js/button.js.
// Schlägt eine Ersetzung fehl (WebGL fehlt, Skript blockiert), bleibt das
// ursprüngliche <a>/<button> unangetastet stehen.
(function () {
  function init() {
    if (typeof Button === 'undefined') return;

    document.querySelectorAll('[data-glass]').forEach((el) => {
      try {
        const type = el.getAttribute('data-glass') || 'pill';
        const size = parseInt(el.getAttribute('data-glass-size') || '14', 10);
        const href = el.getAttribute('href');
        const text = el.textContent.trim();

        const glassBtn = new Button({
          text,
          size,
          type,
          tintOpacity: 0.28,
          onClick: () => {
            if (!href) return;
            if (href.startsWith('#')) {
              document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.location.href = href;
            }
          }
        });

        el.replaceWith(glassBtn.element);
      } catch (err) {
        console.error('liquid-glass: Button konnte nicht erzeugt werden', err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
