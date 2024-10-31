/**
 * WordPress Dependencies
 */
import { useState, useContext } from "@wordpress/element";

import { getDeviceType } from "../../helper";
import { PopupContext } from "../popup/withPopupData";
import ShowHtml from "../../common/components/ShowHtml";
import usePopupControlCheck from "../popup/hooks/usePopupControlCheck";
import usePopupEventListener from "../popup/hooks/usePopupEventListener";
import usePopupStorage from "../popup/hooks/usePopupStorage";

/**
 * PopupModal component handles the display of popup campaigns based on
 * various targeting, frequency control settings, and event listeners.
 *
 * This component leverages several hooks to:
 * - Check if the popup should be displayed based on audience targeting and device type.
 * - Handle the popup open/close state.
 * - Store the popup state in local/session storage.
 * - Render the popup content dynamically using the `ShowHtml` component.
 *
 * @param {Object} campaign - The campaign data object containing all the relevant settings and content for the popup.
 * @returns {JSX.Element|null} - Returns the popup modal JSX element if the conditions are met, or null if the popup should not be shown.
 */
const PopupModal = ({ campaign }) => {
    // Retrieve popup state and updater function from the PopupContext.
    const popupStates = useContext(PopupContext);
    const { campaignId } = popupStates;

    // State to control the open/close status of the popup modal.
    // Initially set to `null` to indicate that the open state is undecided.
    const [isOpen, setIsOpen] = useState(null);

    // Destructure the necessary properties from the campaign object.
    // `id` is the unique identifier for the campaign.
    const { id } = campaign;

    // Determine the device type based on screen width or campaign context:
    // If there's no campaignId (popup not loaded yet), use a helper function to detect the device type.
    // Otherwise, classify devices with screen widths <= 576px as "mobile", and others as "desktop".
    const deviceType = !campaignId
        ? getDeviceType()
        : window.innerWidth <= 576
        ? "mobile"
        : "desktop";

    // Function to trigger the opening of the popup modal by updating the isOpen state to `true`.
    const showModal = () => {
        if (!isOpen) setIsOpen(true);
    };

    // Custom hook to manage popup control checks:
    // This hook determines whether the popup should be displayed based on audience targeting and campaign settings.
    usePopupControlCheck({ showModal, campaign, deviceType });

    // Custom hook to handle popup events:
    // This includes managing the open/close state of the popup and listening to any relevant events tied to user actions.
    // The hook also retrieves the content blocks for the popup (HTML to be rendered).
    const { blocks } = usePopupEventListener({
        isOpen,
        setIsOpen,
        campaign,
        deviceType,
    });

    // Custom hook to manage storing popup state (open/close status) in local or session storage:
    // This ensures that the popup display settings persist between sessions if necessary.
    usePopupStorage({ isOpen, campaign });

    // Define the popup content as a `div` element that includes the dynamic content blocks (rendered using the ShowHtml component).
    const popup = (
        <div id={`poptics-campaign-${id}`}>
            <ShowHtml content={blocks} />
        </div>
    );

    return isOpen ? popup : null;
};

export default PopupModal;
