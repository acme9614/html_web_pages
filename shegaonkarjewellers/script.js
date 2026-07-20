// drawer 
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

function openDrawer() {
    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "invisible");
    overlay.classList.add("opacity-100", "visible");
}

function closeDrawer() {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "invisible");
    overlay.classList.remove("opacity-100", "visible");
}

menuBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);


// banners script
function initializeBrandingSwiper() {

    if (window.brandingSwiperInstance) {
        window.brandingSwiperInstance.destroy(true, true);
    }

    window.brandingSwiperInstance = new Swiper(".brandingSwiper", {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

// Initial Static Banner
initializeBrandingSwiper();

// Called after Flutter replaces the banners
window.onBannerImagesLoaded = function () {

    const bannerSection = document.getElementById("bannerSection");

    // Change margin-top when dynamic banners are loaded
    bannerSection.classList.remove("mt-[98px]");
    bannerSection.classList.add("mt-[300px]");

    // Force Flutter banners to behave like desktop banners
    document
        .querySelectorAll(".brandingSwiper .swiper-slide img")
        .forEach((img) => {

            img.classList.remove(
                "hidden",
                "block",
                "md:block",
                "md:hidden"
            );

            img.classList.add(
                "block",
                "w-full",
                "object-cover"
            );
        });

    initializeBrandingSwiper();
};