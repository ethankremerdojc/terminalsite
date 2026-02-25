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

function getResultDiv() {
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result");

  return resultDiv
}

async function handleContentInjection(element, content, method, speed) {
  if (method == "type-out") {
    await typeOutTextContent(element, content, [50 / speed, 250 / speed]);
  }
  if (method == "fade-in") {
    await fadeInContent(element, content, 8/speed);
  }
}

async function populatePrompt(promptDiv, promptText, speed, method, isFirst=false) {
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

async function populateResult(resultDiv, resultLines, resultTag, method, speed) {
   for (var resultLine of resultLines) {
    let resultElem = document.createElement(resultTag);
    resultDiv.appendChild(resultElem);

    await handleContentInjection(resultElem, resultLine, method, speed*8);
  }
}

async function populatePaneChunk(chunk, paneContent, speed, method, isFirst=false) {
  const {promptText, result, resultTag} = paneContent;

  const promptDiv = getPromptDiv();
  chunk.appendChild(promptDiv);
  await populatePrompt(promptDiv, promptText, speed, method, isFirst);

  let pane = chunk.closest(".terminal-pane");
  pane.scrollTop = pane.scrollHeight;

  await wait(1000 / speed);
  
  let resultDiv = getResultDiv();
  chunk.appendChild(resultDiv);
  await populateResult(resultDiv, result, resultTag, method, speed);
}

// END PROMPT STUFFS

async function loadTerminalPane(paneId, contentId, speed, method="type-out") {
  const terminalPane = document.getElementById(paneId);

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

async function loadTopSections() {

  // below two will be loaded at the same time
  loadTerminalPane("ascii-art-pane", 'artPaneContents', 4, "fade-in");
  await loadTerminalPane("main-terminal-pane", "mainPaneContents", 3);

  // we will focus the terminal after that
  // focusLatestInput();
}

async function loadStackPane() {
  await loadTerminalPane("stack-pane", 'stackPaneContents', 40);
  loadStackNav();
}

async function loadToysPane() {
  await loadTerminalPane("toys-pane", 'toysPaneContents', 40);

  // from snake.js
  initializeSnake();
  loadToysNav();
}

async function loadOutroPane() {
  await loadTerminalPane("outro-pane", 'outroPaneContents', 40);
}

async function loadContactPane() {
  await loadTerminalPane("contact-pane", 'contactPaneContents', 40);
}



function loadPage() {
  loadTopSections();
  loadStackPane();
  loadToysPane();
  loadOutroPane();
  loadContactPane();
}

loadPage();

