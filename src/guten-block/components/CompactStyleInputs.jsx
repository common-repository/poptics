/**
 * WordPress dependencies
 */
import { useState } from "@wordpress/element";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";

import { Space, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { Button } from "../../common/components";

const { __ } = wp.i18n;

const CompactStyleInputs = ({ attributeValue, handleOnchange, field }) => {
    // Split the string into an array of values
    const initialValuesArray = attributeValue.split(" ");
    const defaultLinked = initialValuesArray.every(
        (val) => val === initialValuesArray[0],
    );

    const [valuesArray, setValuesArray] = useState(initialValuesArray);
    const [linkValue, setLinkValue] = useState(defaultLinked);

    const onChange = ({ value, index }) => {
        // Create a copy of the current values array to avoid mutating the state directly
        const updatedValues = [...valuesArray];

        if (linkValue) {
            // If the values are linked, update all values in the array to the new value
            updatedValues.fill(value);
        } else {
            // If the values are unlinked, update only the specific value at the given index
            updatedValues[index] = value;
        }

        setValuesArray(updatedValues);

        // Join the updated array into a string
        const resultedString = updatedValues.join(" ");
        handleOnchange(field, resultedString);
    };

    const units = [
        {
            a11yLabel: __("Pixels (px)", "poptics"),
            label: "px",
            step: 1,
            value: "px",
        },
        {
            a11yLabel: __("Rems (rem)", "poptics"),
            label: "rem",
            step: 0.1,
            value: "rem",
        },
        {
            a11yLabel: __("Ems (em)", "poptics"),
            label: "em",
            step: 0.1,
            value: "em",
        },
    ];

    return (
        <Space.Compact block>
            {valuesArray.map((item, index) => (
                <div className="pt-compact-unit-control">
                    <UnitControl
                        max={100}
                        min={0}
                        key={index}
                        value={item}
                        onChange={(value) => onChange({ value, index })}
                        units={units}
                    />
                </div>
            ))}
            <Tooltip title={`${linkValue ? "Unlink" : "Link"} values`}>
                <Button
                    aria-label={__("linked button", "poptics")}
                    className="pt-compact-link-btn"
                    type={linkValue ? "primary" : "default"}
                    icon={<LinkOutlined />}
                    onClick={() => setLinkValue((preVal) => !preVal)}
                />
            </Tooltip>
        </Space.Compact>
    );
};

export default CompactStyleInputs;
