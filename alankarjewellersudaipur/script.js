const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menu-toggle");
const closeDrawer = document.getElementById("close-drawer");

if (drawer && overlay && menuToggle && closeDrawer) {
  menuToggle.addEventListener("click", () => {
    drawer.classList.remove("drawer-close");
    drawer.classList.add("drawer-open");

    overlay.classList.remove("hidden");
    overlay.classList.add("show");
  });

  closeDrawer.addEventListener("click", () => {
    drawer.classList.remove("drawer-open");
    drawer.classList.add("drawer-close");

    overlay.classList.remove("show");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  });

  overlay.addEventListener("click", () => {
    closeDrawer.click();
  });
}

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
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
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

/*
 * Dynamic service widgets
 *
 * widgets-core.js remains unchanged.
 * This script watches widgetsContainer and automatically updates the
 * mobile Show More button whenever Flutter widgets are rendered.
 */
document.addEventListener("DOMContentLoaded", function () {
  const widgetsContainer = document.getElementById("widgetsContainer");
  const showMoreContainer = document.getElementById("showMoreBtn");

  if (!widgetsContainer || !showMoreContainer) {
    return;
  }

  const MOBILE_WIDGET_LIMIT = 6;
  let widgetsExpanded = false;

  function setShowMoreButtonContent() {
    const button = showMoreContainer.querySelector("button");

    if (!button) {
      return;
    }

    if (widgetsExpanded) {
      button.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7">
          </path>
        </svg>
        Show Less
      `;
    } else {
      button.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7">
          </path>
        </svg>
        Show More
      `;
    }
  }

  function updateServiceWidgetsView() {
    const isMobileView = window.innerWidth < 768;
    const widgets = Array.from(widgetsContainer.children);
    const hasMoreThanSixWidgets =
      widgets.length > MOBILE_WIDGET_LIMIT;

    /*
     * Desktop/tablet view:
     * Show all widgets and hide the Show More button.
     */
    if (!isMobileView) {
      widgets.forEach((widget) => {
        widget.classList.remove("hidden");
      });

      showMoreContainer.style.display = "none";
      return;
    }

    /*
     * Mobile view with six or fewer widgets:
     * Show all widgets and do not display the Show More button.
     */
    if (!hasMoreThanSixWidgets) {
      widgetsExpanded = false;

      widgets.forEach((widget) => {
        widget.classList.remove("hidden");
      });

      showMoreContainer.style.display = "none";
      setShowMoreButtonContent();

      return;
    }

    /*
     * Mobile view with more than six widgets:
     * Initially display only the first six widgets.
     */
    widgets.forEach((widget, index) => {
      const shouldHide =
        !widgetsExpanded && index >= MOBILE_WIDGET_LIMIT;

      widget.classList.toggle("hidden", shouldHide);
    });

    showMoreContainer.style.display = "block";
    setShowMoreButtonContent();
  }

  showMoreContainer.addEventListener("click", function () {
    const widgets = widgetsContainer.children;
    const isMobileView = window.innerWidth < 768;

    /*
     * Do nothing when:
     * - It is not mobile view
     * - There are six or fewer widgets
     */
    if (
      !isMobileView ||
      widgets.length <= MOBILE_WIDGET_LIMIT
    ) {
      return;
    }

    widgetsExpanded = !widgetsExpanded;
    updateServiceWidgetsView();
  });

  /*
   * Observe widgetsContainer because widgets-core.js adds Flutter widgets
   * dynamically after this page has already loaded.
   */
  const widgetsObserver = new MutationObserver(function (mutations) {
    const widgetsChanged = mutations.some(
      (mutation) => mutation.type === "childList"
    );

    if (!widgetsChanged) {
      return;
    }

    // Collapse the newly received widget list on mobile.
    widgetsExpanded = false;

    requestAnimationFrame(() => {
      updateServiceWidgetsView();

      // Refresh animations for dynamically added Flutter widgets.
      if (typeof AOS !== "undefined") {
        AOS.refreshHard();
      }
    });
  });

  widgetsObserver.observe(widgetsContainer, {
    childList: true,
  });

  /*
   * Apply the correct view for widgets that may already be rendered.
   */
  updateServiceWidgetsView();

  window.addEventListener("resize", function () {
    updateServiceWidgetsView();
  });
});

/*
 * Back to top
 */
const backToTopButton = document.getElementById("backToTopBtn");

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTopButton.classList.remove("hidden");
    } else {
      backToTopButton.classList.add("hidden");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}