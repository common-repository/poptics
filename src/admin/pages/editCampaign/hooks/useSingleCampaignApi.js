/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { SingleCampaignContext } from "../withSingleCampaignData";
import Api from "../../../../api";
import { useParams, useNavigate } from "react-router-dom";
import { getDeviceType, serializeData } from "./../../../../helper";
import { CAMPAIGN_PATH } from "../../../router/routeDefinition";

function useSingleCampaignApi() {
    // Access campaign states
    const campaignStates = useContext(SingleCampaignContext);
    const { currentStep, campaign, setCampaignStates } = campaignStates;

    const { campaignId } = useParams();
    const navigate = useNavigate();

    const getSingleCampaign = async () => {
        try {
            // Call API to get single campaign by campaign id
            const res = await Api?.campaign?.singleCampaign(campaignId);

            if (res?.success) {
                const campaign = res?.data;

                const oppositeDevice =
                    getDeviceType() === "desktop" ? "mobile" : "desktop";

                setCampaignStates((preVal) => ({
                    ...preVal,
                    campaign,
                    customDesignOn:
                        campaign?.steps?.[preVal?.editorStep]?.[oppositeDevice]
                            ?.content[0]?.innerBlocks?.length !== 0,
                }));
            }
        } catch (error) {
            console.error("Failed to fetch campaign:", error);
        }
    };

    // Function to update a campaign by ID
    const updateCampaign = async (data = {}) => {
        try {
            setCampaignStates((preVal) => {
                return {
                    ...preVal,
                    editLoading: true,
                };
            });

            // Call API to update campaign
            await Api?.campaign?.updateCampaign(campaignId, {
                ...campaign,
                ...data,
            });
        } catch (error) {
            console.log(error); // Log any errors
        } finally {
            setCampaignStates((preVal) => {
                return {
                    ...preVal,
                    editLoading: false,
                };
            });
        }
    };

    /**
     * Updates the campaign data and advances to the next step.
     *
     * This function is responsible for asynchronously updating the campaign
     * by calling the `updateCampaign` function. Once the campaign is updated,
     * it increments the `currentStep` in the campaign state.
     */
    const updateDataWithStep = async () => {
        await updateCampaign();

        // Increment the current step in the campaign state.
        setCampaignStates((preVal) => ({
            ...preVal,
            currentStep: preVal.currentStep + 1,
        }));
    };

    /**
     * Publishes the campaign or step based on schedule settings.
     *
     * This function checks if a schedule is set (either fixed or repeating).
     * If a schedule is set, the campaign status is updated to "scheduled",
     * otherwise, it becomes "active". The updated status is applied to the
     * campaign and the `updateCampaign` function is called to save the changes.
     * After publishing, the user is redirected to the campaign overview page.
     */
    const publishStep = async () => {
        const schedule = campaign?.controls?.schedule;

        // Check if either a fixed or repeating schedule is set.
        const isScheduleSet =
            schedule?.fixed?.length || schedule?.repeating?.length;

        // Determine the campaign status: "scheduled" if a schedule is set, otherwise "active".
        const status = isScheduleSet ? "scheduled" : "active";

        // Update the campaign state with the new status.
        setCampaignStates((preVal) => ({
            ...preVal,
            campaign: { ...preVal.campaign, status },
        }));

        await updateCampaign({ status });

        navigate(CAMPAIGN_PATH);
    };

    /**
     * Function to send a test email.
     * @param {Object} data - Data containing the recipient email.
     * @returns {Object} res - Response object from the API call.
     */
    const sendTestEmail = async (data) => {
        let res;
        try {
            // Retrieve email details from the campaign controls
            const email = campaign?.controls?.auto_response?.email;

            // Create a payload object for the API request
            const payload = {
                receiver_email: data?.email, // Recipient email from the input data
                subject: email?.subject || "", // Email subject, default to an empty string if not available
                body: email?.email_body ? serializeData(email?.email_body) : "", // Email body, serialized if available, else default to an empty string
            };

            // Make an API call to send the test email and await the response
            res = await Api?.campaign?.sendTestMail(payload);
        } catch (error) {
            // set the error response to the error object
            res = error;
        } finally {
            // Return the response object
            return res;
        }
    };

    return {
        getSingleCampaign,
        updateCampaign,
        updateDataWithStep,
        sendTestEmail,
        publishStep,
    };
}

export default useSingleCampaignApi;
