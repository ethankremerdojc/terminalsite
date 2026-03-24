import { SNAKE_RUNNING, SNAKE_PAUSED, initializeSnake } from "./snake.js";
import { initializeHangman } from "./hangman.js";
import { typeOutTextContent } from "../generation.js";

function makeToyActive(toyDiv) {
  toyDiv.classList.add("active-toy");
}

function hideActiveToy() {
  document.querySelector(".active-toy").classList.remove("active-toy"); 
}

function deactivateCurrentActiveNavItem() {
  let toysNav = document.getElementById("toys-header-items");
  let currentActive = toysNav.querySelector('li.active');
  currentActive.classList.remove("active");
}

function activateNavItem(name) {
  let navItem = document.getElementById(`nav-item-${name}`);
  navItem.classList.add("active");
}

export function showToy(name) {
  let newToy = document.getElementById(`toys-container-${name}`);

  makeToyActive(newToy);
  activateNavItem(name);

  //TODO 
  //Refactor
  if (SNAKE_RUNNING) {
    SNAKE_RUNNING = false;
    SNAKE_PAUSED = false;
    stopSnakeGameLoop();
  }

  switch (name) {
    case "snake":
      initializeSnake();
      break;
    case "hangman":
      initializeHangman();
    default: break;
  }
}

const TOY_INFO_HTML = `
<h2>TOYS</h2>
<h3>Tips, Info and more</h3>
<br />
<b>SNAKE</b>
<p>Snake can be controlled by pressing arrow keys, or by tapping the sides of the playfield with mouse or finger.</p>
<p>The playfield is responsive and the width and height in 'cells' is dependent on the user's screen size. The downside that the game is harder the smaller the screen. The upside is... hmm... I'll come up with one later.</p>
<b>HANGMAN</b>
<p>One of the first programs I write in every new programming language I learn. I wrote it in rust once. Should be self explanatory. Stole a wordlist from some github post haha.</p>
<b>DONUT</b>
<p>I actually just stole this from a source (in outro) just because I ain't spending hours rewriting the C code of the 'cdonut' program when multiple people have already done that.</p>
`

export async function initializeToysInfo() {
  let toyInfoBlock = document.getElementById(`toys-container-toys-info`);
  await typeOutTextContent(toyInfoBlock, TOY_INFO_HTML, [2, 6]);
}

export function loadToysNav() {
  let toysNav = document.getElementById("toys-header-items");
  let toysNavItems = toysNav.querySelectorAll('li');

  const setActive = (e) => {
    let newToyName = e.target.innerHTML.replace("[", "").replace("]", "").trim().toLowerCase();
    if (newToyName.includes(" ")) {
      newToyName = newToyName.replaceAll(" ", "-");
    }
    hideActiveToy();
    deactivateCurrentActiveNavItem()
    showToy(newToyName);
  }

  for (var li of toysNavItems) {
    li.onclick = setActive;
  }
}
