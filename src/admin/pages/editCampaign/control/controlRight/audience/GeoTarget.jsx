/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Flex, Row } from "antd";
import { Card } from "../../../../../../common/components";
import RadioInput from "../RadioInput";
import { FlagHalfIcon, FlagIcon } from "../../../../../../common/icons";
import CountryRegionSelection from "./CountryRegionSelection";
import { SingleCampaignContext } from "../../../withSingleCampaignData";

const { __ } = wp.i18n;

const GeoTarget = () => {
    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);

    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "all_locations",
            icon: <FlagIcon />,
            label: __("All Locations", "poptics"),
            isPro: false,
        },
        {
            key: "custom_location",
            icon: <FlagHalfIcon />,
            label: __("Custom Location", "poptics"),
            isPro: true,
        },
    ];

    return (
        <Card bordered={false}>
            <Flex gap="small" vertical>
                {/* Radio input component with items and label */}
                <RadioInput
                    radioItems={radioItems}
                    label={__("Geo-targeting", "poptics")}
                    subText={__(
                        "Target visitors based on their location.",
                        "poptics",
                    )}
                    form="audience"
                    field="geo_target"
                />
                {campaign?.controls?.audience?.geo_target?.value ===
                "custom_location" ? (
                    <CountryRegionSelection />
                ) : null}
            </Flex>
        </Card>
    );
};

export default GeoTarget;
