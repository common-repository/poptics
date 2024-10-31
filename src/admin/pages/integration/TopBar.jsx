import { useContext } from "@wordpress/element";
import { Flex } from "antd";
import { Input, Title } from "../../../common/components";

import { SearchIcon } from "./../../../common/icons";
import { IntegrationContext } from "./withIntegrationData";

const { __ } = wp.i18n;

const TopBar = () => {
    const { setIntegrationState } = useContext(IntegrationContext);
    return (
        <Flex
            align="center"
            justify="space-between"
            className="pt-integration-top-bar-container"
        >
            <Title level={3} text={__("Integration", "poptics")} />
            <Flex>
                <Input
                    size="large"
                    className="pt-search-input"
                    placeholder={__("Search", "poptics")}
                    prefix={<SearchIcon color="#6B7280" />}
                    onChange={(e) =>
                        setIntegrationState((preVal) => ({
                            ...preVal,
                            searchKey: e.target.value,
                        }))
                    }
                />
            </Flex>
        </Flex>
    );
};

export default TopBar;
