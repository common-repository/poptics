const { __ } = wp.i18n;
import { Flex } from "antd";
import { Input, Title } from "../../../common/components";
import { SearchIcon } from "../../../common/icons";
import { EntriesTable } from "./EntriesTable";
import KeyFilters from "./KeyFilters";
import UserAgentsFilter from "./UserAgentsFilter";
import useSubmissionsApi from "./hooks/useSubmissionAPI";
import SearchInput from "../../components/SearchInput";

const SubmissionsPage = () => {
    const { getAllSubmissionsByFiltering } = useSubmissionsApi();
    return (
        <Flex vertical>
            {/*search bar*/}
            <Flex
                className="pt-entries-title-bar-container"
                align="center"
                justify="space-between"
                wrap
            >
                <Title level={3} text={__("Entries", "poptics")} />

                <div className="pt-entries-search-container">
                    <SearchInput
                        placeholder={__("Search Entries", "poptics")}
                        searchFunc={getAllSubmissionsByFiltering}
                    />
                </div>
            </Flex>

            {/*filter bar*/}
            <Flex
                className="pt-entries-title-bar-container"
                align="center"
                justify="space-between"
                wrap
            >
                <KeyFilters />
                <UserAgentsFilter />
            </Flex>
            <EntriesTable />
        </Flex>
    );
};

export default SubmissionsPage;
