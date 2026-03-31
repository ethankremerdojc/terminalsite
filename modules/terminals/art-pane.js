function getAsciis() {
  let ascii_arrays = [
    {
      title: "LINUX PENGUIN",
      text: [
        "        _nnnn_",
        "       dGGGGMM",
        "      @p-qp--qM",
        "      M|@||@) M",
        "      @,----.JM|",
        "     JS^\\__/  qKL",
        "   dZP        qKRb",
        "   dZP          qKKb",
        "  fZP            SMMb",
        "  HZM            MMMM",
        "  FqM            MMMM",
        " __| \".        |\\dS\"qML",
        " |    `.       | `' \\Zq",
        "_)     \\.___.,|      .'",
        "\\____   )MMMMMP|   .'",
        "     `-'       `--'"
      ]
    },
    {
      title: "PYTHON",
      text: [
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
        "             `iiiiiiiiii`"
      ]
    },
    {
      title: "SQUIDWARD",
      text: [
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
    },
    {
      title: "BONSAI",
      text: [
        `       ,.,`,
        `      MMMM_    ,..,`,
        `       "_ "__"MMMMM          ,...,,`,
        `,..., __." --"    ,.,     _-"MMMMMMM`,
        `MMMMM"___ "_._   MMM"_."" _ """"""`,
        `"""""    "" , \\_.   "_. ."`,
        `        ,., _"__ \\__./ ."`,
        `       MMMMM_"  "_    ./`,
        `        ''''      (    )`,
        ` ._______________.-'____"---._.`,
        `  \\                          /`,
        `   \\________________________/`,
        `  (_)                    (_)`
      ]
    },
    {
      title: "ARCH",
      text: [
        "                   -`",
        "                 .o+`",
        "                 `ooo/",
        "               `+oooo:",
        "               `+oooooo:",
        "              -+oooooo+:",
        "            `/:-:++oooo+:",
        "            `/++++/+++++++:",
        "          `/++++++++++++++:",
        "          `/+++ooooooooooooo/`",
        "         ./ooosssso++osssssso+`",
        "       .oossssso-````/ossssss+`",
        "       -osssssso.      :ssssssso.",
        "      :osssssss/        osssso+++.",
        "     /ossssssss/        +ssssooo/-",
        "   `/ossssso+/:-        -:/+osssso+-",
        " `+sso+:-`                 `.-/+oso:",
        " `++:.                           `-/+/",
        " .`                                  `"
      ]
    },
    {
      title: "MANDELBROT",
      text: [
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
      ]
    },
  ]

  let result = [];

  const MAX_ASCII_CHAR_WIDTH = 50;
  for (var asciiObj of ascii_arrays) {
    for (var line of asciiObj.text) {
      if (line.length > MAX_ASCII_CHAR_WIDTH) {
        throw "ASCII art provided is greater MAX_ASCII_CHAR_WIDTH: " + MAX_ASCII_CHAR_WIDTH
      }
    }
    result.push(`<p>${asciiObj.title}</p><pre>${asciiObj.text.join("\n")}</pre>`);
  }

  return result;
}

let _ASCII_ART_INTERVAL_ = null;

function getCurrentArtIndex() {
  const asciiNavDiv = document.getElementById("ascii-nav");
  let buttons = asciiNavDiv.querySelectorAll(".navdot");
  let activeButton = asciiNavDiv.querySelector("button.active");

  return Array.from(buttons).indexOf(activeButton);
}

const prevArt = () => {
  let currentIndex = getCurrentArtIndex();

  if (currentIndex == 0) {
    updateCurrentArt(ASCIIS.length - 1);
  } else {
    updateCurrentArt(currentIndex - 1);
  }
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
    Array.from(asciiNavDiv.querySelectorAll(".navdot"))[index].classList.add("active");
  }

  let newArt = ASCIIS[index];
  const artDiv = document.getElementById("ascii-art-div");
  artDiv.style.opacity = 0;

  setTimeout(() => {
    artDiv.innerHTML = newArt;
    artDiv.style.opacity = 1;
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
    const index = Array.from(asciiNavDiv.querySelectorAll(".navdot")).indexOf(e.target);
    updateCurrentArt(index);
  }
  
  let prevButton = document.createElement("button");
  prevButton.onclick = prevArt;
  prevButton.innerHTML = "<";

  asciiNavDiv.appendChild(prevButton);
  
  for (let i=0; i<ASCIIS.length; i++) {
    let navButton = document.createElement("button");
    navButton.classList.add("navdot");
    navButton.onclick = setActive;
    navButton.innerHTML = "●";

    if (i==0) {
      navButton.classList.add("active");
    }

    asciiNavDiv.appendChild(navButton);
  }

  let nextButton = document.createElement("button");
  nextButton.onclick = nextArt;
  nextButton.innerHTML = ">";

  asciiNavDiv.appendChild(nextButton);

  _ASCII_ART_INTERVAL_ = setInterval(nextArt, 7000);
}
