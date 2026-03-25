import { ComplexNumber } from "./complex.js";
import { getCssVariable } from "../../utils.js";

// =========================
// fractal utls
// =========================

function getComplexNumFromCanvasCoirdinates(canvasWidth, canvasHeight, x, y, polarWidth=5, polarHeight=5) {

  // const centerX = canvasWidth/2;
  // const centerY = canvasHeight/2;
  //
  // let halfCanvasWidth = canvasWidth / 2;
  // let halfCanvasHeight = canvasHeight / 2;
  //
  // let polarX = (polarWidth / 2) * (xDistanceFromOrigin / halfCanvasWidth);
  
  // the formula above is basically:
  // polarX = polarWidth / 2 * ( (x - canvasWidth/2) * canvasWidth/2 ) 
  // this simplifies to

  let polarX = (polarWidth * x) / canvasWidth - (polarWidth/2);
  let polarY = (polarHeight * y) / canvasHeight - (polarHeight/2);

  let roundedX = Math.round(polarX * 1000) / 1000;
  let roundedY = Math.round(polarY * 1000) / 1000;

  return new ComplexNumber(roundedX, roundedY);
}

function getIterationsToDiverge(c, z, pow, iterationCount=1, maxIterationCount=MAX_ITERATION_COUNT) {
  // returns true for 'converges' and false for 'diverges'
  let zpow;

  if (!isNaN(z)) { // regular number
    zpow = z ** pow;
  } else {
    zpow = z.pow(pow);
  };

  let iterated = c.add(zpow);

  // console.log("iterating", {z: z, c: c, zpow: zpow, iterated: iterated});

  if (iterated.real >= 3 || iterated.real <= -3 || iterated.imag >= 3 || iterated.imag <=-3) {
    return iterationCount
  }

  if (iterationCount == maxIterationCount) {
    return maxIterationCount
  }

  return getIterationsToDiverge(c, iterated, pow, iterationCount+1)

}

function getRGB() {
  let cssRGB = getCssVariable("--main-text-color");
  const [r, g, b] = cssRGB.match(/\d+/g).map(Number);
  return [r, g, b];
}

function generateFractal(canvas, z=0, pow=2) {
  const width = canvas.width;
  const height = canvas.height;

  const ctx = canvas.getContext("2d");

  let points = [];

  let polarWidth = 5;
  let polarHeight = 5;

  for (let y=0; y<=height; y++) {
    for (let x=0; x<=width; x++) {
      let complexNum = getComplexNumFromCanvasCoirdinates(width, height, x, y, polarWidth, polarHeight);

      let iterationCount = getIterationsToDiverge(complexNum, z, pow);
      points.push([x, y, iterationCount]);
    }
  };

  let skipped = 0;

  let rgb = getRGB();
  let avg = Math.round((rgb[0] + rgb[1] + rgb[2]) / 3);

  for (var point of points) {

    let [x, y, iterationCount] = point;
    
    if (iterationCount <= 2) {
      skipped ++;
      continue
    }

    let a = iterationCount / MAX_ITERATION_COUNT;

    let fillColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, 1, 1);
  }

  ctx.strokeStyle = getCssVariable("--main-text-color");

  // add a gridline for x and y axis
  ctx.beginPath(); // Start a new path
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2); 
  ctx.stroke();

  // add a gridline
  ctx.beginPath(); // Start a new path
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height); 
  ctx.stroke();

  ctx.fillStyle = getCssVariable("--main-text-color");
  ctx.font = `${getCssVariable("--font-family-monospace")} 10px`;

  // horizontal markers
  ctx.fillText(`-${polarWidth / 2}`, 5, height / 2 - 5);
  ctx.fillText(`${polarWidth / 2}`, width - 18, height / 2 - 5);

  // vertical markers
  ctx.fillText(`-${polarHeight / 2}i`, width / 2 + 5, height - 10);
  ctx.fillText(`${polarHeight / 2}i`, width / 2 + 5, 15);
}

// =========================
// regular stuffs
// =========================

const MAX_ITERATION_COUNT = 24;

function getUpdatedVals() {
  let zInput = document.getElementById("z-fractal-input");
  let powInput = document.getElementById("pow-fractal-input");

  let zLabel = document.querySelector('label[for="z"]');
  let powLabel = document.querySelector('label[for="pow"]');

  let z = Math.round(zInput.value * 10000) / 10000;
  let pow = powInput.value;

  zLabel.querySelector("p").innerHTML = "Z: " + z;
  powLabel.querySelector("p").innerHTML = "Power: " + pow;

  return {z: z, pow: pow};
}

var INITIALIZING_FRACTAL = false;

export function initializeFractal() {
  INITIALIZING_FRACTAL = true;
  let canvas = document.getElementById("fractal-canvas");

  let width;
  if (window.innerWidth < 370) {
    width = 200;
  } else if (window.innerWidth < 500) {
    width = 280;
  }  else {
    width = 400;
  }

  let height = width;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;

  generateFractal(canvas);
}

export function initializeFractalPane() {
  let zInput = document.getElementById("z-fractal-input");
  let powInput = document.getElementById("pow-fractal-input");
  let canvas = document.getElementById("fractal-canvas");

  let onChange = () => {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let updatedVals = getUpdatedVals();
    generateFractal(canvas, updatedVals.z, updatedVals.pow);
  };

  zInput.addEventListener('change', onChange);
  powInput.addEventListener('change', onChange);

  let zLabel = document.querySelector('label[for="z"]');
  let powLabel = document.querySelector('label[for="pow"]');

  let zButton = zLabel.querySelector('button');
  let powButton = powLabel.querySelector('button');

  zLabel.addEventListener("click", () => {
    zInput.value = 0;
    onChange(null, 0);
  })

  powLabel.addEventListener("click", () => {
    powInput.value = 2;
    onChange();
  })

  initializeFractal();
  window.addEventListener("resize", initializeFractal);
};

