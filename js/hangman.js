

var BOARD_WIDTH = null;
var BOARD_HEIGHT = null;

var WORD_TO_GUESS = "house";
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
var GUESSED_LETTERS = [];
var HANGMAN_FIELD_ELEM = null;

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

function selectLetter(letter) {
  console.log("Selected ", letter);
  GUESSED_LETTERS.push(letter);

  drawHangman()
}

function drawLetterButtons() {
  for (let i=0; i<10; i++) {
    placeElem([i, 4], HANGMAN_FIELD_ELEM, LETTERS[i], "letter-button", () => { selectLetter(LETTERS[i]) });
  }
  for (let i=0; i<10; i++) {
    placeElem([i, 5], HANGMAN_FIELD_ELEM, LETTERS[i + 10], "letter-button", () => { selectLetter(LETTERS[i + 10]) });
  }
  for (let i=0; i<6; i++) {
    placeElem([i, 6], HANGMAN_FIELD_ELEM, LETTERS[i + 20], "letter-button", () => { selectLetter(LETTERS[i + 20]) });
  }
}

function drawLetterButtons() {
  for (let i=0; i<LETTERS.length; i++) {
    let y;
    let x;
    let letter = LETTERS[i];
    if (i < 10) { 
      y = 4;
      x = i;
    }
    if (i > 9 && i < 20) { 
      y = 5;
      x = i - 10;
    }
    if (i > 19) {
      y = 6;
      x = i - 20;
    }

    let buttonClass = "letter-button";
    if (GUESSED_LETTERS.includes(letter)) {
      buttonClass += "-selected";
    }

    let func;
    if (!GUESSED_LETTERS.includes(letter)) {
      func = () => {
        selectLetter(letter) 
      }
    }

    placeElem([x, y], HANGMAN_FIELD_ELEM, letter, buttonClass, func);
  }
}

function drawHangman() {
  HANGMAN_FIELD_ELEM.innerHTML = "&nbsp;"; // Reset

  drawLetterButtons();
}

function initializeHangman() {
  HANGMAN_FIELD_ELEM = document.getElementById("toys-container-hangman");

  const boardWidth = HANGMAN_FIELD_ELEM.clientWidth;
  const boardHeight = HANGMAN_FIELD_ELEM.clientHeight;

  SQUARE_SIZE = 40;
  BOARD_WIDTH = Math.floor(boardWidth / SQUARE_SIZE);
  BOARD_HEIGHT = Math.floor(boardHeight / SQUARE_SIZE);

  drawHangman()
}
