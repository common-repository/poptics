/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { SingleCampaignContext } from "../../../withSingleCampaignData";
import PageSelectionBox from "./PageSelectionBox";

const CustomPage = () => {
    // Use context to access campaign data
    const { campaign } = useContext(SingleCampaignContext);

    return wp.hooks.applyFilters("custom_pages", null, {
        pageTarget: campaign?.controls?.page_target,
        children: (params = {}) => (
            <PageSelectionBox
                label={params.label}
                tooltipText={params.tooltipText}
                field={params.field}
            />
        ),
    });
};

export default CustomPage;
