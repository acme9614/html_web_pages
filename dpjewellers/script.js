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

setTimeout(() => {
  const widgets = document.querySelectorAll("#widgetsContainer > div");

  // 👉 CONDITION: hide button if widgets <= 6
  if (widgets.length <= 6) {
    showMoreBtn.style.display = "none";
    return;
  }

  // 👉 show only first 6 initially
  widgets.forEach((el, index) => {
    if (index > 5) {
      el.style.display = "none";
    }
  });

  // 👉 toggle logic
  showMoreBtn.addEventListener("click", () => {
    expanded = !expanded;

    widgets.forEach((el, index) => {
      if (index > 5) {
        el.style.display = expanded ? "flex" : "none";
      }
    });

    showMoreBtn.children[0].textContent = expanded ? "▲" : "▼";
    showMoreBtn.children[1].textContent = expanded
      ? "Show Less"
      : "Show More";
  });

}, 500);