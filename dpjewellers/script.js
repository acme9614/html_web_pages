const toggleBtn = document.getElementById("menu-toggle");
const drawer = document.getElementById("drawer");
const closeBtn = document.getElementById("close-drawer");
const overlay = document.getElementById("overlay");

toggleBtn.addEventListener("click", () => {
  drawer.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});



// brandSwiper
const brandSwiper = new Swiper(".brandSwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// desktopTabs javscript start

// Initialize AOS
AOS.init({
  duration: 800,
  once: false,
});

const showMoreBtn = document.getElementById("showMoreBtn");
let expanded = false;

function handleTabs() {
  const widgets = document.querySelectorAll("#widgetsContainer > div");
  const isMobile = window.innerWidth < 768;

  //  Desktop: show all, hide button
  if (!isMobile) {
    widgets.forEach(el => el.style.display = "flex");
    showMoreBtn.style.display = "none";
    return;
  }

  //  Mobile
  if (widgets.length <= 6) {
    showMoreBtn.style.display = "none";
    return;
  }

  showMoreBtn.style.display = "flex";

  //  Initial state (IMPORTANT FIX)
  widgets.forEach((el, index) => {
    el.style.display = index < 6 ? "flex" : "none";
  });

  //  Toggle click
  showMoreBtn.onclick = () => {
    expanded = !expanded;

    widgets.forEach((el, index) => {
      if (index >= 6) {
        el.style.display = expanded ? "flex" : "none";
      }
    });

    showMoreBtn.children[0].textContent = expanded ? "▲" : "▼";
    showMoreBtn.children[1].textContent = expanded
      ? "Show Less"
      : "Show More";
  };
}

//  Run after widgets render
setTimeout(handleTabs, 500);

//  Also handle resize (VERY IMPORTANT)
window.addEventListener("resize", handleTabs);