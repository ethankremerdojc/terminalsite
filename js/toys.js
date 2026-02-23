function loadToysNav() {
  let toysNav = document.getElementById("toys-header-items");
  let toysNavItems = toysNav.querySelectorAll('li');

  const setActive = (e) => {
    let currentActive = toysNav.querySelector('li.active');
    currentActive.classList.remove("active");
    e.target.classList.add("active");
  }

  for (var li of toysNavItems) {
    li.onclick = setActive;
  }
}

