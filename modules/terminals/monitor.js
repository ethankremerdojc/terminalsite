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
  return



  // fill background for label
  ctx.fillStyle = getCssVariable("--prompt-background-color-darker");
  ctx.fillRect(0, 0, monitor.width, LABEL_SPACE);

  ctx.fillStyle = getCssVariable(monitor.colorVar);
  ctx.font = "12px sans-serif";
  ctx.fillText(`${monitor.label}: ${latest}%`, 4, 16);

  // borderline under
  ctx.strokeStyle = getCssVariable("--main-text-color");
  ctx.lineWidth = 1;

  let borderYPositions = [LABEL_SPACE];

  for (var y of borderYPositions) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(monitor.width, y);
    ctx.stroke();
  }
}

function drawMonitorGraph(ctx, monitor) {
  ctx.beginPath();
  ctx.strokeStyle = getCssVariable(monitor.colorVar);
  ctx.lineWidth = 2;

  monitor.points.forEach((value, i) => {
    const x = (i / (MAX_POINTS - 1)) * monitor.width;

    // got to do the '- 2' and '+ 1' to make sure the 0 and 100 vals (basically makes position between 1 and 99)
    // do not look like they are off the canvas or overlapping with label
    const availableSpace = monitor.height - 2; // 1 for both top and bottom
    const y = availableSpace - (value / 100) * availableSpace + 1;

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

  // if we want more y poss here it is
  let yPositions = [
    monitor.height / 2, // fake center
  ]

  for (var y of yPositions) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(monitor.width, y);
    ctx.stroke();
  }
}

function drawMonitor(monitor) {
  let monitorDiv = document.getElementById(monitor.id);
  let canvas = monitorDiv.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  // clear screen
  ctx.clearRect(0, 0, monitor.width, monitor.height);

  drawMonitorGrid(ctx, monitor);
  drawMonitorGraph(ctx, monitor);

  let label = monitorDiv.querySelector("p");
  drawMonitorLabel(label, monitor)
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
const AMOUNT_JITTER = 15;

var MONITORS = [
  {
    label: "CPU",
    id: "cpu-monitor",
    colorVar: "--secondary-color",
    points: getInitialMonitorVals(),
    width: null,
    height: null
  },
  {
    label: "MEM",
    id: "mem-monitor",
    colorVar: "--tertiary-color",
    points: getInitialMonitorVals(),
    width: null,
    height: null
  },
]

export function initializeMonitors() {
  for (var monitor of MONITORS) {
    let canvas = document.getElementById(monitor.id).querySelector("canvas");
    monitor.width = canvas.width;
    monitor.height = canvas.height;
  }

  setInterval(updateMonitorGraphs, 1000);
}
