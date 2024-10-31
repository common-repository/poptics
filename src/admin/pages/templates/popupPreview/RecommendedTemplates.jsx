import { Col, Flex, Row } from "antd";
import { Text } from "../../../../common/components";
import TemplateCard from "../TemplateCard";

const { __ } = wp.i18n;

const RecommendedTemplates = ({ recommendedTemplates }) => {
    return (
        <Flex
            vertical
            gap="middle"
            className="pt-template-card-group-container"
        >
            {/*header section*/}
            <Flex justify="space-between">
                <Text
                    text={__("More templates from this tactic", "poptics")}
                    className="pt-template-card-group-container-title"
                />
            </Flex>

            <Row md={24} gutter={[16, 16]}>
                {recommendedTemplates.length > 0 ? (
                    recommendedTemplates?.map((template) => (
                        <Col md={8} key={template?.id}>
                            <TemplateCard data={template} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Text
                            text={__(
                                "No recommended templates found!",
                                "poptics",
                            )}
                        />
                    </Col>
                )}
            </Row>
        </Flex>
    );
};

export default RecommendedTemplates;
