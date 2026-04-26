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

AOS.init({
  duration: 600,
  once: false
});


// brandingSwiper 
const swiper = new Swiper(".brandingSwiper", {
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
  // on: {
  //   autoplayTimeLeft(s, time, progress) {
  //     const circle = document.querySelector(".autoplay-progress svg");
  //     const content = document.querySelector(".autoplay-progress span");
  //     circle.style.setProperty("--progress", 1 - progress);
  //     content.textContent = `${Math.ceil(time / 1000)}s`;
  //   },
  // },
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
    container.classList.remove("max-h-[15.5rem]");
    arrow.classList.add("rotate-180");
    expanded = true;
  } else {
    container.classList.add("max-h-[15.5rem]");
    arrow.classList.remove("rotate-180");
    expanded = false;
  }
}

