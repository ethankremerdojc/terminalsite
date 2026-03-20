import { loadTerminalPane } from "./generation.js";
import { loadAsciiNav, initializeArtPane } from "./art-pane.js";
import { loadStackNav } from "./stack-pane.js"

// toys
import { runDonut } from "./toys/donut.js";
import {
  loadToysNav,
  showToy,
  initializeToysInfo
} from "./toys/toys.js";

import { initializeContactFormListener } from "./contact-pane.js";

console.log("ltp", loadTerminalPane);

export async function loadAsciiPane() {
  await loadTerminalPane("art-pane", 'artPaneContents', 5, "fade-in");
  initializeArtPane();
  loadAsciiNav();
}

export async function loadMainPane() {
  await loadTerminalPane("linux-pane", "mainPaneContents", 5);
}

export async function loadStackPane() {
  await loadTerminalPane("stack-pane", 'stackPaneContents', 40);
  loadStackNav();
}

export async function loadToysPane() {
  await loadTerminalPane("toys-pane", 'toysPaneContents', 40, "fade-in");
  runDonut();
  await loadToysNav();
  showToy("toys-info");
  await initializeToysInfo();
}

export async function loadOutroPane() {
  await loadTerminalPane("outro-pane", 'outroPaneContents', 40);
}

export async function loadContactPane() {
  await loadTerminalPane("contact-pane", 'contactPaneContents', 40);
  initializeContactFormListener();
}
