/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import Api from "../../../../api";
import { AdminContext } from "../../../withAdminData";

/**
 * Custom hook to handle integration settings API and state updates.
 *
 * This hook provides functions to add or update integration settings and retrieve
 * them using the provided API. It interacts with the AdminContext to update the
 * global state related to the settings.
 *
 * @returns {Object} Contains a method for adding or updating integration settings:
 * - addIntegrationSetting: Adds or updates integration settings.
 */
const useIntegrationApi = () => {
    // Access the setAdminStates function from AdminContext to update admin states
    const { setAdminStates } = useContext(AdminContext);

    /**
     * Adds or updates integration settings by sending the provided values to the API
     * and updates the admin state with the new settings if successful.
     *
     * @async
     * @param {Object} values - The settings values to be added or updated.
     */
    const addIntegrationSetting = async (values = {}) => {
        try {
            const res = await Api.settings.addSettings(values);

            // If the response indicates success, update the admin state with the new settings
            if (res?.success) {
                setAdminStates({ settings: res?.data });
            }
        } catch (error) {
            // Catch and log any errors that occur during the API call
            console.log(error);
        }
    };

    // Return the addIntegrationSetting function to be used in other components
    return { addIntegrationSetting };
};

export default useIntegrationApi;
