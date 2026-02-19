// inspired by https://css-tricks.com/snippets/css/typewriter-effect/
// import { panesContent } from './panesContent.js'; imported by html

// UTILS

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

// END UTILS




// PROMPT STUFFS

async function typeOutTextContent(element, content, delayRange) {
  return new Promise((resolve) => {
    let textLength = 0;

    let tick = () => {
      textLength ++;
      newText = content.slice(0, textLength);
      element.innerHTML = newText;

      if (textLength != content.length) {
        setTimeout(tick, getRandomInt(delayRange[0], delayRange[1]));
      } else {
        resolve();
      }
    }

    element.innerHTML = "";
    tick()
  })
}

async function populatePaneChunk(chunk, paneContent, speed) {

  const {promptText, result, resultTag} = paneContent;

  // PROMPT STUFF

  let prompt = document.createElement("h1");
  chunk.appendChild(prompt);

  let ps1 = document.createElement("span");
  ps1.classList.add("prompt-ps1");
  ps1.innerHTML = "<name>ethan_kremer</name><at>@</at><host>site: </host>";
  prompt.appendChild(ps1);

  let promptInputSpan = document.createElement("span");
  promptInputSpan.classList.add("prompt-input-span");
  prompt.appendChild(promptInputSpan);

  await wait(1000 / speed);

  let promptInput;

  if (promptText) {
    //promptInputSpan.innerHTML = promptText;
    await typeOutTextContent(promptInputSpan, promptText, [50 / speed, 250 / speed]);
  } else {
    promptInput = document.createElement("input");
    promptInput.classList.add("prompt-input");
    promptInputSpan.appendChild(promptInput);
  };


  await wait(2000 / speed);

  // RESULT ROWS

  let resultDiv = document.createElement("div");
  chunk.appendChild(resultDiv);

  resultDiv.classList.add("result");

  for (var resultLine of result) {
    let resultElem = document.createElement(resultTag);
    resultDiv.appendChild(resultElem);

    await typeOutTextContent(resultElem, resultLine, [5 / speed, 50 / speed]);
  }
 
  // select the input when generated 
  if (!promptText) {
    promptInput.focus();
  }
}

// END PROMPT STUFFS


async function loadTerminalPane(paneId, contentId, speed) {
  const terminalPane = document.getElementById(paneId);

  let paneContents = panesContent[contentId];

  for (var paneContent of paneContents) {
    let chunk = document.createElement("div");
    chunk.classList.add("pane-chunk");
    terminalPane.appendChild(chunk);

    await populatePaneChunk(
      chunk, paneContent, speed
    );

    await wait(500 / speed);
  }
}

function load() {
  loadTerminalPane("main-terminal-pane", "mainPaneContents", 3);
  loadTerminalPane("ascii-art-pane", 'artPaneContents', 4);
}

load();
