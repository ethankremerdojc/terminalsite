const EMPTY_PANE = {
  promptText: "",
  resultTag: "p",
  result: []
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
        "Try out commands like 'stack', 'info', 'interests', or common linux commands like 'ls' and 'clear'"
      ]
    },
    EMPTY_PANE,
  ],
  artPaneContents: [
    {
      promptText: "art",
      resultTag: "pre",
      result: [
        "         Linux-Penguin         \n" +
        "                               \n" +
        "          _nnnn_               \n" +
        "         dGGGGMM               \n" +
        "        @p-qp--qM              \n" +
        "        M|@||@) M              \n" +
        "        @,----.JM|             \n" +
        "       JS^\\__/  qKL           \n" +
        "     dZP        qKRb           \n" +
        "     dZP          qKKb         \n" +
        "    fZP            SMMb        \n" +
        "    HZM            MMMM        \n" +
        "    FqM            MMMM        \n" +
        "   __| \".        |\\dS\"qML   \n" +
        "   |    `.       | `' \\Zq   \\\n" +
        "  _nnnn_)      \.___.,|     .' \n" +
        "  \\____)MMMMMP|   .'          \n" +
        "    `-'       `--'              "
      ]
    }
  ],
  stackPaneContents: [
    {
      promptText: "stack",
      resultTag: "rawhtml",
      result: [
        "<p>Hover over the icons for info.</p>" +
        "<ul>" +
          '<li><img src="icons/python.svg" /></li>' +
          '<li><img src="icons/js.svg" /></li>' +
          '<li><img src="icons/html.svg" /></li>' +
          '<li><img src="icons/css.svg" /></li>' +
          '<li><img src="icons/bash.svg" /></li>' +
        "</ul>" +
        '<div id="stack-item-info">' +
          '<h2 id="stack-item-name">JavaScript</h2>' +
          '<p id="stack-item-details">Thoughs + experience</p>' +
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
          '<li>[ SNAKE ]</li>' +
          '<li>[ HANGMAN ]</li>' +
          '<li>[ DONUT ]</li>' +
          '<li>[ MATRIX ]</li>' +
        '</ul>' +
        '<div id="toys-canvas-container">' +
          '<h2>Where the toys will go</h2>' +
        '</div>'
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










