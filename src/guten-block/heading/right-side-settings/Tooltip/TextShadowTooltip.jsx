import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

import { Flex, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";
import SettingsItem from "../../../components/SettingsItem";
import { Button, ColorInput } from "../../../../common/components";

const { __ } = wp.i18n;

const TextShadowTooltip = ({
    onTextShadowChange,

    textShadow,
}) => {
    const { color, horizontal, vertical, blur } = textShadow;
    const textShadowSettingsItems = [
        {
            label: __("Color", "poptics"),
            field: (
                <ColorInput
                    value={color}
                    onChange={(_, newColor) =>
                        onTextShadowChange("color", newColor)
                    }
                />
            ),
            vertical: false,
        },

        {
            label: __("Horizontal", "poptics"),
            field: (
                <NumberControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={horizontal}
                    onChange={(value) =>
                        onTextShadowChange("horizontal", value)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Vertical", "poptics"),
            field: (
                <NumberControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={vertical}
                    onChange={(value) => onTextShadowChange("vertical", value)}
                />
            ),
            vertical: false,
        },
        {
            label: __("Blur", "poptics"),
            field: (
                <NumberControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={blur}
                    onChange={(value) => onTextShadowChange("blur", value)}
                />
            ),
            vertical: false,
        },
    ];
    const content = (
        <Flex vertical gap={"middle"}>
            {textShadowSettingsItems.map((item) => (
                <SettingsItem key={item.label} {...item} />
            ))}
        </Flex>
    );
    return (
        <Popover content={content} title="Text shadow settings" trigger="click">
            <Button
                shape="circle"
                aria-label={__("text shadow settings", "poptics")}
                icon={<EditOutlined />}
            />
        </Popover>
    );
};

export default TextShadowTooltip;
