import { getCssVariable } from "../../utils.js";

const ITERATION_COUNT = 12;


function degreesToRadians(d) {
  return d * Math.PI/180;
}

function getNewBranch(prevBranch, angle, length) {
  let angleRad = degreesToRadians(angle);
  let branchPoint = prevBranch[1];

  let newPoint = [
    branchPoint[0] - (Math.sin(angleRad) * length),
    branchPoint[1] - (Math.cos(angleRad) * length),
  ];

  return [branchPoint, newPoint, angle, length];
}

function getBranches(prevBranch, angle, lengthFactor, iterationNum=1, maxIterations=ITERATION_COUNT) {
  let branchPoint = prevBranch[1];
  let prevAngleOffset = prevBranch[2];
  let prevBranchLength = prevBranch[3];

  let length = prevBranchLength * lengthFactor;

  let angleDegLeft = prevAngleOffset - angle;
  let angleDegRight = prevAngleOffset + angle;

  let newBranchOne = getNewBranch(prevBranch, angleDegLeft, length);
  let newBranchTwo = getNewBranch(prevBranch, angleDegRight, length);

  let branches = [newBranchOne, newBranchTwo];

  if (iterationNum == maxIterations) { return branches }

  return [
    ...branches, 
    ...getBranches(newBranchOne, angle, lengthFactor, iterationNum + 1),
    ...getBranches(newBranchTwo, angle, lengthFactor, iterationNum + 1),
  ]
}

function getTreeSegments(width, height, angle, lengthFactor) {

  let firstBranchLength = height / 3.5;

  let firstBranch = [
    [width/2, height],
    [width/2, height - firstBranchLength],
    0,
    firstBranchLength
  ]

  let branches = [firstBranch];
  branches = [...branches, ...getBranches(firstBranch, angle, lengthFactor)];

  return branches;
}

export function generateTreeFractal(canvas, angle, lengthFactor) {
  const width = canvas.width;
  const height = canvas.height;

  const ctx = canvas.getContext("2d");

  let segments = getTreeSegments(width, height, angle, lengthFactor);

  ctx.strokeStyle = getCssVariable("--main-text-color");
  ctx.lineWidth = 1;

  for (var segment of segments) { 
    let p1 = segment[0];
    let p2 = segment[1];

    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
  }
  // draw them all to canvas
}
