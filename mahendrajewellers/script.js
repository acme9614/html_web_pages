/*drawer */
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuBackdrop = document.getElementById("menuBackdrop");
const closeDrawerButton = document.getElementById("closeDrawerButton");
const openMenuIcon = document.getElementById("openMenuIcon");
const closeMenuIcon = document.getElementById("closeMenuIcon");

function setDrawerOpen(open) {
    mobileMenu.classList.toggle("-translate-x-full", !open);
    mobileMenu.classList.toggle("invisible", !open);

    menuBackdrop.classList.toggle("invisible", !open);
    menuBackdrop.classList.toggle("pointer-events-none", !open);
    menuBackdrop.classList.toggle("opacity-0", !open);

    openMenuIcon.classList.toggle("hidden", open);
    closeMenuIcon.classList.toggle("hidden", !open);

    mobileMenuButton.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("overflow-hidden", open);
}

mobileMenuButton.addEventListener("click", function () {
    setDrawerOpen(mobileMenuButton.getAttribute("aria-expanded") !== "true");
});

closeDrawerButton.addEventListener("click", function () {
    setDrawerOpen(false);
});

menuBackdrop.addEventListener("click", function () {
    setDrawerOpen(false);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setDrawerOpen(false);
});

// Branding Swiper
function initializeBrandingSwiper() {
    if (window.brandingSwiperInstance) {
        window.brandingSwiperInstance.destroy(true, true);
    }

    window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
        loop: true,

        speed: 900,

        effect: "fade",

        fadeEffect: {
            crossFade: true
        },

        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        keyboard: {
            enabled: true
        }
    });
}

initializeBrandingSwiper();

window.onBannerImagesLoaded = function () {
    initializeBrandingSwiper();
};



// Show More / Show Less for mobile service widgets
document.addEventListener("DOMContentLoaded", function () {
    const widgetsContainer = document.getElementById("widgetsContainer");
    const wrapper = document.getElementById("serviceToggleWrapper");
    const button = document.getElementById("serviceToggleButton");
    const text = document.getElementById("serviceToggleText");
    const icon = document.getElementById("serviceToggleIcon");

    if (!widgetsContainer || !wrapper || !button || !text || !icon) return;

    function updateServices() {
        const showButton =
            window.innerWidth < 640 &&
            widgetsContainer.children.length > 6;

        wrapper.classList.toggle("hidden", !showButton);
        wrapper.classList.toggle("flex", showButton);

        const expanded =
            widgetsContainer.classList.contains("show-all-services");

        text.textContent = expanded ? "Show Less" : "Show More";
        icon.classList.toggle("rotate-180", expanded);
        button.setAttribute("aria-expanded", String(expanded));
    }

    button.addEventListener("click", function () {
        const expanded =
            widgetsContainer.classList.toggle("show-all-services");

        updateServices();

        if (!expanded) {
            widgetsContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

    new MutationObserver(updateServices).observe(widgetsContainer, {
        childList: true
    });

    window.addEventListener("resize", updateServices);
    updateServices();
});