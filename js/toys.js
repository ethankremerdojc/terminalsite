function hideAllToys() {
  for (var toy of document.querySelectorAll(".toy-div")) {
    toy.style.display = "none";
  }
}

function deactivateCurrentActiveNavItem() {
  let toysNav = document.getElementById("toys-header-items");
  let currentActive = toysNav.querySelector('li.active');
  currentActive.classList.remove("active");
}

function activateNavItem(name) {
  let navItem = document.getElementById(`nav-item-${name}`);
  navItem.classList.add("active");
}

function showToy(name) {
  document.getElementById(`toys-container-${name}`).style.display = "block";
  activateNavItem(name);
}

function loadToysNav() {
  let toysNav = document.getElementById("toys-header-items");
  let toysNavItems = toysNav.querySelectorAll('li');

  const setActive = (e) => {
    let newToyName = e.target.innerHTML.replace("[", "").replace("]", "").replaceAll(" ", "").toLowerCase();
    hideAllToys();
    deactivateCurrentActiveNavItem()
    showToy(newToyName);
  }

  for (var li of toysNavItems) {
    li.onclick = setActive;
  }
}
