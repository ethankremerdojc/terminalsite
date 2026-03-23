import { setMatrixColorsByCurrentTheme } from "./matrixBackground.js";
import { getCssVariable } from "./utils.js";

export function toggleColorTheme() {  
  document.body.classList.toggle("lightmode");
  setMatrixColorsByCurrentTheme();
}
