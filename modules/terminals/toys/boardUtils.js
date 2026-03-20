export function placeElem(position, fieldElem, char, elemClass, squareSize, onClick=null, rawHtml=false) {
  const [x, y] = position;
  let segmentElem;

  if (!rawHtml) {
    segmentElem = document.createElement("p");
  } else {
    segmentElem = document.createElement("rawhtml");
  }

  segmentElem.style.top = `${squareSize * y}px`;
  segmentElem.style.left = `${squareSize * x}px`;
  segmentElem.className = elemClass;
  segmentElem.innerHTML = char;

  if (onClick) {
    segmentElem.onclick = onClick;
  }

  fieldElem.appendChild(segmentElem);
}
