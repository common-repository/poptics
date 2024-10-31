/**
 * WordPress dependencies
 */
import { useContext, useEffect, useState } from "@wordpress/element";

import { Button, Text } from "../../../../common/components"; // Common button and text components
import { SingleCampaignContext } from "../withSingleCampaignData"; // Context to access campaign data
import { getDeviceType } from "../../../../helper"; // Helper function to get the current device type
import { Flex, Space } from "antd"; // Ant Design components for layout
import {
    defaultDesktopBlock,
    defaultMobileBlock,
} from "../../../../globalConstant";

const { __ } = wp.i18n;

const DeviceChangeAlert = ({ setIsCustomDesign }) => {
    // Get necessary data from the SingleCampaignContext:
    // - editorStep: Current step of the editor process.
    // - deviceType: The device type being used for editing (e.g., mobile or desktop).
    // - setCampaignStates: Function to update campaign state.
    const { editorStep, deviceType, setCampaignStates } = useContext(
        SingleCampaignContext,
    );

    // State to manage whether the device warning should be shown.
    const [showDeviceWarning, setShowDeviceWarning] = useState(null);

    // Get the actual device type (system device) that the user is currently using.
    const systemDeviceType = getDeviceType();

    /**
     * Handle the click for whether to create a custom design for mobile or use the same design
     * for both desktop and mobile.
     *
     * @param {boolean} customDesignOn - If true, use separate designs for mobile and desktop; if false, use the same design.
     */
    const handleClick = (customDesignOn) => {
        if (customDesignOn) {
            // If no custom mobile design is chosen, copy the desktop block content to mobile.
            setCampaignStates((preVal) => {
                // Copy the existing steps from the campaign.
                const newSteps = [...preVal.campaign?.steps];

                newSteps[editorStep] = {
                    ...newSteps[editorStep],
                    [deviceType]: {
                        content:
                            deviceType === "desktop"
                                ? defaultDesktopBlock
                                : defaultMobileBlock,
                    },
                };

                return {
                    ...preVal,
                    campaign: { ...preVal.campaign, steps: newSteps }, // Update campaign with the modified steps
                    customDesignOn,
                };
            });
            setIsCustomDesign(true); // Indicate that the blocks for mobile and desktop are the same.
        }
        setShowDeviceWarning(false); // Close the device warning alert.
    };

    /**
     * useEffect to monitor device changes. If the device type (desktop/mobile) used in the editor
     * doesn't match the actual system device, a warning will be triggered to notify the user.
     */
    useEffect(() => {
        if (deviceType !== systemDeviceType && showDeviceWarning === null) {
            setShowDeviceWarning(true); // Show the warning if the device types differ.
        } else {
            if (showDeviceWarning) {
                setShowDeviceWarning(null); // Reset the warning if the device types are the same.
            }
        }
    }, [deviceType]); // Re-run this effect whenever the device type changes.

    // If no warning should be displayed, return null and render nothing.
    if (!showDeviceWarning) return null;

    return (
        <>
            {/* Overlay background to darken the screen */}
            <div className="pt-device-alert-overlay" />

            {/* Container for the alert content */}
            <div className="pt-device-alert-container">
                {/* Space component to arrange content vertically */}
                <Space direction="vertical" size="small">
                    {/* Text to prompt the user about creating a custom mobile layout */}
                    <Text
                        text={__(
                            `Create custom ${deviceType} layout?`,
                            "poptics",
                        )}
                    />

                    {/* Flexbox for buttons - Yes/No options */}
                    <Flex gap="small">
                        <Button
                            aria-label={__("Yes", "poptics")} // Accessibility label
                            type="primary"
                            text={__("Yes", "poptics")} // Button text
                            onClick={() => handleClick(true)} // Handle 'Yes' button click
                        />
                        <Button
                            aria-label={__("No", "poptics")} // Accessibility label
                            text={__("No", "poptics")} // Button text
                            onClick={() => handleClick(false)} // Handle 'No' button click
                        />
                    </Flex>
                </Space>
            </div>
        </>
    );
};

export default DeviceChangeAlert;
