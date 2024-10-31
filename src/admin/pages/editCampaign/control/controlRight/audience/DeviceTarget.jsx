/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex } from "antd";
import { Card } from "../../../../../../common/components";
import RadioInput from "../RadioInput";
import {
    FlagHalfIcon,
    FlagIcon,
    WebIcon,
} from "../../../../../../common/icons";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import CheckboxInputInline from "../CheckboxInputInline";

const { __ } = wp.i18n;

const DeviceTarget = () => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);

    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "all_devices",
            icon: <FlagIcon />,
            label: __("All Devices", "poptics"),
            isPro: false,
        },
        {
            key: "custom_device",
            icon: <FlagHalfIcon />,
            label: __("Custom Device", "poptics"),
            isPro: false,
        },
    ];

    const checkboxItems = [
        {
            key: "desktop",
            icon: <WebIcon />,
            label: __("Desktop", "poptics"),
        },
        {
            key: "mobile",
            icon: <WebIcon />,
            label: __("Mobile", "poptics"),
        },
        {
            key: "others",
            icon: <WebIcon />,
            label: __("Others", "poptics"),
        },
    ];

    return (
        <Card bordered={false}>
            <Flex gap="small" vertical>
                {/* Radio input component with items, label */}
                <RadioInput
                    radioItems={radioItems}
                    label={__("Allow Device", "poptics")}
                    subText={__("Show popups on selected devices.", "poptics")}
                    form="audience"
                    field="device_target"
                />
                {campaign?.controls?.audience?.device_target?.value ===
                "custom_device" ? (
                    <CheckboxInputInline
                        label={__("Select Device", "poptics")}
                        tooltipText={__("Select custom device", "poptics")}
                        checkboxItems={checkboxItems}
                        form="audience"
                        field="device_target"
                    />
                ) : null}
            </Flex>
        </Card>
    );
};

export default DeviceTarget;
