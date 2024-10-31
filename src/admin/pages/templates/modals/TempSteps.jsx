/**
 * WordPress Dependencies
 */
import { useContext, useState } from "@wordpress/element"; // Import useContext and useState from WordPress element

// Import components from Ant Design and custom components
import { Flex } from "antd";
import { Tabs, Text } from "../../../../common/components";
import DevicePreviewBtn from "../../../components/DevicePreviewBtn";
import { TemplateContext } from "../withTemplateData";
import ShowHtml from "../../../../common/components/ShowHtml";

const TempSteps = () => {
    // State to manage the current step
    const [currentStep, setCurrentStep] = useState(0);

    // Access template states from context
    const templateStates = useContext(TemplateContext);
    const { deviceType, template, setTemplateStates } = templateStates;

    /**
     * Handles the change of steps in the tab component.
     *
     * @param {number} index - The index of the selected step.
     */
    const handleStepChange = (index) => {
        setCurrentStep(index);
    };

    return (
        <>
            {/* Device Preview Button */}
            <DevicePreviewBtn
                deviceType={deviceType} // Current device type
                setDeviceType={setTemplateStates} // Function to set device type
                float={false} // Float property set to false
            />

            {/* Tabs component to display steps */}
            <Tabs
                tabPosition="bottom" // Position tabs at the bottom
                defaultActiveKey={currentStep} // Set default active tab key
                items={template?.steps?.map((step, index) => ({
                    key: index, // Key for each tab
                    label: (
                        <Flex
                            justify="center"
                            align="center"
                            className={`pt-editor-steps pt-editor-steps-label ${
                                currentStep === index &&
                                "pt-editor-steps-label-active"
                            }`}
                        >
                            {/* Display step name */}
                            <Text text={step?.name} />
                        </Flex>
                    ),
                    children: (
                        <div className="pt-pages-tab-navigator-container">
                            <div
                                className={`pt-${deviceType}-preview-container pt-preview-container`}
                            >
                                <ShowHtml
                                    content={step?.[deviceType]?.content}
                                />
                            </div>
                        </div>
                    ),
                }))}
                onChange={handleStepChange} // Handle step change
            />
        </>
    );
};

export default TempSteps;
