/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex } from "antd";
import { Text } from "./../../../common/components";
import useTemplateApi from "./hooks/useTemplateApi";
import { TemplateContext } from "./withTemplateData";

const { __ } = wp.i18n;

const CreateFromScrTemplate = () => {
    // Access template states from context
    const templateStates = useContext(TemplateContext);
    const { setTemplateStates } = templateStates;

    // Custom hook to fetch categories
    const { getAllCategory } = useTemplateApi();

    // Handle opening the customize modal
    const handleCustomizeModalOpen = () => {
        getAllCategory();
        setTemplateStates((preVal) => ({
            ...preVal,
            openCreateCampModal: true,
            isFromScratch: true,
        }));
    };

    return (
        <>
            <Flex
                onClick={handleCustomizeModalOpen}
                className="pt-create-from-scratch-template-container"
            >
                <Text className="pt-template-plus" text={"+"} />
                <Text
                    className="pt-create-campaign-text"
                    text={__("Create from Scratch", "poptics")}
                />
            </Flex>
        </>
    );
};

export default CreateFromScrTemplate;
