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

var DIRECTION = "-x";

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

function placeElem(position, fieldElem, char) {
  const [x, y] = position;
  let segmentElem = document.createElement("p");

  segmentElem.style.top = `${SQUARE_SIZE * y}px`;
  segmentElem.style.left = `${SQUARE_SIZE * x}px`;
  segmentElem.innerHTML = char;

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
    placeElem(segment, fieldElem, char);
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
    } else {
      console.log("failed fruit placement")
    }
  }
}

function placeFruits(fruits, fieldElem) {
  for (let i=0; i<fruits.length; i++) {
    let position = fruits[i];
    placeElem(position, fieldElem, FRUIT_CHAR);
  }
}

// DRAW FUNC

function draw(snakeSegments, fruits, fieldElem) {
  fieldElem.innerHTML = "&nbsp;"; // Reset
  placeSnakeSegments(snakeSegments, fieldElem);
  placeFruits(fruits, fieldElem);
}

function handleKeyPress(e) {
  //TODO  Have this check if the segment before head would be munched, instead of what current direction is
  //      In case user manages to switch directions multiple times per frame
  
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

function getFruitBeingEaten(head, fruits) {
  for (var fruit of fruits) {

    if (elemIntersects(head, fruit)) {
      console.log("intersect", head, fruit);
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

function runSnake() {
  const playField = document.getElementById("toys-container");
  const boardWidth = playField.clientWidth;
  const boardHeight = playField.clientHeight;

  // split up into 20x20px blocks

  const blocksWidth = Math.floor(boardWidth / SQUARE_SIZE);
  const blocksHeight = Math.floor(boardHeight / SQUARE_SIZE);

  let snakeSegments = structuredClone(INITIAL_SNAKE_SEGMENTS);
  let fruits = [];

  for (let i=0;i<STARTING_FRUIT;i++) {
    fruits.push(getNewFruit(snakeSegments, fruits, blocksWidth, blocksHeight))
  }

  document.body.addEventListener("keydown", handleKeyPress);

  // GAME LOOP
  let gameLoopInterval = setInterval(() => {
    draw(snakeSegments, fruits, playField);

    let fruitBeingEaten = getFruitBeingEaten(snakeSegments[snakeSegments.length - 1], fruits);

    if (fruitBeingEaten) {
      console.log("fruit is being munched");
      fruits = replaceFruit(fruits, fruitBeingEaten, snakeSegments, blocksWidth,  blocksHeight);
    } else {
      snakeSegments = snakeSegments.slice(1); // this line will be conditional on a fruit on the space when we add those
    }
   
    let newSnakeHead = getNewSnakeHead(snakeSegments, DIRECTION, blocksWidth, blocksHeight);

    if (elemIntersectsArray(newSnakeHead, snakeSegments)) {
      clearInterval(gameLoopInterval);
      playField.innerHTML = "You are dead.";
      return
    }

    snakeSegments.push(newSnakeHead);
  }, 150);
}
