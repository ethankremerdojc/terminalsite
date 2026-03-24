function getAsciis() {

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

  let result = [];

  const MAX_ASCII_CHAR_WIDTH = 40;
  for (var ascii_array of ascii_arrays) {
    for (var line of ascii_array) {
      if (line.length > MAX_ASCII_CHAR_WIDTH) {
        throw "ASCII art provided is greater MAX_ASCII_CHAR_WIDTH: " + MAX_ASCII_CHAR_WIDTH
      }
    }

    result.push(ascii_array.join("\n"));
  }

  return result;
}

let _ASCII_ART_INTERVAL_ = null;

function getCurrentArtIndex() {
  const asciiNavDiv = document.getElementById("ascii-nav");
  let buttons = asciiNavDiv.querySelectorAll("button");
  let activeButton = asciiNavDiv.querySelector("button.active");

  return Array.from(buttons).indexOf(activeButton);
}

const nextArt = () => {
  let currentIndex = getCurrentArtIndex();

  if (currentIndex == ASCIIS.length - 1) {
    updateCurrentArt(0);
  } else {
    updateCurrentArt(currentIndex + 1);
  }
}

function updateCurrentArt(index, firstTime=false) {

  clearInterval(_ASCII_ART_INTERVAL_);

  const asciiNavDiv = document.getElementById("ascii-nav");

  if (!firstTime) {
    let currentActive = asciiNavDiv.querySelector('button.active');
    currentActive.classList.remove("active");
    Array.from(asciiNavDiv.children)[index].classList.add("active");
  }

  let newArt = ASCIIS[index];
  const artPre = document.getElementById("ascii-art-pre");

  artPre.style.opacity = 0;

  setTimeout(() => {
    artPre.innerHTML = newArt;
    artPre.style.opacity = 1;
    clearInterval(_ASCII_ART_INTERVAL_);
    _ASCII_ART_INTERVAL_ = setInterval(nextArt, 7000);
  }, 1000)
}

export const ASCIIS = getAsciis();

export function initializeArtPane() {
  updateCurrentArt(0, true);
}

export function loadAsciiNav() {
  const asciiNavDiv = document.getElementById("ascii-nav");

  const setActive = (e) => {
    const index = Array.from(asciiNavDiv.children).indexOf(e.target);
    updateCurrentArt(index);
  }

  for (let i=0; i<ASCIIS.length; i++) {
    let navButton = document.createElement("button");
    navButton.onclick = setActive;
    navButton.innerHTML = "●";

    if (i==0) {
      navButton.classList.add("active");
    }

    asciiNavDiv.appendChild(navButton);
  }

  _ASCII_ART_INTERVAL_ = setInterval(nextArt, 7000);
}
