/**
 * WordPress Dependencies
 */
import { useContext, useState } from "@wordpress/element";

import { Flex } from "antd";
import {
    Button,
    Modal,
    TextInput,
    Title,
    Form,
    FormItem,
    Text,
    Img,
    RowSkeleton,
} from "../../../../common/components";

import useTemplateApi from "./../hooks/useTemplateApi";
import { CategoryInfo } from "../../../components/CategoryInfo";
import { Radio } from "antd";
import { TemplateContext } from "./../withTemplateData";

const { __ } = wp.i18n;

const CreateCampaignModal = () => {
    const { createCampaign } = useTemplateApi();

    const templateStates = useContext(TemplateContext);
    const [thumbnail_id, setThumbnailId] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const {
        taxonomyGoals,
        taxonomyTypes,
        openCreateCampModal,
        openSingleTempModal,
        setTemplateStates,
        isFromScratch,
    } = templateStates;

    /*
    create campaign according to API parameters
    form fields will only contain the id of the goal and type
    */
    const handleCampaignCreate = (values) => {
        // find the goals and type object form the templates state where taxonomyGoals and taxonomyTypes are set
        let targetGoal = taxonomyGoals?.find(
            (eachGoal) => eachGoal.term_id === values.goal,
        );
        let targetType = taxonomyTypes?.find(
            (eachType) => eachType.term_id === values.type,
        );

        // modify the values object goal and type property
        if (targetGoal) {
            values.goal = {
                term_id: targetGoal.term_id,
                name: targetGoal.name,
                icon: targetGoal.icon,
            };
        }
        if (targetType) {
            values.type = {
                term_id: targetType.term_id,
                name: targetType.name,
                icon: targetType.icon,
            };
        }

        values = { ...values, thumbnail_id };
        createCampaign(values);
    };

    // Handle modal close action
    const handleModalClose = () => {
        setTemplateStates((prevState) => {
            // Common updates applied in both cases
            const commonUpdates = { ...prevState, openCreateCampModal: false };

            // If creating from scratch, close modal and reset isFromScratch
            // Otherwise, close modal and rest properties that stores single template preview information
            return isFromScratch
                ? {
                      ...commonUpdates,
                      isFromScratch: false,
                  }
                : {
                      ...commonUpdates,
                      ...(!openSingleTempModal && {
                          templateId: null,
                          template: null,
                          deviceType: "desktop",
                          recommendedTemplates: null,
                      }),
                  };
        });
    };

    return (
        <Modal
            open={openCreateCampModal}
            onCancel={handleModalClose}
            footer={null}
            zIndex={9991}
        >
            {isFromScratch && (
                <Title
                    className="pt-create-campaign-title"
                    text={__("Create Campaign", "poptics")}
                />
            )}
            <Form onFinish={handleCampaignCreate} autoComplete="off">
                <Title
                    text={__("Campaign Name", "poptics")}
                    className="pt-create-campaign-modal-input-header"
                />
                <TextInput
                    name="name"
                    placeholder={__("Your Campaign Name", "poptics")}
                    rules={[
                        {
                            required: true,
                            message: __(
                                "Please enter campaign name",
                                "poptics",
                            ),
                        },
                    ]}
                />

                {/*create from scratch section */}
                {isFromScratch && (
                    <RowSkeleton loading={!taxonomyGoals && !taxonomyTypes}>
                        <Flex vertical>
                            {/*Goal radio group*/}
                            <Title
                                text={__(
                                    "Select Popup Goal Optional",
                                    "poptics",
                                )}
                                className="pt-create-campaign-modal-input-header"
                            />

                            <FormItem name="goal">
                                <Radio.Group className="pt-create-campaign-modal-goal-container">
                                    {taxonomyGoals?.map((goal) => (
                                        <Radio
                                            className="pt-radio-container"
                                            value={goal.term_id}
                                        >
                                            <CategoryInfo type={goal} />
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </FormItem>

                            {/*type radio group*/}
                            <Title
                                text={__("Select Popup Type", "poptics")}
                                className="pt-create-campaign-modal-input-header"
                            />
                            <FormItem name="type">
                                <Radio.Group className="pt-create-campaign-modal-type-container">
                                    {taxonomyTypes?.map((type) => (
                                        <Radio
                                            value={type.term_id}
                                            className="pt-create-campaign-modal-radio"
                                        >
                                            <div
                                                className={`pt-types-wrapper pt-create-campaign-modal-type`}
                                            >
                                                {type.icon ? (
                                                    <Img
                                                        alt={__(
                                                            "types image",
                                                            "poptics",
                                                        )}
                                                        src={type.icon}
                                                        height={25}
                                                        width={25}
                                                    />
                                                ) : null}

                                                <Text text={type.name} />
                                            </div>
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </FormItem>

                            {/* Upload Image component to upload  thumbnail*/}
                            {wp.hooks.applyFilters(
                                "add_thumbnail_image",
                                null,
                                {
                                    thumbnail,
                                    setThumbnail,
                                    setThumbnailId,
                                },
                            )}
                        </Flex>
                    </RowSkeleton>
                )}

                {/*footer section */}
                <Flex items="center" justify="space-between">
                    <Button
                        aria-label={__("cancel", "poptics")}
                        type="text"
                        text={__("Cancel", "poptics")}
                        onClick={handleModalClose}
                        className="pt-template-modal-cancel-text"
                    />
                    <Button
                        aria-label={__("submit", "poptics")}
                        htmlType="submit"
                        type="primary"
                        text={__("Continue", "poptics")}
                    />
                </Flex>
            </Form>
        </Modal>
    );
};

export default CreateCampaignModal;
