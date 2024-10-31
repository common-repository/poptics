/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Flex, Row, Space, Tooltip } from "antd";
import { SelectInput } from "../../../../../../common/components";
import { InfoIcon } from "../../../../../../common/icons";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";

// Data
import countries from "../../../../../../data/country.json";
import region from "../../../../../../data/region.json";

const { __ } = wp.i18n;

const CountryRegionSelection = () => {
    // Array of compact fields for selecting locations
    const compactFields = [
        {
            key: "show_in",
            label: __("Show in this location", "poptics"),
            tooltipText: "Show in this location tooltip",
        },
        {
            key: "dont_show_in",
            label: __("Don’t Show In This Location", "poptics"),
            tooltipText: "Don’t Show In This Location Tooltip",
        },
    ];

    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    const geoTarget = campaign?.controls?.audience?.geo_target;

    // Function to handle changes in form fields
    const onChange = (value, fieldKey, fieldName) => {
        const isCountry = fieldName === "country";
        const result = {
            country: isCountry ? value : geoTarget?.[fieldKey]?.country,
            region: isCountry ? null : value,
        };

        processControlData({
            form: "audience", // Specify the form name
            field: "geo_target", // Specify the field name within the form
            value: {
                // Create an object with the field key and update its value
                [fieldKey]: result,
            },
        });
    };

    return (
        <Row justify={{ sm: "start", md: "end" }}>
            <Col
                xs={24}
                sm={24}
                md={18}
                xxl={16}
                className="pt-control-form-bottom-wrapper"
            >
                <Flex gap="small" vertical>
                    {/* Compact selection components for location targeting */}
                    {compactFields.map((field) => (
                        <Space direction="vertical" key={field.key}>
                            {/* Label with tooltip */}
                            <Space className="pt-control-form-label">
                                {field.label}
                                <Tooltip title={field.tooltipText}>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                </Tooltip>
                            </Space>
                            {/* Compact space for select inputs */}
                            <Space.Compact block>
                                <SelectInput
                                    allowClear
                                    showSearch
                                    value={
                                        geoTarget?.[field.key]?.country || null
                                    }
                                    style={{ width: "50%" }}
                                    options={countries}
                                    placeholder={__(
                                        "Select Country",
                                        "poptics",
                                    )}
                                    onChange={(value) => {
                                        onChange(value, field.key, "country");
                                    }}
                                />
                                <SelectInput
                                    allowClear
                                    showSearch
                                    value={
                                        geoTarget?.[field.key]?.region || null
                                    }
                                    style={{ width: "50%" }}
                                    options={
                                        region[
                                            geoTarget?.[field.key]?.country
                                        ] || []
                                    }
                                    placeholder={__("Select Region", "poptics")}
                                    onChange={(value) => {
                                        onChange(value, field.key, "region");
                                    }}
                                />
                            </Space.Compact>
                        </Space>
                    ))}
                </Flex>
            </Col>
        </Row>
    );
};

export default CountryRegionSelection;
