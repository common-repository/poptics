/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex } from "antd";
import PageTarget from "./pageTarget/PageTarget";
import Audience from "./audience/Audience";
import UserBehave from "./userBehaviour/UserBehave";
import FrequencySetting from "./frequencySetting/FrequencySetting";
import AutoResponse from "./autoResponse/AutoResponse";
import { Button } from "../../../../../common/components";
import useSingleCampaignApi from "../../hooks/useSingleCampaignApi";
import { SingleCampaignContext } from "../../withSingleCampaignData";
import Schedule from "./schedule/Schedule";

const { __ } = wp.i18n;

const ControlRight = () => {
    // Context for accessing and updating campaign data.
    const { editLoading } = useContext(SingleCampaignContext);

    const { updateDataWithStep } = useSingleCampaignApi();

    return (
        <Flex gap="middle" vertical>
            <PageTarget />
            <Audience />
            <UserBehave />
            <FrequencySetting />
            <Schedule />
            <AutoResponse />
            <Flex justify="center">
                <Button
                    aria-label={__("continue and publish button", "poptics")}
                    size="large"
                    type="primary"
                    text={__("Continue to Publish", "poptics")}
                    onClick={updateDataWithStep}
                    loading={editLoading}
                />
            </Flex>
        </Flex>
    );
};

export default ControlRight;
