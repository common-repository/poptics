/**
 * Wordpress Dependencies
 */
import { useContext, useEffect } from "@wordpress/element";

import withPopupData, { PopupContext } from "./withPopupData";
import usePopupApi from "./hooks/usePopupApi";
import PopupList from "./PopupList";

const Popup = () => {
    const { campaignId, activeCampaigns } = useContext(PopupContext);

    const { getSingleCampaign } = usePopupApi();

    useEffect(() => {
        if (campaignId) getSingleCampaign();
    }, [campaignId]);

    if (activeCampaigns?.length) {
        return <PopupList />;
    }

    return null;
};

export default withPopupData(Popup);
