/**
 * @author Ajit Mane
 * @description
 * RF ID #202679
 * Dynamic widget loading from Flutter response
 * Uses external config (widgetConfig.js)
 */

const { NAVIGATION_MAP, ACTION_MAP, ICON_MAP, NAME_MAP } = window.WidgetConfig || {};

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
         // Data injected from Flutter using setJewelloData()
        const apiResponse = window.jewelloData;

        // Safety check
        if (!apiResponse || !Array.isArray(apiResponse)) {
            console.warn("No API data received from Flutter");
            return;
        }

        const widgets = [];

        // Single loop (optimized):
        // - Filters only enabled widgets
        // - Converts API structure → UI structure
        for (const item of apiResponse) {
            if (item.IsAllocated !== 1) continue;

            widgets.push({
                id: item.WidgetCode,
                name: getDisplayName(item.WidgetCode),
                icon: getIcon(item.WidgetCode),
                action: mapActionByCode(item.WidgetCode),
                sequence: item.Sequence
            });
        }

      // Sort widgets by sequence (from API)
        widgets.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

        // Get UI containers
        const gridContainer = document.getElementById("widgetsContainer");
        const drawerContainer = document.getElementById("drawerContainer");

        let gridHTML = "";
        let drawerHTML = "";

         // Render widgets into HTML using external render functions
        for (let i = 0; i < widgets.length; i++) {
            const widget = widgets[i];

            // Render grid item (home screen)
            if (typeof window.renderWidget === "function") {
                gridHTML += window.renderWidget(widget, i);
            }

            // Render drawer item (side menu)
            if (drawerContainer && typeof window.renderDrawerItem === "function") {
                drawerHTML += window.renderDrawerItem(widget);
            }
        }

        // Update DOM only once (better performance)
        if (gridContainer && gridHTML) {
            gridContainer.innerHTML = gridHTML;
        }

        if (drawerContainer && drawerHTML) {
            drawerContainer.innerHTML = drawerHTML;
        }

    } catch (error) {
        console.error("Widget Load Error:", error);
    }
}

// NOTE:
// If Flutter data is not yet available,
// this will not render anything until setJewelloData() is called
document.addEventListener("DOMContentLoaded", loadWidgets);

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