function hideAllToys() {
  for (var toy of document.querySelectorAll(".toy-div")) {
    toy.style.display = "none";
  }

  console.log("hid all toys")
}

function showToy(name) {
  document.getElementById(`toys-container-${name}`).style.display = "block";
}

function loadToysNav() {
  let toysNav = document.getElementById("toys-header-items");
  let toysNavItems = toysNav.querySelectorAll('li');

  const setActive = (e) => {
    let currentActive = toysNav.querySelector('li.active');
    currentActive.classList.remove("active");
    e.target.classList.add("active");

    let newToyName = e.target.innerHTML.replace("[", "").replace("]", "").replaceAll(" ", "").toLowerCase();

    hideAllToys();
    showToy(newToyName);
  }

  for (var li of toysNavItems) {
    li.onclick = setActive;
  }
}
