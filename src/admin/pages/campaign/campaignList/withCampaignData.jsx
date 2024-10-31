/**
 * WordPress Dependencies
 */
import { useState, createContext } from "@wordpress/element";

import { pagination } from "../../../../globalConstant";

// Destructure pagination values
const { paged, per_page } = pagination;

// Create a context for campaign data
export const CampaignContext = createContext();

/**
 * Higher Order Component (HOC) to provide campaign data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with campaign data context.
 */
const withCampaignData = (WrappedComponent) => {
    return (props) => {
        // Initialize state for campaign data
        const [campaignStates, setCampaignStates] = useState({
            campaignList: null,
            total: null,
            searchQuery: {
                search_key: "",
                type: "",
                goal: "",
                status: "",
                paged,
                per_page,
            },
        });

        // Provide campaign state and updater to the wrapped component
        return (
            <CampaignContext.Provider
                value={{ ...campaignStates, setCampaignStates }}
            >
                <WrappedComponent {...props} />
            </CampaignContext.Provider>
        );
    };
};

export default withCampaignData;
