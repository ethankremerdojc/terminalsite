const runDonut = () => {
  const gradient = ['.', '"', '?', '%', '%', '#', '@'];
  let R, r, size, zBuffer, maxAngle;
  R = 9;
  r = 5;
  maxAngleInner = 2 * Math.PI;
  maxAngleOuter = 2 * Math.PI;
  size = 2 * (R + r) + 10;
  zBuffer = new Array(size);

  for (let y = 0; y < size; ++y) {
    const arr = new Array(size);

    for (let x = 0; x < size; ++x) {
      arr[x] = 0;
    }

    zBuffer[y] = arr;
  }

  function renderTorus(xyPlaneAngle = 0, projectionRotationAngle = 0) {
    const innerStep = maxAngleInner / size / 5;
    const outerStep = maxAngleOuter / size / 5;

    for (let inner = 0.0; inner <= maxAngleInner; inner += innerStep) {
      const radius = R + r * Math.cos(inner);
      const z = r * Math.sin(inner);

      for (let outer = 0.0; outer <= maxAngleOuter; outer += outerStep) {
        const x = radius * Math.cos(outer);
        const y = radius * Math.sin(outer);

        const x1 = x;
        const y1 = y * Math.cos(xyPlaneAngle) - z * Math.sin(xyPlaneAngle);
        const z1 = y * Math.sin(xyPlaneAngle) + z * Math.cos(xyPlaneAngle);

        const x2 = Math.round(x1 * Math.cos(projectionRotationAngle) - y1 * Math.sin(projectionRotationAngle)) + size / 2;
        const y2 = Math.round(x1 * Math.sin(projectionRotationAngle) + y1 * Math.cos(projectionRotationAngle)) + size / 2;
        const z2 = z1 + size;

        if (z2 > zBuffer[y2][x2]) {
          zBuffer[y2][x2] = z2;
        }
      }
    }

    let s = '';

    for (let y = 5; y < zBuffer.length - 5; ++y) {
      for (let x = 5; x < zBuffer[y].length - 5; ++x) {
        if (zBuffer[y][x] > 0) {
          let angleCoefficient = 2 * zBuffer[y][x] - zBuffer[y + 1][x] - zBuffer[y][x + 1];
          angleCoefficient = size * angleCoefficient / 12;
          angleCoefficient = Math.min(angleCoefficient, gradient.length - 1);
          angleCoefficient = Math.max(angleCoefficient, 0);
          angleCoefficient = Math.round(angleCoefficient);
          s += gradient[angleCoefficient];
          s += gradient[angleCoefficient];
          zBuffer[y][x] = 0;
        } else {
          s += '  ';
        }
      }

      s += '\n';
    }

    document.getElementById('output').innerText = s;
  }

  let increment1 = 0, increment2 = 0;
  let angle1 = 0, angle2 = 0;
  let counter = 1;

  setInterval(() => {
    if (counter % 10 === 0) {
      increment1 = 0.03 + Math.random() / 10;
      increment2 = (Math.random() - 0.5) / 10;
    }

    angle1 += increment1;
    angle2 += increment2;
    renderTorus(angle1, angle2);
    ++counter;
  }, 20);
}

// source: 
//https://surenenfiajyan.github.io/3d-ascii-donut-js/

