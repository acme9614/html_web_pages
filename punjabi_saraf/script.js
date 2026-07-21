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


const swiper = new Swiper(".brandSwiper", {
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


// services 
function toggleBoxes() {
  const extraTabs = document.getElementById("extraTabs");
  const arrow = document.getElementById("arrow");
  const isHidden = extraTabs.classList.contains("hidden");
  extraTabs.classList.toggle("hidden");
  arrow.classList.toggle("rotate-180");
}

// about store 

const imageFlip = document.getElementById('imageFlip');
const textFlip = document.getElementById('textFlip');
let flipped = false;

setInterval(() => {
  flipped = !flipped;
  imageFlip.classList.toggle('flipped', flipped);
  textFlip.classList.toggle('flipped', flipped);
}, 3000);



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


AOS.init({
  duration: 1000,
  once: false,
});