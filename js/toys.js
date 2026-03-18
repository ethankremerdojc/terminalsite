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

const TOY_INFO_HTML = `
<h2>TOYS:</h2>
<h3>Tips, Info and more</h3>
<br />
<br />
<b>SNAKE</b>
<p>The playfield is responsive and the width and height in 'cells' is dependent on the user's screen size. The downside that the game is harder the smaller the screen. The upside is... hmm... I'll come up with one later.</p>
<p>Snake can be controlled by pressing arrow keys, or by tapping the sides of the playfield with mouse or finger.</p>
<b>HANGMAN</b>
<p>One of the first programs I write in every new programming language I learn. I wrote it in rust once. Should be self explanatory. Stole a wordlist from some github post haha.</p>
<b>DONUT</b>
<p>I actually just stole this from a source (in outro) just because I ain't spending hours rewriting the C code of the 'cdonut' program when multiple people have already done that.</p>
`

async function initializeToysInfo() {
  let toyInfoBlock = document.getElementById(`toys-container-toys-info`);
  await typeOutTextContent(toyInfoBlock, TOY_INFO_HTML, [2, 6]);
}

function showToy(name) {
  console.log(name);
  let newToy = document.getElementById(`toys-container-${name}`);
  console.log(newToy);

  makeToyActive(newToy);
  activateNavItem(name);

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

function loadToysNav() {
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

let SQUARE_SIZE = 20;
var BOARD_WIDTH = null;
var BOARD_HEIGHT = null;

function placeElem(position, fieldElem, char, elemClass, onClick=null, rawHtml=false) {
  const [x, y] = position;
  let segmentElem;

  if (!rawHtml) {
    segmentElem = document.createElement("p");
  } else {
    segmentElem = document.createElement("rawhtml");
  }

  segmentElem.style.top = `${SQUARE_SIZE * y}px`;
  segmentElem.style.left = `${SQUARE_SIZE * x}px`;
  segmentElem.className = elemClass;
  segmentElem.innerHTML = char;

  if (onClick) {
    segmentElem.onclick = onClick;
  }

  fieldElem.appendChild(segmentElem);
}
