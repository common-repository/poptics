import { getDeviceType } from "../../helper";
import { getLocalStorageData } from "./processLocalStorage";
import { getSessionStorage } from "./processSessionStorage";

/**
 * Checks if the visitor is a returning visitor by verifying the session storage status.
 *
 * @param {string} id - The unique identifier for the campaign.
 * @returns {boolean} - Returns true if the visitor has an active session indicating they have viewed the campaign;
 *                      returns false if the session has expired or does not exist.
 */
const checkReturningVisitorSession = (id) => {
    // Check if the session storage for the given campaign ID is "expired"
    // or if no session storage is found (i.e., the visitor has not viewed the campaign)
    if (
        getSessionStorage(`poptics-campaign-${id}-viewed`) === "expired" ||
        !getSessionStorage(`poptics-campaign-${id}-viewed`)
    ) {
        // If the session has expired or does not exist, return false indicating the visitor is not a returning visitor
        return false;
    } else {
        // If a valid session exists, return true indicating the visitor is a returning visitor
        return true;
    }
};

/**
 * Function to determine whether a campaign should be shown based on audience controls.
 *
 * @param {Object} params - Object containing parameters for audience controls.
 * @param {string} params.id - The unique identifier for the campaign.
 * @param {Object} params.controls - The controls object containing audience settings.
 * @returns {boolean} - Returns true if the campaign should be shown, false otherwise.
 */
const checkAudience = ({ id, controls }) => {
    // Destructure audience_type and device_target from the controls object
    const { audience_type, device_target } = controls?.audience || {};

    // Retrieve local data (such as visit count) from local storage
    const { localData } = getLocalStorageData(id);
    const { count } = localData;

    // Initialize the result variable to false, which will track whether the campaign should be shown
    let res = false;

    // Check if the audience type includes "new" (for new visitors) but does not include "returning" (for returning visitors)
    if (
        audience_type?.value.includes("new") &&
        !audience_type?.value.includes("returning")
    ) {
        // If the visitor is new (visit count is 0), set res to true to display the campaign
        if (!count) {
            res = true;
        } else {
            // If the visitor is not new, return the current value of res (which is false) without further checks
            return res;
        }
    }
    // Check if the audience type includes both "new" and "returning" visitors
    else if (
        audience_type?.value.includes("new") &&
        audience_type?.value.includes("returning")
    ) {
        // If the visitor is new (visit count is 0), set res to true
        if (!count) {
            res = true;
        } else {
            // If the visitor is returning and does not have an active session, set res to true (show campaign)
            if (!checkReturningVisitorSession(id)) {
                res = true;
            } else {
                // If the visitor has an active session, return the current value of res (false)
                return res;
            }
        }
    }
    // Check if the audience type includes only "returning" visitors and not "new" visitors
    else if (
        !audience_type?.value.includes("new") &&
        audience_type?.value.includes("returning")
    ) {
        // If the visitor is returning and does not have an active session, set res to true (show campaign)
        if (!checkReturningVisitorSession(id)) {
            res = true;
        } else {
            // If the visitor has an active session, return the current value of res (false)
            return res;
        }
    }

    // Check if the campaign targets specific devices (custom device) or all devices
    if (device_target?.value === "custom_device") {
        const deviceType = getDeviceType({ replaceOthers: false });

        // If the current device type matches the selected device, set res to true (show campaign)
        if (device_target?.selected_value.includes(deviceType)) {
            res = true;
        }
    } else if (device_target?.value === "all_devices") {
        // If the campaign targets all devices, set res to true
        res = true;
    }

    // Return the final result, indicating whether the campaign should be displayed or not
    return res;
};

export default checkAudience;
