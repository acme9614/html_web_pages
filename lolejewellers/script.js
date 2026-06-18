 const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const drawer = document.getElementById('drawer');

    menuBtn.addEventListener('click', () => {
      drawer.classList.remove('-translate-x-full');
       document.body.style.overflow = "hidden"; //  FIX
    });

    closeBtn.addEventListener('click', () => {
      drawer.classList.add('-translate-x-full');
       document.body.style.overflow = "auto"; //  FIX
    });

// slider script 

// brandingSwiper 
const swiper = new Swiper(".brandingSwiper", {
        effect: "coverflow",
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
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

// animation 
 AOS.init({
    duration: 1000,
    once: false,

    easing: 'ease-in-out'
  });

  // toggle button 
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleBtn");
    let expanded = false;

    toggleBtn.addEventListener("click", function () {
        const extraTabs = document.querySelectorAll(".extra-tab");

        extraTabs.forEach(tab => {
            if (expanded) {
                // Hide on mobile only
                tab.classList.add("hidden");
            } else {
                // Show on mobile
                tab.classList.remove("hidden");
            }
        });

        expanded = !expanded;
        toggleBtn.textContent = expanded ? "Show Less" : "Show More";
    });
});