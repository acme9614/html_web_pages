const home = document.getElementById('home');
const menuButton = document.getElementById('menuButton');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawerButton = document.getElementById('closeDrawer');

setTimeout(() => {
    home.classList.add('open');
    home.removeAttribute('aria-hidden');
}, 2000);

function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.remove('hidden');
    drawer.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', openDrawer);
closeDrawerButton.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
});


// branding slider 
//this change for use dynamic banners if flutter sends
function initializeBrandingSwiper() {

    // Destroy previous instance if it exists
    if (window.brandingSwiperInstance) {
        window.brandingSwiperInstance.destroy(true, true);
    }

    // Initialize Swiper
    window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },
        pagination: {
            el: '.bannerSwiper .swiper-pagination',
            clickable: true
        }
    });
}

// Initial load (static banners)
initializeBrandingSwiper();

// Called by widgets-core.js after Flutter replaces the banners
window.onBannerImagesLoaded = function () {
    initializeBrandingSwiper();
};

