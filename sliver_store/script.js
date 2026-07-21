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

// branding slider 
function initializeBrandingSwiper() {

  // Destroy previous instance
  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  // Initialize Swiper
  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        const circle = document.querySelector(".autoplay-progress svg");
        const content = document.querySelector(".autoplay-progress span");
        circle.style.setProperty("--progress", 1 - progress);
        content.textContent = `${Math.ceil(time / 1000)}s`;
      },
    },
  });
}

// Initial load (static banners)
initializeBrandingSwiper();

// Called by widgets-core.js after Flutter replaces the banners
window.onBannerImagesLoaded = function () {
  initializeBrandingSwiper();
};

// services 

AOS.init({
  duration: 800,
  once: false,
  disable: false, // 👈 Add this line
});


let expanded = false;

function toggleBoxes() {

    // Do nothing on tablet/desktop
    if (window.innerWidth >= 768) return;

    const container = document.getElementById("widgetsContainer");
    const arrow = document.getElementById("arrowIcon");

    expanded = !expanded;

    if (expanded) {
        container.classList.remove("max-h-[7rem]");
        arrow.classList.add("rotate-180");
    } else {
        container.classList.add("max-h-[7rem]");
        arrow.classList.remove("rotate-180");
    }
}

function checkShowMoreButton() {

    const button = document.getElementById("showMoreContainer");
    const widgets = document.querySelectorAll("#widgetsContainer > div");

    if (window.innerWidth >= 768) {
        button.classList.add("hidden");
        return;
    }

    if (widgets.length > 6) {
        button.classList.remove("hidden");
    } else {
        button.classList.add("hidden");
    }
}

window.addEventListener("load", () => {
    setTimeout(checkShowMoreButton, 500);
});

window.addEventListener("resize", checkShowMoreButton);