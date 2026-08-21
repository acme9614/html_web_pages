/**
 * Page adapter.
 * Common widgets-core.js remains unchanged.
 *
 * New layout:
 * - First four widgets are placed under "Quick Actions" in the left drawer.
 * - Remaining widgets are placed under "More" in the same drawer.
 * - Widget icons are intentionally not rendered.
 * - Widget names are displayed dynamically from widget.name.
 */

const LONDE_WIDGET_UI = {
    1:  { subtitle: "Place your order" },
    2:  { subtitle: "Link your account" },
    3:  { subtitle: "Check today's rate" },
    4:  { subtitle: "Submit your documents" },
    5:  { subtitle: "View your customer card" },
    6:  { subtitle: "View orders records" },
    7:  { subtitle: "Track your orders" },
    8:  { subtitle: "View payment history" },
    9:  { subtitle: "Manage digital gold" },
    10: { subtitle: "Open your profile" },
    11: { subtitle: "View Panchang" },
    18: { subtitle: "Browse collections" },
    19: { subtitle: "Buy instantly" },
    20: { subtitle: "Share your feedback" },
    23: { subtitle: "Try jewellery virtually" }
};


function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/**
 * Widget title comes directly from API / widgets.json.
 * No special Advance Order naming logic.
 */
function getWidgetUi(widget) {

    const id = Number(widget?.id);

    const config = LONDE_WIDGET_UI[id] || {
        subtitle: "Open this service"
    };

    return {

        title:
            String(widget?.name || "Service").trim()
            || "Service",

        subtitle: config.subtitle
    };
}


/**
 * Called by the existing common widget loader.
 * No widget icons are rendered in the drawer.
 */
window.renderWidget = function renderWidget(widget, index) {

    const ui = getWidgetUi(widget);

    const widgetId = Number(widget?.id) || 0;

    const action = escapeHtml(
        widget?.action || "navigateToHomePage"
    );

    const title = escapeHtml(ui.title);

    const subtitle = escapeHtml(ui.subtitle);

    const zone =
        index < 4
            ? "quick"
            : "more";


    return `
        <button
            type="button"
            class="drawer-menu-item dynamic-widget-card"
            data-widget-zone="${zone}"
            data-widget-id="${widgetId}"
            data-widget-action="${action}">

            <span class="drawer-menu-title">
                ${title}
            </span>

            <span class="drawer-menu-subtitle">
                ${subtitle}
            </span>

        </button>
    `;
};



function distributeWidgets() {

    const source =
        document.getElementById("widgetsContainer");

    const quick =
        document.getElementById("quickActionsContainer");

    const more =
        document.getElementById("moreActionsContainer");

    const moreSection =
        document.getElementById("moreSection");


    if (
        !source ||
        !quick ||
        !more ||
        !moreSection
    ) {
        return;
    }


    const cards = [
        ...source.querySelectorAll(
            ".dynamic-widget-card"
        )
    ];


    if (!cards.length) {
        return;
    }


    quick.replaceChildren();

    more.replaceChildren();


    cards.forEach((card) => {

        if (
            card.dataset.widgetZone === "quick"
        ) {

            quick.appendChild(card);

        } else {

            more.appendChild(card);
        }

    });


    moreSection.classList.toggle(
        "hidden",
        more.children.length === 0
    );
}



function callNavigation(functionName) {

    if (
        typeof window[functionName] === "function"
    ) {

        window[functionName]();

        return;
    }


    console.error(
        "Navigation function not found:",
        functionName
    );
}



/* =========================
   DRAWER
========================= */

function setDrawerState(open) {

    const drawer =
        document.getElementById("appDrawer");

    const backdrop =
        document.getElementById("drawerBackdrop");

    const toggleButton =
        document.getElementById(
            "drawerToggleButton"
        );


    if (
        !drawer ||
        !backdrop ||
        !toggleButton
    ) {
        return;
    }


    drawer.classList.toggle(
        "open",
        open
    );

    backdrop.classList.toggle(
        "open",
        open
    );


    drawer.setAttribute(
        "aria-hidden",
        String(!open)
    );

    backdrop.setAttribute(
        "aria-hidden",
        String(!open)
    );

    toggleButton.setAttribute(
        "aria-expanded",
        String(open)
    );


    document.body.classList.toggle(
        "drawer-open",
        open
    );
}



function openDrawer() {

    setDrawerState(true);
}



function closeDrawer() {

    setDrawerState(false);
}



function bindDrawer() {

    document
        .getElementById("drawerToggleButton")
        ?.addEventListener(
            "click",
            openDrawer
        );


    document
        .getElementById("drawerCloseButton")
        ?.addEventListener(
            "click",
            closeDrawer
        );


    document
        .getElementById("drawerBackdrop")
        ?.addEventListener(
            "click",
            closeDrawer
        );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeDrawer();
            }
        }
    );
}



/* =========================
   PAGE NAVIGATION
========================= */

function bindPageNavigation() {

    document
        .getElementById("brandButton")
        ?.addEventListener(
            "click",
            () =>
                callNavigation(
                    "navigateToHomePage"
                )
        );


    document
        .getElementById("homeNavButton")
        ?.addEventListener(
            "click",
            () =>
                callNavigation(
                    "navigateToHomePage"
                )
        );


    document
        .getElementById("centerJewellerButton")
        ?.addEventListener(
            "click",
            () =>
                callNavigation(
                    "navigateToHomePage"
                )
        );


    document
        .getElementById("profileNavButton")
        ?.addEventListener(
            "click",
            () =>
                callNavigation(
                    "navigateToUserProfile"
                )
        );


    document
        .getElementById("notificationButton")
        ?.addEventListener(
            "click",
            () =>
                callNavigation(
                    "navigateToNotification"
                )
        );


    document
        .getElementById("settingsButton")
        ?.addEventListener(
            "click",
            () =>
                callNavigation(
                    "navigateToSetting"
                )
        );
}



/*
 * Widget click remains dynamic.
 * Drawer closes first,
 * then mapped navigation action runs.
 */

document.addEventListener(
    "click",
    (event) => {

        const card =
            event.target.closest(
                ".dynamic-widget-card"
            );


        if (
            card?.dataset.widgetAction
        ) {

            closeDrawer();

            callNavigation(
                card.dataset.widgetAction
            );
        }
    }
);



document.addEventListener(
    "DOMContentLoaded",
    () => {

        const source =
            document.getElementById(
                "widgetsContainer"
            );


        if (source) {

            new MutationObserver(
                distributeWidgets
            ).observe(
                source,
                {
                    childList: true
                }
            );


            distributeWidgets();
        }


        bindDrawer();

        bindPageNavigation();
    }
);



/* =========================================
   DYNAMIC BRANDING BANNERS
========================================= */

function initializeBrandingSwiper() {

    // Destroy previous instance
    if (
        window.brandingSwiperInstance
    ) {

        window.brandingSwiperInstance.destroy(
            true,
            true
        );
    }


    // Initialize Swiper
    window.brandingSwiperInstance =
        new Swiper(
            ".brandingSwiper",
            {

                loop: true,

                speed: 1000,

                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },

                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },

                navigation: {
                    nextEl:
                        ".swiper-button-next",

                    prevEl:
                        ".swiper-button-prev"
                },

                effect: "fade",

                fadeEffect: {
                    crossFade: true
                }
            }
        );
}



// Initial static banner load
initializeBrandingSwiper();



// Called by widgets-core.js
// when Flutter replaces banner images
window.onBannerImagesLoaded =
    function () {

        initializeBrandingSwiper();

    };