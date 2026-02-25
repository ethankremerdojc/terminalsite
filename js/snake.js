// collision and placement

function elemIntersects(elem, segment) {
  return segment[0] == elem[0] && segment[1] == elem[1];
}

function elemIntersectsArray(elem, segments) {
  for (var segment of segments) {
    if (segment[0] == elem[0] && segment[1] == elem[1]) {
      return true
    }
  }

  return false;
}

function placeElem(position, fieldElem, char, elemClass, onClick=null) {
  const [x, y] = position;
  let segmentElem = document.createElement("p");

  segmentElem.style.top = `${SQUARE_SIZE * y}px`;
  segmentElem.style.left = `${SQUARE_SIZE * x}px`;
  segmentElem.className = elemClass;
  segmentElem.innerHTML = char;

  if (onClick) {
    segmentElem.onclick = onClick;
  }

  fieldElem.appendChild(segmentElem);
}

// SNAKES

function placeSnakeSegments(segments, fieldElem) {
  for (let i=0; i<segments.length; i++) {
    let segment = segments[i];
    if (i == segments.length - 1) {
      char = SNAKE_HEAD_CHAR;
    } else {
      char = SNAKE_SEGMENT_CHAR;
    }
    placeElem(segment, fieldElem, char, "snake");
  }
}

function getNewSnakeHead(segments, direction, blocksWidth, blocksHeight) {
  let snakeHead = segments[segments.length - 1];
  let newY, newX;

  switch (direction) {
    case "-y":
      if (snakeHead[1] == blocksHeight - 1) {
        newY = 0;
      } else {
        newY = snakeHead[1] + 1
      }
      newX = snakeHead[0];
      break;

    case "+y":
      if (snakeHead[1] == 0) {
        newY = blocksHeight - 1;
      } else {
        newY = snakeHead[1] - 1
      }
      newX = snakeHead[0];
      break;

    case "-x":
      if (snakeHead[0] == 0) {
        newX = blocksWidth - 1;
      } else {
        newX = snakeHead[0] - 1
      }
      newY = snakeHead[1];
      break;

    case "+x":
      if (snakeHead[0] == blocksWidth - 1) {
        newX = 0;
      } else {
        newX = snakeHead[0] + 1
      }
      newY = snakeHead[1];
      break;

    default:
      throw "Invalid direction for snake"
      break;
  }

  return [newX, newY];
}

// FRUITS

function getNewFruit(snakeSegments, fruits, blocksWidth, blocksHeight) {
  while (true) {
    let randomX = getRandomInt(0, blocksWidth - 1);
    let randomY = getRandomInt(0, blocksHeight - 1);

    let potentialFruit = [randomX, randomY];

    if (!elemIntersectsArray(potentialFruit, snakeSegments) && !elemIntersectsArray(potentialFruit, fruits)) {
      return potentialFruit
    }
  }
}

function placeFruits(fruits, fieldElem) {
  for (let i=0; i<fruits.length; i++) {
    let position = fruits[i];
    placeElem(position, fieldElem, FRUIT_CHAR, "fruit");
  }
}

// GAME INFO

function placePauseText(fieldElem) {
  placeElem([0, 0], fieldElem, "PAUSED", "infobutton", () => { PAUSED = false })
}

function placeStartText(fieldElem) {
  placeElem([0, 0], fieldElem, "START", "infobutton", () => { RUNNING = true })
}

function placeDeadText(fieldElem) {
  placeElem([0, 1], fieldElem, "YOU DIED", "infobutton")
}

// DRAW FUNC

function draw(snakeSegments, fruits, fieldElem) {
  fieldElem.innerHTML = "&nbsp;"; // Reset

  if (RUNNING) {
    placeFruits(fruits, fieldElem);
    placeSnakeSegments(snakeSegments, fieldElem);   
  } else {
    if (PAUSED) {
      placePauseText(fieldElem);
    } else {
      placeStartText(fieldElem);
    }

    if (JUST_DIED) {
      placeDeadText(fieldElem);
    }
  }
}



function handleKeyPress(e) {
  //TODO  Have this check if the segment before head would be munched, instead of what current direction is
  //      In case user manages to switch directions multiple times per frame

  if (!RUNNING) {
    return
  }

  e.preventDefault();

  let snakeHead = SNAKE_SEGMENTS[SNAKE_SEGMENTS.length - 1];
  let proposedDirection;

  switch (e.keyCode) {
    case 37: // Left Key
      proposedDirection = "-x";
      break;
    case 39: // Right Key
      proposedDirection = "+x";
      break;
    case 38: // Up Key
      proposedDirection = "+y";
      break;
    case 40: // Down Key
      proposedDirection = "-y";
      break;
    default:
      break;
   }

  let proposedNewHead = getNewSnakeHead(SNAKE_SEGMENTS, proposedDirection, BOARD_WIDTH, BOARD_HEIGHT);
  let neck = SNAKE_SEGMENTS[SNAKE_SEGMENTS.length - 2];

  if (proposedNewHead[0] != neck[0] && proposedNewHead[1] != neck[1]) { DIRECTION = proposedDirection; }
}

function getFruitBeingEaten(head, fruits) {
  for (var fruit of fruits) {
    if (elemIntersects(head, fruit)) {
      return fruit
    }
  }

  return null
}

function replaceFruit(fruits, eatenFruit, snakeSegments, blocksWidth, blocksHeight) {
  let newFruits = [];

  for (var fruit of fruits) {
    if (fruit != eatenFruit) {
      newFruits.push(fruit);
    }
  }

  newFruits.push(getNewFruit(snakeSegments, fruits, blocksWidth, blocksHeight));
  return newFruits
}

// GLOBAL CONSTS

const INITIAL_SNAKE_SEGMENTS = [
  [0, 0], [0, 1], [0, 2], [0, 3]
];

const SNAKE_SEGMENT_CHAR = "⊙";
const SNAKE_HEAD_CHAR = "⊗";
const FRUIT_CHAR = "●";

const SQUARE_SIZE = 20;

const STARTING_FRUIT = 3;

// GLOBAL VARS
var SNAKE_SEGMENTS = [];

var DIRECTION = "+x";
var RUNNING = false;
var PAUSED = false;
var JUST_DIED = false;

var BOARD_WIDTH = null;
var BOARD_HEIGHT = null;

function initializeSnake() {
  const playField = document.getElementById("toys-container");
  const boardWidth = playField.clientWidth;
  const boardHeight = playField.clientHeight;

  // split up into 20x20px blocks

  BOARD_WIDTH = Math.floor(boardWidth / SQUARE_SIZE);
  BOARD_HEIGHT = Math.floor(boardHeight / SQUARE_SIZE);
  

  SNAKE_SEGMENTS = structuredClone(INITIAL_SNAKE_SEGMENTS);
  let fruits = [];

  let currentSpeed = 1.0;

  for (let i=0;i<STARTING_FRUIT;i++) {
    fruits.push(getNewFruit(SNAKE_SEGMENTS, fruits, BOARD_WIDTH, BOARD_HEIGHT))
  }

  document.body.addEventListener("keydown", handleKeyPress);

  draw(SNAKE_SEGMENTS, fruits, playField);

  function gameLoop() {
    if (!RUNNING) { return }
    draw(SNAKE_SEGMENTS, fruits, playField);

    let fruitBeingEaten = getFruitBeingEaten(SNAKE_SEGMENTS[SNAKE_SEGMENTS.length - 1], fruits);

    if (fruitBeingEaten) {
      fruits = replaceFruit(fruits, fruitBeingEaten, SNAKE_SEGMENTS, BOARD_WIDTH, BOARD_HEIGHT);
      currentSpeed = currentSpeed + 0.05;
    } else {
      SNAKE_SEGMENTS = SNAKE_SEGMENTS.slice(1); // this line will be conditional on a fruit on the space when we add those
    }
   
    let newSnakeHead = getNewSnakeHead(SNAKE_SEGMENTS, DIRECTION, BOARD_WIDTH, BOARD_HEIGHT);

    if (elemIntersectsArray(newSnakeHead, SNAKE_SEGMENTS)) {
      RUNNING = false;
      JUST_DIED = true;

      draw(SNAKE_SEGMENTS, fruits, playField);
    }

    SNAKE_SEGMENTS.push(newSnakeHead);

    if (fruitBeingEaten) {
      resetGameLoop();
    }
  }

  function stopGameLoop() {
    clearInterval(gameLoopInterval);
  }

  function startGameLoop() {
    gameLoopInterval = setInterval(gameLoop, 200/currentSpeed);
  }

  function resetGameLoop() {
    stopGameLoop();
    startGameLoop();
  }

  // GAME LOOP
  let gameLoopInterval;
  startGameLoop(currentSpeed);
}


