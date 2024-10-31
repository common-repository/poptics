/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { PopupContext } from "../withPopupData";
import Api from "../../../api";
import { getBrowserInfo, getDeviceType, getCountryName } from "../../../helper";
import { getLocalStorageData } from "../../helpers/processLocalStorage";

const usePopupApi = (controls) => {
    // Access campaign states and state updater from context
    const popupStates = useContext(PopupContext);
    const { setPopupStates, campaignId, pageId } = popupStates;

    const getSingleCampaign = async () => {
        try {
            // Call API to get single campaign by campaign id
            const res = await Api?.campaign?.singleCampaign(campaignId);

            if (res?.success) {
                setPopupStates((preVal) => ({
                    ...preVal,
                    activeCampaigns: [res.data],
                }));
            }
        } catch (error) {
            console.error("Failed to fetch campaign:", error);
        }
    };

    /**
     * Stores analytics data for a given campaign ID.
     *
     * @param {number} id - The ID of the campaign to track.
     */
    const storeAnalytics = async ({
        id,
        is_converted = 0,
        leadValues = {},
    }) => {
        let response;

        try {
            // Get country name, browser name, and device type.
            const country_name = getCountryName();
            const browser_name = getBrowserInfo();
            const device_type = getDeviceType({ replaceOthers: false });

            // Prepare and send the analytics payload.
            const payload = {
                device_type,
                browser_name,
                country_name,
                is_converted,
                is_viewed: 1,
                campaign_id: id,
                page_id: pageId,
                ...leadValues,
            };

            const res = await Api?.leadCollection?.storeAnalytics(payload);
            if (res?.success) {
                setPopupStates((preVal) => {
                    const convertedIds = preVal.convertedIds?.includes(id)
                        ? preVal.convertedIds
                        : [...preVal.convertedIds, id]; // Add campaign ID to the list of converted IDs if not already present.
                    return {
                        ...preVal,
                        convertedIds,
                    };
                });

                // Check if the user has converted (payload?.is_converted === 1) and if there are user actions specified
                // to stop displaying the campaign (controls?.frequency_settings?.user_actions_to_stop_displaying?.action_on_campaign).
                if (
                    payload?.is_converted === 1 &&
                    controls?.frequency_settings
                        ?.user_actions_to_stop_displaying?.action_on_campaign
                ) {
                    // Retrieve existing local storage data for this campaign using the campaign ID.
                    const { localData } = getLocalStorageData(id);

                    // Define a key specific to the current campaign's view status in localStorage.
                    const key = `poptics-campaign-${id}-viewed`;

                    // Create a data object that marks the campaign as 'converted' and merge it with existing local data.
                    const data = JSON.stringify({
                        ...localData,
                        is_converted: true, // Indicates the user has converted.
                    });

                    // Store the updated campaign data in localStorage to prevent further display of the popup for this user.
                    localStorage.setItem(key, data);
                }
            }
            response = res;
        } catch (error) {
            console.error(error);
            response = error;
        } finally {
            return response;
        }
    };

    // Return the functions to interact with campaign API
    return {
        getSingleCampaign,
        storeAnalytics,
    };
};

export default usePopupApi;
