function openDrawer() {
    const drawer = document.getElementById("drawer");
    drawer.classList.remove("-translate-x-full");
    drawer.classList.add("translate-x-0");

    document.getElementById("overlay").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeDrawer() {
    const drawer = document.getElementById("drawer");
    drawer.classList.add("-translate-x-full");
    drawer.classList.remove("translate-x-0");

    document.getElementById("overlay").classList.add("hidden");
    document.body.style.overflow = "auto";
}

function openImage(src) {
    document.getElementById("modalImage").src = src;
    document.getElementById("imageModal").classList.remove("hidden");
    document.getElementById("imageModal").classList.add("flex");
}

function closeImage() {
    document.getElementById("imageModal").classList.add("hidden");
    document.getElementById("imageModal").classList.remove("flex");
}

// Dynamic navbar background by section
const sections = document.querySelectorAll("section, footer");
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    sections.forEach((section) => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            navbar.style.background = section.dataset.navbg;
        }
    });
});



// service js
let servicesExpanded = false;

function handleServices() {
    const services = document.querySelectorAll(".extra-service");
    const moreBtn = document.getElementById("moreBtn");

    if (window.innerWidth < 768) {
        services.forEach(service => {
            service.classList.toggle("hidden", !servicesExpanded);
        });

        if (moreBtn) moreBtn.style.display = "flex";
    } else {
        services.forEach(service => {
            service.classList.remove("hidden");
        });

        if (moreBtn) moreBtn.style.display = "none";
    }
}

function toggleServices() {
    servicesExpanded = !servicesExpanded;

    document.getElementById("moreText").innerText =
        servicesExpanded ? "Show Less" : "Show More";

    document.getElementById("moreArrow").classList.toggle(
        "rotate-180",
        servicesExpanded
    );

    handleServices();
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(handleServices, 200);
});

window.addEventListener("resize", handleServices);