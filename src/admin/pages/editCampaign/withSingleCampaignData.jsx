/**
 * WordPress Dependencies
 */
import { useState, createContext } from "@wordpress/element";

import getDeviceType from "../../../helper/getDeviceType";

// Create a context for campaign data
export const SingleCampaignContext = createContext();

/**
 * Higher Order Component (HOC) to provide campaign data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with campaign data context.
 */
const withSingleCampaignData = (WrappedComponent) => {
    return (props) => {
        // Initialize state for campaign data
        const [campaignStates, setCampaignStates] = useState({
            campaign: null,
            currentStep: 1,
            deviceType: getDeviceType(),
            editorStep: 0,
        });

        // Provide campaign state and updater to the wrapped component
        return (
            <SingleCampaignContext.Provider
                value={{ ...campaignStates, setCampaignStates }}
            >
                <WrappedComponent {...props} />
            </SingleCampaignContext.Provider>
        );
    };
};

export default withSingleCampaignData;
