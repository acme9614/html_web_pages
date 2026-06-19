 const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("overlay");
    const menuToggle = document.getElementById("menu-toggle");
    const closeDrawer = document.getElementById("close-drawer");

    menuToggle.addEventListener("click", () => {
      drawer.classList.remove("drawer-close");
      drawer.classList.add("drawer-open");
      overlay.classList.remove("hidden");
      overlay.classList.add("show");
    });

    closeDrawer.addEventListener("click", () => {
      drawer.classList.remove("drawer-open");
      drawer.classList.add("drawer-close");
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 300);
    });

    overlay.addEventListener("click", () => {
      closeDrawer.click();
    });


// services 
let expanded = false;

function toggleBoxes() {
  const allTabs = document.querySelectorAll("#widgetsContainer > div");
  const arrow = document.getElementById("arrowIcon");
  const toggleText = document.getElementById("toggleText");

  expanded = !expanded;

  allTabs.forEach((tab, index) => {
    if (index >= 6) {
      tab.style.display = expanded ? "flex" : "none";
    }
  });

  toggleText.textContent = expanded ? "Show Less" : "Show More";
  arrow.classList.toggle("rotate-180");
}

function handleTabs() {
  const allTabs = document.querySelectorAll("#widgetsContainer > div");
  const toggleWrapper = document.querySelector(".sm\\:hidden");

  if (window.innerWidth < 640) {
    //  Mobile
    allTabs.forEach((tab, index) => {
      tab.style.display = index < 6 ? "flex" : "none";
    });

    // show button only if more than 6
    toggleWrapper.style.display = allTabs.length > 6 ? "block" : "none";

    expanded = false; // reset state
  } else {
    //  Desktop
    allTabs.forEach(tab => tab.style.display = "flex");
    toggleWrapper.style.display = "none";
  }
}

//  Run after widgets loaded
window.addEventListener("load", () => {
  setTimeout(handleTabs, 500);
});

//  Handle resize
window.addEventListener("resize", handleTabs);