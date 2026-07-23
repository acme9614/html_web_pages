// Navbar Scroll
const navbar = document.getElementById("navbar");
const glassNavbar = document.getElementById("glassNavbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        glassNavbar.classList.add(
            "glass-scroll",
            "scale-[0.98]"
        );

    } else {

        glassNavbar.classList.remove(
            "glass-scroll",
            "scale-[0.98]"
        );

    }

});

// Progress Bar
window.onscroll = function () {

    let winScroll =
        document.body.scrollTop ||
        document.documentElement.scrollTop;

    let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    let scrolled =
        (winScroll / height) * 100;

    document.getElementById("progressBar").style.width =
        scrolled + "%";
};


// MOBILE DRAWER


const menuBtn = document.getElementById("menuBtn");
const closeDrawer = document.getElementById("closeDrawer");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerLinks = document.querySelectorAll(".drawer-link");


// Open Drawer
menuBtn.addEventListener("click", () => {
    // Add Notification before Settings
    // addNotificationMenu();

    mobileDrawer.classList.remove("left-[-100%]");
    mobileDrawer.classList.add("left-0");

    drawerOverlay.classList.remove("hidden");

    // Stop Homepage Scroll
    document.body.classList.add("overflow-hidden");

    setTimeout(() => {

        drawerOverlay.classList.remove("opacity-0");

    }, 10);

});

// Close Drawer Function
function closeMobileDrawer() {

    mobileDrawer.classList.remove("left-0");
    mobileDrawer.classList.add("left-[-100%]");

    drawerOverlay.classList.add("opacity-0");

    // Enable Homepage Scroll
    document.body.classList.remove("overflow-hidden");

    setTimeout(() => {

        drawerOverlay.classList.add("hidden");

    }, 300);

}

// Close Button
closeDrawer.addEventListener("click", closeMobileDrawer);

// Overlay Close
drawerOverlay.addEventListener("click", closeMobileDrawer);

// Close Drawer After Click Menu
drawerLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileDrawer();

    });

});




function toggleTabs() {
    const extraTabs = document.querySelectorAll('[data-extra]');
    const text = document.getElementById('toggleText');
    const icon = document.getElementById('toggleIcon');

    let isHidden = [...extraTabs].some(tab => tab.classList.contains('hidden'));
    extraTabs.forEach(tab => {
        tab.classList.toggle('hidden', !isHidden);
    });

    text.innerText = isHidden ? 'Show Less' : 'Show More';
    icon.classList.toggle('rotate-180', isHidden);
}


// DRAWER RENDERER (widgets-core.js)
window.renderDrawerItem = function (widget) {
    return `
        <a href="#"
           onclick="${widget.action}(); closeMobileDrawer();"
           class="drawer-link w-full text-white block hover:text-yellow-400 transition">
           ${widget.name}
        </a>
    `;
};

// WIDGET RENDERER (widgets-core.js)
window.renderWidget = function (widget, index) {
    const isVirtualTryOn = Number(widget.id) === 23;

    return `
        <div onclick="${widget.action}()"
             class="relative flex flex-col items-center cursor-pointer pb-4
             ${index > 5 ? "extra-tab" : ""}"
             data-aos="fade-up">

            <img src="assets/shape.png"
                 class="w-[140px] md:w-[160px] object-contain"
                 alt="${widget.name}">

            <div class="absolute top-7 flex flex-col items-center">

                <img class="w-8 h-8 md:w-10 md:h-10 my-3
                    ${isVirtualTryOn ? "" : "invert"}"
                    src="${widget.icon}"
                    alt="${widget.name}" />

                <p class="text-white text-xs font-semibold text-center w-[80px]">
                    ${widget.name}
                </p>

            </div>
        </div>
    `;
};



const showMoreBtn = document.getElementById("showMoreBtn");
let expanded = false;

function handleTabs() {

    const widgets = document.querySelectorAll("#widgetsContainer > div");
    const isMobile = window.innerWidth < 768;

    expanded = false;

    if (!isMobile) {
        widgets.forEach(widget => {
            widget.style.display = "flex";
        });

        showMoreBtn.style.display = "none";
        return;
    }

    if (widgets.length <= 6) {
        widgets.forEach(widget => {
            widget.style.display = "flex";
        });

        showMoreBtn.style.display = "none";
        return;
    }

    showMoreBtn.style.display = "flex";

    widgets.forEach((widget, index) => {
        widget.style.display = index < 6 ? "flex" : "none";
    });

    showMoreBtn.children[0].textContent = "▼";
    showMoreBtn.children[1].textContent = "Show More";

    showMoreBtn.onclick = function () {

        expanded = !expanded;

        widgets.forEach((widget, index) => {
            if (index >= 6) {
                widget.style.display = expanded ? "flex" : "none";
            }
        });

        showMoreBtn.children[0].textContent = expanded ? "▲" : "▼";
        showMoreBtn.children[1].textContent =
            expanded ? "Show Less" : "Show More";
    };
}
//  Run after widgets render
window.addEventListener("load", () => {
    setTimeout(handleTabs, 500);
});

//  Also handle resize (VERY IMPORTANT)
window.addEventListener("resize", handleTabs);

// add notification. before setting in drawer
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