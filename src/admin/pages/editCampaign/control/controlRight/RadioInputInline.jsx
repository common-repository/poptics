/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Radio, Row, Space, Tooltip } from "antd";
import { InfoIcon } from "../../../../../common/icons";
import { SingleCampaignContext } from "../../withSingleCampaignData";
import useProcessCampaignEditData from "../../hooks/useProcessCampaignEditData";

// Component to render a group of radio buttons with optional labels and icons
const RadioInputInline = ({ radioItems, label, tooltipText, form, field }) => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    const initialValue =
        campaign?.controls?.[form]?.[field]?.selected_value || null;

    /**
     * Handles change events for input elements.
     *
     * @param {Object} e - The event object from the input change event.
     */
    const onChangeHandler = (e) => {
        // Extract the value from the event's target element (the input field).
        const value = e.target.value;

        // Call processControlData with the specified form, field, and the new value.
        // It updates the state with the new value for the specified field in the form.
        processControlData({ form, field, value: { selected_value: value } });
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
                <Space className="pt-control-form-label">
                    {label}
                    <Tooltip title={tooltipText}>
                        <span>
                            <InfoIcon />
                        </span>
                    </Tooltip>
                </Space>
                <Radio.Group
                    value={initialValue}
                    className="pt-create-campaign-modal-type-container"
                    onChange={onChangeHandler}
                >
                    {/* Map through the radioItems array to render each radio button */}
                    {radioItems.map((item) => (
                        <Radio
                            key={item?.key}
                            value={item?.key}
                            className="pt-create-campaign-modal-radio"
                        >
                            <Space>
                                {item?.icon}
                                {item?.label}
                            </Space>
                        </Radio>
                    ))}
                </Radio.Group>
            </Col>
        </Row>
    );
};

export default RadioInputInline;
