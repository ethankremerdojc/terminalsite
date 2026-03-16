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

// SNAKES

function placeSnakeSegments(segments) {
  for (let i=0; i<segments.length; i++) {
    let segment = segments[i];

    let extra = "";

    if (i == segments.length - 1) {
      char = SNAKE_HEAD_CHAR;
      extra = " snake-head"
    } else {
      char = SNAKE_SEGMENT_CHAR;
    }
    placeElem(segment, SNAKE_FIELD_ELEM, char, "snake" + extra);
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

function placeFruits(fruits) {
  for (let i=0; i<fruits.length; i++) {
    let position = fruits[i];
    placeElem(position, SNAKE_FIELD_ELEM, FRUIT_CHAR, "fruit");
  }
}

// GAME INFO

function unPause() {
  SNAKE_PAUSED = false; 
  SNAKE_RUNNING = true; 
  resetSnakeGameLoop();
}

function placeLoadingSnake(func) {

  let loadingSnakeHtml = `<div class="loading-snake-grid">`;

  for (let i=0; i<3; i++) {
    let snakeBodyCellHtml = `<div class="cell c${i+1}">${SNAKE_SEGMENT_CHAR}</div>`;
    loadingSnakeHtml += snakeBodyCellHtml;
  };

  let snakeHeadCellHtml = `<div class="cell c4">${SNAKE_HEAD_CHAR}</div>`;
  loadingSnakeHtml += snakeHeadCellHtml;

  loadingSnakeHtml += "</div>";

  placeElem([0, 0], SNAKE_FIELD_ELEM, loadingSnakeHtml, "snake-loading", func, true);
}

function placePauseText() {
  placeElem([0, 0], SNAKE_FIELD_ELEM, "Snake: PAUSED", "infobutton", unPause);
  placeLoadingSnake(unPause);
}

function placeStartText() {
  let startGameFunc = () => { SNAKE_RUNNING = true };
  placeElem([0, 0], SNAKE_FIELD_ELEM, "Start Snake Game", "infobutton", startGameFunc);
  placeLoadingSnake(startGameFunc);
}

function placeDeadText() {
  placeElem([0, 1], SNAKE_FIELD_ELEM, "Snake: YOU DIED", "infotext")
}

function placeGameDetails() {
  placeElem([0, 2], SNAKE_FIELD_ELEM, `Play with arrow keys, mouse or touch.`, "infotext");
  placeElem([0, 1], SNAKE_FIELD_ELEM, `Score: ${SNAKE_SCORE} | Snake Speed: ${Math.floor(SNAKE_CURRENT_SPEED * 100) / 100}`, "infotext");
}



// DRAW FUNC

function drawSnake(snakeSegments, fruits) {
  SNAKE_FIELD_ELEM.innerHTML = "&nbsp;"; // Reset

  if (SNAKE_RUNNING) {
    placeFruits(fruits);
    placeSnakeSegments(snakeSegments);
    placeGameDetails();
  } else {
    if (SNAKE_PAUSED) {
      placePauseText();
    } else {
      placeStartText();
    }

    if (SNAKE_JUST_DIED) {
      placeDeadText();
    }
  }
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

function getRandomDirection() {
  let directions = ["-x", "+x", "-y", "+y"];
  return directions[getRandomInt(0, 3)];
}

function getInitialSnakeSegments(snakeLength=5) {
  let segments = [];
  let maxX = BOARD_WIDTH - 1;
  let maxY = BOARD_HEIGHT - 1;

  // choose head position

  let randX = getRandomInt(1, maxX);
  let randY = getRandomInt(1, maxY);

  segments.push([randX, randY]);

  for (let i=1; i<snakeLength; i++) {

    let newX; let newY;

    switch (SNAKE_DIRECTION) {

      case "-x":
        newX = randX - i;
        if (newX < 0) {
          newX = BOARD_WIDTH + (newX - 1);
        }
        segments.push([newX, randY]);
        break;

      case "+x":
        newX = randX + i;
        if (newX > BOARD_WIDTH) {
          newX = (newX - BOARD_WIDTH) - 1;
        }
        segments.push([newX, randY]);
        break;

      case "+y":
        newY = randY - i;
        if (newY < 0) {
          newY = BOARD_HEIGHT + (newY - 1);
        }
        segments.push([randX, newY]);
        break;

      case "-y":
        newY = randY + i;
        if (newY > BOARD_HEIGHT) {
          newY = (newY - BOARD_HEIGHT) - 1;
        }
        segments.push([randX, newY]);
        break;

      default: throw "Unknown direction"; break;
    }
  }
  
  return segments
}


const SNAKE_SEGMENT_CHAR = "⊙";
const SNAKE_HEAD_CHAR = "⊗";
const FRUIT_CHAR = "●";
const STARTING_FRUIT = 3;
var SNAKE_FIELD_ELEM = null;

// GLOBAL VARS
var SNAKE_SEGMENTS = [];
var FRUITS = [];

var SNAKE_DIRECTION = null;
var SNAKE_CURRENT_SPEED = 1.0;
var SNAKE_SCORE = 0;
var SNAKE_RUNNING = false;
var SNAKE_PAUSED = false;
var SNAKE_JUST_DIED = false;
var SNAKE_GAME_LOOP_INTERVAL = null;

function pauseGame() {
  const SNAKE_FIELD_ELEM = document.getElementById("toys-container-snake");
  SNAKE_RUNNING = false;
  SNAKE_PAUSED = true;
  stopSnakeGameLoop();
  drawSnake([], [], SNAKE_FIELD_ELEM);
}

function stopSnakeGameLoop() {
  clearInterval(SNAKE_GAME_LOOP_INTERVAL);
}

function startSnakeGameLoop() {
  SNAKE_GAME_LOOP_INTERVAL = setInterval(gameLoop, 200/SNAKE_CURRENT_SPEED);
}

function resetSnakeGameLoop() {
  stopSnakeGameLoop();
  startSnakeGameLoop();
}

function gameLoop() {
  if (!SNAKE_RUNNING) { return }
  drawSnake(SNAKE_SEGMENTS, FRUITS, SNAKE_FIELD_ELEM);

  let fruitBeingEaten = getFruitBeingEaten(SNAKE_SEGMENTS[SNAKE_SEGMENTS.length - 1], FRUITS);

  if (fruitBeingEaten) {
    FRUITS = replaceFruit(FRUITS, fruitBeingEaten, SNAKE_SEGMENTS, BOARD_WIDTH, BOARD_HEIGHT);
    SNAKE_CURRENT_SPEED = SNAKE_CURRENT_SPEED + 0.05;
    SNAKE_SCORE += 1;
  } else {
    SNAKE_SEGMENTS = SNAKE_SEGMENTS.slice(1); // this line will be conditional on a fruit on the space when we add those
  }
  
  let newSnakeHead = getNewSnakeHead(SNAKE_SEGMENTS, SNAKE_DIRECTION, BOARD_WIDTH, BOARD_HEIGHT);

  if (elemIntersectsArray(newSnakeHead, SNAKE_SEGMENTS)) {
    SNAKE_RUNNING = false;
    SNAKE_JUST_DIED = true;

    drawSnake(SNAKE_SEGMENTS, FRUITS, SNAKE_FIELD_ELEM);
  }

  SNAKE_SEGMENTS.push(newSnakeHead);

  if (fruitBeingEaten) {
    resetSnakeGameLoop();
  }
}

// event handlers

function handleResize() {
  if (INITIALIZING_SNAKE || !SNAKE_RUNNING) {
    return
  }

  stopSnakeGameLoop();
  SNAKE_PAUSED = false;
  SNAKE_RUNNING = false;
  initializeSnake();
}

function handleKeyPress(e) {
  //TODO  Have this check if the segment before head would be munched, instead of what current direction is
  //      In case user manages to switch directions multiple times per frame

  if (!SNAKE_RUNNING || INITIALIZING_SNAKE) { return }

  if ([37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  } else {
    return
  }

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

  if (proposedNewHead[0] != neck[0] && proposedNewHead[1] != neck[1]) { SNAKE_DIRECTION = proposedDirection; }
}

function getProposedDirectionFromOffsets(offsetX, offsetY, width, height) {
  let result = "";

  let xMidpoint = width/2;
  let yMidpoint = height/2;

  let xDist; let yDist;

  if (offsetX < xMidpoint) {
    xDist = xMidpoint - offsetX;
  } else {
    xDist = offsetX - xMidpoint;
  }

  if (offsetY < yMidpoint) {
    yDist = yMidpoint - offsetY;
  } else {
    yDist = offsetY - yMidpoint;
  }

  let char;
  let sign;

  if (xDist > yDist) {
    char = "x";

    if (offsetX < xMidpoint) {
      sign = "-";
    } else {
      sign = "+";
    }
  } else {
    char = "y";

    if (offsetY < yMidpoint) {
      sign = "+";
    } else {
      sign = "-";
    }
  }

  return sign + char;
}

function handleClick(e) {

  if (INITIALIZING_SNAKE || !SNAKE_RUNNING) {
    return
  }

  let snakeDiv = document.getElementById("toys-container-snake");

  if (!snakeDiv) {
    return
  }

  if (!snakeDiv.contains(e.target)) {
    if (!SNAKE_PAUSED && SNAKE_RUNNING) {
      pauseGame();
    }
    return
  }

  const rect = snakeDiv.getBoundingClientRect();

  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;


  let proposedDirection = getProposedDirectionFromOffsets(offsetX, offsetY, rect.width, rect.height);
  let proposedNewHead = getNewSnakeHead(SNAKE_SEGMENTS, proposedDirection, BOARD_WIDTH, BOARD_HEIGHT);
  let neck = SNAKE_SEGMENTS[SNAKE_SEGMENTS.length - 2];

  if (proposedNewHead[0] != neck[0] && proposedNewHead[1] != neck[1]) { SNAKE_DIRECTION = proposedDirection; }
}


var INITIALIZING_SNAKE = false;

function initializeSnake() {
  INITIALIZING_SNAKE = true;
  SNAKE_FIELD_ELEM = document.getElementById("toys-container-snake");
  const boardWidth = SNAKE_FIELD_ELEM.clientWidth;
  const boardHeight = SNAKE_FIELD_ELEM.clientHeight;

  SNAKE_PAUSED = false;
  SNAKE_RUNNING = false;

  // split up into 20x20px blocks
  SNAKE_DIRECTION = "-y" // getRandomDirection();

  SQUARE_SIZE = 20;
  BOARD_WIDTH = Math.floor(boardWidth / SQUARE_SIZE);
  BOARD_HEIGHT = Math.floor(boardHeight / SQUARE_SIZE);

  //todo add some sort of check that board width and height are set?
  SNAKE_DIRECTION = "+y" // getRandomDirection();
  SNAKE_SEGMENTS = getInitialSnakeSegments();

  FRUITS = [];

  SNAKE_CURRENT_SPEED = 1.0;
  SNAKE_SCORE = 0;

  for (let i=0;i<STARTING_FRUIT;i++) {
    FRUITS.push(getNewFruit(SNAKE_SEGMENTS, FRUITS, BOARD_WIDTH, BOARD_HEIGHT))
  }

  drawSnake(SNAKE_SEGMENTS, FRUITS, SNAKE_FIELD_ELEM);

  // GAME LOOP
  resetSnakeGameLoop();
  INITIALIZING_SNAKE = false;
}

document.body.addEventListener("keydown", handleKeyPress);
document.body.addEventListener("mousedown", handleClick);
window.addEventListener("resize", handleResize);
