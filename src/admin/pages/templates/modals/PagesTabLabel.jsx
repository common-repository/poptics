import { Flex } from "antd";
import { Text } from "./../../../../common/components/Typography";

const PagesTabLabel = (props) => {
    const { label } = props;
    return (
        <Flex vertical justify="center" align="center" gap="small">
            <div className="pt-preview-pages-tab-box"></div>
            <Text text={label} />
        </Flex>
    );
};

export default PagesTabLabel;
