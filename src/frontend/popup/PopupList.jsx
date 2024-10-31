/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { PopupContext } from "./withPopupData";
import PopupModal from "../components/PopupModal";

const PopupList = () => {
    const { activeCampaigns } = useContext(PopupContext);

    return activeCampaigns?.map((campaign) => {
        return <PopupModal key={campaign.id} campaign={campaign} />;
    });
};

export default PopupList;
