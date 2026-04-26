   const menuToggle = document.getElementById("menu-toggle");
    const drawer = document.getElementById("drawer");
    const closeDrawer = document.getElementById("close-drawer");
    const overlay = document.getElementById("overlay");

    menuToggle.addEventListener("click", () => {
      drawer.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
    });

    closeDrawer.addEventListener("click", () => {
      drawer.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    });

    overlay.addEventListener("click", () => {
      drawer.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    });


// BrandingSlider 

 const swiper = new Swiper(".BrandingSwiper", {
      loop: true,
     
      grabCursor: true,
      speed : 1500,
      cubeEffect: {
        shadow: false,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    document.getElementById('prevBtn').addEventListener('click', () => swiper.slidePrev());
    document.getElementById('nextBtn').addEventListener('click', () => swiper.slideNext());


    
  // services 

   AOS.init({
    duration: 800,
    once: false,
    disable: false, // 👈 Add this line
  });
  

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
