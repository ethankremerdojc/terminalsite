const EMPTY_PANE = {
  promptText: "",
  resultTag: "p",
  result: []
}

let ascii_arrays = [
  [
    "         Linux-Penguin",
    "",
    "          _nnnn_",
    "         dGGGGMM",
    "        @p-qp--qM",
    "        M|@||@) M",
    "        @,----.JM|",
    "       JS^\\__/  qKL",
    "     dZP        qKRb",
    "     dZP          qKKb",
    "    fZP            SMMb",
    "    HZM            MMMM",
    "    FqM            MMMM",
    "   __| \".        |\\dS\"qML",
    "   |    `.       | `' \\Zq   \\",
    "  _nnnn_)      \.___.,|     .'",
    "  \\____)MMMMMP|   .'",
    "    `-'       `--'"
  ],
  [
    "                PYTHON",
    "",
    "             .::::::::::.",
    "           .::``::::::::::.",
    "           :::..:::::::::::",
    "           ````````::::::::",
    "   .::::::::::::::::::::::: iiiiiii,",
    ".:::::::::::::::::::::::::: iiiiiiiii.",
    "::::::::::::::::::::::::::: iiiiiiiiii",
    "::::::::::::::::::::::::::: iiiiiiiiii",
    ":::::::::: ,,,,,,,,,,,,,,,,,iiiiiiiiii",
    ":::::::::: iiiiiiiiiiiiiiiiiiiiiiiiiii",
    "`::::::::: iiiiiiiiiiiiiiiiiiiiiiiiii`",
    "   `:::::: iiiiiiiiiiiiiiiiiiiiiii`",
    "           iiiiiiii,,,,,,,,",
    "           iiiiiiiiiii''iii",
    "           `iiiiiiiiii..ii`",
    "             `iiiiiiiiii`",
  ]
]

const MAX_ASCII_CHAR_WIDTH = 40;
let ASCIIS = [];

for (var ascii_array of ascii_arrays) {
  for (var line of ascii_array) {
    if (line.length > MAX_ASCII_CHAR_WIDTH) {
      throw "ASCII art provided is greater MAX_ASCII_CHAR_WIDTH: " + MAX_ASCII_CHAR_WIDTH
    }
  }

  ASCIIS.push(ascii_array.join("\n"));
}

const PANES_CONTENT = {
  mainPaneContents: [
    // {
    //   promptText: "intro",
    //   resultTag: "p",
    //   result: [
    //     "Hello. My name is Ethan Kremer. I am a software developer who loves to build stuff, code things and learn things.",
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    //   ]
    // },
    {
      promptText: "tips",
      resultTag: "p",
      result: [
        "Try out commands like 'stack', 'details', 'interests', or common linux commands like 'ls' and 'clear'"
      ]
    },
    EMPTY_PANE,
  ],
  artPaneContents: [
    {
      promptText: "art",
      resultTag: "pre",
      result: [
        ASCIIS[1]
      ]
    }
  ],
  stackPaneContents: [
    {
      promptText: "stack",
      resultTag: "rawhtml",
      result: [
        "<p>Hover over the icons for details.</p>" +
        '<ul id="stack-nav-items">' +
          '<li><img class="active" src="icons/python.svg" /></li>' +
          '<li><img src="icons/js.svg" /></li>' +
          '<li><img src="icons/html.svg" /></li>' +
          '<li><img src="icons/css.svg" /></li>' +
          '<li><img src="icons/bash.svg" /></li>' +
        "</ul>" +
        '<div class="stack-item-details">' +
          '<h2 id="stack-item-name"></h2>' +
          '<div id="stack-item-info"></div>' +
        '</div>'
      ]
    }
  ],
  toysPaneContents: [
    {
      promptText: "toys",
      resultTag: "rawhtml",
      result: [
        '<ul id="toys-header-items">' +
          '<li class="active">[ SNAKE ]</li>' +
          '<li>[ HANGMAN ]</li>' +
          '<li>[ DONUT ]</li>' +
          '<li>[ MATRIX ]</li>' +
        '</ul>' +
        '<div id="toys-container" class="snake">Snake</div>'
      ]
    }
  ],
  outroPaneContents: [
    {
      promptText: "outro",
      resultTag: "p",
      result: [
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
      ]
    },
  ],
  contactPaneContents: [
    {
      promptText: "contact",
      resultTag: "p",
      result: [
        "Contact Me! (eventually put rawhtml here with inputs/form)"
      ]
    },
  ]
};

// each response must return an array of items

const RESPONSES = {
  commands: {
    commands: () => {
      return `commands cd ls clear`.split(" ")
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
    }
  },
  errors: {
    unknownCmd: (cmd) => [`Unknown command: ${cmd}`],
    unknownErr: (err) => [`Unknown err: [${err}]`]
  }
}

const STACK_INFO = {
  "python": {
    title: "Python",
    details: [
      "python stuff",
      "for sure"
    ]
  },
  "js": {
    title: "JavaScript",
    details: [
      "js stuff",
      "for sure"
    ]
  },
  "html": {
    title: "HTML",
    details: [
      "html stuff",
      "for sure"
    ]
  },
  "css": {
    title: "CSS",
    details: [
      "css stuff",
      "for sure"
    ]
  },
  "bash": {
    title: "Scripting",
    details: [
      "bash, ps1, etc. stuff",
      "for sure"
    ]
  }
}








