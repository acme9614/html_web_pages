const menuToggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("close-drawer");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  drawer.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
});

closeDrawer.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  drawer.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

// brandingSwiper 
function initializeSwiper() {

  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
    effect: "coverflow",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
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

// Default initialization
initializeSwiper();

// Called by widgets-core.js after Flutter banners arrive
window.onBannerImagesLoaded = function () {
    initializeSwiper();
};


AOS.init({
  duration: 600,
  once: false
});

// backToTopBtn 
const backToTopBtn = document.getElementById("backToTopBtn");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

// Scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});