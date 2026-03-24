import { PANES_CONTENT, EMPTY_PANE } from "./config.js";
import { wait, getRandomInt } from "../utils.js";
import { getPromptResponse, focusLatestInput } from "./linux-pane.js";

function getPromptDiv() {
  let promptDiv = document.createElement("h1");
  promptDiv.classList.add("prompt");

  return promptDiv
}

function getResultDiv() {
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result");

  return resultDiv
}

export async function typeOutTextContent(element, content, delayRange) {
  //TODO
  //Add in logic that checks if any of the start and end block chars are being written,
  //and just write them as is. otherwise it looks weird

  return new Promise((resolve) => {
    let textLength = 0;

    let pane = element.closest(".terminal-pane");

    let tick = () => {
      textLength ++;
      let newText = content.slice(0, textLength);
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

async function populatePrompt(promptDiv, promptText, speed, method, isFirst=false) {
  let ps1 = document.createElement("span");
  ps1.classList.add("prompt-ps1");
  ps1.innerHTML = "<name>ethan</name><at>@</at><host>site: </host>";
  promptDiv.appendChild(ps1);

  let promptInputSpan = document.createElement("span");
  promptInputSpan.classList.add("prompt-input-span");
  promptDiv.appendChild(promptInputSpan);

  await wait(500 / speed);

  let promptInput;

  if (promptText) {
    await handleContentInjection(promptInputSpan, promptText, method, speed);
  } else {
    promptInput = document.createElement("input");
    promptInput.id = "promptInput";

    if (isFirst) {
      promptInput.placeholder = "Type Commands here!"
    }

    promptInput.classList.add("prompt-input");

    promptInput.addEventListener("keydown", handlePromptSubmit);
    promptInputSpan.appendChild(promptInput);
  };
}

async function populateResult(resultDiv, resultLines, resultTag, method="type-out", speed) {

   for (var resultLine of resultLines) {
    let resultElem = document.createElement(resultTag);
    resultDiv.appendChild(resultElem);
    await handleContentInjection(resultElem, resultLine, method, speed*8);
  }
}

async function populatePaneChunk(chunk, paneContent, speed, method="type-out", isFirst=false) {
  const {promptText, result, resultTag} = paneContent;

  const promptDiv = getPromptDiv();
  chunk.appendChild(promptDiv);
  await populatePrompt(promptDiv, promptText, speed, "type-out", isFirst);

  let pane = chunk.closest(".terminal-pane");
  pane.scrollTop = pane.scrollHeight;

  await wait(1000 / speed);
  
  let resultDiv = getResultDiv();
  chunk.appendChild(resultDiv);
  await populateResult(resultDiv, result, resultTag, method, speed);
}

export async function handlePromptSubmit(e) {
  if (e.key != "Enter") { return };

  // check if there is any content
  // replace the input with the text in the input, and then populateResult

  let inputElem = e.target;
  let paneChunk = inputElem.closest(".pane-chunk");
  let promptInputSpan = paneChunk.querySelector(".prompt-input-span");

  // replace input with regular text
  let userText = inputElem.value;
  promptInputSpan.innerHTML = userText;

  let response = getPromptResponse(userText);
  let resultDiv = paneChunk.querySelector(".result");
  await populateResult(resultDiv, response, "p", "type-out", 2);

  // add empty pane
  let chunk = document.createElement("div");
  chunk.classList.add("pane-chunk");

  paneChunk.appendChild(chunk);

  await populatePaneChunk(
    chunk, EMPTY_PANE, 2
  );

  let isNavigating = false;
  if (response[0]) {
    if (response[0].includes("Navigating")) {
      isNavigating = true;
    }
  }

  if (!isNavigating) { focusLatestInput() };
}

// END PROMPT STUFFS

export async function loadTerminalPane(paneId, contentId, speed, method="type-out") {
  const terminalPane = document.querySelector(`.${paneId}`);

  let paneContents = PANES_CONTENT[contentId];

  for (var paneContent of paneContents) {
    let chunk = document.createElement("div");
    chunk.classList.add("pane-chunk");
    terminalPane.appendChild(chunk);

    await populatePaneChunk(
      chunk, paneContent, speed, method, true
    );

    await wait(250 / speed);
  }
}
