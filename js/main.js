let CWD = "/site";

const RESPONSES = {
  commands: {
    help: () => {
      return `commands cd ls clear`.split(" ") // have this list the keys of this
    },
    pwd: () => {
      return [CWD]
    },
    cd: (args) => {
      let dir = args[0];
      return [`Changing current working dir to '${dir}'`];
    },
    ls: (args) => {
      if (args.length == 0) {
        return "icons/ README.md index.html index.js main.css variables.js".split(" ")
      }
      let dir = args[0];
      if (["icons", "icons/"].includes(dir)) {
        return "bash.svg css.svg docker.svg html.svg js.svg nginx.svg python.svg react.svg".split(" ")
      }
      return [`Unknown dir: '${dir}'`]
    },
    clear: () => {
      return ["clearing screen"]
    },
    cls: () => {
      return ["clearing screen"]
    },
    intro: () => {
      return INTRO_TEXT_ARRAY;
    },
    tips: () => {
      return TIPS_TEXT_ARRAY;
    }
  },
  errors: {
    unknownCmd: (cmd) => [`Unknown command: ${cmd}`],
    unknownErr: (err) => [`Unknown err: [${err}]`]
  }
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
  
  focusLatestInput();
}
