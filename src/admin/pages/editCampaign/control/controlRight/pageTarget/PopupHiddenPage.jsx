/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { SingleCampaignContext } from "../../../withSingleCampaignData";
import PageSelectionBox from "./PageSelectionBox";

const { __ } = wp.i18n;

const PopupHiddenPage = () => {
    // Use context to access campaign data
    const { campaign } = useContext(SingleCampaignContext);

    // Extract `show_in` from campaign controls if available
    const show_in = campaign?.controls?.page_target?.show_in?.value;
    if (show_in !== "all_pages") return null;

    return (
        <PageSelectionBox
            label={__("Don’t Show In", "poptics")}
            tooltipText={__(
                "It allows users to hide popups from any post, page, product, or URL on their website.",
                "poptics",
            )}
            field="dont_show_in"
        />
    );
};

export default PopupHiddenPage;
