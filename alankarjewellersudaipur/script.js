 const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("overlay");
    const menuToggle = document.getElementById("menu-toggle");
    const closeDrawer = document.getElementById("close-drawer");

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


 const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });




// service 


  document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById("widgetsContainer");
    const showMoreBtn = document.getElementById("showMoreBtn");

    function applyMobileView() {
      const isMobile = window.innerWidth < 768;
      const tabs = tabsContainer.children;

      if (isMobile) {
        for (let i = 6; i < tabs.length; i++) {
          tabs[i].classList.add("hidden");
        }
        showMoreBtn.style.display = "block";
      } else {
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].classList.remove("hidden");
        }
        showMoreBtn.style.display = "none";
      }
    }

    showMoreBtn.addEventListener("click", function () {
      const tabs = tabsContainer.children;
      const isHidden = tabs[6].classList.contains("hidden");
      if (isHidden) {
        for (let i = 6; i < tabs.length; i++) {
          tabs[i].classList.remove("hidden");
        }
        showMoreBtn.querySelector("button").innerHTML = `
         
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
           Show Less
        `;
      } else {
        for (let i = 6; i < tabs.length; i++) {
          tabs[i].classList.add("hidden");
        }
        showMoreBtn.querySelector("button").innerHTML = `
    
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
            Show More
        `;
      }
    });

    applyMobileView();
    window.addEventListener("resize", applyMobileView);
  });




    // back to top
const btn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btn.classList.remove("hidden");
  } else {
    btn.classList.add("hidden");
  }
});

// Scroll to top smoothly
btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
