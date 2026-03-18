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
  //TODO
  //Add in logic that checks if any of the start and end block chars are being written,
  //and just write them as is. otherwise it looks weird

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

async function fadeInContent(element, content, transitionTime) {
  let pane = element.closest(".terminal-pane");
  element.style.opacity = "0";
  element.innerHTML = content;
  pane.scrollTop = pane.scrollHeight;

  element.style.transition = `opacity ${transitionTime}s ease-in-out`;
  element.style.opacity = "1";
  await wait(transitionTime)
}

async function handleContentInjection(element, content, method, speed) {
  if (method == "type-out") {
    await typeOutTextContent(element, content, [50 / speed, 250 / speed]);
  }
  if (method == "fade-in") {
    await fadeInContent(element, content, 20/speed);
  }
}
