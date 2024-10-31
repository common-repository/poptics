/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Button } from "../../../../common/components";
import { Flex } from "antd";
import { TemplateContext } from "../withTemplateData";
import useTemplateApi from "../hooks/useTemplateApi";

const { __ } = wp.i18n;

const ImagePreviewMask = ({ id }) => {
    // Access template states
    const templateStates = useContext(TemplateContext);
    const { setTemplateStates } = templateStates;

    const { populateSingleTempData } = useTemplateApi();

    /**
     * Handles the opening of a modal and populates template states with relevant data.
     *
     * @param {string} field - The name of the field to be set to true in the template states.
     */
    const handleOpenModal = (field) => {
        // Fetch single template data using the provided id
        const singleData = populateSingleTempData(id);

        // Update template states with the fetched data and set the specified field to true
        setTemplateStates((preVal) => ({
            ...preVal,
            templateId: id,
            [field]: true,
            ...singleData,
        }));
    };

    return (
        <Flex vertical gap="small">
            <Button
                aria-label={__("customize button", "poptics")}
                type="primary"
                text={__("Customize", "poptics")}
                onClick={() => handleOpenModal("openCreateCampModal")}
            />
            <Button
                aria-label={__("preview button", "poptics")}
                text={__("Preview", "poptics")}
                className="pt-templates-preview-button"
                onClick={() => handleOpenModal("openSingleTempModal")}
            />
        </Flex>
    );
};

export default ImagePreviewMask;
