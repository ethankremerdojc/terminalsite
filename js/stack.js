const STACK_INFO = {
  "python": {
    title: "Python",
    details: [
      "python stuff",
      "for sure"
    ]
  },
  "js": {
    title: "JavaScript",
    details: [
      "js stuff",
      "for sure"
    ]
  },
  "html": {
    title: "HTML",
    details: [
      "html stuff",
      "for sure"
    ]
  },
  "css": {
    title: "CSS",
    details: [
      "css stuff",
      "for sure"
    ]
  },
  "bash": {
    title: "Scripting",
    details: [
      "bash, ps1, etc. stuff",
      "for sure"
    ]
  }
}

function getDetailsHtml(details) {
  let result = '';
  for (var detail of details) {
    result = result + `${detail}\n`;
  }
  return result
}

async function updateStackInfo(itemType) {

  let stackItemName = document.getElementById("stack-item-name");
  let stackDetails = document.getElementById("stack-item-info");

  //TODO use the typing animation to do this!

  let stackInfo = STACK_INFO[itemType];

  await typeOutTextContent(stackItemName, stackInfo.title, [20, 100]);
  await typeOutTextContent(stackDetails, stackInfo.details.join(" "), [4, 40]);

  // stackItemName.innerHTML = stackInfo.title;
  // stackDetails.innerHTML = getDetailsHtml(stackInfo.details);
}

function getItemType(imgSrc) {
  let imgParts = imgSrc.split("/");
  let imgName = imgParts[imgParts.length - 1];
  if (imgName.includes(".")) {
    let nameParts = imgName.split(".");
    return nameParts[0]
  }
  return imgName
}

function loadStackNav() {
  let stackNav = document.getElementById("stack-nav-items");
  let stackNavItems = stackNav.querySelectorAll('img');

  updateStackInfo('python');

  const setActive = (e) => {
    let currentActive = stackNav.querySelector('img.active');
    currentActive.classList.remove("active");
    e.target.classList.add("active");
  
    let itemType = getItemType(e.target.src);
    updateStackInfo(itemType);
  }

  for (var img of stackNavItems) {
    img.onclick = setActive;
  }
}

