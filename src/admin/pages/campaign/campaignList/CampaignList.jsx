import { Col, Flex, Row, Space } from "antd";
import { Button, Title } from "../../../../common/components";
import SearchInput from "../../../components/SearchInput";
import CampaignFilter from "./CampaignFilter";
import useCampaignApi from "./hooks/useCampaignApi";
import { useNavigate } from "react-router-dom";
import { TEMPLATES_PATH } from "../../../router/routeDefinition";
import CampaignTable from "./CampaignTable";

const { __ } = wp.i18n;

const CampaignList = () => {
    const { getCampaigns } = useCampaignApi();
    const navigate = useNavigate();

    return (
        <>
            {/*top bar row*/}
            <Flex vertical gap={16}>
                <Flex justify="space-between" gap="small" wrap>
                    <Title
                        level={3}
                        text={__("Popups Campaign", "poptics")}
                        className="pt-page-heading"
                    />
                    <Space size="small">
                        <SearchInput
                            placeholder={__("Search Campaign", "poptics")}
                            searchFunc={getCampaigns}
                        />
                        <Button
                            size="large"
                            type="primary"
                            aria-label={__("Bulk Delete", "poptics")}
                            text={__("Create Campaign", "poptics")}
                            onClick={() => navigate(TEMPLATES_PATH)}
                        />
                    </Space>
                </Flex>
                <CampaignFilter />

                {/*campaign table*/}
                <CampaignTable />
            </Flex>
        </>
    );
};

export default CampaignList;
