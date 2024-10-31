/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, Space, Tooltip } from "antd";
import { InfoIcon } from "../../../../../../common/icons";
import { SelectInput } from "../../../../../../common/components";
import languages from "../../../../../../data/language.json";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";

const { __ } = wp.i18n;

const LanguageSelection = () => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    const languageTarget = campaign?.controls?.audience?.language_target;

    // Function to handle changes in form fields
    const onChange = (value, fieldName) => {
        processControlData({
            form: "audience", // Specify the form name
            field: "language_target", // Specify the field name within the form
            value: {
                [fieldName]: value,
            },
        });
    };

    // Array of compact fields for language targeting
    const languageFields = [
        {
            key: "show_in",
            label: __("Show in this language", "poptics"),
        },
        {
            key: "dont_show_in",
            label: __("Don’t Show In This language", "poptics"),
        },
    ];

    return (
        <Flex gap="small" vertical>
            {/* Compact selection components for language targeting */}
            {languageFields.map((field) => (
                <Space key={field.key} direction="vertical">
                    {/* Label with tooltip */}
                    <Space className="pt-control-form-label">
                        {field.label}
                        <Tooltip title={field.tooltipText}>
                            <span>
                                <InfoIcon />
                            </span>
                        </Tooltip>
                    </Space>
                    <SelectInput
                        value={languageTarget?.[field.key]}
                        className="pt-w-100"
                        allowClear
                        showSearch
                        options={languages}
                        placeholder={__("Select Language", "poptics")}
                        onChange={(value) => {
                            onChange(value, field.key);
                        }}
                    />
                </Space>
            ))}
        </Flex>
    );
};

export default LanguageSelection;
