/**
 * WordPress Dependencies
 */
import { useContext, useEffect } from "@wordpress/element";

import { Steps } from "antd";
import { SingleCampaignContext } from "./withSingleCampaignData";
import { useNavigate } from "react-router-dom";
import { TEMPLATES_PATH } from "../../router/routeDefinition";

const EditSteps = ({ steps }) => {
    // Access campaign state and updater from context
    const campaignStates = useContext(SingleCampaignContext);
    const { currentStep, setCampaignStates } = campaignStates;

    const navigate = useNavigate();

    // Function to handle step change
    const onChange = (currentStep) => {
        setCampaignStates((preVal) => {
            return { ...preVal, currentStep };
        });
    };

    // Navigate to templates path if the current step is 0
    useEffect(() => {
        if (currentStep === 0) {
            navigate(TEMPLATES_PATH);
        }
    }, [currentStep, navigate]);

    return (
        <Steps
            className="pt-campaign-edit-steps"
            current={currentStep}
            onChange={onChange}
            items={steps}
        />
    );
};

export default EditSteps;
