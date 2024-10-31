/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { SingleCampaignContext } from "../../../withSingleCampaignData";
import CompactInput from "./CompactInput";
import { Row } from "antd";

/**
 * CustomSettings Component
 *
 * This component renders custom settings based on campaign data fetched using the WordPress context.
 * It utilizes the `SingleCampaignContext` to access the campaign's data and display frequency settings.
 * A filter hook ("custom_frequency") is applied to determine whether or not to display the CompactInput component.
 *
 * @returns {JSX.Element} A `Row` component from Ant Design containing filtered children elements.
 */
const CustomSettings = () => {
    // Use context to access campaign data.
    const { campaign } = useContext(SingleCampaignContext);

    // Retrieve the display frequency settings from campaign data or set an empty object by default.
    const displayFrequency =
        campaign?.controls?.frequency_settings?.display_frequency || {};

    return (
        <Row justify={{ sm: "start", md: "end" }}>
            {/* Apply a filter to "custom_frequency" hook to determine the children to render */}
            {wp.hooks.applyFilters("custom_frequency", null, {
                displayFrequency,
                children: (params = {}) => (
                    <CompactInput
                        label={params.label}
                        tooltipText={params.tooltipText}
                        field={params.field}
                        name={params.name}
                    />
                ),
            })}
        </Row>
    );
};

export default CustomSettings;
