/**
 * WordPress dependencies
 */
import { RangeControl } from "@wordpress/components";

import { ColorInput } from "../../../common/components";
import CompactStyleInputs from "../../components/CompactStyleInputs";
import CustomPanelBody from "../../components/CustomPanelBody";

const { __ } = wp.i18n;

const FormStyle = ({ formStyle, setAttributes }) => {
    const handleOnchange = (field, value) => {
        setAttributes({
            formStyle: {
                ...formStyle,
                [field]: value,
            },
        });
    };

    const { padding, borderWidth, borderRadius, borderColor, backgroundColor } =
        formStyle;

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
    ];

    return (
        <CustomPanelBody
            title={__("Style", "poptics")}
            settingsFields={settingsFields}
            initialOpen={true}
        />
    );
};

export default FormStyle;
