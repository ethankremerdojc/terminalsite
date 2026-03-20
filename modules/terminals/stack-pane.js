import { typeOutTextContent } from "./generation.js";

const STACK_INFO = {
  "python": {
    title: "Python",
    details: [
      "Experience: 6 years",
      "My favorite programming language! I've made endless automation scripts, games, webservers, tui's and more. ", 
      "I love it's readability, and how easy it is to get up and running with it.", 
      "If I was ever stranted on a desert island, I would want Python on the island with me. "
    ]
  },
  "js": {
    title: "JavaScript",
    details: [
      "Experinence: 6 years",
      "Ahh, one of the most intuitive and perfect programming languages, why else would it be in every single browser? ",
      "Joking aside, I have coded many websites with javascript. I've made carousells and reactive tables, and coded simple forms and complex business workflows.",
      "I am very comfortable working with javascript, and have wide experience in many areas."
    ]
  },
  "html": {
    title: "HTML",
    details: [
      "Experience: 7+ years",
      "HTML! The perfect language. So simple, so concise, so un-compromising.",
      "I'm not sure I need to say anything here... but yes, I do know my way around html...",
      "...",
      "...HTML is the best!"
    ]
  },
  "css": {
    title: "CSS",
    details: [
      "Experience: 7+ years",
      "I am quite expierenced with all areas of frontend styling, and am currently in a mode of trying to use CSS for all kinds of things" +
      "that people don't think it should be used for. Animations, togglable menus, and form validation stuffs.", 
      "I think it's quite fun, and only mildy annoying."
    ]
  },
  "bash": {
    title: "Scripting",
    details: [
      "Experience: 6 years",
      "I have made many a script. For anything a computer might do. I have plenty of automation scripts running now that automate much of my workflow day to day.",
      "I am fluent in bash, and comfortable with both Powershell and *cough* batch.",
    ]
  },
  "docker": {
    title: "Docker",
    details: [
      "Experience: 3 years",
      "One of my favorite tools. I use containers a lot in my day job, managing different dev servers and QOL applications.", 
      "I also love to find tools that run in docker so that my servers can get the most out of their cpus."
    ]
  },
  "react": {
    title: "React",
    details: [
      "Experience: 4 years",
      "I have been using React to build out all the pages on my current companies site. I am confident in both the older class " +
      "based components as well as function based. I have experience using redux to manage the applications data as well."
    ]
  },
  "linux": {
    title: "Linux",
    details: [
      "Experience: 5 years",
      "I use Arch btw.",
      "However, I do have extended experience in Ubuntu + Ubuntu server, linux in docker, and linux mint.",
      "Still use Windows for gaming, but that's about it. Linux FTW"
    ]
  },
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

  let stackInfo = STACK_INFO[itemType];

  await typeOutTextContent(stackItemName, stackInfo.title, [20, 100]);
  await typeOutTextContent(stackDetails, stackInfo.details.join("<br />"), [2, 10]);
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

export function getStackNavStr() {
  let stackNavStr = `<ul class="stack-nav-items" id="stack-nav-items">`;

  for (var [itemName, itemDetails] of Object.entries(STACK_INFO)) {
    let activeStr = "";
    if (itemName == "python") {
      activeStr = `class="active"`;
    }
    stackNavStr += `<li><img ${activeStr} src="icons/${itemName}.svg" /></li>`;
  }

  stackNavStr += "</ul>"
  return stackNavStr
}

export async function loadStackNav() {
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
