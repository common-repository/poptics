import Api from "../../../../api";
import { getDateRange } from "../constant";
import { useContext } from "@wordpress/element";
import { AnalyticsContext } from "../withAnalyticsData";

function useAnalyticsApi() {
    let { setAnalyticsStates, campaignId, dateRange } =
        useContext(AnalyticsContext);

    dateRange === "" ? (dateRange = getDateRange()) : dateRange;

    const getAnalytics = async (param = {}) => {
        let params = {
            campaign_id: campaignId,
            date_range: dateRange,
            ...param,
        };

        try {
            const res = await Api.analytics.getAnalytics(params);

            if (res.success) {
                setAnalyticsStates((preVal) => ({
                    ...preVal,
                    cardViewData: res?.data?.data_for_card_view,
                    statisticalAnalysis: res?.data?.statistical_analytics,
                    pieDataDesktop:
                        res?.data?.device_based_analytics_info_for_pie_chart
                            ?.pie_data_desktop,
                    pieDataOthers:
                        res?.data?.device_based_analytics_info_for_pie_chart
                            ?.pie_data_others,
                    pieDataMobile:
                        res?.data?.device_based_analytics_info_for_pie_chart
                            .pie_data_mobile,
                }));
            }
        } catch (error) {
            console.error("Error fetching analytics data:", error);
        }
    };

    const getCampaigns = async () => {
        try {
            const res = await Api.campaign.allCampaigns({});
            if (res.success) {
                setAnalyticsStates((prevStates) => ({
                    ...prevStates,
                    campaignList: res?.data?.items,
                }));
            }
        } catch (error) {
            console.log("Error fetching campaigns data:", error);
        }
    };

    return {
        getAnalytics,
        getCampaigns,
    };
}

export default useAnalyticsApi;
