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
    container.classList.remove("max-h-[7.2rem]");
    arrow.classList.add("rotate-180");
    expanded = true;
  } else {
    container.classList.add("max-h-[7.2rem]");
    arrow.classList.remove("rotate-180");
    expanded = false;
  }
}

// branding-image slider 

new Swiper(".branding-image-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  spaceBetween: 10,
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


