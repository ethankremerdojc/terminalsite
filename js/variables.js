const STACK_INFO = {
  "python": {
    title: "Python",
    details: [
      "Experience: 6 years",
      "My favorite programming language! I've made endless automation scripts, games, webservers, tui's and more. ", 
      "I love it's readability, and how easy it is to get up and running with it.", 
      "If I was ever stranted on a desert island, I would want Python on the island with me. "
    ]
  },
  "js": {
    title: "JavaScript",
    details: [
      "Experinence: 6 years",
      "Ahh, one of the most intuitive and perfect programming languages, why else would it be in every single browser? ",
      "Joking aside, I have coded many websites with javascript. I've made carousells and reactive tables, and coded simple forms and complex business workflows.",
      "I am very comfortable working with javascript, and have wide experience in many areas."
    ]
  },
  "html": {
    title: "HTML",
    details: [
      "Experience: 7+ years",
      "HTML! The perfect language. So simple, so concise, so un-compromising.",
      "I'm not sure I need to say anything here... but yes, I do know my way around html...",
      "...",
      "...HTML is the best!"
    ]
  },
  "css": {
    title: "CSS",
    details: [
      "Experience: 7+ years",
      "I am quite expierenced with all areas of frontend styling, and am currently in a mode of trying to use CSS for all kinds of things" +
      "that people don't think it should be used for. Animations, togglable menus, and form validation stuffs.", 
      "I think it's quite fun, and only mildy annoying."
    ]
  },
  "bash": {
    title: "Scripting",
    details: [
      "Experience: 6 years",
      "I have made many a script. For anything a computer might do. I have plenty of automation scripts running now that automate much of my workflow day to day.",
      "I am fluent in bash, and comfortable with both Powershell and *cough* batch.",
    ]
  },
  "docker": {
    title: "Docker",
    details: [
      "Experience: 3 years",
      "One of my favorite tools. I use containers a lot in my day job, managing different dev servers and QOL applications.", 
      "I also love to find tools that run in docker so that my servers can get the most out of their cpus."
    ]
  },
  "react": {
    title: "React",
    details: [
      "Experience: 4 years",
      "I have been using React to build out all the pages on my current companies site. I am confident in both the older class " +
      "based components as well as function based. I have experience using redux to manage the applications data as well."
    ]
  },
  "linux": {
    title: "Linux",
    details: [
      "Experience: 5 years",
      "I use Arch btw.",
      "However, I do have extended experience in Ubuntu + Ubuntu server, linux in docker, and linux mint.",
      "Still use Windows for gaming, but that's about it. Linux FTW"
    ]
  },
}

function getStackNavStr() {
  let stackNavStr = `<ul class="stack-nav-items" id="stack-nav-items">`;

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
    "",
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
    "    `-'       `--'",
    "",
    "",
  ],
  [
    "                PYTHON",
    "",
    "",
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
    "",
    "",
  ],
  [
    "        SQUIDWARD",
    "",
    "",
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
    "         '.___.'",
    "",
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
  "from server configuration to grahpic designs. I enjoy designing clean architectures and have a strong interest in systems building, " +
  "from structuring applications to improving performance and development workflows.",

  "I am passionate about creating well-designed, maintainable software that solves real problems, but I also love " + 
  "building fun and 'useless' things that make people smile and laugh.",

  "Although this is a portfolio which is useful, it is also useless because it is solving a problem that doesn't exist, having fake terminals " +
  "in my website. This makes me smile, and I hope it makes you smile as well. ",

  "I will come back and add more commands to this terminal as time goes on, to see how far this browser can go!"
]

const TIPS_TEXT_ARRAY = [
  "Try out common linux commands, or type 'help' to see the current list of working commands."
]

// test
const PANES_CONTENT = {
  emptyPaneContents: [
    EMPTY_PANE
  ],
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
        `<div class="ascii-nav" id="ascii-nav"></div>`
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
          '<h2 class="stack-item-name" id="stack-item-name"></h2>' +
          '<div class="stack-item-name" id="stack-item-info"></div>' +
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
          '<li id="nav-item-toys-info">[ TOYS INFO ]</li>' +
          '<li id="nav-item-snake">[ SNAKE ]</li>' +
          '<li id="nav-item-hangman">[ HANGMAN ]</li>' +
          '<li id="nav-item-donut">[ DONUT ]</li>' +
        '</ul>' +

        `<div class="toys-container-outer">` +

          '<div id="toys-container-toys-info" class="toys-info toy-div">Toys Info</div>' +

          '<div id="toys-container-snake" class="snake toy-div">Snake</div>' +

          '<div class="hangman toy-div" id="toys-container-hangman">' +
            '<div  class="inner-hangman">Hangman</div>' +
          '</div>' +

          '<div id="toys-container-donut" class="donut toy-div">' +
            '<div class="inner-donut">' +
              '<pre id="output" style="font-size: 7px; font-weight: bolder;"></pre>' +
            '</div>' + 
          '</div>' +

        '</div>'
      ]
    }
  ],
  outroPaneContents: [
    {
      promptText: "outro",
      resultTag: "rawhtml",
      result: [
      `<div class="outro-html">` +
        "<b>CREDITS: </b>" +
        "<p>Ascii Arts:</p>" +
        `<i>Sourced from <a href="https://www.asciiart.eu/">https://www.asciiart.eu/</a></i>` +
        "<p>Ascii Donut:</p>" +
        `<i>Sourced from <a href="https://surenenfiajyan.github.io/3d-ascii-donut-js/">https://surenenfiajyan.github.io/3d-ascii-donut-js/</a> though that was also a recreation of another.</i>` +
        "<p>Matrix Background</p>" +
        `<i>Adapted from <a href="https://codepen.io/jcubic/pen/rNeNwgB">https://codepen.io/jcubic/pen/rNeNwgB</a></i>` +
        "<p>Code</p>" +
        `<i>Github: <a href="https://github.com/ethankremerdojc/terminalsite">https://github.com/ethankremerdojc/terminalsite</a></i>` +
        "<p>Resume</p>" +
        `<i>Google Docs: <a href="https://docs.google.com/document/d/1c4t0_1SMbfnYEcgHNYh32T2vofQSwTRCMQ5s4ejmH8M/edit?usp=sharing">https://docs.google.com/document/d/1c4t0_1SMbfnYEcgHNYh32T2vofQSwTRCMQ5s4ejmH8M/edit?usp=sharing</a></i>` +
      "</div>"
      ]
    },
  ],
  contactPaneContents: [
    {
      promptText: "contact",
      resultTag: "rawhtml",
      result: [
        `<form class="contact-form" id="contact-form" method="POST">` +
          `<p>Have any questions for me, or feedback on this site? Fill out this form to contact me, and I'll send you an email as soon as I can with a reply!</p>` +
          `<input name="email" type="email" placeholder="email" />` +
          `<textarea name="notes" type="text" multiline placeholder="notes"></textarea>` +
          `<button id="contact-submit-button" type="submit">Submit!</textarea>` +
        `</form>`
      ]
    },
  ]
};
