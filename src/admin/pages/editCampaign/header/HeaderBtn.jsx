/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Space } from "antd";
import useSingleCampaignApi from "../hooks/useSingleCampaignApi";
import DocBtn from "../../../components/topMenu/DocBtn";
import { Button } from "../../../../common/components";
import { SingleCampaignContext } from "../withSingleCampaignData";

const { __ } = wp.i18n;

const HeaderBtn = () => {
    // Context for accessing and updating campaign data.
    const campaignStates = useContext(SingleCampaignContext);
    const { currentStep, editLoading } = campaignStates;

    const { updateCampaign, updateDataWithStep, publishStep } =
        useSingleCampaignApi();

    /**
     * Handles the action to be taken when the user saves.
     *
     * If the current step is the final step (step 3), the campaign or data is published.
     * Otherwise, it updates the data for the current step without publishing.
     */
    const handleActionOnSave = () => {
        if (currentStep === 3) {
            // Publish the data or campaign if it's the final step
            publishStep();
        } else {
            // Update the data for the current step
            updateDataWithStep();
        }
    };

    return (
        <Space>
            <Button
                aria-label={__("save", "poptics")}
                type="primary"
                text={__("Save", "poptics")}
                onClick={() => updateCampaign()}
                disabled={editLoading}
            />
            <Button
                aria-label={__(
                    currentStep === 3 ? "Save & Publish" : "Save & Continue",
                    "poptics",
                )}
                type="primary"
                text={__(
                    currentStep === 3 ? "Save & Publish" : "Save & Continue",
                    "poptics",
                )}
                onClick={handleActionOnSave}
                disabled={editLoading}
            />
            <DocBtn />
        </Space>
    );
};

export default HeaderBtn;
