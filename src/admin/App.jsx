/**
 * wordpress dependencies
 */
import { useEffect } from "@wordpress/element";

/**
 * other library dependencies
 */
import { RouterProvider } from "react-router-dom";

/**
 * local dependencies
 */
import router from "./router";
import withAdminData from "./withAdminData";
import useSetGlobalSettingsApi from "./pages/settings/hooks/useSetGlobalSettingsApi";

const App = () => {
    const { getSettings } = useSetGlobalSettingsApi();

    useEffect(() => {
        getSettings();
    }, []);

    return <RouterProvider router={router} />;
};
export default withAdminData(App);
