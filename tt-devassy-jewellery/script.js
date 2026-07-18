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


// BrandingSlider 
    function initializeBrandingSwiper() {

  // Destroy previous instance
  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  // Create new Swiper
  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
        loop: true,
      grabCursor: true,
      speed : 1500,
      cubeEffect: {
        shadow: false,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
  });

  // Custom navigation buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) {
    prevBtn.onclick = () => window.brandingSwiperInstance.slidePrev();
  }

  if (nextBtn) {
    nextBtn.onclick = () => window.brandingSwiperInstance.slideNext();
  }
}

// Initial load
initializeBrandingSwiper();

// Called after Flutter dynamically replaces banners
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
      container.classList.remove("max-h-[15.5rem]");
      arrow.classList.add("rotate-180");
      expanded = true;
    } else {
      container.classList.add("max-h-[15.5rem]");
      arrow.classList.remove("rotate-180");
      expanded = false;
    }
  }
