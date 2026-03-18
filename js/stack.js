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

  let stackInfo = STACK_INFO[itemType];

  await typeOutTextContent(stackItemName, stackInfo.title, [20, 100]);
  await typeOutTextContent(stackDetails, stackInfo.details.join("<br />"), [2, 10]);

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



async function loadStackNav() {
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

