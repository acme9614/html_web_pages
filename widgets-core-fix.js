/**
 * @author Ajit Mane
 * @description
 * RF ID #202679
 * Dynamic widget-based dashboard.
 * This page renders user-specific widgets (Scheme, Bank, KYC, etc.)
 * based on API response received from Flutter WebView.
 */

// Navigation function and message.
const NAVIGATION_MAP = {
    navigateToScheme: "navigateScheme",
    navigateToCatalogues: "navigateToCatalogues",
    navigateToQuickPurchase: "navigateToQuickPurchase",
    navigateToBankDetails: "navigateBankDetails",
    navigateToKyc: "navigateKyc",
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

// Navigation mapping using widget ID.
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

// Icon mapping using widget ID.
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

// Widget names displayed on the HTML page.
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

// Maximum time to wait for the Flutter widget response.
const WIDGET_RESPONSE_TIMEOUT_MS = 30000;

let lastWidgetData = null;
let widgetResponseReceived = false;
let widgetResponseTimeoutId = null;

// Dynamically creates functions such as navigateToScheme() and navigateToKyc().
// These functions send messages back to Flutter using Toaster.postMessage().
for (const fnName in NAVIGATION_MAP) {
    if (!Object.prototype.hasOwnProperty.call(NAVIGATION_MAP, fnName)) continue;

    window[fnName] = function () {
        if (
            typeof Toaster !== "undefined" &&
            typeof Toaster.postMessage === "function"
        ) {
            Toaster.postMessage(NAVIGATION_MAP[fnName]);
        } else {
            console.error("Toaster not defined:", fnName);
        }
    };
}

// Map widget code to action function name.
function mapActionByCode(code) {
    return ACTION_MAP[code] || "navigateToHomePage";
}

// Map widget code to icon URL.
function getIcon(code) {
    return ICON_MAP[code] || getDefaultIcon();
}

// Map widget code to display name.
function getDisplayName(code) {
    return NAME_MAP[code] || "Unknown";
}

// Added for pngadgilandsons webpage.
// Shows Pay Online Monthly Advance and Add Your Bank.
function isPngadgilAndSonsPage() {
    return window.location.pathname
        .toLowerCase()
        .split("/")
        .includes("pngadgilandsons");
}

function resolveWidgetDisplayName(widget) {
    const originalName = String(widget && widget.name ? widget.name : "").trim();
    const normalizedName = originalName.toLowerCase();
    const widgetId = Number(widget && widget.id);

    const schemeNames = ["scheme", "saving scheme", "savings scheme"];
    const bankNames = ["bank", "bank details", "bank detail"];

    // Scheme widget name change.
    if (
        isPngadgilAndSonsPage() &&
        (widgetId === 1 || schemeNames.includes(normalizedName))
    ) {
        return "Pay Online Monthly Advance";
    }

    // Bank widget name change.
    if (
        isPngadgilAndSonsPage() &&
        (widgetId === 2 || bankNames.includes(normalizedName))
    ) {
        return "Add Your Bank";
    }

    return originalName || getDisplayName(widgetId);
}

// Fallback icon if mapping is not found.
function getDefaultIcon() {
    return "https://cdn-icons-png.flaticon.com/128/3037/3037255.png";
}

function setElementDisplay(element, shouldDisplay, displayClass) {
    if (!element) return;

    element.classList.toggle("hidden", !shouldDisplay);

    if (displayClass) {
        element.classList.toggle(displayClass, shouldDisplay);
    }
}

function showWidgetLoadingState() {
    const loadingContainer = document.getElementById("widgetsLoadingContainer");
    const errorContainer = document.getElementById("widgetsErrorContainer");
    const emptyContainer = document.getElementById("widgetsEmptyContainer");
    const gridContainer = document.getElementById("widgetsContainer");
    const toggleContainer = document.getElementById("toggleButtonContainer");

    setElementDisplay(loadingContainer, true, "flex");
    setElementDisplay(errorContainer, false, "flex");
    setElementDisplay(emptyContainer, false, "flex");
    setElementDisplay(gridContainer, false, "flex");
    setElementDisplay(toggleContainer, false, "flex");

    if (gridContainer) gridContainer.innerHTML = "";
}

function showWidgetContentState(widgetCount) {
    const loadingContainer = document.getElementById("widgetsLoadingContainer");
    const errorContainer = document.getElementById("widgetsErrorContainer");
    const emptyContainer = document.getElementById("widgetsEmptyContainer");
    const gridContainer = document.getElementById("widgetsContainer");
    const toggleContainer = document.getElementById("toggleButtonContainer");

    setElementDisplay(loadingContainer, false, "flex");
    setElementDisplay(errorContainer, false, "flex");
    setElementDisplay(emptyContainer, widgetCount === 0, "flex");
    setElementDisplay(gridContainer, widgetCount > 0, "flex");
    setElementDisplay(toggleContainer, widgetCount > 6, "flex");
}

function showWidgetErrorState(message) {
    const loadingContainer = document.getElementById("widgetsLoadingContainer");
    const errorContainer = document.getElementById("widgetsErrorContainer");
    const emptyContainer = document.getElementById("widgetsEmptyContainer");
    const gridContainer = document.getElementById("widgetsContainer");
    const toggleContainer = document.getElementById("toggleButtonContainer");
    const errorMessage = document.getElementById("widgetsErrorMessage");

    if (errorMessage && message) errorMessage.textContent = message;

    setElementDisplay(loadingContainer, false, "flex");
    setElementDisplay(errorContainer, true, "flex");
    setElementDisplay(emptyContainer, false, "flex");
    setElementDisplay(gridContainer, false, "flex");
    setElementDisplay(toggleContainer, false, "flex");
}

function normalizeFlutterWidgetData(data) {
    let parsedData = data;

    if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
    }

    if (Array.isArray(parsedData)) return parsedData;

    if (
        parsedData &&
        typeof parsedData === "object" &&
        Array.isArray(parsedData.widgets)
    ) {
        return parsedData.widgets;
    }

    throw new Error("Invalid widget response received from Flutter.");
}

function prepareWidgets(apiResponse) {
    const widgets = [];

    for (const item of apiResponse) {
        if (!item || typeof item !== "object") continue;

        const widgetCode = Number(item.WidgetCode ?? item.widgetCode ?? item.id);
        const allocationValue = item.IsAllocated ?? item.isAllocated;
        const isAllocated = allocationValue == null ? 1 : Number(allocationValue);

        if (!Number.isFinite(widgetCode) || isAllocated !== 1) continue;

        widgets.push({
            id: widgetCode,
            name: item.WidgetName || item.widgetName || item.name || getDisplayName(widgetCode),
            icon: item.icon || getIcon(widgetCode),
            action: item.action || mapActionByCode(widgetCode),
            sequence: Number(item.Sequence ?? item.sequence ?? 0)
        });
    }

    // Uncomment when the response sequence must control widget order.
    // widgets.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

    return widgets.map(function (widget) {
        return {
            ...widget,
            name: resolveWidgetDisplayName(widget)
        };
    });
}

function initializeWidgetToggleButton() {
    const toggleBtn = document.getElementById("toggleBtn");
    if (!toggleBtn) return;

    let expanded = false;
    toggleBtn.textContent = "Show More";

    // Assign onclick instead of addEventListener to avoid duplicate handlers.
    toggleBtn.onclick = function () {
        const extraTabs = document.querySelectorAll("#widgetsContainer .extra-tab");

        extraTabs.forEach(function (tab) {
            tab.classList.toggle("hidden", expanded);
        });

        expanded = !expanded;
        toggleBtn.textContent = expanded ? "Show Less" : "Show More";
    };
}

// Renders only the response supplied by Flutter.
// There is intentionally no automatic widgets.json fetch in production.
function loadWidgets(apiResponse) {
    const gridContainer = document.getElementById("widgetsContainer");
    const drawerContainer = document.getElementById("drawerContainer");

    if (!gridContainer || !drawerContainer) {
        throw new Error("Widget containers were not found in the page.");
    }

    const widgets = prepareWidgets(apiResponse);
    let gridHTML = "";
    let drawerHTML = "";

    for (let index = 0; index < widgets.length; index++) {
        const widget = widgets[index];

        if (typeof window.renderWidget === "function") {
            gridHTML += window.renderWidget(widget, index);
        }

        if (typeof window.renderDrawerItem === "function") {
            drawerHTML += window.renderDrawerItem(widget);
        }
    }

    gridContainer.innerHTML = gridHTML;
    drawerContainer.innerHTML = drawerHTML;

    // Display Settings after all allocated widgets.
    if (typeof window.renderDrawerItem === "function") {
        drawerContainer.insertAdjacentHTML(
            "beforeend",
            window.renderDrawerItem({
                name: "Settings",
                action: "navigateToSetting"
            })
        );
    }

    showWidgetContentState(widgets.length);
    initializeWidgetToggleButton();

    // Widgets were inserted dynamically, so refresh AOS positions.
    if (typeof AOS !== "undefined" && typeof AOS.refreshHard === "function") {
        AOS.refreshHard();
    }
}

function startWidgetResponseTimeout() {
    window.clearTimeout(widgetResponseTimeoutId);

    widgetResponseTimeoutId = window.setTimeout(function () {
        if (!widgetResponseReceived) {
            showWidgetErrorState("Please close the application and open it again");
            console.error("Flutter widget response was not received within 30 seconds.");
        }
    }, WIDGET_RESPONSE_TIMEOUT_MS);
}

function initializeWidgetLoading() {
    showWidgetLoadingState();
    startWidgetResponseTimeout();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeWidgetLoading);
} else {
    initializeWidgetLoading();
}

// Called from Flutter WebView: setJewelloData(jsonData).
function setJewelloData(data) {
    try {
        const normalizedData = normalizeFlutterWidgetData(data);
        const serializedData = JSON.stringify(normalizedData);

        // Prevent an unnecessary rerender only after successful rendering.
        if (widgetResponseReceived && serializedData === lastWidgetData) return;

        window.jewelloData = normalizedData;
        loadWidgets(normalizedData);

        widgetResponseReceived = true;
        lastWidgetData = serializedData;
        window.clearTimeout(widgetResponseTimeoutId);

        console.log("Flutter Widgets Response:", normalizedData);
    } catch (error) {
        widgetResponseReceived = false;
        console.error("setJewelloData Error:", error);
        showWidgetErrorState("Unable to load services. Please try again.");
    }
}

// Retry requests a fresh widget response from Flutter.
function requestWidgetsAgain() {
    widgetResponseReceived = false;
    lastWidgetData = null;
    showWidgetLoadingState();
    startWidgetResponseTimeout();

    if (
        typeof Toaster !== "undefined" &&
        typeof Toaster.postMessage === "function"
    ) {
        Toaster.postMessage("requestWidgets");
    } else {
        window.clearTimeout(widgetResponseTimeoutId);
        showWidgetErrorState("Unable to request widgets from the application.");
        console.error("Toaster is not available to request widgets again.");
    }
}

// Jewello app banners function.
function loadBannerImages() {
    const swiperWrapper = document.querySelector(".brandingSwiper .swiper-wrapper");
    if (!swiperWrapper) return;

    const flutterImages = window.jewelloAppImages || [];

    if (flutterImages.length > 0) {
        let bannerHtml = "";

        flutterImages.forEach(function (img, index) {
            bannerHtml += `
                <div class="swiper-slide">
                    <img
                        src="${img}"
                        alt="Banner ${index + 1}"
                        class="w-full h-auto object-cover"
                        onerror="this.src='./assets/banner1.png'"
                    />
                </div>
            `;
        });

        swiperWrapper.innerHTML = bannerHtml;

        if (typeof window.onBannerImagesLoaded === "function") {
            window.onBannerImagesLoaded();
        }
    }
}

// Called from Flutter WebView: setJewelloAppImages(jsonData).
function setJewelloAppImages(data) {
    try {
        let parsedData = data;

        if (typeof parsedData === "string") {
            parsedData = JSON.parse(parsedData);
        }

        window.jewelloAppImages = Array.isArray(parsedData) ? parsedData : [];
        console.log("Flutter Images Response:", window.jewelloAppImages);
        loadBannerImages();
    } catch (error) {
        console.error("setJewelloAppImages Error:", error);
    }
}

// Expose Flutter entry points explicitly.
window.setJewelloData = setJewelloData;
window.setJewelloAppImages = setJewelloAppImages;
window.requestWidgetsAgain = requestWidgetsAgain;
