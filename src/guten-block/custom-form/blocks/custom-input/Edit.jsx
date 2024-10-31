/**
 * WordPress Dependencies
 */

import { InspectorControls, ColorPalette } from "@wordpress/block-editor";
import { RangeControl } from "@wordpress/components";

import {
    SelectInput,
    Switch,
    Text,
    TextInput,
} from "./../../../../common/components";
import {
    inputTypesValue,
    inputTypes,
    inputLayoutOptions,
    alignItemOptions,
    defaultRadioItems,
    justifyContentsOptions,
} from "./constant";
import RadioController from "./RadioController";
import { Flex } from "antd";
import InputInterface from "./InputInterface";
import CustomPanelBody from "../../../components/CustomPanelBody";

const { __ } = wp.i18n;

const Edit = ({ attributes, setAttributes }) => {
    const {
        name,
        placeholder,
        label,
        type,
        layout = "column",
        align,
        radioItems,
        justify,
        titleColor,
    } = attributes;

    const handleOnChange = (field, value) => {
        setAttributes({ [field]: value });
    };

    if (radioItems.length === 0)
        setAttributes({ radioItems: defaultRadioItems });

    // panel settings of the custom input
    const settingsFields = [
        {
            label: __("Name", "poptics"),
            field: (
                <TextInput
                    value={name}
                    onChange={(e) => handleOnChange("name", e.target.value)}
                    help={__(
                        "Set a unique field name which is used to reference the form data. Enter only alphanumerics and underscores.",
                        "poptics",
                    )}
                />
            ),
        },
        {
            label: __("Input Type", "poptics"),
            field: (
                <Flex vertical gap={"middle"}>
                    <SelectInput
                        defaultValue={type || "email"}
                        className="pt-width-100"
                        placeholder={__("Email", "poptics")}
                        options={inputTypes}
                        size="large"
                        onChange={(type) => handleOnChange("type", type)}
                    />
                    {type === inputTypesValue.radio ? (
                        <Text
                            text={__(
                                "Add and modify radio items by using Radio controller settings bellow.",
                                "poptics",
                            )}
                        />
                    ) : null}
                </Flex>
            ),
        },
        {
            label: __("Radio Controller", "poptics"),
            isApplicable: type === inputTypesValue.radio,
            field: (
                <RadioController
                    setAttributes={setAttributes}
                    radioItems={radioItems}
                />
            ),
        },
        {
            label: __("Input Is Required?", "poptics"),
            field: (
                <Switch
                    defaultChecked
                    onChange={(isRequired) =>
                        handleOnChange("isRequired", isRequired)
                    }
                />
            ),
        },
        {
            label: __("Input Layout", "poptics"),
            field: (
                <SelectInput
                    className="pt-width-100"
                    defaultValue={layout}
                    placeholder={__("layout", "poptics")}
                    options={inputLayoutOptions}
                    size="large"
                    onChange={(value) => handleOnChange("layout", value)}
                />
            ),
        },
        {
            label: __("Align Items", "poptics"),
            field: (
                <SelectInput
                    className="pt-width-100"
                    defaultValue={align}
                    placeholder={__("align input and label", "poptics")}
                    options={alignItemOptions}
                    size="large"
                    onChange={(value) => handleOnChange("align", value)}
                />
            ),
        },
        {
            label: __("Justify Contents", "poptics"),
            field: (
                <SelectInput
                    className="pt-width-100"
                    defaultValue={justify}
                    placeholder={__("justify input and label", "poptics")}
                    options={justifyContentsOptions}
                    size="large"
                    onChange={(value) => handleOnChange("justify", value)}
                />
            ),
        },
        {
            label: __("Input Label", "poptics"),
            field: (
                <TextInput
                    value={label}
                    onChange={(e) => handleOnChange("label", e.target.value)}
                />
            ),
        },

        {
            label: __("Input Placeholder", "poptics"),
            isApplicable: !(
                type === inputTypesValue.radio ||
                type === inputTypesValue.checkbox
            ),
            field: (
                <TextInput
                    value={placeholder}
                    onChange={(e) =>
                        handleOnChange("placeholder", e.target.value)
                    }
                />
            ),
        },

        {
            label: __("Border Width", "poptics"),
            isApplicable: type !== inputTypesValue.radio,
            field: (
                <RangeControl
                    label={"Border Width"}
                    onChange={(borderWidth) =>
                        handleOnChange("borderWidth", borderWidth)
                    }
                    min={0}
                    max={10}
                    step={0.5}
                />
            ),
        },
        {
            label: __("Text Color", "poptics"),
            isApplicable: !(
                type === inputTypesValue.radio ||
                type === inputTypesValue.checkbox
            ),
            field: (
                <ColorPalette
                    onChange={(newColor) =>
                        handleOnChange("titleColor", newColor)
                    }
                    value={titleColor}
                />
            ),
        },
    ];

    // jsx of the block
    return (
        <>
            <InspectorControls>
                <CustomPanelBody
                    title={__("Input Settings", "poptics")}
                    initialOpen={true}
                    settingsFields={settingsFields}
                />
            </InspectorControls>

            <InputInterface attributes={attributes} />
        </>
    );
};

export default Edit;
