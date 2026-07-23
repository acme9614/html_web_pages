const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const drawer = document.getElementById('drawer');

menuBtn.addEventListener('click', () => {
  // Add Notification before Settings
  // addNotificationMenu();

  drawer.classList.remove('translate-x-full');
  document.body.style.overflow = "hidden"; //  FIX
});

closeBtn.addEventListener('click', () => {
  drawer.classList.add('translate-x-full');
  document.body.style.overflow = "auto"; //  FIX
});

//this change for use dynamic banners if flutter sends
function initializeBrandingSwiper() {

  // Destroy previous instance
  if (window.brandingSwiperInstance) {
    window.brandingSwiperInstance.destroy(true, true);
  }

  // Initialize Swiper
  window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
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
  });
}

// Initial load (static banners)
initializeBrandingSwiper();

// Called by widgets-core.js after Flutter replaces the banners
window.onBannerImagesLoaded = function () {
  initializeBrandingSwiper();
};

// animation 
AOS.init({
  duration: 1000,
  once: false,

  easing: 'ease-in-out'
});


function addNotificationMenu() {
  const drawer = document.getElementById("drawerContainer");
  if (!drawer) return;

  // Prevent duplicate insertion
  if (drawer.querySelector("#notificationMenu")) return;

  const settings = [...drawer.querySelectorAll("a")]
    .find(a => a.textContent.trim() === "Settings");

  if (!settings) return;

  settings.insertAdjacentHTML(
    "beforebegin",
    `
        <a id="notificationMenu"
           href="#"
           onclick="navigateToNotification()"
           class="${settings.className}">
            Notification
        </a>
        `
  );
}