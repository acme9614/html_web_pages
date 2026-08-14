/**
 * Londe Jewellers page adapter.
 * Common widgetConfig.js remains unchanged.
 * API/JSON icon URLs are intentionally ignored on this page.
 */

const LONDE_WIDGET_UI = {
    1:  { icon: "📦", title: "Advance Order", subtitle: "Place your order", tone: "gold" },
    2:  { icon: "🏦", subtitle: "Link your account", tone: "peacock" },
    3:  { icon: "📈", subtitle: "Check today's rate", tone: "gold" },
    4:  { icon: "📄", subtitle: "Submit your documents", tone: "peacock" },
    5:  { icon: "💳", subtitle: "View your customer card", tone: "gold" },
    6:  { icon: "🧾", subtitle: "View scheme records", tone: "peacock" },
    7:  { icon: "🛍️", subtitle: "Track your orders", tone: "gold" },
    8:  { icon: "💻", subtitle: "View payment history", tone: "peacock" },
    9:  { icon: "🪙", subtitle: "Manage digital gold", tone: "gold" },
    11: { icon: "📅", subtitle: "View Panchang", tone: "gold" },
    18: { icon: "📰", subtitle: "Browse collections", tone: "peacock" },
    19: { icon: "🛒", subtitle: "Buy instantly", tone: "gold" },
    20: { icon: "💬", subtitle: "Share your feedback", tone: "peacock" },
    23: { icon: "✨", subtitle: "Try jewellery virtually", tone: "gold" }
};

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function isSchemeWidget(widget) {
    const id = Number(widget?.id);
    const name = String(widget?.name || "").trim().toLowerCase();

    return id === 1 || ["scheme", "saving scheme", "savings scheme"].includes(name);
}

function getWidgetUi(widget) {
    const id = Number(widget?.id);
    const config = LONDE_WIDGET_UI[id] || {
        icon: "💎",
        subtitle: "Open this service",
        tone: "gold"
    };

    return {
        icon: config.icon,
        title: isSchemeWidget(widget)
            ? "Advance Order"
            : (config.title || String(widget?.name || "Service").trim() || "Service"),
        subtitle: config.subtitle,
        tone: config.tone
    };
}

/**
 * Called by the existing common loadWidgets() function.
 * First four widgets -> Quick Actions.
 * Remaining widgets -> More.
 */
window.renderWidget = function renderWidget(widget, index) {
    const widgetId = Number(widget?.id) || 0;
    const widgetName = String(widget?.name || "").trim().toLowerCase();
    const widgetAction = String(widget?.action || "").trim();

    // Profile is already available in the bottom navigation.
    // Do not show it again in Quick Actions or More.
    if (
        widgetId === 10 ||
        widgetName === "profile" ||
        widgetAction === "navigateToUserProfile"
    ) {
        return "";
    }

    const ui = getWidgetUi(widget);
    const action = escapeHtml(widget?.action || "navigateToHomePage");
    const title = escapeHtml(ui.title);
    const subtitle = escapeHtml(ui.subtitle);
    const icon = escapeHtml(ui.icon);
    const tone = ui.tone === "peacock" ? "peacock" : "gold";

    if (index < 4) {
        return `
            <button
                type="button"
                class="action-card dynamic-widget-card"
                data-widget-zone="quick"
                data-widget-id="${widgetId}"
                data-widget-action="${action}">
                <span class="action-icon icon-tone-${tone}" aria-hidden="true">${icon}</span>
                <span class="action-title">${title}</span>
                <span class="action-subtitle">${subtitle}</span>
            </button>
        `;
    }

    return `
        <button
            type="button"
            class="more-card dynamic-widget-card"
            data-widget-zone="more"
            data-widget-id="${widgetId}"
            data-widget-action="${action}">
            <span class="more-icon icon-tone-${tone}" aria-hidden="true">${icon}</span>
            <span class="more-copy">
                <span class="more-title">${title}</span>
                <span class="more-subtitle">${subtitle}</span>
            </span>
            <span class="more-arrow" aria-hidden="true">›</span>
        </button>
    `;
};

function distributeWidgets() {
    const source = document.getElementById("widgetsContainer");
    const quick = document.getElementById("quickActionsContainer");
    const more = document.getElementById("moreActionsContainer");
    const moreSection = document.getElementById("moreSection");

    if (!source || !quick || !more || !moreSection) return;

    const cards = [...source.querySelectorAll(".dynamic-widget-card")];
    if (!cards.length) return;

    quick.replaceChildren();
    more.replaceChildren();

    cards.forEach((card) => {
        (card.dataset.widgetZone === "quick" ? quick : more).appendChild(card);
    });

    moreSection.classList.toggle("hidden", more.children.length === 0);
}

function callNavigation(functionName) {
    if (typeof window[functionName] === "function") {
        window[functionName]();
        return;
    }

    console.error("Navigation function not found:", functionName);
}

function bindPageNavigation() {
    document.getElementById("brandButton")?.addEventListener("click", () => callNavigation("navigateToHomePage"));
    document.getElementById("homeNavButton")?.addEventListener("click", () => callNavigation("navigateToHomePage"));
    document.getElementById("centerJewellerButton")?.addEventListener("click", () => callNavigation("navigateToHomePage"));
    document.getElementById("profileNavButton")?.addEventListener("click", () => callNavigation("navigateToUserProfile"));
    document.getElementById("notificationButton")?.addEventListener("click", () => callNavigation("navigateToNotification"));
    document.getElementById("settingsButton")?.addEventListener("click", () => callNavigation("navigateToSetting"));
}

document.addEventListener("click", (event) => {
    const card = event.target.closest(".dynamic-widget-card");
    if (card?.dataset.widgetAction) {
        callNavigation(card.dataset.widgetAction);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const source = document.getElementById("widgetsContainer");

    if (source) {
        new MutationObserver(distributeWidgets).observe(source, { childList: true });
        distributeWidgets();
    }

    bindPageNavigation();
});
