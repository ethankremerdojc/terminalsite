import {
  loadMainPane,
  loadAsciiPane,
  loadMonitorPane,
  loadStackPane,
  loadToysPane,
  loadOutroPane,
  loadContactPane
} from "./modules/terminals/terminals.js";

import {
  runMatrixBackground
} from "./modules/matrixBackground.js";

import {
  toggleColorTheme,
  initializeHeader
} from "./modules/header.js";

function loadPage() {
  const visibilityMap = {
    "main": loadMainPane,
    "art": loadAsciiPane,
    "monitor": loadMonitorPane,
    "stack": loadStackPane,
    "toys": loadToysPane,
    "outro": loadOutroPane,
    "contact": loadContactPane
  };

  function initObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const id = entry.target.id;
          const handler = visibilityMap[id];

          if (handler) {
            handler();
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.5 // once pane is 50% on screen, start loading
    });

    Object.keys(visibilityMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  };


  // Wait until the page is fully laid out and scroll position is final.
  window.addEventListener('load', () => {
    runMatrixBackground();
    requestAnimationFrame(() => requestAnimationFrame(initObservers));

    let toggler = document.getElementById("theme-toggler");
    toggler.onclick = toggleColorTheme;
  });
}

initializeHeader();
loadPage();
