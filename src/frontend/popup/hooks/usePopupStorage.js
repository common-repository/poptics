/**
 * WordPress Dependencies
 */
import { useEffect, useContext } from "@wordpress/element";
import { PopupContext } from "../withPopupData";
import { setSessionStorage } from "../../helpers/processSessionStorage";
import { getLocalStorageData } from "../../helpers/processLocalStorage";

/**
 * Custom hook to manage and store popup interaction data in both localStorage and sessionStorage.
 * It tracks how many times a campaign has been viewed, manages session-based logic,
 * and increments the number of visits for campaigns based on frequency control settings.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} params.isOpen - The state that indicates whether the popup modal is open or closed.
 * @param {Object} params.campaign - The campaign data object containing frequency and audience controls.
 *
 * @returns {void} - This hook does not return any values.
 */
const usePopupStorage = ({ isOpen, campaign }) => {
    // Access the campaign states (such as campaignId) and updater functions from the PopupContext.
    const popupStates = useContext(PopupContext);
    const { campaignId } = popupStates;

    // Destructure the required properties from the campaign object.
    const { id, controls } = campaign;

    // Get the current view count and number of visits from localStorage.
    let { localData, visits } = getLocalStorageData(id);
    let { count } = localData; // Extract the current count of views.

    const displayFrequency = controls?.frequency_settings?.display_frequency;

    /**
     * useEffect hook to handle localStorage updates when the popup modal is opened.
     * This effect is triggered when the `isOpen` state or `campaignId` changes.
     */
    useEffect(() => {
        if (!campaignId && isOpen) {
            // Key used for tracking the view count of this campaign in localStorage.
            const key = `poptics-campaign-${id}-viewed`;

            // Only proceed if not in preview mode (campaignId is falsy) and the popup is open.
            const now = new Date().getTime(); // Get the current timestamp.

            if (count < 0) count = 0;
            count++; // Increment the view count.

            const storeTimestamp = wp.hooks.applyFilters(
                "store_timestamp",
                false,
                { displayFrequency },
            );

            // Update the localStorage with the incremented view count and possibly the timestamp.
            const data = JSON.stringify({
                count,
                ...(storeTimestamp && { time: now }),
            });
            localStorage.setItem(key, data);

            // Handle session storage if the audience targets 'returning' visitors or has session-specific frequency settings.
            if (
                controls?.audience?.audience_type?.value?.includes(
                    "returning",
                ) ||
                displayFrequency?.value === "every_session_view"
            ) {
                // Set session storage with a 20-minute expiration time.
                setSessionStorage(key, now, 20 * 60 * 1000); // 20 minutes = 20 * 60 * 1000 milliseconds.
            }
        }
    }, [isOpen, campaignId]); // Effect depends on the state of isOpen and campaignId.

    /**
     * useEffect hook to increment and store the number of visits in localStorage.
     * This effect runs once when the component mounts and updates the visit count for frequency control.
     */
    useEffect(() => {
        wp.hooks.applyFilters("store_visits", null, {
            displayFrequency,
            visits,
        });
    }, []);
};

export default usePopupStorage;
