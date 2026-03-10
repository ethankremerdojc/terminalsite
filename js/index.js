function getResultDiv() {
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result");

  return resultDiv
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

async function loadAsciiPane() {
  await loadTerminalPane("ascii-art-pane", 'artPaneContents', 4, "fade-in");
  loadAsciiNav();
}

async function loadMainPane() {
  await loadTerminalPane("main-terminal-pane", "mainPaneContents", 3);
}

async function loadStackPane() {
  await loadTerminalPane("stack-pane", 'stackPaneContents', 40);
  loadStackNav();
}

async function loadToysPane() {
  await loadTerminalPane("toys-pane", 'toysPaneContents', 40, "fade-in");

  // from snake.js
  runDonut();
  initializeSnake();
  hideAllToys();

  await loadToysNav();
  showToy("snake");

}

async function loadOutroPane() {
  await loadTerminalPane("outro-pane", 'outroPaneContents', 40);
}

async function loadContactPane() {
  await loadTerminalPane("contact-pane", 'contactPaneContents', 40);
}

function loadPage() {
  const visibilityMap = {
    "main-terminal-pane": loadMainPane,
    "ascii-art-pane": loadAsciiPane,
    "stack-pane": loadStackPane,
    "toys-pane": loadToysPane,
    "outro-pane": loadOutroPane,
    "contact-pane": loadContactPane
  };
  
  function initObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const id = entry.target.id;
          const handler = visibilityMap[id];

          if (handler) {
            handler();
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.6
    });

    Object.keys(visibilityMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Wait until the page is fully laid out and scroll position is final.
  window.addEventListener('load', () => {
    requestAnimationFrame(() => requestAnimationFrame(initObservers));
  });
}

loadPage();
