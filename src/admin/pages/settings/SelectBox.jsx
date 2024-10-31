import { Flex, Space } from "antd";
import { Card, FormItem, SelectInput, Text } from "../../../common/components";

const SelectBox = (props) => {
    const { label, subText, name, items } = props;

    return (
        <Card bordered={false}>
            <Flex gap="large" align="center" justify={"space-between"}>
                <Space direction="vertical" size={0}>
                    <Text text={label} className="pt-control-title" />
                    <Text text={subText} className="pt-control-description" />
                </Space>
                <FormItem className="pt-no-margin-form-item" name={name}>
                    <SelectInput placeholder="select time" options={items} />
                </FormItem>
            </Flex>
        </Card>
    );
};

export default SelectBox;
