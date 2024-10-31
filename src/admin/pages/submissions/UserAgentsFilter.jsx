import { useContext, useState, useEffect, useRef } from "@wordpress/element";
import { Flex } from "antd";

import FilterByText from "../../components/FilterByText";
import { SelectInput } from "../../../common/components";
import { SubmissionsContext } from "./withSubmissionsData";
import useSubmissionsApi from "./hooks/useSubmissionAPI";
const { __ } = wp.i18n;

const UserAgentsFilter = () => {
    // define and get all states for the component
    const { searchQuery } = useContext(SubmissionsContext);
    const { getAllSubmissionsByFiltering } = useSubmissionsApi();
    const [agentFilters, setAgentFilters] = useState({
        location: "",
        browser: "",
        device: "",
    });
    const { browsers, devices, locations } = searchQuery;

    // map the user agents list that is coming from db in a select input format
    const mapFiltersOption = (options) => {
        if (options === "") {
            return;
        }
        let selectOptions = options?.map((option) => ({
            value: option,
            label: option,
        }));
        selectOptions.unshift({ label: __("All", "poptics"), value: "" });
        return selectOptions;
    };

    // update user agents state, while selecting any
    const handleUserAgentChange = (name, value) => {
        setAgentFilters((preVal) => ({ ...preVal, [name]: value }));
    };

    // ref to keep track of the first render
    const isFirstRender = useRef(true);

    // get submissions data after changing any state
    useEffect(() => {
        if (isFirstRender.current === true) {
            isFirstRender.current = false;
            return;
        }
        getAllSubmissionsByFiltering(agentFilters);
    }, [JSON.stringify(agentFilters)]);

    return (
        <Flex gap="small" align="center" justify="center">
            <FilterByText />

            <SelectInput
                loading={locations === ""}
                placeholder={__("Location", "poptics")}
                options={mapFiltersOption(locations)}
                size="large"
                className="pt-submission-filters-min-width"
                onChange={(value) => {
                    handleUserAgentChange("location", value);
                }}
            />

            <SelectInput
                loading={devices === ""}
                options={mapFiltersOption(devices)}
                placeholder={__("Device", "poptics")}
                size="large"
                className="pt-submission-filters-min-width"
                onChange={(value) => {
                    handleUserAgentChange("device", value);
                }}
            />

            <SelectInput
                loading={browsers === ""}
                options={mapFiltersOption(browsers)}
                placeholder={__("Browser", "poptics")}
                size="large"
                className="pt-submission-filters-min-width"
                onChange={(value) => {
                    handleUserAgentChange("browser", value);
                }}
            />
        </Flex>
    );
};

export default UserAgentsFilter;
