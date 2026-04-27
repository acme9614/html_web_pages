/* 
Drawer Toggle (Safe)
 */
const menuToggle = document.getElementById("menu-toggle");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("close-drawer");
const overlay = document.getElementById("overlay");

if (menuToggle && drawer && closeDrawer && overlay) {
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
}

/* 
Swiper Init
 */
const headerSwiper = new Swiper("#BrandingSwiper", {
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
speed: 1000,
effect: "creative",
creativeEffect: {
prev: {
translate: ["-100%", 0, -500],
rotate: [0, 0, -15],
scale: 0.85,
opacity: 0.7,
},
next: {
translate: ["100%", 0, -500],
rotate: [0, 0, 15],
scale: 0.85,
opacity: 0.7,
},
},
});

/* 
AOS Init
 */
AOS.init({
duration: 800,
once: false,
});

/* 
Mobile Toggle (Show More) 
*/
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const toggleIcon = document.getElementById("toggleIcon");

let expanded = false;

if (toggleBtn && toggleText && toggleIcon) {
  toggleBtn.addEventListener("click", () => {

    //  fetch elements at click time
    const extraTabs = document.querySelectorAll(".extra-tab");

    expanded = !expanded;

    extraTabs.forEach((el) => {
      if (expanded) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });

    toggleText.textContent = expanded ? "Show Less" : "Show More";
    toggleIcon.classList.toggle("rotate-180", expanded);
  });
}
/* 
Back To Top Button
 */
const btn = document.getElementById("backToTopBtn");

if (btn) {
window.addEventListener("scroll", () => {
if (window.scrollY > 200) {
btn.classList.remove("hidden");
} else {
btn.classList.add("hidden");
}
});

btn.addEventListener("click", () => {
window.scrollTo({ top: 0, behavior: "smooth" });
});
}


