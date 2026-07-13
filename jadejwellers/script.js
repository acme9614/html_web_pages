const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuPath = document.getElementById("menuPath");
const menuIcon = document.getElementById("menuIcon");

menuBtn.addEventListener("click", () => {
    const isClosed = mobileMenu.classList.contains("max-h-0");

    if (isClosed) {
        // Open drawer
        mobileMenu.classList.remove("max-h-0", "opacity-0");
        mobileMenu.classList.add("max-h-96", "opacity-100");

        // Change to X icon
        menuPath.setAttribute(
            "d",
            "M6 18L18 6M6 6l12 12"
        );

        menuIcon.classList.add("rotate-180");
    } else {
        // Close drawer
        mobileMenu.classList.remove("max-h-96", "opacity-100");
        mobileMenu.classList.add("max-h-0", "opacity-0");

        // Change back to hamburger
        menuPath.setAttribute(
            "d",
            "M4 6h16M4 12h16M4 18h16"
        );

        menuIcon.classList.remove("rotate-180");
    }
});


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


    //   collections

    const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modalImg.src = img.src;
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});


// show More button-

/* 
Mobile Toggle (Show More) 
*/
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const toggleIcon = document.getElementById("toggleIcon");

let expanded = false;

if (toggleBtn && toggleText && toggleIcon) {
  toggleBtn.addEventListener("click", () => {

    //  fetch elements at click time
    const extraTabs = document.querySelectorAll(".extra-tab");

    expanded = !expanded;

    extraTabs.forEach((el) => {
      if (expanded) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });

    toggleText.textContent = expanded ? "Show Less" : "Show More";
    toggleIcon.classList.toggle("rotate-180", expanded);
  });
}