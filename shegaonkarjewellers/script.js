// drawer 
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

function openDrawer() {
    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "invisible");
    overlay.classList.add("opacity-100", "visible");
}

function closeDrawer() {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "invisible");
    overlay.classList.remove("opacity-100", "visible");
}

menuBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);


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