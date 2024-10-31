import { getLocalStorageData } from "./processLocalStorage";
import { getSessionStorage } from "./processSessionStorage";

/**
 * Checks the frequency settings to determine whether a campaign display should be shown.
 *
 * @param {Object} params - The parameters for checking the frequency settings.
 * @param {string} params.id - The campaign ID.
 * @param {Object} params.controls - The controls containing frequency settings.
 * @returns {boolean} - Returns true if the campaign display should be shown, false otherwise.
 */
const checkFrequencySettings = ({ id, controls }) => {
    // Retrieve local data from localStorage (such as visit count, last display time, conversion status)
    const { localData, visits } = getLocalStorageData(id);
    let { count, time, is_converted } = localData;

    // Destructure frequency and user action settings from controls
    const { display_frequency, user_actions_to_stop_displaying } =
        controls?.frequency_settings || {};

    let res = true; // Default to showing the campaign

    // Check if the display frequency is set to "every session view"
    if (display_frequency?.value === "every_session_view") {
        // If no session data exists for this campaign, allow display
        if (!getSessionStorage(`poptics-campaign-${id}-viewed`)) {
            res = true;
        } else {
            // If session data exists, don't show the campaign again in this session
            return false;
        }
    } else if (display_frequency?.value === "custom_settings") {
        res = wp.hooks.applyFilters("check_display_once", res, {
            displayOnce: display_frequency?.display_once,
            visits,
            time,
        });

        if (!res) return;
    }

    // Check if any user actions should stop the campaign from being displayed
    if (user_actions_to_stop_displaying) {
        const { closed_campaign, action_on_campaign, seen_campaign } =
            user_actions_to_stop_displaying;

        // Stop displaying if the campaign has been closed by the user
        if (closed_campaign) {
            if (count === -1) {
                return false;
            } else {
                res = true;
            }
        }

        // Stop displaying if a conversion or user action on the campaign has occurred
        if (action_on_campaign) {
            if (is_converted) {
                return false;
            } else {
                res = true;
            }
        }

        // Stop displaying if the campaign has been seen a specified number of times
        if (seen_campaign?.value) {
            if (count < seen_campaign?.value) {
                res = true;
            } else {
                return false;
            }
        }
    }

    // Return the final result: whether the campaign should be displayed or not
    return res;
};

export default checkFrequencySettings;
