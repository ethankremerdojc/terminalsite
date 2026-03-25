import { ComplexNumber } from "./complex.js";
import { getCssVariable } from "../../utils.js";

`

mandelbrot set:

fc (z) = z^2 + c 

c is all the points of the plane,
z starts at 0, checking if it diverges

`

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

const MAX_ITERATION_COUNT = 24;

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

  for (let y=0; y<=height; y++) {
    for (let x=0; x<=width; x++) {
      let complexNum = getComplexNumFromCanvasCoirdinates(width, height, x, y);

      let iterationCount = getIterationsToDiverge(complexNum, z, pow);
      points.push([x, y, iterationCount]);
    }
  };

  console.log("rendered points: ", points.length);
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

  console.log("skipped points: ", skipped);
}

export function initializeFractal() {
  let canvas = document.getElementById("fractal-canvas");

  let width = 500;
  let height = width;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;

  generateFractal(canvas);
}
