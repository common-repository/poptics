import { Col, Flex, Row, Space } from "antd";
import { Card, Text } from "../../../../../../common/components";
import CompactInput from "./CompactInput";
import ToggleHideFrequency from "./ToggleHideFrequency";

const { __ } = wp.i18n;

const HideFrequency = () => {
    return (
        <Card bordered={false}>
            <Row gutter={[16, 16]} align={"middle"}>
                <Col xs={24} md={6} xxl={8}>
                    <Space direction="vertical" size={0}>
                        <Text
                            className="pt-control-title"
                            text={__("Stop Displaying Popup", "poptics")}
                        />
                        <Text
                            text={__(
                                "Don't show popups based on visitor action.",
                                "poptics",
                            )}
                            className="pt-control-description"
                        />
                    </Space>
                </Col>

                <Col
                    xs={24}
                    md={18}
                    xxl={16}
                    className="pt-control-form-bottom-wrapper"
                >
                    <Flex gap="small" vertical>
                        {/* Toggle items with labels, tooltips, and switches */}
                        <ToggleHideFrequency field="user_actions_to_stop_displaying" />

                        {/* Compact input component with label, tooltip, and suffix text */}
                        <CompactInput
                            label={__(
                                "Stop after a visitor views the campaign",
                                "poptics",
                            )}
                            tooltipText={__(
                                "Define a visit limit to stop the pop-up after the visitor views the campaign. For example, stop after 3 visits",
                                "poptics",
                            )}
                            field="user_actions_to_stop_displaying"
                            name="seen_campaign"
                            suffixText={__("Times", "poptics")}
                        />
                    </Flex>
                </Col>
            </Row>
        </Card>
    );
};

export default HideFrequency;
