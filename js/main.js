function navigateToPane(paneName, delay=1000) {
  let stackElem = document.getElementById(`${paneName}-pane`);

  setTimeout(() => {
    stackElem.scrollIntoView(
      {
          behavior: 'auto',
          block: 'center',
          inline: 'center'
      }
    ); 
  }, delay)
}

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
  await populateResult(resultDiv, response, "p", "type-out", 2);

  // add empty pane
  let chunk = document.createElement("div");
  chunk.classList.add("pane-chunk");

  paneChunk.appendChild(chunk);

  await populatePaneChunk(
    chunk, EMPTY_PANE, 2
  ); //TODO figure out how to specify speed

  let isNavigating = false;
  if (response[0]) {
    if (response[0].includes("Navigating")) {
      isNavigating = true;
    }
  }

  if (!isNavigating) { focusLatestInput() };
}
