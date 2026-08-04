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

/*
 * Dynamic banners
 * Flutter banner rendering remains handled by the common widgets-core.js file.
 */
function initializeBrandingSwiper() {
    const brandingSwiperElement = document.querySelector(".brandingSwiper");

    if (!brandingSwiperElement || typeof Swiper === "undefined") {
        return;
    }

    // Destroy the previous Swiper instance before reinitializing.
    if (window.brandingSwiperInstance) {
        window.brandingSwiperInstance.destroy(true, true);
    }

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

// Initial load for static banners.
initializeBrandingSwiper();

// Called by widgets-core.js after Flutter replaces the banner images.
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
    const container = document.getElementById("boxContainer");
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

