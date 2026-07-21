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

// heroSlider 
// branding slider 
//this change for use dynamic banners if flutter sends
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
      el: ".swiper-pagination",
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




let expanded = false;
function toggleWidgets() {

  const container = document.getElementById("widgetsContainer");
  const button = document.getElementById("toggle-button");

  expanded = !expanded;

  if (expanded) {

    container.classList.remove("max-h-[18rem]");

    button.innerHTML = `
            ▲ <br>
            <span class="text-sm text-black">Show Less</span>
        `;

  } else {

    container.classList.add("max-h-[18rem]");

    button.innerHTML = `
            ▼ <br>
            <span class="text-sm text-black">Show More</span>
        `;
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