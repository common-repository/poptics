/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Row } from "antd";
import { Modal, RowSkeleton } from "../../../../common/components";
import PreviewModalRightBar from "./PreviewModalRightBar";
import RecommendedTemplates from "../popupPreview/RecommendedTemplates";
import { TemplateContext } from "../withTemplateData";
import TempSteps from "./TempSteps";

const SingleTempModal = () => {
    // Access template states from context
    const templateStates = useContext(TemplateContext);
    const {
        template,
        openSingleTempModal,
        recommendedTemplates,
        setTemplateStates,
    } = templateStates;

    /**
     * Handles the closing of the modal and resets relevant template states.
     */
    const handleModalClose = () => {
        setTemplateStates((preVal) => ({
            ...preVal,
            openSingleTempModal: false,
            templateId: null,
            template: null,
            deviceType: "desktop",
            recommendedTemplates: null,
        }));
    };

    return (
        <Modal
            open={openSingleTempModal}
            onCancel={handleModalClose}
            footer={() => null}
            width={"72rem"}
            className="pt-templates-preview-modal"
            zIndex={9990}
        >
            <Row>
                {/*left side column of preview modal*/}
                <Col md={18} className="pt-preview-tab-left-container">
                    {/*tab row of preview modal*/}
                    <Row
                        md={24}
                        align="center"
                        className="pt-device-preview-tab-container"
                    >
                        <Col span={24}>
                            <RowSkeleton rows={10} loading={!template}>
                                <TempSteps />
                            </RowSkeleton>
                        </Col>

                        {/*More templates row of preview modal*/}
                        <Col span={24}>
                            <RowSkeleton
                                rows={10}
                                loading={!recommendedTemplates}
                            >
                                <RecommendedTemplates
                                    recommendedTemplates={recommendedTemplates}
                                />
                            </RowSkeleton>
                        </Col>
                    </Row>
                </Col>

                <Col
                    gutter={[10, 20]}
                    md={6}
                    className="pt-preview-modal-right-bar"
                >
                    {/*right side column of preview modal*/}
                    <RowSkeleton rows={10} loading={!template}>
                        <PreviewModalRightBar data={template} />
                    </RowSkeleton>
                </Col>
            </Row>
        </Modal>
    );
};

export default SingleTempModal;
