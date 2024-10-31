/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import Api from "../../../../api";
import { AdminContext } from "../../../withAdminData";
import { defaultSettings } from "../../../../globalConstant";

/**
 * Custom hook to retrieve and update global settings.
 *
 * @returns {Object} Contains a method to fetch global settings.
 */
const useSetGlobalSettingsApi = () => {
    const { setAdminStates } = useContext(AdminContext);

    /**
     * Fetches global settings from the API and updates the admin state.
     * If the API response is unsuccessful, default settings are used.
     *
     * @async
     */
    const getSettings = async () => {
        try {
            const res = await Api.settings.getSettings();
            if (res.success) {
                setAdminStates((prevState) => ({
                    ...prevState,
                    settings: res?.data || defaultSettings,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { getSettings };
};

export default useSetGlobalSettingsApi;
