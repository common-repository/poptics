/**
 * WordPress Dependencies
 */
import { useState } from "@wordpress/element";

import { Col, Flex, Row } from "antd";

import { getIntegrationCards } from "../../integration/constant";
import { Input } from "../../../../common/components";
import { SearchIcon } from "../../../../common/icons";
import ControlIntegrationCard from "./ControlIntegrationCard";

const { __ } = wp.i18n;

/**
 * Integrations component for managing and displaying a list of integrations
 * for a campaign. Provides a search functionality and allows users to select
 * and configure integrations.
 *
 * @returns {JSX.Element} The rendered integrations component.
 */
const Integrations = () => {
    // State for storing the search keyword.
    const [searchKey, setSearchKey] = useState("");

    // Retrieve the list of integration cards filtered by the search keyword.
    const integrationList = getIntegrationCards({ searchKey });

    return (
        <Flex gap="middle" vertical>
            {/* Search bar for filtering integrations */}
            <Row justify={"end"} gutter={[12, 12]}>
                <Col>
                    <Input
                        size="large"
                        className="pt-search-input"
                        placeholder={__("Search", "poptics")}
                        prefix={<SearchIcon color="#6B7280" />}
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                </Col>
            </Row>

            <Row gutter={[12, 12]}>
                {/* Render each integration card */}
                {integrationList.map((item) => (
                    <ControlIntegrationCard key={item.key} data={item} />
                ))}
            </Row>
        </Flex>
    );
};

export default Integrations;
