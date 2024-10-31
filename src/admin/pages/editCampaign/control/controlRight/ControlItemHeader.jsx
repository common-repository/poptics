import { Flex, Space } from "antd";
import { Text } from "../../../../../common/components";

// Component to render the header of a control item with an icon, heading, and subtext
const ControlItemHeader = ({ icon, heading, subText }) => {
    return (
        <Flex align="flex-start">
            {icon ? (
                <Space className="pt-control-item-icon"> {icon}</Space>
            ) : null}
            <Space direction="vertical" size={0}>
                <Text text={heading} className="pt-control-title" />
                <Text text={subText} className="pt-control-description" />
            </Space>
        </Flex>
    );
};

export default ControlItemHeader;
