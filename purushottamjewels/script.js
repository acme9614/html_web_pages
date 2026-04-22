 const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const drawer = document.getElementById('drawer');

    menuBtn.addEventListener('click', () => {
      drawer.classList.remove('translate-x-full');
       document.body.style.overflow = "hidden"; //  FIX
    });

    closeBtn.addEventListener('click', () => {
      drawer.classList.add('translate-x-full');
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