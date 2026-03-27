import { getStackNavStr } from "./stack-pane.js";

export const INTRO_TEXT_ARRAY = [
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

export const TIPS_TEXT_ARRAY = [
  "Try out common linux commands, or type 'help' to see the current list of working commands."
];

export const EMPTY_PANE = {
  promptText: "",
  resultTag: "p",
  result: []
}

//TODO result tag is redundant, should always just be rawhtml or something
export const PANES_CONTENT = {
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
        `<pre id="ascii-art-pre"></pre>` + //TODO add first ascii in here
        `<div class="ascii-nav" id="ascii-nav"></div>`
      ]
    }
  ],
  monitorPaneContents: [
    {
      promptText: "monitor",
      resultTag: "rawhtml",
      result: [
        `<div class="monitor-outer" id="cpu-monitor">
          <p>CPU:</p>
          <canvas></canvas>
        </div>
        <div class="monitor-outer" id="mem-monitor">
          <p>MEM:</p>
          <canvas></canvas>
        </div>`
      ]
    }
  ],
  stackPaneContents: [
    {
      promptText: "stack",
      resultTag: "rawhtml",
      result: [
        getStackNavStr() +
        '<div class="stack-item-details">' +
          '<h2 class="stack-item-name" id="stack-item-name"></h2>' +
          '<div class="stack-item-info" id="stack-item-info"></div>' +
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
          '<li id="nav-item-fractal">[ FRACTAL ]</li>' +
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

          '<div id="toys-container-fractal" class="fractal toy-div">' +
            '<div class="fractal-outer">' +
              '<div class="fractal-controls">' +
                '<label for="angle"><p>Angle: 40</p><button>Set Default</button></label>' +
                '<input type="range" min="0" max="180" name="angle" step="1" value="40" id="angle-fractal-input">' +
                '<label for="length"><p>Length Factor: 0.65</p><button>Set Default</button></label>' +
                '<input type="range" min="0.1" max="1" name="length" step="0.01" value="0.65" id="length-fractal-input">' +
              '</div>' +
              '<canvas id="tree-fractal-canvas"></canvas>' +
            '</div>' +
            '<div class="fractal-outer">' +
              '<div class="fractal-controls">' +
                '<label for="pow"><p>Power: 2</p><button>Set Default</button></label>' +
                '<input type="range" min="1" max="10" name="pow" value="2" id="pow-fractal-input">' +
                '<label for="z"><p>Z: 0</p><button>Set Default</button></label>' +
                '<input type="range" min="-1.5" max="1.5" name="z" step="0.01" value="0" id="z-fractal-input">' +
              '</div>' +
              '<canvas id="brot-fractal-canvas"></canvas>' +
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
        "<b>LINKS: </b>" +
        "<p>Code</p>" +
        `<i>Github: <a href="https://github.com/ethankremerdojc/terminalsite">https://github.com/ethankremerdojc/terminalsite</a></i>` +
        "<p>Resume</p>" +
        `<i>Google Docs: <a href="https://docs.google.com/document/d/1c4t0_1SMbfnYEcgHNYh32T2vofQSwTRCMQ5s4ejmH8M/edit?usp=sharing">https://docs.google.com/document/d/1c4t0_1SMbfnYEcgHNYh32T2vofQSwTRCMQ5s4ejmH8M/edit?usp=sharing</a></i>` +
        `<br/>` +
        `<i>© 2026 Ethan Kremer</i>` +
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
          `<p>Alternatively shoot me an email at <a href="mailto:ethankremer.web@gmail.com">ethankremer.web@gmail.com</a></p>` +
          `<input name="email" type="email" placeholder="email" />` +
          `<textarea name="notes" type="text" multiline placeholder="notes"></textarea>` +
          `<button id="contact-submit-button" type="submit">Submit!</textarea>` +
        `</form>`
      ]
    },
  ]
};
