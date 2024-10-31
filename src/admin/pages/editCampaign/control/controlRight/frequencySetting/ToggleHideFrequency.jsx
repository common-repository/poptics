/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, Space, Tooltip } from "antd";
import { InfoIcon } from "../../../../../../common/icons";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";
import { Switch } from "../../../../../../common/components";

const { __ } = wp.i18n;

const ToggleHideFrequency = ({ field }) => {
    // Array of toggle items with labels and tooltip texts
    const toggleItem = [
        {
            key: "closed_campaign",
            label: __("After a visitor closes the campaign", "poptics"),
            tooltipText: __(
                "Once the visitor closes the popup, it won't appear again",
                "poptics",
            ),
        },
        {
            key: "action_on_campaign",
            label: __("After a visitor sign up or click button", "poptics"),
            tooltipText: __(
                "Popups will not appear if the visitor enters their email address or clicks on the given link.",
                "poptics",
            ),
        },
    ];

    // Context for accessing and updating campaign data
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    // Retrieve current frequency settings for the specified field
    const frequency_settings = campaign?.controls?.frequency_settings?.[field];

    /**
     * Handles click events for the toggle switches.
     *
     * @param {boolean} data - The new state of the toggle switch.
     * @param {string} name - The name of the frequency setting to update.
     */
    const onClick = (data, name) => {
        // Process the new data and update the campaign state
        processControlData({
            form: "frequency_settings",
            field,
            value: {
                ...frequency_settings,
                [name]: data,
            },
        });
    };

    return (
        <Flex gap="small" vertical>
            {/* Map through the toggleItem array to render each toggle switch with label and tooltip */}
            {toggleItem.map((item) => (
                <Flex gap="small" justify="space-between" wrap key={item.key}>
                    {/* Label with optional tooltip */}
                    <Space className="pt-control-form-label">
                        {item.label}
                        <Tooltip title={item.tooltipText}>
                            <span>
                                <InfoIcon />
                            </span>
                        </Tooltip>
                    </Space>
                    {/* Toggle switch to update the frequency setting */}
                    <Switch
                        checked={frequency_settings?.[item.key]}
                        onClick={(value) => onClick(value, item.key)}
                    />
                </Flex>
            ))}
        </Flex>
    );
};

export default ToggleHideFrequency;
