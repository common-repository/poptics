/**
 * WordPress Dependencies
 */
import { useEffect, useContext } from "@wordpress/element";

import { PopupContext } from "../withPopupData";
import checkPageTarget from "../../helpers/checkPageTarget";
import checkAudience from "../../helpers/checkAudience";
import checkUserBehaviour from "../../helpers/checkUserBehave";
import checkFrequencySettings from "../../helpers/checkFrequencySettings";

/**
 * Custom hook to control the display of a popup modal by checking various campaign conditions
 * such as page targeting, audience, user behavior, and frequency settings.
 *
 * This hook evaluates whether the popup should be shown by running multiple checks related
 * to the campaign settings. If all conditions are met, the popup is displayed.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {Function} params.showModal - The function to open the popup modal.
 * @param {Object} params.campaign - The campaign object containing controls and settings.
 * @param {string} params.deviceType - The type of device currently in use (e.g., 'desktop', 'mobile').
 */
const usePopupControlCheck = ({ showModal, campaign, deviceType }) => {
    // Access popup-related state (e.g., campaignId, pageId) from the PopupContext.
    const popupStates = useContext(PopupContext);
    const { campaignId, pageId } = popupStates;

    // Extract the campaign ID and control settings from the campaign object.
    const { id, controls } = campaign;

    /**
     * Function that performs all necessary checks to determine whether to display the popup.
     * The checks include page targeting, audience targeting, user behavior, and frequency settings.
     */
    const checkControls = () => {
        // 1. Check if the current page matches the campaign's page targeting settings.
        if (!checkPageTarget({ controls })) return;

        // 2. Check if the audience matches the campaign's audience targeting rules (new/returning visitors).
        if (!checkAudience({ id, controls })) return;

        // 3. Check if the frequency settings allow the popup to be shown again (e.g., display once per session).
        if (!checkFrequencySettings({ id, controls, pageId })) return;

        // 4. Check user behavior conditions (e.g., how much they have scrolled, how long they stayed on the page).
        if (!checkUserBehaviour({ controls, showModal })) return;

        // If all checks pass, show the popup by calling the provided showModal function.
        showModal();
    };

    /**
     * useEffect hook that runs the control checks when the campaignId changes.
     *
     * If a campaignId exists (preview mode), the popup is shown immediately.
     * Otherwise, the hook runs the control checks to determine if the popup should be shown.
     */
    useEffect(() => {
        if (campaignId) {
            // If in preview mode (campaignId is set), display the popup directly.
            showModal();
        } else {
            // Otherwise, check the controls to decide if the popup should be displayed.
            checkControls();
        }
    }, [campaignId]); // Runs this effect whenever the campaignId changes.
};

export default usePopupControlCheck;
