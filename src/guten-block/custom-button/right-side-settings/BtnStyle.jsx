/**
 * WordPress dependencies
 */
import { PanelBody, RangeControl } from "@wordpress/components";
import { AlignmentToolbar } from "@wordpress/block-editor";

import { Flex } from "antd";
import { ColorInput } from "../../../common/components";
import CompactStyleInputs from "../../components/CompactStyleInputs";
import SettingsItem from "../../components/SettingsItem";

const { __ } = wp.i18n;

const BtnStyle = ({ btnStyle, setAttributes }) => {
    const handleOnchange = (field, value) => {
        setAttributes({
            btnStyle: {
                ...btnStyle,
                [field]: value,
            },
        });
    };

    const {
        padding,
        borderWidth,
        borderRadius,
        borderColor,
        backgroundColor,
        color,
        alignment,
    } = btnStyle;

    const settingsFields = [
        {
            label: __("Padding", "poptics"),
            field: (
                <CompactStyleInputs
                    attributeValue={padding}
                    field={"padding"}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            label: __("Border Width", "poptics"),
            field: (
                <RangeControl
                    value={parseInt(borderWidth)}
                    onChange={(newWidth) =>
                        handleOnchange("borderWidth", `${newWidth}px`)
                    }
                    min={0}
                    max={10}
                    step={0.5}
                />
            ),
        },
        {
            label: __("Border Radius", "poptics"),
            field: (
                <CompactStyleInputs
                    attributeValue={borderRadius}
                    field={"borderRadius"}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            label: __("Pick Border Color", "poptics"),
            field: (
                <ColorInput
                    value={borderColor}
                    onChange={(_, newColor) =>
                        handleOnchange("borderColor", newColor)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Pick Color", "poptics"),
            field: (
                <ColorInput
                    value={color}
                    onChange={(_, newColor) =>
                        handleOnchange("color", newColor)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Pick Background Color", "poptics"),
            field: (
                <ColorInput
                    value={backgroundColor}
                    onChange={(_, newColor) =>
                        handleOnchange("backgroundColor", newColor)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Alignment", "poptics"),
            field: (
                <AlignmentToolbar
                    onChange={(value) => handleOnchange("alignment", value)}
                    options={["left", "center", "right"]}
                    isCollapsed={false}
                    value={alignment}
                />
            ),
        },
    ];

    return (
        <PanelBody title={__("Style", "poptics")} initialOpen={false}>
            <Flex vertical gap="small" className="pt-style-settings-panel-body">
                {settingsFields.map((item) => (
                    <SettingsItem key={item.label} {...item} />
                ))}
            </Flex>
        </PanelBody>
    );
};

export default BtnStyle;
