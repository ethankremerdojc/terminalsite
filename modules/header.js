import { setMatrixColorsByCurrentTheme } from "./matrixBackground.js";
import { getCssVariable } from "./utils.js";
import { initializeFractal } from "./terminals/toys/fractal.js";

const LOCAL_STORAGE_THEME_KEY = "modetheme";

export function toggleColorTheme() {

  if ([...document.body.classList].includes("transitioning")) {
    return
  }

  document.body.classList.add("transitioning");
  setTimeout(() => {
    document.body.classList.remove("transitioning");
    initializeFractal();
  }, 2000);

  document.body.classList.toggle("lightmode");
  document.body.classList.toggle("darkmode");

  document.body.classList.add("transitioning");

  if ([...document.body.classList].includes("lightmode")) {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, "light");
  } else {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, "dark");
  }

  setMatrixColorsByCurrentTheme();
}

function formatDateTime(date = new Date()) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12

  return `${dayName}, ${monthName} ${day}, ${year} | ${hours}:${minutes} ${ampm}`;
}

function updateHeaderTime() {
  let headerTime = document.querySelector(".header-time");
  if (formatDateTime() != headerTime.innerHTML) {
    headerTime.innerHTML = formatDateTime();
  }
}

export function initializeHeader() {
  let initialTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  if (initialTheme) {
    if (initialTheme == "light") {
      document.body.classList.add("lightmode");
    } else {
      document.body.classList.add("darkmode");
    }
  }

  updateHeaderTime();

  setInterval(() => {
    updateHeaderTime();
  }, 1000)
}
