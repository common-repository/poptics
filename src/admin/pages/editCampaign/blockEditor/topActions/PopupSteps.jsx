/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";
import { Flex } from "antd";
import { Button, Dropdown, Text } from "../../../../../common/components";
import { DeleteIcon } from "../../../../../common/icons";
import { MoreOutlined } from "@ant-design/icons";
import { SingleCampaignContext } from "../../withSingleCampaignData";

const { __ } = wp.i18n;

/**
 * Component for displaying and navigating campaign steps in a popup editor.
 * @returns {JSX.Element} - PopupSteps component JSX.
 */
const PopupSteps = () => {
    // Context for accessing and updating campaign data.
    const campaignStates = useContext(SingleCampaignContext);
    const { editorStep, campaign, setCampaignStates } = campaignStates;

    /**
     * Function to handle navigation to a specific step.
     * @param {number} index - Index of the step to navigate to.
     */
    const handleStepsNavigate = (index) => {
        setCampaignStates((preVal) => {
            return { ...preVal, editorStep: index };
        });
    };

    /**
     * Deletes a step from the campaign steps array at a given index and updates the state.
     *
     * @param {Object} domEvent - The DOM event to stop propagation.
     * @param {number} index - The index of the step to be deleted.
     */
    const deleteSteps = ({ domEvent }, index) => {
        // Stop the click event from propagating to parent elements
        domEvent.stopPropagation();

        // Create a shallow copy of the campaign steps array
        const steps = [...campaign?.steps];

        // Remove the element at the specified index
        steps?.splice(index, 1);

        // Update the campaign state with the new steps array
        setCampaignStates((preVal) => {
            // Adjust the editorStep if the deleted step is the current editor step
            const editorStep =
                preVal.editorStep === index ? index - 1 : preVal.editorStep;

            return {
                ...preVal,
                campaign: { ...preVal.campaign, steps },
                editorStep,
            };
        });
    };

    return (
        <Flex wrap gap="small">
            {campaign?.steps?.length &&
                campaign?.steps?.map((step, index) => (
                    <Flex
                        justify="center"
                        align="center"
                        className={`pt-editor-steps pt-editor-steps-label ${
                            editorStep === index &&
                            "pt-editor-steps-label-active"
                        }`}
                        key={index}
                        onClick={() => handleStepsNavigate(index)}
                    >
                        {/* Display step name */}
                        <Text text={step?.name} />

                        {/* Dropdown for step options */}
                        {index !== 0 && (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "delete",
                                            label: __("Delete", "poptics"),
                                            icon: <DeleteIcon />,
                                            onClick: (e) =>
                                                deleteSteps(e, index),
                                        },
                                    ],
                                }}
                                placement="bottom"
                            >
                                <Button
                                    aria-label={__("more button", "poptics")}
                                    onClick={(e) => e.stopPropagation()}
                                    type="text"
                                    icon={<MoreOutlined />}
                                />
                            </Dropdown>
                        )}
                    </Flex>
                ))}
            {/* Button for adding new step */}
            <Button
                aria-label={__("plus button", "poptics")}
                type="dashed"
                className="pt-editor-steps"
                text={"+"}
                disabled
            />
        </Flex>
    );
};

export default PopupSteps;
