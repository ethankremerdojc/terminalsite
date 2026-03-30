import { getRandomInt, getCssVariable } from "../utils.js";

function getNewMonitorVal(lastVal) {
  let newMin = Math.max(MIN_VAL, lastVal - AMOUNT_JITTER);
  let newMax = Math.min(MAX_VAL, lastVal + AMOUNT_JITTER);
  return getRandomInt(newMin, newMax);
};

function getInitialMonitorVals() {
  let vals = [];

  vals.push(getRandomInt(MIN_VAL, MAX_VAL));

  for (let i=0; i < MAX_POINTS; i++) {
    vals.push(getNewMonitorVal(vals[i]));
  }

  return vals
}

function drawMonitorLabel(label, monitor) {
  const latest = monitor.points[monitor.points.length - 1];
  label.innerHTML = `${monitor.label}: ${latest}%`;
}

function drawMonitorGraph(ctx, monitor) {
  ctx.beginPath();
  ctx.strokeStyle = getCssVariable(monitor.colorVar);
  ctx.lineWidth = 2;

  const rect = monitor.canvas.getBoundingClientRect();

  monitor.points.forEach((value, i) => {
    const x = (i / (MAX_POINTS - 1)) * rect.width;

    // got to do the '- 4' and '+ 2' to make sure the 0 and 100 vals (basically makes position between 1 and 99)
    // do not look like they are off the canvas or overlapping with label
    
    const availableSpace = rect.height - 4; // 1 for both top and bottom
    const y = availableSpace - (value / 100) * availableSpace + 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

function drawMonitorGrid(ctx, monitor) {
  ctx.strokeStyle = getCssVariable("--prompt-background-color-darker");
  ctx.lineWidth = 1;

  const rect = monitor.canvas.getBoundingClientRect();

  // if we want more y poss here it is
  let yPositions = [
    monitor.height / 2, // fake center
  ]

  for (var y of yPositions) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(rect.width, y);
    ctx.stroke();
  }
}

function drawMonitor(monitor) {
  let monitorDiv = document.getElementById(monitor.id);

  // clear screen

  const rect = monitor.canvas.getBoundingClientRect();
  monitor.ctx.clearRect(0, 0, rect.width, rect.height);

  // drawMonitorGrid(ctx, monitor);
  drawMonitorGraph(monitor.ctx, monitor);

  // let label = monitorDiv.querySelector("p");
  // drawMonitorLabel(label, monitor)
}

function updateMonitorGraphs() {
  for (var monitor of MONITORS) {
    let lastPoint = monitor.points[monitor.points.length - 1];
    monitor.points.push(getNewMonitorVal(lastPoint));
    monitor.points.shift();
    drawMonitor(monitor);
  }
}

const MAX_POINTS = 60;
const MIN_VAL = 0;
const MAX_VAL = 100;
const AMOUNT_JITTER = 25;

var MONITORS = [
  {
    label: "CPU",
    id: "cpu-monitor",
    colorVar: "--secondary-color",
    points: getInitialMonitorVals(),
    width: null,
    height: null,
    canvas: null,
    ctx: null,
  },
  {
    label: "MEM",
    id: "mem-monitor",
    colorVar: "--tertiary-color",
    points: getInitialMonitorVals(),
    width: null,
    height: null,
    canvas: null,
    ctx: null
  },
]

function initializeMonitor(monitor) {
  let canvas = document.getElementById(monitor.id).querySelector("canvas");

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  monitor.canvas = canvas;
  monitor.ctx = ctx;
}

export function initializeMonitors() {
  for (var monitor of MONITORS) {
    initializeMonitor(monitor);
  }

  window.addEventListener('resize', e => {
    for (var monitor of MONITORS) {
      initializeMonitor(monitor);
    }
  });

  setInterval(updateMonitorGraphs, 1000);
}


