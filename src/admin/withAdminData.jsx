/**
 * WordPress Dependencies
 */
import {
    StrictMode,
    Suspense,
    useState,
    createContext,
    useEffect,
} from "@wordpress/element";

import { ConfigProvider, notification, App } from "antd";
import { hooks } from "../helper";
import { Skeleton } from "../common/components";
import { theme } from "../theme/theme";

// Create a context for admin data
export const AdminContext = createContext();

/**
 * Higher Order Component (HOC) to provide admin data and state management.
 *
 * Wraps a component to supply it with admin-related data via context, and manages
 * notifications and other global admin state.
 *
 * @param {React.Component} WrappedComponent - The component to wrap and provide data to.
 * @returns {React.Component} - The wrapped component with admin data context.
 */
const withAdminData = (WrappedComponent) => {
    return (props) => {
        // Initialize state for admin data (e.g., settings)
        const [adminStates, setAdminStates] = useState({
            settings: null,
            isProActivated: !!window.popticsPro,
        });

        const { addAction, removeAction } = hooks;
        const [api, contextHolder] = notification.useNotification();

        // Function to trigger a notification
        const openNotification = (data) => {
            const { type, ...params } = data;
            api[type]({
                placement: "bottomRight",
                ...params,
            });
        };

        useEffect(() => {
            // Register notification handler
            addAction("notification", "openNotification", openNotification);

            // Cleanup: Remove notification handler
            return () => removeAction("notification", "openNotification");
        }, []);

        // Provide admin state and updater to the wrapped component
        return (
            <StrictMode>
                <Suspense fallback={<Skeleton />}>
                    <ConfigProvider theme={theme}>
                        <App>
                            {contextHolder}
                            <AdminContext.Provider
                                value={{ ...adminStates, setAdminStates }}
                            >
                                <WrappedComponent {...props} />
                            </AdminContext.Provider>
                        </App>
                    </ConfigProvider>
                </Suspense>
            </StrictMode>
        );
    };
};

export default withAdminData;
