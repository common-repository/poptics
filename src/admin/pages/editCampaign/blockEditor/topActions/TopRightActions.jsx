import { Flex, Space } from "antd";
import { Button } from "../../../../../common/components";
import { AiDocIcon } from "../../../../../common/icons";
import ProTag from "../../../../components/ProTag";
import PreviewModal from "./PreviewModal";

const { __ } = wp.i18n;

const TopRightActions = () => {
    return (
        <Flex wrap gap="small">
            <PreviewModal />
            <Button
                aria-label={__("pro button", "poptics")}
                className="pt-go-pro-btn"
            >
                <Space>
                    <AiDocIcon />
                    {__("Switch Advanced Builder", "poptics")}
                    <ProTag />
                </Space>
            </Button>
        </Flex>
    );
};

export default TopRightActions;
