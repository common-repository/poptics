import { Col, Flex, Row } from "antd";
import { Card } from "../../../../../../common/components";
import RadioInput from "../RadioInput";
import { FlagHalfIcon, FlagIcon } from "../../../../../../common/icons";
import LanguageSelection from "./LanguageSelection";

const { __ } = wp.i18n;

const LanguageTarget = () => {
    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "all_languages",
            icon: <FlagIcon />,
            label: __("All Language", "poptics"),
            isPro: false,
        },
        {
            key: "custom_language",
            icon: <FlagHalfIcon />,
            label: __("Custom Language", "poptics"),
            isPro: true,
        },
    ];

    return (
        <Card bordered={false}>
            <Flex gap="small" vertical>
                {/* Radio input component with items and label */}
                <RadioInput
                    radioItems={radioItems}
                    label={__("Language Targeting", "poptics")}
                    subText={__(
                        "Show when a visitor has been inactive for",
                        "poptics",
                    )}
                    form="audience"
                    field="language_target"
                />
                <Row justify={{ sm: "start", md: "end" }}>
                    <Col
                        xs={24}
                        sm={24}
                        md={18}
                        xxl={16}
                        className="pt-control-form-bottom-wrapper"
                    >
                        <LanguageSelection />
                    </Col>
                </Row>
            </Flex>
        </Card>
    );
};

export default LanguageTarget;
