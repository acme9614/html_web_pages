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


//this change for use dynamic banners if flutter sends
function initializeBrandingSwiper() {

  // Destroy existing swiper if already initialized
  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  // Initialize swiper for this page
  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: "#customNext",
      prevEl: "#customPrev",
    },
  });
}

// Initial load (static banners)
initializeBrandingSwiper();

// Called automatically by widgets-core.js after Flutter replaces banners
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
  const container = document.getElementById("widgetsContainer");
  const arrow = document.getElementById("arrowIcon");

  if (!expanded) {
    container.classList.remove("max-h-[13.9rem]");
    arrow.classList.add("rotate-180");
    expanded = true;
  } else {
    container.classList.add("max-h-[13.9rem]");
    arrow.classList.remove("rotate-180");
    expanded = false;
  }
}



// back to top
const btn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
});

// Scroll to top smoothly
btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


