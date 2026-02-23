function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wait(milis) {
  return new Promise(resolve => {
    setTimeout(() => { resolve() }, milis);
  })
}

async function typeOutTextContent(element, content, delayRange) {
  return new Promise((resolve) => {
    let textLength = 0;

    let pane = element.closest(".terminal-pane");

    let tick = () => {
      textLength ++;
      newText = content.slice(0, textLength);
      element.innerHTML = newText;

      pane.scrollTop = pane.scrollHeight;

      if (textLength != content.length) {
        setTimeout(tick, getRandomInt(delayRange[0], delayRange[1]));
      } else {
        resolve();
      }
    }

    element.innerHTML = " ";
    tick()
  })
}
