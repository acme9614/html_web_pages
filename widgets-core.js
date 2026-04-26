/**
 * @author Ajit Mane
 * @description
 * RF ID #202679
 * Dynamic widget-based dashboard
 * This page renders user-specific widgets (Scheme, Bank, KYC, etc.)
 * based on API response received from Flutter WebView.
 */

// navigation function and message
const NAVIGATION_MAP = {
    navigateToScheme: "navigateScheme",
    navigateToCatalogues: "navigateToCatalogues",
    navigateToQuickPurchase: "navigateToQuickPurchase",
    navigateToBankDetails: "navigateBankDetails",
    navigateToKyc: "navigateToKyc",
    navigateToRate: "navigateRate",
    navigateSchemeRecords: "navigateSchemeRecords",
    navigateCustomerCard: "navigateCustomerCard",
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

// navigation mapping using widget id
const ACTION_MAP = {
    1: "navigateToScheme",
    2: "navigateToBankDetails",
    3: "navigateToRate",
    4: "navigateToKyc",
    5: "navigateCustomerCard",
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

// Icon mapping using widget id
const ICON_MAP = {
    1: "https://cdn-icons-png.flaticon.com/128/10150/10150740.png",
    2: "https://cdn-icons-png.flaticon.com/128/2830/2830155.png",
    3: "https://cdn-icons-png.flaticon.com/128/592/592015.png",
    4: "https://cdn-icons-png.flaticon.com/128/10457/10457799.png",
    5: "https://cdn-icons-png.flaticon.com/128/3037/3037255.png",
    6: "https://cdn-icons-png.flaticon.com/128/10811/10811965.png",
    7: "https://cdn-icons-png.flaticon.com/128/10597/10597732.png",
    8: "https://cdn-icons-png.flaticon.com/128/2277/2277956.png",
    9: "https://cdn-icons-png.flaticon.com/128/10040/10040888.png",
    10: "https://cdn-icons-png.flaticon.com/128/1144/1144760.png",
    11: "https://cdn-icons-png.flaticon.com/128/3013/3013143.png",
    18: "https://cdn-icons-png.flaticon.com/128/29/29341.png",
    19: "https://cdn-icons-png.flaticon.com/128/1019/1019709.png",
    20: "https://cdn-icons-png.flaticon.com/128/1828/1828970.png",
    23: "https://acme9614.github.io/html_web_pages/assets/virtual.png"
};

// widget names display into HTML Page 
const NAME_MAP = {
    1: "Scheme",
    2: "Bank",
    3: "Rate",
    4: "KYC",
    5: "Card",
    6: "Records",
    7: "Orders",
    8: "History",
    9: "Gold",
    10: "Profile",
    11: "Panchang",
    18: "Catalogues",
    19: "Quick Purchase",
    20: "Feedback",
    23: "Virtual Try-On"
};


// This dynamically creates functions like:
// navigateToScheme(), navigateToKyc(), etc.
// These functions send messages back to Flutter using Toaster.postMessage()
if (NAVIGATION_MAP) {
    for (const fnName in NAVIGATION_MAP) {
        window[fnName] = function () {
            if (typeof Toaster !== "undefined") {
                Toaster.postMessage(NAVIGATION_MAP[fnName]);
            } else {
                console.error("Toaster not defined:", fnName);
            }
        };
    }
} else {
    console.error("NAVIGATION_MAP not found. Check widgetConfig.js load order.");
}

// Map widget code → action function name
// Example: 1 → navigateToScheme
function mapActionByCode(code) {
    return ACTION_MAP?.[code] || "navigateToHomePage";
}

// Map widget code → icon URL
function getIcon(code) {
    return ICON_MAP?.[code] || getDefaultIcon();
}

// Map widget code → display name
function getDisplayName(code) {
    return NAME_MAP?.[code] || "Unknown";
}

// Fallback icon if mapping not found
function getDefaultIcon() {
    return "https://cdn-icons-png.flaticon.com/128/3037/3037255.png";
}

// MAIN FUNCTION

async function loadWidgets() {
    try {
        const apiResponse = window.jewelloData;

        let widgets = []; //  FIX: declare outside

        //  FIX: correct API structure
        if (apiResponse && Array.isArray(apiResponse)) {

            for (const item of apiResponse) {
                if (item.IsAllocated !== 1) continue;

                widgets.push({
                    id: item.WidgetCode,
                    name: item.WidgetName || getDisplayName(item.WidgetCode),
                    icon: getIcon(item.WidgetCode),
                    action: mapActionByCode(item.WidgetCode),
                    sequence: item.Sequence
                });
            }

            // widgets.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

        } else {
            console.warn("No Flutter data → loading static widgets.json");
            // use if data not comes from flutter side use local widget.json file
            const response = await fetch("https://acme9614.github.io/html_web_pages/widgets.json");
            const data = await response.json();

            widgets = data.widgets || [];
        }

        const gridContainer = document.getElementById("widgetsContainer");
        const drawerContainer = document.getElementById("drawerContainer");

        let gridHTML = "";
        let drawerHTML = "";

        for (let i = 0; i < widgets.length; i++) {
            const widget = widgets[i];

            if (typeof window.renderWidget === "function") {
                gridHTML += window.renderWidget(widget, i);
            }

            if (drawerContainer && typeof window.renderDrawerItem === "function") {
                drawerHTML += window.renderDrawerItem(widget);
            }
        }

        if (gridContainer) gridContainer.innerHTML = gridHTML;
        if (drawerContainer) drawerContainer.innerHTML = drawerHTML;

    } catch (error) {
        console.error("Widget Load Error:", error);
    }
}

// NOTE:
// If Flutter data is not yet available,
// this will not render anything until setJewelloData() is called

// when html development is programming mode then uncomment this line 
// document.addEventListener("DOMContentLoaded", loadWidgets);

// for production use this 
document.addEventListener("DOMContentLoaded", () => {
    // Run fallback ONLY if Flutter data not available
    if (!window.jewelloData) {
        loadWidgets();
    }
});

// Cache last data to prevent unnecessary re-render
let lastData = null;

// Called from Flutter WebView:
// Example: setJewelloData(jsonData)
function setJewelloData(data) {
    try {
        // Prevent duplicate rendering if same data is sent again
        if (JSON.stringify(data) === JSON.stringify(lastData)) {
            return;
        }

        lastData = data;
        // Store data globally for use in loadWidgets()
        window.jewelloData = data;

        // Render UI
        loadWidgets();
    } catch (e) {
        console.error("setJewelloData Error:", e);
    }
}