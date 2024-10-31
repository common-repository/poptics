/**
 * Wordpress Dependencies
 */
import { useContext, useEffect } from "@wordpress/element";

import EmptyScreen from "../../components/emptyScreen";
import CampaignList from "./campaignList/CampaignList";
import { RowSkeleton } from "../../../common/components";
import { emptyCampaignData } from "./constant";
import useCampaignApi from "./campaignList/hooks/useCampaignApi";
import withCampaignData, {
  CampaignContext
} from "./campaignList/withCampaignData";

const Campaign = () => {
  const { campaignList, searchQuery } = useContext(CampaignContext);
  const { paged, per_page } = searchQuery;

  const { getCampaigns } = useCampaignApi();

  useEffect(() => {
    getCampaigns({ paged, per_page });
  }, []);

  // Determine if any search filters are applied
  const isFiltered =
    searchQuery.search_key !== "" ||
    searchQuery.type !== "" ||
    searchQuery.goal !== "" ||
    searchQuery.status !== "";

  return (
    <RowSkeleton rows={per_page} loading={!campaignList}>
      {campaignList?.length > 0 || isFiltered ? (
        <CampaignList />
      ) : (
        <EmptyScreen data={emptyCampaignData} />
      )}
    </RowSkeleton>
  );
};

export default withCampaignData(Campaign);
