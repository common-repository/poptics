import { Flex } from "antd";
import { WebIcon } from "../../../../../../common/icons";
import RadioInput from "../RadioInput";
import { Card } from "../../../../../../common/components";
import CustomSettings from "./CustomSettings";

const { __ } = wp.i18n;

const DisplayFrequency = () => {
    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "every_page_view",
            icon: <WebIcon />,
            label: __("Show on every page view", "poptics"),
            isPro: false,
        },
        {
            key: "every_session_view",
            icon: <WebIcon />,
            label: __("Show on every Session", "poptics"),
            isPro: false,
        },
        {
            key: "custom_settings",
            icon: <WebIcon />,
            label: __("Custom Settings", "poptics"),
            isPro: true,
        },
    ];

    return (
        <Card bordered={false}>
            <Flex gap="small" vertical>
                {/* Radio input component with items, label, and tooltip */}
                <RadioInput
                    radioItems={radioItems}
                    label={__("Display Frequency", "poptics")}
                    subText={__(
                        "How often popups are shown frequently on the page",
                        "poptics",
                    )}
                    form="frequency_settings"
                    field="display_frequency"
                />
                <CustomSettings />
            </Flex>
        </Card>
    );
};

export default DisplayFrequency;
