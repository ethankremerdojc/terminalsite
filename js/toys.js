function hideAllToys() {
  for (var toy of document.querySelectorAll(".toy-div")) {
    toy.style.display = "none";
  }
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

function showToy(name) {
  document.getElementById(`toys-container-${name}`).style.display = "block";
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
  
    default:
      break;
  }
}

function loadToysNav() {
  let toysNav = document.getElementById("toys-header-items");
  let toysNavItems = toysNav.querySelectorAll('li');

  const setActive = (e) => {
    let newToyName = e.target.innerHTML.replace("[", "").replace("]", "").replaceAll(" ", "").toLowerCase();
    hideAllToys();
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
