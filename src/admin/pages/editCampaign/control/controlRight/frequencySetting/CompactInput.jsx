/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, InputNumber, Space, Tooltip } from "antd";
import { SelectInput, Input } from "../../../../../../common/components";
import { InfoIcon } from "../../../../../../common/icons";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";

const { __ } = wp.i18n;

const CompactInput = ({ label, tooltipText, suffixText, field, name }) => {
    // Options for the frequency selection dropdown
    const frequencyOptions = [
        {
            label: __("Visits", "poptics"),
            value: "visits",
        },
        {
            label: __("Days", "poptics"),
            value: "days",
        },
        {
            label: __("Weeks", "poptics"),
            value: "weeks",
        },
        {
            label: __("Months", "poptics"),
            value: "months",
        },
    ];

    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    // Retrieve current frequency settings for the specified field
    const frequency_settings = campaign?.controls?.frequency_settings?.[field];

    // Determine the current unit for the frequency settings or fallback to a default value
    const unit =
        frequency_settings?.[name]?.unit ||
        suffixText ||
        frequencyOptions[1].value;

    /**
     * Handles changes to the input fields.
     *
     * @param {Object} data - The new data to be processed.
     */
    const onChange = (data) => {
        // Process the new data and update the campaign state
        processControlData({
            form: "frequency_settings",
            field,
            value: {
                ...frequency_settings,
                [name]: { ...frequency_settings?.[name], unit, ...data },
            },
        });
    };

    return (
        <Flex vertical>
            {/* Label with optional tooltip */}
            <Space className="pt-control-form-label">
                {label}
                <Tooltip title={tooltipText}>
                    <span>
                        <InfoIcon />
                    </span>
                </Tooltip>
            </Space>

            <Space.Compact block className="pt-compact-box">
                {/* Input for number value */}
                <InputNumber
                    min={0}
                    value={frequency_settings?.[name]?.value}
                    onChange={(value) => onChange({ value })}
                />
                {/* Conditional rendering of either a read-only input or a select dropdown */}
                {suffixText ? (
                    <Input
                        className="pt-suffix-input"
                        value={suffixText}
                        readOnly
                        allowClear
                    />
                ) : (
                    <SelectInput
                        value={unit}
                        onChange={(value) => onChange({ unit: value })}
                        options={frequencyOptions}
                    />
                )}
            </Space.Compact>
        </Flex>
    );
};

export default CompactInput;
