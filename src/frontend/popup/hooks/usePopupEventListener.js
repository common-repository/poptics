/**
 * WordPress Dependencies
 */
import { useState, useEffect, useContext, useRef } from "@wordpress/element";

import { PopupContext } from "../withPopupData";
import usePopupApi from "./usePopupApi";
import { getLocalStorageData } from "../../helpers/processLocalStorage";
import useLeadCollectionHandler from "./useLeadCollectionHandler";
import useCountdownTimer from "./useCountdownTimer";

/**
 * Custom hook that manages popup modal event listeners, including window resize events
 * and user interactions (e.g., clicking the close button or overlay to close the popup).
 * It also handles content updates based on the current device type (mobile/desktop).
 *
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} params.isOpen - The state that indicates whether the popup modal is open or closed.
 * @param {Function} params.setIsOpen - Function to set the popup modal's open/closed state.
 * @param {Object} params.campaign - The campaign data object containing steps and content.
 * @param {string} params.deviceType - The type of device currently being used (e.g., 'desktop', 'mobile').
 *
 * @returns {Object} - Returns an object containing the current content blocks to display in the popup.
 */
const usePopupEventListener = ({ isOpen, setIsOpen, campaign, deviceType }) => {
    // Ref to keep track of the initial window width, used for determining device type changes.
    const windowWidthRef = useRef(window.innerWidth);

    // Access the campaign states (such as campaignId) and update functions from the PopupContext.
    const popupStates = useContext(PopupContext);
    const { convertedIds, campaignId } = popupStates;

    // Extract the campaign ID and the content steps (based on the device type).
    const { id, steps, controls } = campaign;

    // State to store the content blocks for the popup, initialized with content for the current device type.
    const [blocks, setBlocks] = useState(steps[0]?.[deviceType]?.content);

    // Custom hook to manage storing analytics data for the campaign.
    const { storeAnalytics } = usePopupApi(controls);

    // Keep track of convertedIds in a ref to access updated values inside event listeners.
    const convertedRef = useRef();
    useEffect(() => {
        convertedRef.current = convertedIds;
    }, [convertedIds]);

    // Manage lead collection when the popup is open.
    useLeadCollectionHandler({ isOpen, id, controls });

    useCountdownTimer({ isOpen, id });

    /**
     * Close the popup and record analytics if necessary.
     *
     * @param {Event} e - The click event for closing the popup.
     */
    const handleClose = (e) => {
        e.stopPropagation();

        if (!campaignId) {
            // Record analytics if the popup has not yet been converted.
            if (!convertedRef.current.includes(id)) {
                storeAnalytics({ id });
            }

            // Check if the user action (closing) should stop further popup displays based on campaign settings.
            if (
                controls?.frequency_settings?.user_actions_to_stop_displaying
                    ?.closed_campaign
            ) {
                const { localData } = getLocalStorageData(id);
                const key = `poptics-campaign-${id}-viewed`;
                const data = JSON.stringify({ ...localData, count: -1 });

                // Set localStorage to prevent further popup views.
                localStorage.setItem(key, data);
            }
        }

        // Close the popup by updating the isOpen state.
        setIsOpen(false);
    };

    /**
     * Handle clicks inside the popup body, performing actions based on the clickable data attribute.
     */
    const handlePopupBodyClick = () => {
        // Get the campaign container element by its unique ID using the 'id' variable.
        const campaignContainer = document.getElementById(
            `poptics-campaign-${id}`,
        );
        const clickable = JSON.parse(
            campaignContainer
                .querySelector("#popticsPopupBody")
                ?.getAttribute("data-click-popup-body") || "{}",
        );

        const { action, link, target_blank } = clickable;

        // Handle link clicks if the action is set to "link".
        if (action === "link") {
            if (target_blank) {
                window.open(link, "_blank"); // Open link in a new tab if target_blank is true.
            } else {
                window.location.href = link; // Otherwise, navigate to the link in the same tab.
            }
        }
    };

    /**
     * Handle conversion events (e.g., button clicks that count as conversions).
     *
     * @param {Event} e - The click event.
     */
    const handleConversionClick = (e) => {
        e.preventDefault();

        // Record conversion analytics if the popup has not yet been converted.
        if (!convertedRef.current.includes(id)) {
            storeAnalytics({ id, is_converted: 1 });
        }
    };

    /**
     * Set up event listeners when the popup is open and remove them when it's closed.
     */
    useEffect(() => {
        /**
         * Adjust popup content based on window resizing, switching between mobile and desktop content.
         */
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            setBlocks(
                steps[0]?.[
                    currentWidth < windowWidthRef.current ? "mobile" : "desktop"
                ]?.content,
            );
            windowWidthRef.current = currentWidth;
        };

        // Retrieve the campaign container and the close button/overlay elements.
        const campaignContainer = document.getElementById(
            `poptics-campaign-${id}`,
        );
        if (!campaignContainer) return;

        const closeBtn = campaignContainer.querySelector("#popticsCloseBtn");
        const overlay = campaignContainer.querySelector(
            "#popticsOverlay[data-close-popup-on-click]",
        );
        const popupBody = campaignContainer.querySelector(
            "#popticsPopupBody[data-click-popup-body]",
        );
        const conversionElements = document.querySelectorAll(
            '[data-count-conversion="true"]',
        );

        // Add event listeners for closing and resizing the popup.
        const addEventListeners = () => {
            closeBtn?.addEventListener("click", handleClose);
            overlay?.addEventListener("click", handleClose);
            popupBody?.addEventListener("click", handlePopupBodyClick);

            // Only add window resize listener in preview mode.
            if (campaignId) {
                window.addEventListener("resize", handleResize);
            } else {
                // Iterate through each element that has the data attribute 'data-count-conversion="true"'.
                conversionElements.forEach((element) => {
                    // Check if the element is not a button, or if it is a button but not a form submit button,
                    // or if it is not inside the form with id 'popticsForm'.
                    if (
                        element.tagName !== "BUTTON" || // Exclude buttons from this logic
                        element.type !== "submit" || // Exclude submit buttons specifically
                        element.closest("form")?.id !== "popticsForm" // Exclude buttons within a form with id 'popticsForm'
                    ) {
                        // If the element meets the above conditions, add a click event listener
                        // that will trigger the handleConversionClick function.
                        element.addEventListener(
                            "click",
                            handleConversionClick, // Handle the conversion click to count it as a conversion
                        );
                    }
                });
            }
        };

        // Remove the event listeners when the popup is closed or component unmounts.
        const removeEventListeners = () => {
            closeBtn?.removeEventListener("click", handleClose);
            overlay?.removeEventListener("click", handleClose);
            popupBody?.removeEventListener("click", handlePopupBodyClick);
            if (campaignId) {
                window.removeEventListener("resize", handleResize);
            } else {
                conversionElements.forEach((element) => {
                    if (
                        element.tagName !== "BUTTON" ||
                        element.type !== "submit" ||
                        element.closest("form")?.id !== "popticsForm"
                    ) {
                        element.removeEventListener(
                            "click",
                            handleConversionClick,
                        );
                    }
                });
            }
        };

        addEventListeners(); // Attach listeners when the popup opens.
        return () => removeEventListeners(); // Cleanup listeners when the popup closes/unmounts.
    }, [isOpen]);

    return { blocks }; // Return the content blocks to display.
};

export default usePopupEventListener;
