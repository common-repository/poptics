/**
 * WordPress Dependencies
 */
import { useState, createContext } from "@wordpress/element";

// Create a context for popup data
export const PopupContext = createContext();

/**
 * Higher Order Component (HOC) to provide popup data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with popup data context.
 */
const withPopupData = (WrappedComponent) => {
    return (props) => {
        // Get the element with the ID "active-campaigns"
        const element = document.getElementById("active-campaigns");

        // Parse the base64-encoded JSON data from the "data-campaigns" attribute
        const activeCampaigns = JSON.parse(
            atob(element?.getAttribute("data-campaigns") ?? "") || "[]",
        );

        // Get the current URL
        const currentUrl = window.location.href;

        // Create a URL object
        const url = new URL(currentUrl);

        // Get the search parameters
        const searchParams = new URLSearchParams(url.search);

        // Get the value of campaign id from parameter
        const campaignId = searchParams.get("poptics_campaign_id");

        // Retrieve the 'page-info' attribute from the HTML element with ID 'poptics-popup-wrapper'.
        const pageId = JSON.parse(
            document
                .getElementById("poptics-popup-wrapper")
                ?.getAttribute("page-info") || "{}",
        )?.id;

        // Initialize state for popup data
        const [popupStates, setPopupStates] = useState({
            activeCampaigns: campaignId ? [] : activeCampaigns,
            convertedIds: [],
            campaignId,
            pageId,
        });

        // Provide popups state and updater to the wrapped component
        return (
            <PopupContext.Provider value={{ ...popupStates, setPopupStates }}>
                <WrappedComponent {...props} />
            </PopupContext.Provider>
        );
    };
};

export default withPopupData;
