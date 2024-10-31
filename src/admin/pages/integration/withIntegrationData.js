/**
 * WordPress Dependencies
 */
import { createContext, useState } from "@wordpress/element";

export const IntegrationContext = createContext();

/**
 * Higher Order Component (HOC) to provide integration data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with integration data context.
 */

const withIntegrationData = (WrappedComponent) => {
    return () => {
        const initialState = {
            searchKey: "",
        };
        const [integrationState, setIntegrationState] = useState(initialState);

        return (
            <IntegrationContext.Provider
                value={{ ...integrationState, setIntegrationState }}
            >
                <WrappedComponent />
            </IntegrationContext.Provider>
        );
    };
};

export default withIntegrationData;
