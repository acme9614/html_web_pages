/**
 * @author Ajit Mane
 * @description
 * RF ID #202679
 * Dynamic widget loading from Flutter response
 * Icons mapped from HTML
 * Navigation mapping SAME as Flutter (DO NOT CHANGE)
 */

//  NAVIGATION (DO NOT CHANGE) 

const NAVIGATION_MAP = {
  navigateToScheme: "navigateScheme",
  navigateToCatalogues: "navigateToCatalogues",
  navigateToQuickPurchase: "navigateToQuickPurchase",
  navigateToBankDetails: "navigateBankDetails",
  navigateToKyc: "navigateKyc",
  navigateToRate: "navigateRate",
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
  navigateToARVirtualTryOn: "navigateToARVirtualTryOn",
  navigateToNotification: "navigateToNotification",
  navigateToLogout: "navigateToLogout"
};

// Auto bind functions → message mapping
Object.keys(NAVIGATION_MAP).forEach(fnName => {
  window[fnName] = function () {
    if (typeof Toaster !== "undefined") {
      Toaster.postMessage(NAVIGATION_MAP[fnName]);
    } else {
      console.error("Toaster not defined");
      console.log("Function:", fnName);
    }
  };
});

//  ACTION MAPPING (BY WIDGET CODE) 

function mapActionByCode(code) {
  const map = {
    1: "navigateToScheme",
    2: "navigateToBankDetails",
    3: "navigateToRate",
    4: "navigateToKyc",
    5: "navigateToCustomerCard",
    6: "navigateSchemeRecords",
    7: "navigateToMyOrder",
    8: "navigateTransactionHistory",
    9: "navigateToDigitalGold",
    10: "navigateToUserProfile",
    11: "navigateToPanchang",
    18: "navigateToCatalogues",
    19: "navigateToQuickPurchase",
    20: "navigateToFeedback",
    23: "navigateToARVirtualTryOn"
  };

  return map[code] || "navigateToHomePage";
}

//  ICON MAPPING 

function getIcon(code) {
  const icons = {
    1: "https://cdn-icons-png.flaticon.com/128/10150/10150740.png", // Scheme
    2: "https://cdn-icons-png.flaticon.com/128/2830/2830155.png",  // Bank
    3: "https://cdn-icons-png.flaticon.com/128/592/592015.png",    // Rate
    4: "https://cdn-icons-png.flaticon.com/128/10457/10457799.png",// KYC
    5: "https://cdn-icons-png.flaticon.com/128/3037/3037255.png",  // Card
    6: "https://cdn-icons-png.flaticon.com/128/10811/10811965.png",// Records
    7: "https://cdn-icons-png.flaticon.com/128/10597/10597732.png",// Order
    8: "https://cdn-icons-png.flaticon.com/128/2277/2277956.png",  // History
    9: "https://cdn-icons-png.flaticon.com/128/10040/10040888.png",// Gold
    10:"https://cdn-icons-png.flaticon.com/128/1144/1144760.png",  // Profile
    11:"https://cdn-icons-png.flaticon.com/128/3013/3013143.png",    // Panchang
    18:"https://cdn-icons-png.flaticon.com/128/29/29341.png",  // Catalogues
    19:"https://cdn-icons-png.flaticon.com/128/1019/1019709.png",    // Quick Purchase
    20:"https://cdn-icons-png.flaticon.com/128/1828/1828970.png",  // Feedback
    23: "https://acme9614.github.io/html_web_pages/assets/virtual.png" // Virtual Try-On
  };

  return icons[code] || getDefaultIcon();
}

// Default fallback icon
function getDefaultIcon() {
  return "https://cdn-icons-png.flaticon.com/128/1828/1828843.png";
}

//  MAIN FUNCTION 

async function loadWidgets() {
  try {
    //  Data comes from Flutter
    const apiResponse = window.jewelloData;

    if (!apiResponse) {
      console.error("No Flutter data found");
      return;
    }

    // Convert → widgets format
    const data = {
      widgets: apiResponse.map(item => ({
        id: item.WidgetCode,
        name: item.WidgetName,
        icon: getIcon(item.WidgetCode),
        action: mapActionByCode(item.WidgetCode),
        enabled: item.IsAllocated === 1,
        sequence: item.Sequence
      }))
    };

    // Sort by sequence
    data.widgets.sort((a, b) => a.sequence - b.sequence);

    const gridContainer = document.getElementById("widgetsContainer");
    const drawerContainer = document.getElementById("drawerContainer");

    let gridHTML = "";
    let drawerHTML = "";

    data.widgets.forEach(widget => {
      if (!widget.enabled) return;

      if (typeof window.renderWidget === "function") {
        gridHTML += window.renderWidget(widget);
      }

      if (drawerContainer && typeof window.renderDrawerItem === "function") {
        drawerHTML += window.renderDrawerItem(widget);
      }
    });

    if (gridContainer) gridContainer.innerHTML = gridHTML;
    if (drawerContainer) drawerContainer.innerHTML = drawerHTML;

  } catch (error) {
    console.error("Widget Load Error:", error);
  }
}

//  AUTO LOAD 

document.addEventListener("DOMContentLoaded", loadWidgets);

//  FLUTTER ENTRY 

// Called from Flutter
function setJewelloData(data) {
  window.jewelloData = data;
  loadWidgets();
}