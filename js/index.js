async function loadAsciiPane() {
  await loadTerminalPane("art-pane", 'artPaneContents', 5, "fade-in");
  loadAsciiNav();
}

async function loadMainPane() {
  await loadTerminalPane("linux-pane", "mainPaneContents", 5);
}

async function loadStackPane() {
  await loadTerminalPane("stack-pane", 'stackPaneContents', 40);
  loadStackNav();
}

async function loadToysPane() {
  await loadTerminalPane("toys-pane", 'toysPaneContents', 40, "fade-in");

  
  // from snake.js
  runDonut();
  await loadToysNav();
  showToy("toys-info");
  await initializeToysInfo();
}

async function loadOutroPane() {
  await loadTerminalPane("outro-pane", 'outroPaneContents', 40);
}

async function loadContactPane() {
  await loadTerminalPane("contact-pane", 'contactPaneContents', 40);
  initializeContactFormListener();
}

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
      threshold: 0.6
    });

    Object.keys(visibilityMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Wait until the page is fully laid out and scroll position is final.
  window.addEventListener('load', () => {
    requestAnimationFrame(() => requestAnimationFrame(initObservers));
  });
}

loadPage();
