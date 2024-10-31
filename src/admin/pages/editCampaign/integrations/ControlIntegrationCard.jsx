/**
 * WordPress Dependencies
 */
import { useContext, useState, useEffect } from "@wordpress/element";

import { Col, Flex } from "antd";
import { CheckBox } from "../../../../common/components";
import ProTag from "../../../components/ProTag";
import { Link } from "react-router-dom";
import { SingleCampaignContext } from "../withSingleCampaignData";
import IntegrationModal from "../../integration/IntegrationModal";
import { AdminContext } from "../../../withAdminData";

const { __ } = wp.i18n;

/**
 * Renders a card component for controlling and displaying integration options.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.data - The data for rendering the integration card.
 * @param {string} props.data.key - Unique key for the integration.
 * @param {string} props.data.title - Title of the integration.
 * @param {JSX.Element} props.data.logo - Logo element for the integration.
 * @param {boolean} props.data.isPro - Flag indicating whether the integration is a pro feature.
 * @param {number} props.data.id - ID of the integration used for configuration.
 *
 * @returns {JSX.Element} The rendered integration card component.
 */
const ControlIntegrationCard = ({ data }) => {
    const { setCampaignStates, campaign } = useContext(SingleCampaignContext);
    const { settings, isProActivated } = useContext(AdminContext);

    const [open, setOpen] = useState(null);

    /**
     * Handles the configuration of an integration by setting relevant state and navigating to the integration path.
     */
    const handleConfigure = () => {
        setOpen(true);
    };

    /**
     * Handles the change event when toggling an integration's connection status.
     */
    const handleIntegrationChange = () => {
        const { key, isConnected } = data;

        // If the integration is not connected, redirect to the configuration handler.
        if (!isConnected) return handleConfigure();

        // Update the campaign state to reflect the integration's connection status.
        setCampaignStates((preVal) => {
            // Retrieve the current list of integrations or initialize as an empty array.
            let integrations = preVal.campaign.integrations || [];

            // If the integration is already included, remove it. Otherwise, add it to the list.
            integrations = integrations.includes(key)
                ? integrations.filter((item) => item !== key) // Remove the integration from the list.
                : [...integrations, key]; // Add the integration to the list.

            // Return the updated state with the modified integrations list.
            return {
                ...preVal,
                campaign: { ...preVal.campaign, integrations },
            };
        });
    };

    useEffect(() => {
        // Check if the 'open' state is false, indicating that the popup/modal is closed.
        if (open === false) {
            // If the specific setting for 'data?.key' exists in the 'settings' object,
            // then trigger the 'handleIntegrationChange' function.
            // This ensures that when the popup/modal is closed, if there are related
            // settings already in place, the function to handle integration changes is called.
            if (settings?.[data?.key] && !data?.isConnected) {
                handleIntegrationChange();
            }
        }
    }, [open, settings]);

    return (
        <Col
            xs={{ flex: "50%" }}
            lg={{ flex: "25%" }}
            xl={{ flex: "20%" }}
            className="pt-create-campaign-modal-type-container"
        >
            <CheckBox
                checked={campaign?.integrations?.includes(data.key)}
                className="pt-control-integrations-checkbox"
                disabled={data.isPro && !isProActivated}
                onChange={handleIntegrationChange}
            >
                <Flex vertical gap={2} justify="space-between">
                    {/* Integration logo with reduced opacity if it's a pro feature */}
                    <div
                        className="pt-integration-logo"
                        style={{
                            opacity: data.isPro && !isProActivated ? 0.3 : 1,
                        }}
                    >
                        {data.logo}
                    </div>
                    <Flex gap="small">
                        {/* Title of the integration */}
                        {data.title}

                        {/* Show ProTag for pro features */}
                        {data.isPro && !isProActivated ? <ProTag /> : null}
                    </Flex>

                    <Link to={"#"} onClick={handleConfigure}>
                        {__("Configure", "poptics")}
                    </Link>
                </Flex>
            </CheckBox>

            <IntegrationModal cardInfo={data} open={open} setOpen={setOpen} />
        </Col>
    );
};

export default ControlIntegrationCard;
