import { Flex, Space } from "antd";
import { Card, FormItem, Switch, Text } from "../../../common/components";

const SwitchBox = ({ label, subText, name, initialValue }) => {
    return (
        <Card bordered={false}>
            <Flex gap="large" align="center" justify={"space-between"}>
                <Space direction="vertical" size={0}>
                    <Text text={label} className="pt-control-title" />
                    <Text text={subText} className="pt-control-description" />
                </Space>
                <FormItem className="pt-no-margin-form-item" name={name}>
                    <Switch defaultChecked checked={initialValue} />
                </FormItem>
            </Flex>
        </Card>
    );
};

export default SwitchBox;
