// Mountet den Liquid-Metal-Effekt auf jedem canvas[data-liquid-logo], erst
// wenn er in die Naehe des Viewports scrollt (IntersectionObserver) — spart
// einen WebGL-Kontext beim initialen Laden, wenn Shader-Gradient und
// Glass-Buttons bereits mehrere Kontexte belegen. Schlaegt WebGL2 trotzdem
// fehl, bleibt der dahinterliegende Text-Fallback sichtbar (liquid-logo.js
// gibt dann einfach null zurueck und rendert nichts).
(function () {
  function mountOne(canvas) {
    const text = canvas.getAttribute('data-liquid-logo') || 'MD';
    try {
      window.LiquidLogo.mount(canvas, text, { fontFamily: '"Fraunces", Georgia, serif' });
    } catch (err) {
      console.error('liquid-logo: konnte nicht gemountet werden', err);
    }
  }

  function init() {
    if (!window.LiquidLogo) return;
    const canvases = document.querySelectorAll('canvas[data-liquid-logo]');
    if (!canvases.length) return;

    if (!('IntersectionObserver' in window)) {
      canvases.forEach(mountOne);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mountOne(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });
    canvases.forEach((canvas) => io.observe(canvas));
  }

  // document.fonts.ready abwarten, damit die Text-Maske mit der echten
  // Fraunces-Schrift statt einem Fallback-Serif gebaut wird.
  function start() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
