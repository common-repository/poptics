import { Divider, Flex } from "antd";
import { TextControl } from "@wordpress/components";
import { Switch, Text } from "../../../../common/components";

const { __ } = wp.i18n;
const UnitDisplay = (props) => {
    let { unitDisplay, setAttributes } = props;
    let {
        enableSeparator,
        daysLabel,
        showSeconds,
        showMinutes,
        showHours,
        hoursLabel,
        minutesLabel,
        secondsLabel,
        showDays,
    } = unitDisplay;

    // onchange handler function
    const handleOnchange = (field, value) => {
        setAttributes({
            unitDisplay: {
                ...unitDisplay,
                [field]: value,
            },
        });
    };

    const unitDisplaySettings = [
        {
            switchTitle: __("Show Days", "poptics"),
            switchValue: showDays,
            switchStateName: "showDays",
            unitLabel: __("Days label", "poptics"),
            unitValue: daysLabel,
            unitStateName: "daysLabel",
        },
        {
            switchTitle: __("Show Hours", "poptics"),
            switchValue: showHours,
            switchStateName: "showHours",
            unitLabel: __("Hours label", "poptics"),
            unitValue: hoursLabel,
            unitStateName: "hoursLabel",
        },
        {
            switchTitle: __("Show Minutes", "poptics"),
            switchValue: showMinutes,
            switchStateName: "showMinutes",
            unitLabel: __("Minutes label", "poptics"),
            unitValue: minutesLabel,
            unitStateName: "minutesLabel",
        },
        {
            switchTitle: __("Show Seconds", "poptics"),
            switchValue: showSeconds,
            switchStateName: "showSeconds",
            unitLabel: __("Seconds label", "poptics"),
            unitValue: secondsLabel,
            unitStateName: "secondsLabel",
        },
    ];
    return (
        <div>
            {unitDisplaySettings.map(
                ({
                    switchTitle,
                    switchValue,
                    unitLabel,
                    switchStateName,
                    unitValue,
                    unitStateName,
                }) => (
                    <Flex vertical gap="small">
                        <Flex justify="space-between">
                            <Text strong text={switchTitle} />
                            <Switch
                                onChange={(value) =>
                                    handleOnchange(switchStateName, value)
                                }
                                checked={switchValue}
                            />
                        </Flex>

                        <TextControl
                            className="pt-unit-display-text-control"
                            label={unitLabel}
                            value={unitValue}
                            onChange={(value) =>
                                handleOnchange(unitStateName, value)
                            }
                        />
                        <Divider />
                    </Flex>
                ),
            )}
            <Flex justify="space-between">
                <Text strong text={__("Use Separator", "poptics")} />
                <Switch
                    onChange={(value) =>
                        handleOnchange("enableSeparator", value)
                    }
                    checked={enableSeparator}
                />
            </Flex>
        </div>
    );
};

export default UnitDisplay;
