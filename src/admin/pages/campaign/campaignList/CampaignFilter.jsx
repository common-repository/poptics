/**
 * Wordpress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex } from "antd";
import FilterByText from "../../../components/FilterByText";
import { Badge, SelectInput } from "../../../../common/components";
import useCampaignApi from "./hooks/useCampaignApi";
import { CampaignContext } from "./withCampaignData";

const { __ } = wp.i18n;

const CampaignFilter = () => {
    // Retrieve the current campaign states from the CampaignContext using the useContext hook
    const campaignStates = useContext(CampaignContext);

    const {
        campaignTypes = [],
        campaignGoals = [],
        statusList = {},
    } = campaignStates;

    // Import the necessary hook to interact with the Campaign API
    const { getCampaigns } = useCampaignApi();

    /**
     * Handler function to fetch campaigns based on the selected query.
     * This function is called when a user selects a filter option.
     *
     * @param {Object} query - The query parameters to filter campaigns.
     */
    const onSelectHandler = (query) => {
        getCampaigns(query);
    };

    const allData = [{ label: __("All", "poptics"), value: "" }];

    // If successful, construct the statusList array to include all campaign statuses along with their counts
    const status = [
        ...allData,
        ...Object.entries(statusList).map(([value, count]) => ({
            value,
            label: (
                <Flex className="pt-campaign-status" key={value}>
                    {value}
                    <Badge overflowCount={99} count={count} />
                </Flex>
            ),
        })),
    ];

    // Add the campaign types to the types array
    const goals = [...allData, ...campaignGoals];

    // Add the campaign types to the types array
    const types = [...allData, ...campaignTypes];

    return (
        <Flex wrap gap="small" justify="space-between">
            <SelectInput
                placeholder={__("Popup Status", "poptics")}
                options={status}
                className="pt-campaign-status-select-filter"
                size="large"
                onChange={(value) => {
                    onSelectHandler({ status: value });
                }}
            />
            <Flex gap="small" justify="flex-end" wrap>
                <FilterByText />
                <SelectInput
                    placeholder={__("Campaign Goal", "poptics")}
                    options={goals.map((item) => ({
                        value: item.value ?? item.term_id,
                        label: item.label || item.name,
                    }))}
                    size="large"
                    className="pt-campaign-status-select-filter"
                    onChange={(value) => {
                        onSelectHandler({ goal: value });
                    }}
                />
                <SelectInput
                    placeholder={__("Popup Type", "poptics")}
                    options={types.map((item) => ({
                        value: item.value ?? item.term_id,
                        label: item.label || item.name,
                    }))}
                    size="large"
                    className="pt-campaign-status-select-filter"
                    onChange={(value) => {
                        onSelectHandler({ type: value });
                    }}
                />
            </Flex>
        </Flex>
    );
};

export default CampaignFilter;
