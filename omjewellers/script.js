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


// branding slider 
//this change for use dynamic banners if flutter sends
function initializeBrandingSwiper() {

  // Destroy previous instance
  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  // Initialize Swiper
  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
    loop: true,
    autoplay: {
      delay: 4000,
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
  initializeBrandingSwiper();
};

//popup view collection
function openModal(imageSrc) {
  document.getElementById("imageModal").classList.remove("hidden");
  document.getElementById("imageModal").classList.add("flex");
  document.getElementById("modalImage").src = imageSrc;
}

function closeModal() {
  document.getElementById("imageModal").classList.add("hidden");
  document.getElementById("imageModal").classList.remove("flex");
}



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