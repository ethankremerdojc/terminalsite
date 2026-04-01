import {
  loadTerminalPane
} from "./generation.js";

import {
  changeDir,
  getPathContents,
  readableContents,
  getPrevDirPath,
  tree,
  CWD
} from "./driveUtils.js";

import {
navigateToPane
} from "../utils.js";

function clearScreen() {
  document.querySelector(".linux-pane").innerHTML = "";

  loadTerminalPane("linux-pane", 'emptyPaneContents', 5).then(() => {
    focusLatestInput();
  });
};

function getResponses() {
  var responses = {
    commands: {
      pwd: () => {
        return [CWD]
      },
      cwd: () => {
        return [CWD]
      },
      cd: (args) => {
        let dir = args[0];

        let changeDirSuccess = changeDir(dir);

        if (changeDirSuccess) {
          return [`Changed current working dir to '${dir}'`];
        } else {
          return [`cd: ${dir}: No such file or directory.`]
        }
      },
      ls: (args) => {
        let contents;
        let path;

        if (args.length == 0) {
          contents = getPathContents();
          path = CWD;
        } else {
          path = args[0];

          if (path.startsWith("/")) {
            contents = getPathContents(path);
          } else if (path.startsWith("..")) {
            contents = getPathContents(getPrevDirPath(path))
          } else {
            contents = getPathContents(CWD + "/" + path);
          }

        }
        
        if (contents) {
          return readableContents(contents['children']);
        } else {
          return [`ls: cannot access '${path}': No such file or directory`]
        }
      },
      clear: () => {
        clearScreen();
        return ["clearing screen"]
      },
      cat: (args) => {
        let path = args[0];
        if (!path) {
          return [`Can't cat nothing.`]
        }

        let contents;
        if (path.startsWith("/")) {
          contents = getPathContents(path);
        } else {
          contents = getPathContents(CWD + "/" + path);
        }
        return [contents['content'].replaceAll("\n", "<br/>").replaceAll(" ", "&nbsp;")]
      },
      cls: () => {
        return ["clearing screen"]
      },
      tree: (args) => {
        let path = args[0];
        if (!path) {
          path = CWD
        };
        return [`${CWD}\n${tree(path)}`.replaceAll("\n", "<br/>").replaceAll(" ", "&nbsp;")]
      },
      intro: () => {
        return INTRO_TEXT_ARRAY;
      },
      tips: () => {
        return TIPS_TEXT_ARRAY;
      },
      stack: () => {
        navigateToPane("stack");
        return ["Navigating to stack."];
      },
      toys: () => {
        navigateToPane("toys");
        return ["Navigating to toys."];
      },
      outro: () => {
        navigateToPane("outro");
        return ["Navigating to outro."];
      },
      contact: () => {
        navigateToPane("contact");
        return ["Navigating to contact."];
      },
    },
    errors: {
      unknownCmd: (cmd) => [`Unknown command: ${cmd}`],
      unknownErr: (err) => [`Unknown err: [${err}]`]
    }
  }

  let cmds = Object.keys(responses.commands);
  cmds.push("help");
  responses.commands.help = () => ["Here are the available commands.", ...cmds];

  return responses
}

export function getPromptResponse(userText) {
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

export function focusLatestInput() {
  let newInput = document.getElementById("promptInput");
  newInput.focus();
}

const RESPONSES = getResponses();
