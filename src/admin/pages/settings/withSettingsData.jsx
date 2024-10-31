/**
 * WordPress Dependencies
 */
import { useState, createContext } from "@wordpress/element";

// Create a context for settings data
export const SettingsContext = createContext();

/**
 * Higher Order Component (HOC) to provide settings data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with settings data context.
 */
const withSettingsData = (WrappedComponent) => {
    return (props) => {
        const initialValue = {
            editLoading: false,
        };

        // Initialize state for settings data
        const [settingsState, setSettingsState] = useState(initialValue);

        const resetSettings = () => {
            setSettingsState(initialValue);
        };

        // Provide settings state and updater to the wrapped component
        return (
            <SettingsContext.Provider
                value={{ ...settingsState, setSettingsState, resetSettings }}
            >
                <WrappedComponent {...props} />
            </SettingsContext.Provider>
        );
    };
};

export default withSettingsData;
