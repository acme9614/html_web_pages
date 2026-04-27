function openDrawer() {
  document.getElementById("drawer").classList.remove("-translate-x-full");
  document.getElementById("overlay").classList.remove("hidden");
  document.getElementById("menuButton").classList.add("hidden");
}

function closeDrawer() {
  document.getElementById("drawer").classList.add("-translate-x-full");
  document.getElementById("overlay").classList.add("hidden");
  document.getElementById("menuButton").classList.remove("hidden");
}

// mainSlider

const swiper = new Swiper(".mainSlider", {
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false, 
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// services

let expanded = false;
function toggleBoxes() {
  const container = document.getElementById("widgetsContainer");
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


// about us 
function showTab(tab) {
  const companyBtn = document.getElementById("tab-company-btn");
  const chairmanBtn = document.getElementById("tab-chairman-btn");
  const companyContent = document.getElementById("tab-company");
  const chairmanContent = document.getElementById("tab-chairman");

  // Remove animation classes before switching
  companyContent.classList.remove("fade-in-up");
  chairmanContent.classList.remove("fade-in-up");

  if (tab === "company") {
    companyContent.classList.remove("hidden");
    chairmanContent.classList.add("hidden");

    companyContent.classList.add("fade-in-up");

    companyBtn.classList.add("active-tab");
    chairmanBtn.classList.remove("active-tab");
  } else {
    chairmanContent.classList.remove("hidden");
    companyContent.classList.add("hidden");

    chairmanContent.classList.add("fade-in-up");

    chairmanBtn.classList.add("active-tab");
    companyBtn.classList.remove("active-tab");
  }

  // Optional: Refresh AOS if you still want AOS on first scroll
  setTimeout(() => {
    AOS.refresh();
  }, 50);
}


// scrollTopBtn

const scrollTopBtn = document.getElementById("scrollTopBtn");
const heroSection = document.getElementById("hero");

window.addEventListener("scroll", () => {
  const heroBottom = heroSection.getBoundingClientRect().bottom;

  if (heroBottom < 0) {
    scrollTopBtn.classList.remove("opacity-0", "pointer-events-none");
    scrollTopBtn.classList.add("opacity-100", "pointer-events-auto");
  } else {
    scrollTopBtn.classList.add("opacity-0", "pointer-events-none");
    scrollTopBtn.classList.remove("opacity-100", "pointer-events-auto");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
