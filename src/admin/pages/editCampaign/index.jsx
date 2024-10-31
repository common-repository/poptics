/**
 * WordPress Dependencies
 */
import { useContext, useEffect } from "@wordpress/element";

import { Flex } from "antd";
import BasicEdit from "./BasicEdit";
import EditSteps from "./EditSteps";
import withSingleCampaignData, {
    SingleCampaignContext,
} from "./withSingleCampaignData";
import { Button, RowSkeleton } from "../../../common/components";
import useSingleCampaignApi from "./hooks/useSingleCampaignApi";
import Editor from "./blockEditor";
import Control from "./control";
import HeaderBtn from "./header/headerBtn";
import { CaretLeftIcon } from "../../../common/icons";
import { CAMPAIGN_PATH } from "../../router/routeDefinition";
import { useNavigate } from "react-router-dom";
import Integrations from "./integrations";

const { __ } = wp.i18n;

const EditCampaign = () => {
    // Context for accessing and updating campaign data.
    const campaignStates = useContext(SingleCampaignContext);
    const { campaign, currentStep } = campaignStates;

    const navigate = useNavigate();

    // Custom hook for fetching single campaign data.
    const { getSingleCampaign } = useSingleCampaignApi();

    // Function to handle going back to the previous step.
    const goBackHandler = () => {
        navigate(CAMPAIGN_PATH);
    };

    // Fetch single campaign data when component mounts.
    useEffect(() => {
        getSingleCampaign();
    }, []);

    // Function to set the status of steps based on the current step
    const setStatus = (id) => {
        return currentStep >= id ? "process" : "wait";
    };

    // Define steps for the edit process
    const steps = [
        {
            title: __("Select Template", "poptics"),
            content: null,
            status: "process",
        },
        {
            title: __("Create Popup", "poptics"),
            content: <Editor />,
            status: setStatus(1),
        },
        {
            title: __("Controls", "poptics"),
            content: <Control />,
            status: setStatus(2),
        },
        {
            title: __("Integrations", "poptics"),
            content: <Integrations />,
            status: setStatus(3),
        },
    ];

    return (
        <RowSkeleton rows={20} loading={!campaign}>
            <>
                <Flex align="center" className="pt-secondary-header">
                    <Button
                        aria-label={__("go back button", "poptics")}
                        type="text"
                        className="pt-icon-btn pt-fw-500 pt-go-back-btn"
                        icon=<CaretLeftIcon />
                        onClick={goBackHandler}
                    />
                    <Flex
                        justify="space-between"
                        align="center"
                        gap="small"
                        wrap={window.innerWidth <= 1200}
                        className="pt-secondary-header-content"
                    >
                        {/* BasicEdit component for editing basic campaign details */}
                        <BasicEdit />

                        <EditSteps steps={steps} />
                        <HeaderBtn />
                    </Flex>
                </Flex>
                {/* Main content area for editing campaign */}
                <div className="pt-admin-wrapper">
                    {steps?.[currentStep]?.content}
                </div>
            </>
        </RowSkeleton>
    );
};

export default withSingleCampaignData(EditCampaign);
