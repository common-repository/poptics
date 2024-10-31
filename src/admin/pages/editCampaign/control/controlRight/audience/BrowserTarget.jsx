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

const BrowserTarget = () => {
    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "all_browsers",
            icon: <FlagIcon />,
            label: __("All Browsers", "poptics"),
            isPro: false,
        },
        {
            key: "custom_browser",
            icon: <FlagHalfIcon />,
            label: __("Custom Browser", "poptics"),
            isPro: true,
        },
    ];

    // Array of inline radio button items with icons and labels for popular browsers
    const radioItemsInline = [
        {
            key: "chrome",
            icon: <WebIcon />,
            label: __("Chrome", "poptics"),
        },
        {
            key: "firefox",
            icon: <WebIcon />,
            label: __("Firefox", "poptics"),
        },
        {
            key: "safari",
            icon: <WebIcon />,
            label: __("Safari", "poptics"),
        },
        {
            key: "edge",
            icon: <WebIcon />,
            label: __("Edge", "poptics"),
        },
        {
            key: "opera",
            icon: <WebIcon />,
            label: __("Opera", "poptics"),
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
                {/* Radio input component with items and label */}
                <RadioInput
                    radioItems={radioItems}
                    label={__("Browser Targeting", "poptics")}
                    subText={__(
                        "Show when a visitor has been inactive for",
                        "poptics",
                    )}
                    form="audience"
                    field="browser_target"
                />
                {/* Inline radio input component with items, label, and tooltip */}
                <RadioInputInline
                    label={__("Select Browser", "poptics")}
                    tooltipText={__("Select Browser tooltip", "poptics")}
                    radioItems={radioItemsInline}
                    form="audience"
                    field="browser_target"
                />
            </Flex>
        </Card>
    );
};

export default BrowserTarget;
