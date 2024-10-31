/**
 * WordPress Dependencies
 */
import { useState, createContext } from "@wordpress/element";

// Create a context for template data
export const TemplateContext = createContext();

/**
 * Higher Order Component (HOC) to provide template data and state management.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with template data context.
 */
const withTemplateData = (WrappedComponent) => {
    return (props) => {
        // Initialize state for template data
        const [templateStates, setTemplateStates] = useState({
            templatesList: null,
            selectedTypes: [],
            selectedGoals: [],
            selectedEvents: [],
            goals: [],
            types: [],
            events: [],
            taxonomyGoals: null,
            taxonomyTypes: null,
            total: null,
            searchQuery: {
                search_key: "",
                type: "",
                goal: "",
                status: "",
            },
            templateId: null,
            template: null,
            deviceType: "desktop",
            recommendedTemplates: null,
        });

        // Provide template state and updater to the wrapped component
        return (
            <TemplateContext.Provider
                value={{ ...templateStates, setTemplateStates }}
            >
                <WrappedComponent {...props} />
            </TemplateContext.Provider>
        );
    };
};

export default withTemplateData;
