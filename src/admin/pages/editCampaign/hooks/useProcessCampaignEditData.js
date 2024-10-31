/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { SingleCampaignContext } from "../withSingleCampaignData";
import { getDeviceType } from "../../../../helper";

function useProcessCampaignEditData() {
    // Context for accessing and updating campaign data.
    const campaignStates = useContext(SingleCampaignContext);
    const { editorStep, deviceType, customDesignOn, setCampaignStates } =
        campaignStates;

    const processStepData = (blocks) => {
        setCampaignStates((preVal) => {
            const newSteps = [...preVal.campaign?.steps];

            // If custom design is on or device type differs from the current system device type,
            // update the campaign step for the specific device type.
            if (customDesignOn || deviceType !== getDeviceType()) {
                newSteps[editorStep] = {
                    ...newSteps[editorStep],
                    [deviceType]: { content: blocks },
                };
            } else {
                // If no custom design is used, update both desktop and mobile content to be the same.
                newSteps[editorStep] = {
                    ...newSteps[editorStep],
                    desktop: { content: blocks },
                    mobile: { content: blocks },
                };
            }

            return {
                ...preVal,
                campaign: { ...preVal.campaign, steps: newSteps },
            };
        });
    };

    /**
     * Updates the campaign states with new control data.
     *
     * @param {Object} params - The parameters containing the field and value to be updated.
     * @param {string} params.field - The field to be updated.
     * @param {*} params.value - The value to be set for the specified field.
     */
    const processControlData = ({ form, field, value }) => {
        setCampaignStates((prevState) => {
            return {
                ...prevState,
                campaign: {
                    ...prevState.campaign,
                    controls: {
                        ...prevState.campaign.controls,
                        [form]: {
                            ...prevState.campaign.controls[form],
                            [field]: {
                                ...prevState.campaign.controls[form]?.[field],
                                ...value,
                            },
                        },
                    },
                },
            };
        });
    };

    return { processStepData, processControlData };
}

export default useProcessCampaignEditData;
