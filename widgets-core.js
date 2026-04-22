/**
 * @author Ajit Mane
 * @description
 * RF ID #202679
 * Handles centralized navigation and dynamic widget loading.
 * Fetches widgets from a common JSON (GitHub Pages) and renders
 * them in widget section and drawer layouts across all pages.
 */

// Navigation functions and message
const NAVIGATION_MAP = {
  navigateToScheme: "navigateScheme",
  navigateToCatalogues: "navigateToCatalogues",
  navigateToQuickPurchase: "navigateToQuickPurchase",
  navigateToBankDetails: "navigateBankDetails",
  navigateToKyc: "navigateKyc",
  navigateToRate: "navigateRate",
  navigateSchemeRecords: "navigateSchemeRecords",
  navigateToCustomerCard: "navigateCustomerCard",
  navigateTransactionHistory: "navigateTransactionHistory",
  navigateToMyOrder: "navigateToMyOrder",
  navigateToUserProfile: "navigateToUserProfile",
  navigateToDigitalGold: "navigateToDigitalGold",
  navigateToPanchang: "navigateToPanchang",
  navigateToFeedback: "navigateToFeedback",
  navigateToSetting: "navigateToSetting",
  navigateToHomePage: "navigateToHomePage",
  navigateToARVirtualTryOn: "navigateToARVirtualTryOn",
  navigateToNotification : "navigateToNotification",
  navigateToLogout : "navigateToLogout"
};

// Loop through all keys and dynamically create global functions on window
// So we don't need to manually write 20+ functions
Object.keys(NAVIGATION_MAP).forEach(fnName => {
  window[fnName] = function () {

    if (typeof Toaster !== "undefined") {
      // Send message to mobile app
      Toaster.postMessage(NAVIGATION_MAP[fnName]);
    } else {
      //  Simple error message
      console.error("Toaster is not defined");
      //  Show which function triggered
      console.log(fnName);
    }

  };
});

// Central JSON file URL
// This file controls all widgets for all pages
const API_URL = "https://acme9614.github.io/html_web_pages/widgets.json";

async function loadWidgets() {
    try {
        // Use "no-cache" to always check for updated widgets.json
        // Prevents mobile from showing old cached data
        const res = await fetch(API_URL, {
            cache: "no-cache"
        });

        if (!res.ok) throw new Error("Failed to fetch widgets");

        const data = await res.json();

        const gridContainer = document.getElementById("widgetsContainer");
        const drawerContainer = document.getElementById("drawerContainer");

        if (!gridContainer) {
            console.warn("widgetsContainer not found");
            return;
        }

        let gridHTML = "";
        let drawerHTML = "";

        // Loop through all widgets from JSON
        data.widgets.forEach(widget => {

            //  Skip widget if disabled in JSON
            if (widget.enabled === false) return;


             // Render card UI 
            if (typeof window.renderWidget === "function") {
                gridHTML += window.renderWidget(widget);
            }


             // Render drawer list item
            if (drawerContainer && typeof window.renderDrawerItem === "function") {
                drawerHTML += window.renderDrawerItem(widget);
            }

        });

        // Inject generated HTML into page
        gridContainer.innerHTML = gridHTML;
        if (drawerContainer) drawerContainer.innerHTML = drawerHTML;

    } catch (error) {
        console.error("Widget Load Error:", error);

        const container = document.getElementById("widgetsContainer");
        if (container) {
            container.innerHTML = "<p style='text-align:center;'>Failed to load widgets</p>";
        }
    }
}

//  Auto load
document.addEventListener("DOMContentLoaded", loadWidgets);