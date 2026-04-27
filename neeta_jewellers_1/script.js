//  DRAWER 
function openDrawer() {
  document.getElementById("drawer").classList.remove("-translate-x-full");
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("menuButton").classList.add("hidden");
}

function closeDrawer() {
  document.getElementById("drawer").classList.add("-translate-x-full");
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("menuButton").classList.remove("hidden");
}


//  BRAND SWIPER 
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


//  TOGGLE (DYNAMIC WIDGETS) 
let isExpanded = false;

function toggleCards() {
  const allItems = document.querySelectorAll("#widgetsContainer > div");
  const buttonText = document.querySelector("#toggleButton span");

  isExpanded = !isExpanded;

  allItems.forEach((el) => {
    const index = Number(el.getAttribute("data-index"));

    if (index >= 4) {
      el.style.display = isExpanded ? "flex" : "none";
    }
  });

  buttonText.textContent = isExpanded ? "Show Less" : "Show More";
}

//  COLLECTION SWIPER 
new Swiper(".branding-image-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
    slideShadows: false,
  },
});



function updateToggleButton() {
  const widgets = document.querySelectorAll("#widgetsContainer > div");
  const toggleBtn = document.getElementById("toggleButton");

  if (!toggleBtn) return;

  toggleBtn.style.display = widgets.length > 4 ? "block" : "none";
}

//  WATCH FOR DYNAMIC RENDER
const container = document.getElementById("widgetsContainer");

if (container) {
  const observer = new MutationObserver(() => {
    updateToggleButton();
  });

  observer.observe(container, {
    childList: true,
  });
}

//  OPTIONAL: AUTO TOGGLE BUTTON CONTROL 
// (widgets-core.js can also handle this, but keeping fallback here)

window.addEventListener("load", () => {
  const widgets = document.querySelectorAll("#widgetsContainer > div");
  const toggleBtn = document.getElementById("toggleButton");

  if (!toggleBtn) return;

  toggleBtn.style.display = widgets.length > 4 ? "block" : "none";
});