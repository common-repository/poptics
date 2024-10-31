import { Flex } from "antd";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "@wordpress/element";

import { Text, Switch, Button, Input } from "../../../../common/components";
import { findMaxId } from "./constant";

const { __ } = wp.i18n;

const RadioController = (props) => {
    const [isValueChangeable, setIsValueChangeable] = useState(false);
    const { radioItems, setAttributes } = props;

    const onDeleteRadioItem = (radioId) => {
        setAttributes({
            radioItems: radioItems.filter((item) => item.id !== radioId),
        });
    };

    const onAddRadioItem = () => {
        const maxId = findMaxId(radioItems);

        setAttributes({
            radioItems: [
                ...radioItems,
                {
                    id: String(maxId + 1),
                    label: "New Option",
                    value: maxId + 1,
                },
            ],
        });
    };

    const onLabelChange = (event, id) => {
        setAttributes({
            radioItems: radioItems.map((item) =>
                item.id == id ? { ...item, label: event.target.value } : item,
            ),
        });
    };

    const onValueChange = (event, id) => {
        setAttributes({
            radioItems: radioItems.map((item) =>
                item.id == id ? { ...item, value: event.target.value } : item,
            ),
        });
    };

    return (
        <Flex vertical gap={"middle"}>
            {/*Radio items controller*/}
            {radioItems.map((radioItem, index) => (
                <Flex align="center" justify="space-around">
                    <Text text={index + 1} />

                    <Flex vertical gap="small">
                        <Input
                            placeholder="Radio Item Label"
                            defaultValue={radioItem.label}
                            onChange={(event) =>
                                onLabelChange(event, radioItem.id)
                            }
                        />
                        <Input
                            defaultValue={radioItem.value}
                            onChange={(event) =>
                                onValueChange(event, radioItem.id)
                            }
                            placeholder="Radio Item Value"
                            type={isValueChangeable ? "text" : "hidden"}
                        />
                    </Flex>

                    {/*delete any item*/}
                    <div onClick={() => onDeleteRadioItem(radioItem.id)}>
                        <CloseCircleOutlined />
                    </div>
                </Flex>
            ))}

            {/*footer section*/}
            <Flex vertical gap={"middle"}>
                <Button
                    aria-label={__("add items button", "poptics")}
                    onClick={() => onAddRadioItem()}
                    text={__("Add Items", "poptics")}
                    icon={<PlusCircleOutlined />}
                />

                <Flex gap={"small"}>
                    <Text text={__("Custom input values", "poptics")} />
                    <Switch
                        onChange={() =>
                            setIsValueChangeable((preVal) => !preVal)
                        }
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default RadioController;
