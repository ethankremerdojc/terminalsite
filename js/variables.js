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
  },
  "docker": {
    title: "Scripting",
    details: [
      "bash, ps1, etc. stuff",
      "for sure"
    ]
  },
  "react": {
    title: "Scripting",
    details: [
      "bash, ps1, etc. stuff",
      "for sure"
    ]
  },
  "linux": {
    title: "Scripting",
    details: [
      "bash, ps1, etc. stuff",
      "for sure"
    ]
  },
}

function getStackNavStr() {
  let stackNavStr = `<ul id="stack-nav-items">`;

  for (var [itemName, itemDetails] of Object.entries(STACK_INFO)) {
    let activeStr = "";
    if (itemName == "python") {
      activeStr = `class="active"`;
    }
    stackNavStr += `<li><img ${activeStr} src="icons/${itemName}.svg" /></li>`;
  }

  stackNavStr += "</ul>"
  return stackNavStr
}

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

const INTRO_TEXT_ARRAY = [
  "Hello world! My name is Ethan.",

  "I am a software developer with over five years of experience building reliable web applications and backend systems. " +
  "My primary experience is in Python, particularly with Django, though I am comfortable working across the stack " +
  "from bare metal to grahpic designs. I enjoy designing clean architectures and have a strong interest in systems building, " +
  "from structuring applications to improving performance and development workflows.",

  "I am passionate about creating well-designed, maintainable software that solves real problems, but I also love " + 
  "building fun and 'useless' things that make people smile and laugh.",

  "Although this is a portfolio which is useful, it is also useless because it is solving a problem that doesn't exist, having fake terminals " +
  "in my website. This makes me smile, and I hope it makes you smile as well. ",

  "I will come back and add more commands to this terminal as time goes on, to see how far this browser can go!"
]

const TIPS_TEXT_ARRAY = [
  "Try out commands like 'stack', 'details', 'interests', or common linux commands like 'ls' and 'clear'"
]

const PANES_CONTENT = {
  mainPaneContents: [
    {
      promptText: "intro",
      resultTag: "p",
      result: INTRO_TEXT_ARRAY
    },
    {
      promptText: "tips",
      resultTag: "p",
      result: TIPS_TEXT_ARRAY
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
        '<p class="stack-tooltip">Click on the icons for details.</p>' +
        getStackNavStr() +
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
        "Credits: ... At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
      ]
    },
  ],
  contactPaneContents: [
    {
      promptText: "contact",
      resultTag: "rawhtml",
      result: [
        `<p>Contact Me!</p>` +
        `<form>` +
        `<input name="email" type="email" />` +
        `<textarea name="notes" type="text" multiline placeholder="notes"></textarea>` +
        `</form>`
      ]
    },
  ]
};
