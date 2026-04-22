// Navigation functions and message
const NAVIGATION_MAP = {
  navigateToScheme: "navigateScheme",
  navigateToCatalogues: "navigateToCatalogues",
  navigateToQuickPurchase: "navigateToQuickPurchase",
  navigateToBankDetails: "navigateBankDetails",
  navigateToKyc: "navigateToKyc",
  navigateToRate: "navigateToRate",
  navigateSchemeRecords: "navigateSchemeRecords",
  navigateToCustomerCard: "navigateToCustomerCard",
  navigateTransactionHistory: "navigateTransactionHistory",
  navigateToMyOrder: "navigateToMyOrder",
  navigateToUserProfile: "navigateToUserProfile",
  navigateToDigitalGold: "navigateToDigitalGold",
  navigateToPanchang: "navigateToPanchang",
  navigateToFeedback: "navigateToFeedback",
  navigateToSetting: "navigateToSetting",
  navigateToHomePage: "navigateToHomePage",
  navigateToARVirtualTryOn: "navigateToARVirtualTryOn"
};

function sendNavigation(action) {
  if (!action) return;
  Toaster.postMessage(action);
}

// Auto-create all functions globally
Object.keys(NAVIGATION_MAP).forEach(fnName => {
  window[fnName] = function () {
    sendNavigation(NAVIGATION_MAP[fnName]);
  };
});


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

        data.widgets.forEach(widget => {

            //  skip disabled
            if (widget.enabled === false) return;


            // GRID (cards)
            if (typeof window.renderWidget === "function") {
                gridHTML += window.renderWidget(widget);
            }


            // DRAWER (simple text)
            if (drawerContainer && typeof window.renderDrawerItem === "function") {
                drawerHTML += window.renderDrawerItem(widget);
            }

        });

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