import { Flex, Tag, Divider, Space, Row, Col } from "antd";
import { Fragment } from "@wordpress/element";
import {
    FileTextOutlined,
    UserOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { Modal, Text } from "../../../common/components";
const { __ } = wp.i18n;

const SubmissionPreviewModal = (props) => {
    const { isModalOpen, setIsModalOpen, submissionInfo } = props;

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function formatDynamicString(str) {
        return str.split("_").join(" ");
    }

    const otherInfosArray = Object.entries(
        submissionInfo?.other_details || {},
    )?.map(([key, value]) => ({
        label: formatDynamicString(key),
        value: value,
    }));

    const personDetailsFields = [
        {
            label: __("Name", "poptics"),
            value: submissionInfo.other_details.name,
        },
        { label: __("Email", "poptics"), value: submissionInfo.email },
        ...otherInfosArray.filter((info) => info.label !== "name"),
    ];
    const otherDetailsFields = [
        {
            label: __("Campaign Name", "poptics"),
            value: submissionInfo.campaign_name,
        },
        { label: __("Location", "poptics"), value: submissionInfo.location },
        {
            label: __("Device", "poptics"),
            value: submissionInfo.device,
        },
        {
            label: __("Browser", "poptics"),
            value: submissionInfo.browser,
        },
    ];

    const SingleInfoContainer = ({ label, value }) => {
        return (
            <Space size={"small"} direction="vertical">
                <Text
                    className="pt-submission-preview-item-label"
                    strong
                    text={label}
                />
                <Text text={value || __("N/A", "poptics")} />
            </Space>
        );
    };
    return (
        <Fragment>
            <Modal
                className="pt-submissions-preview-modal"
                title={__("Submission Details Preview", "poptics")}
                footer={null}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Flex vertical>
                    <Flex gap="middle" className="pt-preview-modal-section">
                        <Text
                            text={__("Person Details", "poptics")}
                            className="pt-preview-modal-section-title"
                            strong
                        />

                        {submissionInfo.status === "trash" ? (
                            <Tag icon={<DeleteOutlined />} color="error">
                                {__(" Trash", "poptics")}
                            </Tag>
                        ) : (
                            <Tag icon={<UserOutlined />} color="green">
                                {__("Active", "poptics")}
                            </Tag>
                        )}
                    </Flex>

                    <Divider orientationMargin={0.005} />

                    <Row justify={"space-between"} gutter={[20, 20]}>
                        {personDetailsFields.map((singleField) => (
                            <Col sm={12}>
                                <SingleInfoContainer
                                    label={singleField.label}
                                    value={singleField.value}
                                />
                            </Col>
                        ))}
                    </Row>

                    <Flex className="pt-preview-modal-section" gap="middle">
                        <Text
                            text={__("Other Details", "poptics")}
                            className="pt-preview-modal-section-title"
                            strong
                        />

                        <Tag
                            icon={<FileTextOutlined />}
                            color="processing"
                        ></Tag>
                    </Flex>

                    <Divider orientationMargin={0.005} />

                    <Row justify={"space-between"} gutter={[20, 20]}>
                        {otherDetailsFields.map((singleField) => (
                            <Col sm={12}>
                                <SingleInfoContainer
                                    label={singleField.label}
                                    value={singleField.value}
                                />
                            </Col>
                        ))}
                    </Row>
                </Flex>
            </Modal>
        </Fragment>
    );
};
export default SubmissionPreviewModal;
