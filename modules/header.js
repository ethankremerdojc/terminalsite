import { setMatrixColorsByCurrentTheme } from "./modules/matrixBackground.js";
import { getCssVariable } from "./utils.js";

export function toggleColorTheme() {  
  document.body.classList.toggle("lightmode");
  setMatrixColors();
}
