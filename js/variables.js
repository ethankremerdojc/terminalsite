const EMPTY_PANE = {
  promptText: "",
  resultTag: "p",
  result: []
}

let ascii_arrays = [
  [
    "              MANDELBROT",
    "",
    "                           ..",
    "                          .:+:-.",
    "                        ..::*=:..",
    "                     ....::####:...",
    "                  ...-=::--*##=-::::=.",
    "                ....::##############=.",
    "          ........::#@#############@:.",
    "        ..:%::=::::-#################%",
    "      ....::*#####=##################+",
    "  ......:==%#########################.",
    ":::#:===+##########################-:.",
    "   .....:--%#########################:",
    "       ...::*#####-##################+",
    "         .:=::-::::=#################@",
    "          .........:#+#############+:.",
    "                ....::############%@+.",
    "                   ..:-:::-###=:::..:.",
    "                     ....::###%:...",
    "                        ...:-=:..",
    "                          .:%::."
  ],
  [
    "       LINUX PENGUIN",
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
  ],
  [
    "        SQUIDWARD",
    "",
    "     .--'''''''''--.",
    "  .'      .---.      '.",
    " /    .-----------.    \\",
    "/        .-----.        \\",
    "|       .-.   .-.       |",
    "|      /   \\ /   \\      |",
    " \\    | .-. | .-. |    /",
    "  '-._| | | | | | |_.-'",
    "      | '-' | '-' |",
    "       \\___/ \\___/",
    "    _.-'  /   \\  `-._",
    "  .' _.--|     |--._ '.",
    "  ' _...-|     |-..._ '",
    "         |     |",
    "         '.___.'"
  ]
]

// Ascii art credits to:
// https://www.asciiart.eu/

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
      resultTag: "rawhtml",
      result: [
        `<pre id="ascii-art-pre">${ASCIIS[0]}</pre>` +
        `<div id="ascii-nav"></div>`
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
          '<li id="nav-item-snake">[ SNAKE ]</li>' +
          '<li id="nav-item-hangman">[ HANGMAN ]</li>' +
          '<li id="nav-item-donut">[ DONUT ]</li>' +
        '</ul>' +
        '<div id="toys-container-snake" class="snake toy-div">Snake</div>' +
        '<div class="outer-hangman"><div id="toys-container-hangman" class="hangman toy-div">Hangman</div></div>' + // this has extra div in order to center
        '<div class="outer-donut"><div id="toys-container-donut" class="donut toy-div">' +
          '<pre id="output" style="font-size: 7px; font-weight: bolder;"></pre>' +
        '</div></div>',
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
