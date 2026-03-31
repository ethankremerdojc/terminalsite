import { DRIVE } from "./drive.js";

export var CWD = "";

//TODO
//Create a 'getAbsPath' func that factors in .. and such

export function getPathContents(path=CWD) {

  if (path.startsWith("..")) {
    path = getPrevDirPath(path);
  }

  let pathItems = path.split("/").slice(1); // get rid of first slash

  if (pathItems.length === 1 && pathItems[0] === '') {
    return DRIVE['children']
  }

  let currentItem = DRIVE;
  let currentPath = [];

  for (let i=0; i<pathItems.length; i++) {
    var pathItem = pathItems[i];

    if (i === pathItems.length - 1 && currentItem['children'].length == 0 && curentItem['type'] == "directory") {
      return []
    }

    let found = false;

    for (var item of currentItem['children']) {
      if (item['name'] === pathItem) {
        currentItem = item;
        currentPath.push(item);
        found = true;
      }
    }

    if (!found) {
      return false
    }
  }

  return currentItem
}

function isValidPath(path) {

  if (path.startsWith("..")) {
    path = getPrevDirPath(path);
  }

  let contents = getPathContents(path);

  if (contents === false) {
    return false
  }

  return true
}

export function getPrevDirPath(path, cwd=CWD) {

  console.log("getting previous path for ", path);

  let prevCwd = null;
  if (path.startsWith("..")) {

    prevCwd = cwd.substring(0, cwd.lastIndexOf("/"));
  }

  if (path === ".." || path === "../") {
    return prevCwd;
  }

  if (path.startsWith("../")) {
    let subPath = path.replace("../", "");
    return getPrevDirPath(subPath, prevCwd) 
  }

  const chopped = path.substring(0, path.lastIndexOf("/"));

  if (!chopped.startsWith("/")) {
    return CWD + "/" + chopped
  } else {
    return chopped
  }
}

export function changeDir(newDir) {

  if (newDir.startsWith("..")) {
    newDir = getPrevDirPath(newDir);
  }

  let newPath;
  if (newDir.startsWith("/")) {
    newPath = newDir;
  } else if (newDir.startsWith("..")) {

  } else {
    newPath = CWD + "/" + newDir
  }

  if (isValidPath(newPath)) {
    CWD = newPath;
    return true
  } else {
    return false
  }
}

export function readableContents(currentDirContents) {
  let result = [];

  for (var item of currentDirContents) {
    if (item['type'] === "directory") {
      result.push(item["name"] + "/");
    } else {
      result.push(item["name"]);
    }
  }

  return result
}
