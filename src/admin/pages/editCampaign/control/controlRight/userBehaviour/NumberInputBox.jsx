/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, InputNumber, Space } from "antd";
import { Card, SelectInput, Text } from "../../../../../../common/components";
import ControlItemHeader from "../ControlItemHeader";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";
import ProTag from "../../../../../components/ProTag";
import { AdminContext } from "../../../../../withAdminData";

const { __ } = wp.i18n;

// Component to render a number input box with label and description
const NumberInputBox = () => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    const { isProActivated } = useContext(AdminContext);

    const user_behave = campaign?.controls?.user_behave;

    const afterScrollUnit = user_behave?.after_scrolling?.unit || "%";

    /**
     * Handles change events for input elements and updates the campaign state.
     *
     * This function processes and updates the state of the "user_behave" form's control data
     * based on the input value, field name, and an optional add-on parameter. It calls the
     * processControlData function to update the specified field in the "user_behave" form
     * within the campaign controls.
     *
     * @param {string|number} value - The new value to be updated for the specified field.
     * @param {string} fieldName - The name of the field to be updated within the "user_behave" form.
     * @param {boolean} addOn - A flag indicating whether to include an additional "unit" property in the value object.
     *     - If true, the value object will include a "unit" property with the new value.
     *     - If false, the value object will include a "value" property with the new value and "unit" property with default value.
     */
    const onChange = (value, fieldName, addOn) => {
        processControlData({
            form: "user_behave",
            field: fieldName,
            value: addOn
                ? { unit: value }
                : {
                      value,
                      unit:
                          fieldName === "after_scrolling"
                              ? afterScrollUnit
                              : "second",
                  },
        });
    };

    // SelectInput component used as addon for input box
    const addonAfter = (
        <SelectInput
            value={afterScrollUnit}
            options={[
                { label: "%", value: "%" },
                { label: "px", value: "px" },
                { label: "vh", value: "vh" },
            ]}
            onChange={(value) => {
                onChange(value, "after_scrolling", "addOn");
            }}
        />
    );

    // Array of input box configurations
    const inputBoxArray = [
        {
            key: "show_after",
            heading: (
                <Space wrap>
                    {__("Show After", "poptics")}
                    {isProActivated ? null : <ProTag />}
                </Space>
            ),
            subText: __("Show after a visitor has spent some time", "poptics"),
            label: __("Second", "poptics"),
            inputProps: {
                min: 1,
                value: user_behave?.show_after?.value,
                placeholder: __("Ex: 5", "poptics"),
                disabled: !isProActivated,
            },
        },
        {
            key: "after_scrolling",
            heading: __("After Scrolling", "poptics"),
            subText: __(
                "Example: After 20% scrolling, show the popup.",
                "poptics",
            ),
            label: __("Of Page", "poptics"),
            inputProps: {
                min: 1,
                addonAfter,
                value: user_behave?.after_scrolling?.value,
                placeholder: __("Ex: 20", "poptics"),
            },
        },
        {
            key: "inactivity",
            heading: (
                <Space wrap>
                    {__("Inactivity", "poptics")}
                    {isProActivated ? null : <ProTag />}
                </Space>
            ),
            subText: __(
                "Show when a visitor has been inactive for a while",
                "poptics",
            ),
            label: __("Second", "poptics"),
            inputProps: {
                min: 1,
                value: user_behave?.inactivity?.value,
                placeholder: __("Ex: 10", "poptics"),
                disabled: !isProActivated,
            },
        },
    ];

    return (
        <Flex vertical gap="middle">
            {inputBoxArray.map((item) => (
                <Card bordered={false} key={item.key}>
                    {/* Flex container for aligning header and input elements */}
                    <Flex
                        gap="small"
                        align="center"
                        justify={"space-between"}
                        wrap
                    >
                        {/* Header component with heading and subtext */}
                        <ControlItemHeader
                            heading={item.heading}
                            subText={item.subText}
                        />
                        {/* Space component for input and label */}
                        <Space size={"large"} wrap>
                            {/* Number input component with dynamic properties */}
                            <InputNumber
                                {...item.inputProps}
                                min={0}
                                onChange={(value) => {
                                    onChange(value, item.key);
                                }}
                            />
                            {/* Text label for the input, styled as secondary if input is disabled */}
                            <Text
                                {...(item.inputProps.disabled && {
                                    type: "secondary",
                                })}
                                text={item.label}
                            />
                        </Space>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default NumberInputBox;
