import { useState, createContext } from "@wordpress/element";

export const AnalyticsContext = createContext();

/**
 * Higher Order Component (HOC) to provide analytics data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with analytics data context.
 */

const withAnalyticsData = (WrappedComponent) => {
    return () => {
        const initialState = {
            loading: null,
            campaignId: "",
            campaignList: null,
            dateRange: "",
            cardViewData: null,
            statisticalAnalysis: [],
            pieDataDesktop: null,
            pieDataOthers: null,
            pieDataMobile: null,
            countryBasedData: [],
            browserBasedData: [],
            pageBasedData: [],
        };
        const [analyticsStates, setAnalyticsStates] = useState(initialState);

        return (
            <AnalyticsContext.Provider
                value={{ ...analyticsStates, setAnalyticsStates }}
            >
                <WrappedComponent />
            </AnalyticsContext.Provider>
        );
    };
};

export default withAnalyticsData;
