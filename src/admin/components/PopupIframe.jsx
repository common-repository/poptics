const { __ } = wp.i18n;

/**
 * PopupIframe Component
 * Renders an iframe for a campaign popup.
 * @param {Object} props - The component props.
 * @param {string} props.campaignId - The ID of the campaign to display.
 * @param {string} props.deviceType - The type of device for the preview (e.g., "desktop", "mobile").
 * @returns {JSX.Element} - The PopupIframe component.
 */
const PopupIframe = ({ campaignId, deviceType }) => {
    // Construct the source URL for the iframe, including the campaign ID
    const src = `${window?.poptics?.site_url}/?poptics_campaign_id=${campaignId}`;

    return (
        <>
            {/* Container with aspect ratio and device type specific class */}
            <div
                className={`pt-aspect-ratio-container pt-${deviceType}-preview`}
            >
                {/* Render the iframe with the constructed source URL */}
                <iframe src={src} title={__("Campaign Popup", "poptics")} />
            </div>
        </>
    );
};

export default PopupIframe; // Export the PopupIframe component
