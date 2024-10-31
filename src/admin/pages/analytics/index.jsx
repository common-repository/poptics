import useAnalyticsApi from "./hooks/useAnalyticsApi";
import { useEffect, useContext } from "@wordpress/element";
import withAnalyticsData, { AnalyticsContext } from "./withAnalyticsData";
import { RowSkeleton } from "../../../common/components";
import CampaignAnalytics from "./CampaignAnalytics";

const { __ } = wp.i18n;

const Analytics = () => {
    const { getAnalytics } = useAnalyticsApi();
    const { cardViewData } = useContext(AnalyticsContext);

    useEffect(() => {
        getAnalytics();
    }, []);

    return (
        <RowSkeleton loading={!cardViewData}>
            <CampaignAnalytics />
        </RowSkeleton>
    );
};

export default withAnalyticsData(Analytics);
