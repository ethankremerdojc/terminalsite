function isValidPath(path) {
  let dirContents = getDirContents(path);

  if (dirContents) {
    return true
  } else {
    return false
  }
}

function changeDir(newDir) {
  let newPath;
  if (newDir.startsWith("/")) {
    newPath = newDir;
  } else {
    newPath = CWD + "/" + newDir
  }

  if (isValidPath(newPath)) {
    CWD = newPath;
    return true
  } else {
    return false
  }
}

function getDirContents(path=CWD) {
  let pathItems = path.split("/").slice(1); // get rid of first slash

  if (pathItems.length === 1 && pathItems[0] === '') {
    return DRIVE
  }

  let currentDir = DRIVE;
  let currentPath = [];

  for (let i=0; i<pathItems.length; i++) {
    var pathItem = pathItems[i];

    if (i === pathItems.length - 1 && currentDir.length == 0) {
      return []
    }

    let found = false;

    for (var item of currentDir) {
      if (typeof(item) === "object") {
        if (item[0] === pathItem) {
          currentDir = item[1];
          currentPath.push(item[0]);
          found = true;
        }
      }
    }


    if (!found) {
      return false
    }
  }

  return currentDir
}

function readableContents(currentDirContents) {

  let result = [];

  for (var item of currentDirContents) {
    if (typeof(item) === "object") {
      result.push(item[0] + "/");
    } else {
      result.push(item);
    }
  }

  return result
} 

function getDirs(currentDirContents) {
  let result = [];

  for (var item of currentDirContents) {
    if (typeof(item) === "object") {
      result.push(item[0]);
    }
  }

  return result;
}

function clearScreen() {
  document.getElementById("linux-pane").innerHTML = "";
  loadTerminalPane("linux-pane", 'emptyPaneContents', 40).then(() => {
    focusLatestInput();
  });
}

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
          contents = getDirContents();
          path = CWD;
        } else {
          path = args[0];

          if (path.startsWith("/")) {
            contents = getDirContents(path);
          }

          contents = getDirContents(CWD + "/" + path);
        }

        if (contents) {
          return readableContents(contents);
        } else {
          return [`ls: cannot access '${path}': No such file or directory`]
        }
      },
      clear: () => {
        clearScreen();
        return ["clearing screen"]
      },
      cls: () => {
        clearScreen();
        return ["clearing screen"]
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

let CWD = "/site";

let DRIVE = [
  [
    "site", [
      [
        "icons", [
          "bash.svg", 
          "css.svg", 
          "docker.svg",
          "html.svg",
          "js.svg",
          "nginx.svg",
          "python.svg",
          "react.svg"
        ]
      ],
      "README.md",
      "index.html",
      "index.js",
      "main.css",
      "variables.js"
    ]
  ],
  [
    "root", []
  ]
];

const RESPONSES = getResponses();
