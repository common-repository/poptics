import { Flex } from "antd";
import { Text } from "../../../common/components";

const NumberCard = (props) => {
    const { number, icon, title } = props;
    return (
        <Flex
            className="pt-number-card-container"
            vertical
            justify="space-between"
            align="start"
        >
            <Flex gap="middle" align="center">
                {icon}

                <Flex vertical gap="small" align="start">
                    <Text
                        className="pt-analytics-card-title"
                        text={title}
                        strong
                        ellipsis={{ tooltip: title }}
                    />

                    <Text id="pt-analytics-card-number" text={number} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default NumberCard;
