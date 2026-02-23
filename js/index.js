// PROMPT STUFFS

function getPromptResponse(userText) {
  let args = userText.split(" ");

  if (args.length == 0) {
    throw "You must provide at least 1 arg to get prompt response."
  }

  let func = RESPONSES.commands[args[0]];
  if (!func) {
    return RESPONSES.errors.unknownCmd(args[0]);
  }

  let actualArgs = args.slice(1);

  try {
    return func(actualArgs);
  } catch (err) {
    console.log(err);
    return RESPONSES.errors.unknownErr(err);
  }
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

    element.innerHTML = "";
    tick()
  })
}

function getPromptDiv() {
  let promptDiv = document.createElement("h1");
  promptDiv.classList.add("prompt");

  return promptDiv
}

function focusLatestInput() {
  console.log("focusing latest input");
  let newInput = document.getElementById("promptInput");
  newInput.focus();
}

async function handlePromptSubmit(e) {
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
  await populateResult(resultDiv, response, "p", 2);

  // add empty pane
  let chunk = document.createElement("div");
  chunk.classList.add("pane-chunk");

  paneChunk.appendChild(chunk);

  await populatePaneChunk(
    chunk, EMPTY_PANE, 2
  ); //TODO figure out how to specify speed
  
  focusLatestInput();
}

async function populatePrompt(promptDiv, promptText, speed, isFirst=false) {
  let ps1 = document.createElement("span");
  ps1.classList.add("prompt-ps1");
  ps1.innerHTML = "<name>ethan_kremer</name><at>@</at><host>site: </host>";
  promptDiv.appendChild(ps1);

  let promptInputSpan = document.createElement("span");
  promptInputSpan.classList.add("prompt-input-span");
  promptDiv.appendChild(promptInputSpan);

  await wait(1000 / speed);

  let promptInput;

  if (promptText) {
    //promptInputSpan.innerHTML = promptText;
    await typeOutTextContent(promptInputSpan, promptText, [50 / speed, 250 / speed]);
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

function getResultDiv() {
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result");

  return resultDiv
}

async function populateResult(resultDiv, resultLines, resultTag, speed) {
   for (var resultLine of resultLines) {
    let resultElem = document.createElement(resultTag);
    resultDiv.appendChild(resultElem);

    await typeOutTextContent(resultElem, resultLine, [5 / speed, 50 / speed]);
  }
}

async function populatePaneChunk(chunk, paneContent, speed, isFirst=false) {
  const {promptText, result, resultTag} = paneContent;

  const promptDiv = getPromptDiv();
  chunk.appendChild(promptDiv);
  await populatePrompt(promptDiv, promptText, speed, isFirst);

  let pane = chunk.closest(".terminal-pane");
  pane.scrollTop = pane.scrollHeight;

  await wait(1000 / speed);
  
  let resultDiv = getResultDiv();
  chunk.appendChild(resultDiv);
  await populateResult(resultDiv, result, resultTag, speed);
}

// END PROMPT STUFFS

async function loadTerminalPane(paneId, contentId, speed) {
  const terminalPane = document.getElementById(paneId);

  let paneContents = PANES_CONTENT[contentId];

  for (var paneContent of paneContents) {
    let chunk = document.createElement("div");
    chunk.classList.add("pane-chunk");
    terminalPane.appendChild(chunk);

    await populatePaneChunk(
      chunk, paneContent, speed, true
    );

    await wait(250 / speed);
  }
}

async function loadTopSections() {

  // below two will be loaded at the same time
  loadTerminalPane("ascii-art-pane", 'artPaneContents', 4);
  await loadTerminalPane("main-terminal-pane", "mainPaneContents", 3);

  // we will focus the terminal after that
  // focusLatestInput();
}

async function loadStackPane() {
  await loadTerminalPane("stack-pane", 'stackPaneContents', 40);

}

async function loadToysPane() {
  await loadTerminalPane("toys-pane", 'toysPaneContents', 40);

  // from snake.js
  initializeSnake();
}

async function loadOutroPane() {
  await loadTerminalPane("outro-pane", 'outroPaneContents', 40);
}

async function loadContactPane() {
  await loadTerminalPane("contact-pane", 'contactPaneContents', 40);
}

loadTopSections();
loadStackPane();
loadToysPane();
loadOutroPane();
loadContactPane();

