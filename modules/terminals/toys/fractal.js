import {getCssVariable} from "../../utils.js";
import { generateMultibrotFractal } from "./multibrotFractal.js";
import { generateTreeFractal } from "./treeFractal.js";

//===========================
// FRACTAL UTILS
//===========================

var FRACTALS_GENERATING = {
  "tree": false,
  "brot": false
}

function generateFractal(fractalType, genFunc, val1Name, val2Name) {
  if (FRACTALS_GENERATING[fractalType]) { return }

  FRACTALS_GENERATING[fractalType] = true;

  let canvas = document.getElementById(fractalType + "-fractal-canvas");

  let width = Number(getCssVariable("--fractal-width").replace("px", ""));
  let height = width;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = width;
  canvas.height = height;

  let currentVals = getUpdatedFractalVals();

  genFunc(canvas, currentVals[val1Name], currentVals[val2Name]);
  FRACTALS_GENERATING[fractalType] = false;
}

//===========================
// BROT FRACTAL
//===========================

const DEFAULT_FRACTAL_VALS = {
  "z": 0,
  "p": 2,
  "a": 40,
  "l": 0.65
}

const FRACTAL_VAL_NAMES = {
  "z": "Z",
  "p": "Power",
  "a": "Angle",
  "l": "Length"
}

function getUpdatedFractalVals() {
  let result = {};

  for (var key of ["z", "p", "a", "l"]) {
    let input = document.getElementById(key + "-fractal-input");
    let label = document.querySelector(`label[for="${key}"]`);
    let newVal = Math.round(input.value * 10000) / 10000;
    label.querySelector("p").innerHTML = FRACTAL_VAL_NAMES[key] + ": " + newVal;
    result[key] = newVal;
  }
  
  return result;
}

function initializeFractal(fractalType, val1Name, val2Name, genFunc) {
  let val1Input = document.getElementById(val1Name + "-fractal-input");
  let val2Input = document.getElementById(val2Name + "-fractal-input");
  let canvas = document.getElementById(fractalType + "-fractal-canvas");

  let onChange = () => {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let updatedVals = getUpdatedFractalVals();
    genFunc(canvas, updatedVals[val1Name], updatedVals[val2Name]);
  };

  val1Input.addEventListener('change', onChange);
  val2Input.addEventListener('change', onChange);

  let val1Label = document.querySelector(`label[for="${val1Name}"]`);
  let val2Label = document.querySelector(`label[for="${val2Name}"]`);

  let val1Button = val1Label.querySelector('button');
  let val2Button = val2Label.querySelector('button');

  val1Button.addEventListener("click", () => {
    let val1Default = DEFAULT_FRACTAL_VALS[val1Name];
    val1Input.value = val1Default;
    onChange();
  })

  val2Button.addEventListener("click", () => {
    let val1Default = DEFAULT_FRACTAL_VALS[val2Name];
    val2Input.value = val1Default;
    onChange();
  })
}

//===========================
// exports
//===========================

function initializeFractals() {
  initializeFractal(
    "brot",
    "z",
    "p",
    generateMultibrotFractal
  );

  initializeFractal(
    "tree",
    "a",
    "l",
    generateTreeFractal
  );
}

export function generateFractals() {
  generateFractal("brot", generateMultibrotFractal, "z", "p");
  generateFractal("tree", generateTreeFractal, "a", "l");
}

export function initializeFractalPane() {
  initializeFractals();
  generateFractals();

  window.addEventListener("resize", () => {
    generateFractals();
  })
};

