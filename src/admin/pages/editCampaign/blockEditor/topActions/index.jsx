import { Flex, Space } from "antd";
import { Text } from "../../../../../common/components";
import PopupSteps from "./PopupSteps";
import TopRightActions from "./TopRightActions";

const { __ } = wp.i18n;

const TopActions = () => {
    return (
        <Flex wrap gap="small" justify="space-between" align="center">
            <Space>
                <Text
                    className="pt-filter-by"
                    text={__("Edit Popup", "poptics")}
                />
                <PopupSteps />
            </Space>
            <TopRightActions />
        </Flex>
    );
};

export default TopActions;
