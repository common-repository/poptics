/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import Api from "../../../../api";
import { SettingsContext } from "./../withSettingsData";
import { AdminContext } from "../../../withAdminData";

const useSettingsApi = () => {
    const { setAdminStates } = useContext(AdminContext);
    const { setSettingsState } = useContext(SettingsContext);

    const editSettings = async (settings) => {
        try {
            // set the loading state to true before editing settings
            setSettingsState((prevState) => ({
                ...prevState,
                editLoading: true,
            }));
            await Api.settings.addSettings(settings);

            setAdminStates((prevState) => ({ ...prevState, settings }));
        } catch (error) {
            console.log(error);
        } finally {
            // set the loading state to false after editing settings
            setSettingsState((prevState) => ({
                ...prevState,
                editLoading: false,
            }));
        }
    };

    return { editSettings };
};

export default useSettingsApi;
