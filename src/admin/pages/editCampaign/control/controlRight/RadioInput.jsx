/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Flex, Radio, Row, Space } from "antd";
import { Text } from "../../../../../common/components";
import ProTag from "../../../../components/ProTag";
import { SingleCampaignContext } from "../../withSingleCampaignData";
import useProcessCampaignEditData from "../../hooks/useProcessCampaignEditData";
import { AdminContext } from "../../../../withAdminData";

// Component to render a group of radio buttons with optional labels and icons
const RadioInput = ({ radioItems, label, subText, form, field }) => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    const { isProActivated } = useContext(AdminContext);

    const initialValue = campaign?.controls?.[form]?.[field]?.value || null;

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
        processControlData({ form, field, value: { value } });
    };

    return (
        <Row gutter={[8, 8]} align={"middle"}>
            <Col xs={24} md={6} xxl={8}>
                <Space direction="vertical" size={0}>
                    <Text className="pt-control-title" text={label} />
                    {/* Conditionally render the subtext if provided */}
                    {subText ? (
                        <Text
                            text={subText}
                            className="pt-control-description"
                        />
                    ) : null}
                </Space>
            </Col>

            <Col xs={24} md={18} xxl={16}>
                <Radio.Group
                    onChange={onChangeHandler}
                    className="pt-create-campaign-modal-type-container"
                    value={initialValue}
                >
                    {/* Map through the radioItems array to render each radio button */}
                    {radioItems.map((item) => (
                        <Radio
                            key={item?.key}
                            value={item?.key}
                            className="pt-create-campaign-modal-radio"
                            disabled={item?.isPro && !isProActivated}
                        >
                            <Space direction="vertical" size={"large"}>
                                <Flex gap="small">
                                    <div
                                        style={{
                                            opacity:
                                                item?.isPro && !isProActivated
                                                    ? 0.3
                                                    : 1,
                                        }}
                                    >
                                        {item?.icon}
                                    </div>
                                    {/* Conditionally render ProTag if item is pro */}
                                    {item?.isPro && !isProActivated ? (
                                        <ProTag />
                                    ) : null}
                                </Flex>
                                {item?.label}
                            </Space>
                        </Radio>
                    ))}
                </Radio.Group>
            </Col>
        </Row>
    );
};

export default RadioInput;
