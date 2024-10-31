/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import Api from "../../../../../api";
import { pagination as globalPagination } from "../../../../../globalConstant";
import { CampaignContext } from "../withCampaignData";

function useCampaignApi() {
    // Access campaign states and state updater from context
    const campaignStates = useContext(CampaignContext);
    const { setCampaignStates, searchQuery } = campaignStates;

    // Destructure pagination values
    const { per_page, paged } = globalPagination;

    // Function to update a campaign by ID
    const updateCampaign = async (id, values) => {
        try {
            // Call API to update campaign
            const res = await Api?.campaign?.updateCampaign(id, values);
            if (res?.success) {
                // If successful, update the campaign list in state
                setCampaignStates((preVal) => {
                    const updatedCampaign = preVal.campaignList?.map((item) =>
                        item.id === id ? { ...item, ...values } : item,
                    );
                    return {
                        ...preVal,
                        campaignList: updatedCampaign,
                    };
                });
            }
        } catch (error) {
            console.log(error); // Log any errors
        }
    };

    // Function to fetch campaigns based on search query and pagination
    const getCampaigns = async (query = {}) => {
        // Merge default and additional query parameters
        // enableSearch params added to indicate the params are passed as search/filter query

        const params = {
            ...searchQuery,
            per_page,
            paged,
            ...query,
            enableSearch: true,
        };
        try {
            // Call API to get all campaigns
            const res = await Api?.campaign?.allCampaigns(params);
            if (res?.success) {
                // Update the campaign list and total in state
                setCampaignStates((preVal) => {
                    return {
                        ...preVal,
                        per_page,
                        paged,
                        campaignTypes: res?.data?.types || [],
                        campaignGoals: res?.data?.goals || [],
                        statusList: res?.data?.status_count || {},
                        campaignList: res?.data?.items,
                        total: res?.data?.total,
                        searchQuery: { ...preVal.searchQuery, ...query },
                    };
                });
            }
        } catch (error) {
            console.log(error); // Log any errors
        } finally {
            return { complete: true }; // Indicate completion
        }
    };

    // Function to duplicate a campaign by ID
    const duplicateCampaign = async (id) => {
        try {
            // Call API to clone campaign
            const res = await Api?.campaign?.cloneCampaign(id);
            if (res?.success) {
                // If successful, add the cloned campaign to the list in state
                setCampaignStates((preVal) => {
                    return {
                        ...preVal,
                        campaignList: [res?.data, ...preVal.campaignList],
                        total: preVal.total + 1,
                    };
                });
            }
        } catch (error) {
            console.log(error); // Log any errors
        }
    };

    // Function to delete a single campaign by ID
    const deleteSingleCampaign = async (id) => {
        try {
            // Call API to delete campaign
            const res = await Api?.campaign?.deleteSingleCampaign(id);
            if (res?.success) {
                // If successful, remove the campaign from the list in state
                setCampaignStates((preVal) => {
                    return {
                        ...preVal,
                        campaignList: preVal.campaignList?.filter(
                            (item) => item.id !== id,
                        ),
                    };
                });
            }
        } catch (error) {
            console.log(error); // Log any errors
        }
    };

    // Function to delete multiple campaigns by their IDs
    const bulkDeleteCampaign = async (ids = []) => {
        try {
            // Call API to bulk delete campaigns
            const res = await Api?.campaign?.bulkDeleteCampaign(ids);
            if (res?.success) {
                // If successful, refresh the campaign list
                getCampaigns({
                    per_page: searchQuery.per_page,
                    paged: searchQuery.paged,
                });
            }
        } catch (error) {
            console.log(error); // Log any errors
        } finally {
            return { complete: true }; // Indicate completion
        }
    };

    // Return the functions to interact with campaign API
    return {
        updateCampaign,
        getCampaigns,
        deleteSingleCampaign,
        bulkDeleteCampaign,
        duplicateCampaign,
    };
}

export default useCampaignApi;
