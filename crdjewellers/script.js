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

/* 
Swiper Init
*/
function initializeBrandingSwiper() {

  // Destroy previous instance if it exists
  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  // Initialize Swiper
  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Initial load (static banners)
initializeBrandingSwiper();

// Called by widgets-core.js after Flutter replaces the banners
window.onBannerImagesLoaded = function () {
  // Hide mobile images
  document.querySelectorAll(".brandingSwiper img.block.md\\:hidden").forEach(img => {
    img.style.display = "none";
  });

  // Show desktop images
  document.querySelectorAll(".brandingSwiper img.hidden.md\\:block").forEach(img => {
    img.style.display = "block";
  });
  initializeBrandingSwiper();
};

AOS.init({
  duration: 600,
  once: false
});



let expanded = false;

function toggleWidgets() {

  const container = document.getElementById("widgetsContainer");
  const button = document.getElementById("toggle-button");

  if (!expanded) {

    container.classList.remove("max-h-[18rem]");

    button.innerHTML = "▲";

    expanded = true;

  } else {

    container.classList.add("max-h-[18rem]");

    button.innerHTML = "▼";

    expanded = false;

  }

}

function checkToggleButton() {
  const container = document.getElementById("widgetsContainer");
  const button = document.getElementById("toggle-button");

  if (!container || !button) return;

  // Mobile only (less than 768px)
  if (window.innerWidth < 768) {

    requestAnimationFrame(() => {

      if (container.scrollHeight > container.clientHeight) {
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }

    });

  } else {
    // Always hide on tablet & desktop
    button.classList.add("hidden");
  }
}
window.addEventListener("load", () => {
  setTimeout(checkToggleButton, 300);
});

window.addEventListener("resize", checkToggleButton);
