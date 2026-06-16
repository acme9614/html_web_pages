const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

// Open Drawer
menuBtn.addEventListener("click", () => {
    mobileMenu.style.left = "0";
    overlay.classList.remove("hidden");

    // Lock body scroll
    document.body.classList.add("overflow-hidden");
});

// Close Drawer
function closeDrawer() {
    mobileMenu.style.left = "-100%";
    overlay.classList.add("hidden");

    // Unlock body scroll
    document.body.classList.remove("overflow-hidden");
}

closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// <!-- This Script For Collection sections images -->
function openImage(src) {
    document.getElementById("modalImage").src = src;
    document.getElementById("imageModal").classList.remove("hidden");
    document.getElementById("imageModal").classList.add("flex");
}

function closeImage() {
    document.getElementById("imageModal").classList.add("hidden");
    document.getElementById("imageModal").classList.remove("flex");
}


// Toggle for mobile
const toggleBtn = document.getElementById("toggleBtn");
const toggleText = document.getElementById("toggleText");
const toggleIcon = document.getElementById("toggleIcon");
let expanded = false;

toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    document.querySelectorAll(".extra-tab").forEach((el) => {
        el.classList.toggle("hidden", !expanded);
    });
    toggleText.textContent = expanded ? "Show Less" : "Show More";
    toggleIcon.classList.toggle("rotate-180", expanded);
});


