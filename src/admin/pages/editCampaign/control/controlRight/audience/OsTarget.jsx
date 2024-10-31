import { Flex } from "antd";
import { Card } from "../../../../../../common/components";
import RadioInput from "../RadioInput";
import {
    FlagHalfIcon,
    FlagIcon,
    WebIcon,
} from "../../../../../../common/icons";
import RadioInputInline from "../RadioInputInline";

const { __ } = wp.i18n;

const OsTarget = () => {
    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "all_operating_systems",
            icon: <FlagIcon />,
            label: __("All Systems", "poptics"),
            isPro: false,
        },
        {
            key: "custom_system",
            icon: <FlagHalfIcon />,
            label: __("Custom System", "poptics"),
            isPro: true,
        },
    ];

    const radioItemsInline = [
        {
            key: "windows",
            icon: <WebIcon />,
            label: __("Windows", "poptics"),
        },
        {
            key: "macos",
            icon: <WebIcon />,
            label: __("MacOs", "poptics"),
        },
        {
            key: "linux ",
            icon: <WebIcon />,
            label: __("Linux ", "poptics"),
        },
        {
            key: "android",
            icon: <WebIcon />,
            label: __("Android", "poptics"),
        },
        {
            key: "ios",
            icon: <WebIcon />,
            label: __("iOs", "poptics"),
        },
        {
            key: "other",
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
                    label={__("Operating System Target", "poptics")}
                    subText={__(
                        "Show when a visitor has been inactive for",
                        "poptics",
                    )}
                    form="audience"
                    field="operating_system_target"
                />
                <RadioInputInline
                    label={__("Select Operating System", "poptics")}
                    tooltipText={__(
                        "Select Operating System tooltip",
                        "poptics",
                    )}
                    radioItems={radioItemsInline}
                    form="audience"
                    field="operating_system_target"
                />
            </Flex>
        </Card>
    );
};

export default OsTarget;
