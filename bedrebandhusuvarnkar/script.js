/*drawer */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const openMenuIcon =
    document.getElementById("openMenuIcon");

const closeMenuIcon =
    document.getElementById("closeMenuIcon");

mobileMenuButton.addEventListener("click", function () {
    const isOpening = mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");

    openMenuIcon.classList.toggle("hidden", isOpening);
    closeMenuIcon.classList.toggle("hidden", !isOpening);

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isOpening)
    );
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

//why choose

const promiseSwiper = new Swiper(".promiseSwiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,

    // Continuous scrolling speed
    speed: 5000,

    // Disable user interactions that can stop scrolling
    allowTouchMove: false,
    simulateTouch: false,
    grabCursor: false,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        waitForTransition: true
    },

    breakpoints: {
        640: {
            spaceBetween: 28
        },
        1024: {
            spaceBetween: 36
        }
    }
});



// show more 
  document.addEventListener("DOMContentLoaded", function () {
    const widgetsContainer =
        document.getElementById("widgetsContainer");

    const toggleWrapper =
        document.getElementById("serviceToggleWrapper");

    const toggleButton =
        document.getElementById("serviceToggleButton");

    const toggleText =
        document.getElementById("serviceToggleText");

    const toggleIcon =
        document.getElementById("serviceToggleIcon");

    if (
        !widgetsContainer ||
        !toggleWrapper ||
        !toggleButton ||
        !toggleText ||
        !toggleIcon
    ) {
        return;
    }

    function updateToggleButton() {
        const isMobile = window.innerWidth < 600;
        const hasMoreThanSix = widgetsContainer.children.length > 6;
        const isExpanded =
            widgetsContainer.classList.contains("show-all-services");

        if (isMobile && hasMoreThanSix) {
            toggleWrapper.classList.remove("hidden");
            toggleWrapper.classList.add("flex");
        } else {
            toggleWrapper.classList.add("hidden");
            toggleWrapper.classList.remove("flex");
        }

        toggleText.textContent =
            isExpanded ? "Show Less" : "Show More";

        toggleIcon.classList.toggle("rotate-180", isExpanded);

        toggleButton.setAttribute(
            "aria-expanded",
            String(isExpanded)
        );
    }

    toggleButton.addEventListener("click", function () {
        const isExpanded =
            widgetsContainer.classList.toggle("show-all-services");

        updateToggleButton();

        // When Show Less is clicked, return to the section
        if (!isExpanded) {
            widgetsContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

    // Handles widgets added dynamically
    const widgetObserver = new MutationObserver(updateToggleButton);

    widgetObserver.observe(widgetsContainer, {
        childList: true
    });

    window.addEventListener("resize", updateToggleButton);

    updateToggleButton();
});