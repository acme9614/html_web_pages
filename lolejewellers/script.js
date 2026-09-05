const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('closeBtn');

function openDrawer() {
    if (!drawer) return;

    drawer.classList.remove('-translate-x-full');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    if (!drawer) return;

    drawer.classList.add('-translate-x-full');
    document.body.style.overflow = 'auto';
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
}

// Branding Swiper
function initializeBrandingSwiper() {
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

initializeBrandingSwiper();

window.onBannerImagesLoaded = function () {
    initializeBrandingSwiper();
};

// Animation
// AOS.init({
//     duration: 1000,
//     once: false,
//     easing: 'ease-in-out'
// });

// Toggle button
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleBtn");

    if (!toggleBtn) return;

    let expanded = false;

    toggleBtn.addEventListener("click", function () {
        const extraTabs = document.querySelectorAll(".extra-tab");

        extraTabs.forEach(tab => {
            if (expanded) {
                tab.classList.add("hidden");
            } else {
                tab.classList.remove("hidden");
            }
        });

        expanded = !expanded;
        toggleBtn.textContent = expanded ? "Show Less" : "Show More";
    });
});
