import { AlignmentToolbar } from "@wordpress/block-editor";
import { Flex } from "antd";
import { ColorInput, Text } from "../../../../common/components";
import CompactStyleInputs from "../../../components/CompactStyleInputs";

const { __ } = wp.i18n;

const BlockSettings = ({ block, setAttributes }) => {
    const { contentPosition, padding, margin, backgroundColor } = block;
    const handleOnchange = (field, value) => {
        setAttributes({
            block: {
                ...block,
                [field]: value,
            },
        });
    };

    const blockCoreSettings = [
        {
            title: __("Block Position", "poptics"),
            vertical: true,

            component: (
                <AlignmentToolbar
                    onChange={(value) =>
                        handleOnchange("contentPosition", value)
                    }
                    options={["left", "center", "right"]}
                    isCollapsed={false}
                    value={contentPosition}
                />
            ),
        },
        {
            title: __("Padding", "poptics"),
            vertical: true,
            component: (
                <CompactStyleInputs
                    attributeValue={padding}
                    field={"padding"}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            title: __("Margin", "poptics"),
            vertical: true,
            component: (
                <CompactStyleInputs
                    attributeValue={margin}
                    field={"margin"}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            title: __("Background Color", "poptics"),
            vertical: false,
            component: (
                <ColorInput
                    value={backgroundColor}
                    onChange={(_, newColor) =>
                        handleOnchange("backgroundColor", newColor)
                    }
                />
            ),
        },
    ];

    return (
        <Flex vertical gap={"small"}>
            {blockCoreSettings.map((settings) => (
                <Flex
                    justify="space-between"
                    gap={"small"}
                    vertical={settings.vertical}
                >
                    <Text strong text={settings.title} />
                    {settings.component}
                </Flex>
            ))}
        </Flex>
    );
};

export default BlockSettings;
