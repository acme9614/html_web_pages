//  drawer and header scroll effect start
 const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("overlay");
    const header = document.getElementById("header");

    // Open Drawer
    menuBtn.addEventListener("click", () => {
      drawer.classList.remove("translate-x-full");
      overlay.classList.remove("hidden");
    });

    // Close Drawer
    function closeDrawer() {
      drawer.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    }

    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    // Header Scroll Effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.backgroundColor = "#fff";
        header.classList.add("shadow-lg"); // add shadow
      } else {
        header.style.backgroundColor = "#bda1a2";
        header.classList.remove("shadow-lg"); //remove shadow
      }
    });

//  drawer and header scroll effect end 


// Services Icons Animations

  document.addEventListener("DOMContentLoaded", function () {

      function applyServiceAOS() {
        const isMobile = window.innerWidth < 768;
        const items = document.querySelectorAll('.service-item');

        items.forEach((el, index) => {

          if (isMobile) {
            el.setAttribute("data-aos", index % 2 === 0 ? "fade-up" : "fade-down");
          } else {
            el.setAttribute("data-aos", index % 2 === 0 ? "fade-up" : "fade-down");
          }

          el.setAttribute("data-aos-delay", index * 100);
        });

        AOS.init({
          duration: 800,
            easing: 'ease-in-out',
  once: false
        });

      }

      // Run on load
      applyServiceAOS();

      // Run on resize
      window.addEventListener("resize", applyServiceAOS);

    });


