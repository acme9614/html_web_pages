/**
 * @author Ajit Mane
 * @description
 * RF ID #202679
 * Dynamic widget-based dashboard
 */

//  NAVIGATION 
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
    navigateToARVirtualTryOn: "navigateToARVirtualTryOn"
};

//  ACTION MAP 
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

//  ICON MAP 
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

//  NAME MAP 
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

//  NAVIGATION FUNCTIONS 
for (const fnName in NAVIGATION_MAP) {
    window[fnName] = function () {
        if (typeof Toaster !== "undefined") {
            Toaster.postMessage(NAVIGATION_MAP[fnName]);
        }
    };
}

//  HELPERS 
function mapActionByCode(code) {
    return ACTION_MAP?.[code] || "navigateToHomePage";
}

function getIcon(code) {
    return ICON_MAP?.[code] || getDefaultIcon();
}

function getDisplayName(code) {
    return NAME_MAP?.[code] || "Unknown";
}

function getDefaultIcon() {
    return "https://cdn-icons-png.flaticon.com/128/3037/3037255.png";
}

//  MAIN RENDER 
async function loadWidgets() {
    try {
        const apiResponse = window.jewelloData;

        if (!apiResponse || !Array.isArray(apiResponse.data)) {
            console.warn("⏳ Waiting for Flutter data...");
            return;
        }

        let widgets = [];

        for (const item of apiResponse.data) {
            if (item.IsAllocated !== 1) continue;

            widgets.push({
                id: item.WidgetCode,
                name: getDisplayName(item.WidgetCode),
                icon: getIcon(item.WidgetCode),
                action: mapActionByCode(item.WidgetCode),
                sequence: item.Sequence
            });
        }

        widgets.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

        const gridContainer = document.getElementById("widgetsContainer");
        const drawerContainer = document.getElementById("drawerContainer");

        let gridHTML = "";
        let drawerHTML = "";

        widgets.forEach((widget, i) => {
            if (typeof window.renderWidget === "function") {
                gridHTML += window.renderWidget(widget, i);
            }
            if (drawerContainer && typeof window.renderDrawerItem === "function") {
                drawerHTML += window.renderDrawerItem(widget);
            }
        });

        if (gridContainer) {
            gridContainer.innerHTML = gridHTML;

            //  DEBUG VIEW 
            const SHOW_DEBUG = true;

            if (SHOW_DEBUG) {
                let debugHTML = `<div class="w-full mt-6 p-4 bg-black text-green-400 text-xs rounded-lg">`;

                apiResponse.data.forEach(item => {
                    debugHTML += `
                        <div class="mb-2 border-b border-gray-600 pb-2">
                            <p><b>${item.WidgetName}</b></p>
                            <p>Code: ${item.WidgetCode}</p>
                        </div>
                    `;
                });

                debugHTML += `</div>`;

                gridContainer.insertAdjacentHTML("beforeend", debugHTML);
            }
        }

        if (drawerContainer) drawerContainer.innerHTML = drawerHTML;

    } catch (error) {
        console.error("Widget Load Error:", error);
    }
}

//  DATA ENTRY FROM FLUTTER 
let lastData = null;

function setJewelloData(data) {
    try {
        console.log(" Flutter Data:", data);

        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        if (JSON.stringify(data) === JSON.stringify(lastData)) return;

        lastData = data;
        window.jewelloData = data;

        // ALWAYS render AFTER data
        setTimeout(loadWidgets, 100);

    } catch (e) {
        console.error(" setJewelloData Error:", e);
    }
}