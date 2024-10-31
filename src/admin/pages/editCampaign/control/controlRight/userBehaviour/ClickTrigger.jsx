/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Row, Space } from "antd";
import ControlItemHeader from "../ControlItemHeader";
import { Card, Input, SelectInput } from "../../../../../../common/components";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";

const { __ } = wp.i18n;

const ClickTrigger = () => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    // Extract click_trigger data from the campaign controls.
    const click_trigger = campaign?.controls?.user_behave?.click_trigger;

    // Options for the select input
    const triggerOptions = [
        {
            label: __("ID", "poptics"),
            value: "id",
        },
        {
            label: __("Class", "poptics"),
            value: "class",
        },
    ];

    // Set the default trigger type if not already specified.
    const trigger_by = click_trigger?.trigger_by || triggerOptions[0]?.value;

    /**
     * Handles changes to the trigger data and updates the campaign state.
     *
     * @param {Object} data - The new data to update the state with.
     */
    const onChange = (data) => {
        processControlData({
            form: "user_behave",
            field: "click_trigger",
            value: { trigger_by, ...data },
        });
    };

    return (
        <Card bordered={false}>
            <Row gutter={[0, 8]} align="middle" justify={"space-between"}>
                <Col xs={24} md={16}>
                    {/* Header for the Click Trigger control */}
                    <ControlItemHeader
                        heading={__("Click Trigger", "poptics")}
                        subText={__(
                            "Define a specific position to show popups.",
                            "poptics",
                        )}
                    />
                </Col>
                <Col xs={24} md={8}>
                    {/* Compact space for SelectInput and Input */}
                    <Space.Compact block>
                        {/* Dropdown to select trigger type */}
                        <SelectInput
                            value={trigger_by}
                            options={triggerOptions}
                            onChange={(value) =>
                                onChange({ trigger_by: value })
                            }
                        />
                        {/* Input field for specifying the trigger ID */}
                        <Input
                            value={click_trigger?.value}
                            placeholder={__(
                                "Write #ID or .Class Name",
                                "poptics",
                            )}
                            size="small"
                            allowClear
                            onChange={(e) =>
                                onChange({ value: e.target.value })
                            }
                        />
                    </Space.Compact>
                </Col>
            </Row>
        </Card>
    );
};

export default ClickTrigger;
