// inspired by https://css-tricks.com/snippets/css/typewriter-effect/

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

async function typeOutTextContent(element, delayRange) {
  return new Promise((resolve) => {
    let currentContent = element.innerHTML;
    let textLength = 0;

    let tick = () => {
      textLength ++;
      newText = currentContent.slice(0, textLength);
      element.innerHTML = newText;

      if (textLength != currentContent.length) {
        setTimeout(tick, getRandomInt(delayRange[0], delayRange[1]));
      } else {
        resolve();
      }
    }

    element.innerHTML = "";
    tick()

  })
}

function hideTerminalPaneContents(elem) {
  let terminalPrompts = elem.getElementsByClassName("terminal-prompt");

  for (var terminalPrompt of terminalPrompts) {
    let promptH1 = terminalPrompt.querySelector("h1");
    let promptText = terminalPrompt.querySelector(".prompt-text");

    promptH1.style.opacity = "0";
    promptText.style.opacity = "0";

    let resultDiv = terminalPrompt.querySelector(".result");
    let pTags = resultDiv.querySelectorAll("p");

    for (var pTag of pTags) {
      pTag.style.opacity = "0";
    }
  }
}

async function makePromptVisible(prompt) {
  let promptH1 = prompt.querySelector("h1");
  promptH1.style.opacity = "1";

  await wait(600);

  let promptText = prompt.getElementsByClassName("prompt-text")[0];
  promptText.style.opacity = "1";

  await typeOutTextContent(promptText, [60, 180]);

  await wait(300);

  let pTags = prompt.querySelectorAll("p");
  for (var pTag of pTags) {
    pTag.style.opacity = "1";
    await typeOutTextContent(pTag, [2, 18]);
  }
}

async function loadMainTerminalPane() {
  const mainTerminalPane = document.getElementById("main-terminal-pane");
  const terminalPrompts = mainTerminalPane.getElementsByClassName("terminal-prompt");

  for (var terminalPrompt of terminalPrompts) {
    await makePromptVisible(terminalPrompt);
  }
}

const mainTerminalPane = document.getElementById("main-terminal-pane");
hideTerminalPaneContents(mainTerminalPane);

loadMainTerminalPane();
