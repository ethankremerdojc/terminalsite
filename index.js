import { runMatrixBackground } from "./modules/matrixBackground.js";
import {
  loadMainPane,
  loadAsciiPane,
  loadStackPane,
  loadToysPane,
  loadOutroPane,
  loadContactPane
} from "./modules/terminals/terminals.js";

function loadPage() {
  const visibilityMap = {
    "main": loadMainPane,
    "art": loadAsciiPane,
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
      threshold: 0.6 // once pane is 60% on screen, start loading
    });

    Object.keys(visibilityMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  runMatrixBackground();

  // Wait until the page is fully laid out and scroll position is final.
  window.addEventListener('load', () => {
    requestAnimationFrame(() => requestAnimationFrame(initObservers));
  });
}

loadPage();
