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



// Navigate  functions 
function navigateToScheme() {
  Toaster.postMessage("navigateScheme");
}


function navigateToBankDetails() {
  Toaster.postMessage("navigateBankDetails");
}

function navigateToKyc() {
  Toaster.postMessage("navigateKyc");
}

function navigateToRate() {
  Toaster.postMessage("navigateRate");
}


function navigateTransactionHistory() {
  Toaster.postMessage("navigateTransactionHistory");
}

function navigateToMyOrder() {
  Toaster.postMessage("navigateToMyOrder");
}

function navigateToUserProfile() {
  Toaster.postMessage("navigateToUserProfile");
}

function navigateToDigitalGold() {
  Toaster.postMessage("navigateToDigitalGold");
}

function navigateToHomePage() {
  Toaster.postMessage("navigateToHomePage");
}

function navigateToARVirtualTryOn() {
  Toaster.postMessage("navigateToARVirtualTryOn");
}



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