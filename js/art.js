let CURRENT_INDEX = 0;
let artInterval = null;

const nextArt = () => {
  if (CURRENT_INDEX == ASCIIS.length - 1) {
    CURRENT_INDEX = 0;
  } else {
    CURRENT_INDEX++;
  }

  updateCurrentArt(CURRENT_INDEX);
}

function updateCurrentArt(index) {

  clearInterval(artInterval);

  const asciiNavDiv = document.getElementById("ascii-nav");
  let currentActive = asciiNavDiv.querySelector('button.active');
  currentActive.classList.remove("active");
  Array.from(asciiNavDiv.children)[index].classList.add("active");

  CURRENT_INDEX = index;
  let newArt = ASCIIS[index];
  const artPre = document.getElementById("ascii-art-pre");

  artPre.style.opacity = 0;
  setTimeout(() => {
    artPre.innerHTML = newArt;
    artPre.style.opacity = 1;
    artInterval = setInterval(nextArt, 7000);
  }, 1000)
}

function loadAsciiNav() {
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

  artInterval = setInterval(nextArt, 7000);
}
