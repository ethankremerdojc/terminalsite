// GLOBAL CONSTS

const INITIAL_SNAKE_SEGMENTS = [
  [0, 0], [0, 1], [0, 2], [0, 3]
];

const SNAKE_SEGMENT_CHAR = "⊙";
const SNAKE_HEAD_CHAR = "⊗";

const SQUARE_SIZE = 20;

// GLOBAL VARS

var DIRECTION = "-x";

function placeSnakeSegments(segments, fieldElem) {
  for (let i=0; i<segments.length; i++) {
    let segment = segments[i];

    const [x, y] = segment;
    let segmentElem = document.createElement("p");
    if (i == segments.length - 1) {
      segmentElem.innerHTML = SNAKE_HEAD_CHAR;
    } else {
      segmentElem.innerHTML = SNAKE_SEGMENT_CHAR;
    }
    segmentElem.style.top = `${SQUARE_SIZE * y}px`;
    segmentElem.style.left = `${SQUARE_SIZE * x}px`;

    fieldElem.appendChild(segmentElem);
  }
}

function draw(snakeSegments, fieldElem) {
  fieldElem.innerHTML = "&nbsp;"; // Reset
  placeSnakeSegments(snakeSegments, fieldElem);
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


function handleKeyPress(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 37: // Left Key
      if (DIRECTION != "+x") {
        DIRECTION = "-x";
      }
      break;
    case 39: // Right Key
      if (DIRECTION != "-x") {
        DIRECTION = "+x";
      }
      break;
    case 38: // Up Key
      if (DIRECTION != "-y") {
        DIRECTION = "+y";
      }
      break;
    case 40: // Down Key
      if (DIRECTION != "+y") {
        DIRECTION = "-y";
      }
      break;
    default:
      break;
   }
}

function headIntersects(head, segments) {
  for (var segment of segments) {
    if (segment[0] == head[0] && segment[1] == head[1]) {
      return true
    }
  }

  return false;
}

function runSnake() {
  const playField = document.getElementById("toys-container");
  const boardWidth = playField.clientWidth;
  const boardHeight = playField.clientHeight;

  // split up into 20x20px blocks

  const blocksWidth = Math.floor(boardWidth / SQUARE_SIZE);
  const blocksHeight = Math.floor(boardHeight / SQUARE_SIZE);

  let snakeSegments = structuredClone(INITIAL_SNAKE_SEGMENTS);

  document.body.addEventListener("keydown", handleKeyPress);

  // GAME LOOP
  let gameLoopInterval = setInterval(() => {
    draw(snakeSegments, playField);

    snakeSegments = snakeSegments.slice(1); // this line will be conditional on a fruit on the space when we add those
   
    let newSnakeHead = getNewSnakeHead(snakeSegments, DIRECTION, blocksWidth, blocksHeight);

    if (headIntersects(newSnakeHead, snakeSegments)) {
      clearInterval(gameLoopInterval);
      playField.innerHTML = "You are dead.";
      return
    }

    snakeSegments.push(newSnakeHead);
  }, 150);
}

setTimeout(runSnake, 2000);
