import { 
  getRandomArrayItem,
  getCSSColorFormat,
  getCssVariable,
  addTransparencyToColor
} from "./utils.js";

function gen_unicode(start, end) {
  var chars = [];
  for (var i = start; i <= end; ++i) {
    chars.push(String.fromCharCode(i));
  }
  return chars;
}

var katagana = gen_unicode(0x30A1, 0x30F6);
var hiragana = gen_unicode(0x3041, 0x3096);
var numbers = Array.from({length: 10}, (_, i) => i);
var chars = katagana.concat(numbers.map(n => n.toString()));

var SPEED = 4;

class Matrix {
  constructor(canvas, { font_size = 14, width, height } = {}) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._font_size = font_size;
    this._drops = [];
    this._chars = chars;
    this.resize();
  }

  getWindowHeight() {
    return window.innerHeight;
  }

  getWindowWidth() {
    return window.innerWidth - 1;
  }

  random_char() {
    return getRandomArrayItem(this._chars);
  }

  render_char(char, x, y) {
    this._ctx.fillText(char, x, y);
  }
  start() {
    let frames = 0;
    this._run = true;
    const self = this;
    (function loop() {
      if (frames++ % (20/SPEED) === 0) {
        self.render(); // slower render
      }
      if (self._run) {
        requestAnimationFrame(loop);
      }
    })()
  }
  stop() {
    this._run = false;
  }
  reset() {
    for (let x = 0; x < this._columns; x++) {
      this._drops[x] = 255;
    }
  }
  resize() {
    this._width = this.getWindowWidth();
    this._height = this.getWindowHeight();
    this._canvas.width = this._width;
    setTimeout(() => {
      this._canvas.height = this._height;
      this.reset();
    }, 0);
    this._columns = Math.round(this._width / this._font_size);
  }
  clear() {
    this._ctx.fillStyle = BACKGROUND_COLOR;
    this._ctx.fillRect(0, 0, this._width, this._height);
    this._ctx.fillStyle = TEXT_COLOR;
    this._ctx.font = this._font_size + "px monospace";
  }
  render() {
    this.clear();
    for (let col = 0; col < this._drops.length; col++) {
      const char = this.random_char();
      const x = col * this._font_size;
      const y = this._drops[col] * this._font_size;
      this.render_char(char, x, y);
      if (y > this._height && Math.random() > .975) {
        this._drops[col] = 0;
      }
      this._drops[col]++;
    }
  }
}

var MATRIX_BACKGROUND_RUNNING = false;

var BACKGROUND_COLOR = null;
var TEXT_COLOR = null;

function updateMatrixColors(textColor, bgColor) {
  let tcFormat = getCSSColorFormat(textColor);
  let bgFormat = getCSSColorFormat(bgColor);

  if (!tcFormat) {
    throw new Error(`'textColor': (${textColor}) is not a valid css color value.`);
    return
  }

  if (!bgFormat.endsWith("a") || !bgFormat) { // hexa, rgba, hsla
    throw new Error(`'bgColor': (${bgColor}) is not a color with transparency.`);
    return 
  }

  BACKGROUND_COLOR = bgColor;
  TEXT_COLOR = textColor;
}

function getUpdatedThemeColors() {

  let textColor = getCssVariable("--secondary-color");
  let docBackColor = getCssVariable("--document-background-color");

  let bgColorTransparent;
  if (!getCSSColorFormat(docBackColor).endsWith("a")) {
    bgColorTransparent = addTransparencyToColor(docBackColor, 0.05);
  } else {
    bgColorTransparent = docBackColor;
  }

  return {
    bg: bgColorTransparent,
    text: textColor
  }
}

export function setMatrixColorsByCurrentTheme() {
  let updatedThemeColors = getUpdatedThemeColors();
  updateMatrixColors(updatedThemeColors.text, updatedThemeColors.bg);
}

export function runMatrixBackground() {
  var canvas = document.getElementById("matrixBackground");

  if (!canvas) {
    throw new Error("Missing 'matrixBackground' canvas element, can't initialize matrix.");
    return
  }

  if (MATRIX_BACKGROUND_RUNNING) {
    console.error("Matrix background was already running.");
    return
  }

  if (!BACKGROUND_COLOR || !TEXT_COLOR) {
    setMatrixColorsByCurrentTheme()
  }

  const matrix = new Matrix(canvas, {
    font_size: 14
  });

  MATRIX_BACKGROUND_RUNNING = true;

  window.addEventListener('resize', e => {
    matrix.resize();
  });
  matrix.start();
}
