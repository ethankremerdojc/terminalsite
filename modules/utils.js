export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayItem(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

export function wait(milis) {
  return new Promise(resolve => {
    setTimeout(() => { resolve() }, milis);
  })
}

// style stuffs

export function getCSSColorFormat(str) {
  str = str.trim();

  // hex / hexa
  if (/^#([0-9a-fA-F]{3})$/.test(str)) return 'hex';
  if (/^#([0-9a-fA-F]{6})$/.test(str)) return 'hex';
  if (/^#([0-9a-fA-F]{4})$/.test(str)) return 'hexa';   // #RGBA
  if (/^#([0-9a-fA-F]{8})$/.test(str)) return 'hexa';   // #RRGGBBAA

  // rgb / rgba
  if (/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(\s*,\s*(0|1|0?\.\d+))?\s*\)$/.test(str))
    return str.startsWith('rgba') ? 'rgba' : 'rgb';

  // // hsl / hsla
  if (/^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*(0|1|0?\.\d+))?\s*\)$/.test(str))
    throw new Error("HSL/HSLA not supported yet.") // str.startsWith('hsla') ? 'hsla' : 'hsl';

  return undefined;
}

export function addTransparencyToColor(color, alpha) {
  alpha = Math.max(0, Math.min(1, alpha)); // clamp 0–1
  let hex; let a;

  switch (getCSSColorFormat(color)) {
    case "hex": 
      hex = color.slice(1);

      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }

      a = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, '0');

      return `#${hex}${a}`;
      break;

    case "hexa":
      hex = color.slice(1);

      if (hex.length === 4) {
        hex = hex.split('').map(c => c + c).join('');
      }

      a = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, '0');

      return `#${hex.slice(0, 6)}${a}`;
      break;

    case "rgb":
    case "rgba":
      const nums = color.match(/\d+(\.\d+)?/g).map(Number);
      const [r, g, b] = nums;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      break;

    default:
      throw new Error(`Unhandled color format for color: {${color}`);
      break;
  }
}

export function getCssVariable(varName) {
  const body = document.body;
  const styles = getComputedStyle(body);

  const value = styles.getPropertyValue(varName).trim();
  return value
}

export function navigateToPane(paneStr) {
  let el = document.querySelector(`.${paneStr}-pane`);
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}
