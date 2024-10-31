import { AlignmentToolbar } from "@wordpress/block-editor";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { Divider, Flex } from "antd";
import SettingsItem from "../../components/SettingsItem";
import CustomPanelBody from "../../components/CustomPanelBody";
import { ColorInput } from "../../../common/components";
import TextShadowTooltip from "./Tooltip/TextShadowTooltip";
import CompactStyleInputs from "../../components/CompactStyleInputs";
import TypographyTooltip from "./Tooltip/TypographyTooltip";
import BorderControl from "./BorderControl";
import { units } from "../constant";

const { __ } = wp.i18n;
const StylePanelBody = ({ styleSettings, setAttributes }) => {
    const {
        subTitleSettings,
        generalStyleSettings,
        titleStyleSettings,
        focusedTitleSettings,
        descriptionsSettings,
        shadowTextSettings,
    } = styleSettings;
    const { alignment } = generalStyleSettings;
    const { color, hoverColor, textShadow, margin, typography } =
        titleStyleSettings;
    const {
        color: focusedTColor,
        hoverColor: focusedTHoverColor,
        textShadow: focusedTTextShadow,
        textDecorationColor,
        typography: focusedTTypographyValues,
        padding,
    } = focusedTitleSettings;

    const {
        color: subTitleColor,
        borderRight,
        borderLeft,
        typography: subTitleTypographyValues,
        margin: subTitleMargin,
        height,
        verticalPosition,
    } = subTitleSettings;

    const {
        color: descriptionColor,
        typography: descriptionTypographyValues,
        margin: descriptionMargin,
    } = descriptionsSettings;

    // shadow text state
    const {
        horizontalPosition: shadowTHorizontalPosition,
        verticalPosition: shadowTVerticalPosition,

        typography: shadowTTypographyValues,
        textColor,
        strokeWidth,
        borderColor,
    } = shadowTextSettings;

    // on general style settings change
    const handleGeneralSettingsChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                generalStyleSettings: {
                    ...styleSettings.generalStyleSettings,
                    [key]: value,
                },
            },
        });
    };

    // title settings change handler
    const onTitleStyleSettingsChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                titleStyleSettings: {
                    ...styleSettings.titleStyleSettings,
                    [key]: value,
                },
            },
        });
    };

    // text shadow change handler
    const onTextShadowChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                titleStyleSettings: {
                    ...styleSettings.titleStyleSettings,
                    textShadow: {
                        ...styleSettings.titleStyleSettings.textShadow,
                        [key]: value,
                    },
                },
            },
        });
    };

    // typography change handler
    const onTypographyChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                titleStyleSettings: {
                    ...styleSettings.titleStyleSettings,
                    typography: {
                        ...styleSettings.titleStyleSettings.typography,
                        [key]: value,
                    },
                },
            },
        });
    };

    // focusedTitle change handler
    const onFocusTitleChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                focusedTitleSettings: {
                    ...styleSettings.focusedTitleSettings,
                    [key]: value,
                },
            },
        });
    };

    // focused title typography change handler
    const onFocusedTTypographyChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                focusedTitleSettings: {
                    ...styleSettings.focusedTitleSettings,
                    typography: {
                        ...styleSettings.focusedTitleSettings.typography,
                        [key]: value,
                    },
                },
            },
        });
    };

    // focused title text shadow change handler
    const onFocusedTTextShadowChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                focusedTitleSettings: {
                    ...styleSettings.focusedTitleSettings,
                    textShadow: {
                        ...styleSettings.focusedTitleSettings.textShadow,
                        [key]: value,
                    },
                },
            },
        });
    };

    // subtitle change handler
    const onSubTitleChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                subTitleSettings: {
                    ...styleSettings.subTitleSettings,
                    [key]: value,
                },
            },
        });
    };

    // subtitle typography change handler
    const onSubTitleTypographyChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                subTitleSettings: {
                    ...styleSettings.subTitleSettings,
                    typography: {
                        ...styleSettings.subTitleSettings.typography,
                        [key]: value,
                    },
                },
            },
        });
    };

    // subtitle border left change handler
    const onSubtitleBorderLeftChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                subTitleSettings: {
                    ...styleSettings.subTitleSettings,
                    borderLeft: {
                        ...styleSettings.subTitleSettings.borderLeft,
                        [key]: value,
                    },
                },
            },
        });
    };

    // subtitle border right change handler
    const onSubtitleBorderRightChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                subTitleSettings: {
                    ...styleSettings.subTitleSettings,
                    borderRight: {
                        ...styleSettings.subTitleSettings.borderRight,
                        [key]: value,
                    },
                },
            },
        });
    };

    // description change handler
    const onDescriptionChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                descriptionsSettings: {
                    ...styleSettings.descriptionsSettings,
                    [key]: value,
                },
            },
        });
    };

    // description typography change handler
    const onDescriptionTypographyChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                descriptionsSettings: {
                    ...styleSettings.descriptionsSettings,
                    typography: {
                        ...styleSettings.descriptionsSettings.typography,
                        [key]: value,
                    },
                },
            },
        });
    };

    // shadow text change handler
    const onShadowTextChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                shadowTextSettings: {
                    ...styleSettings.shadowTextSettings,
                    [key]: value,
                },
            },
        });
    };

    // shadow text typography change handler
    const onShadowTTypographyChange = (key, value) => {
        setAttributes({
            styleSettings: {
                ...styleSettings,
                shadowTextSettings: {
                    ...styleSettings.shadowTextSettings,
                    typography: {
                        ...styleSettings.shadowTextSettings.typography,
                        [key]: value,
                    },
                },
            },
        });
    };

    const stylePanelSettingsItems = [
        // General settings
        {
            bodyTitle: __("General", "poptics"),
            bodyItems: [
                {
                    label: __("Alignment", "poptics"),
                    field: (
                        <AlignmentToolbar
                            onChange={(value) =>
                                handleGeneralSettingsChange("alignment", value)
                            }
                            options={["left", "center", "right"]}
                            isCollapsed={false}
                            value={alignment}
                        />
                    ),
                    vertical: true,
                },
            ],
        },

        // Title settings
        {
            bodyTitle: __("Title", "poptics"),
            bodyItems: [
                // color
                {
                    label: __("Color", "poptics"),
                    field: (
                        <ColorInput
                            value={color}
                            onChange={(_, newColor) =>
                                onTitleStyleSettingsChange("color", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },

                // hover color
                {
                    label: __("Hover Color", "poptics"),
                    field: (
                        <ColorInput
                            value={hoverColor}
                            onChange={(_, newColor) =>
                                onTitleStyleSettingsChange(
                                    "hoverColor",
                                    newColor,
                                )
                            }
                        />
                    ),
                    vertical: false,
                },

                // text shadow
                {
                    label: __("Text Shadow", "poptics"),
                    field: (
                        <TextShadowTooltip
                            textShadow={textShadow}
                            onTextShadowChange={onTextShadowChange}
                        />
                    ),
                    vertical: false,
                },

                // margin
                {
                    label: __("Margin", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={margin}
                            field={"margin"}
                            handleOnchange={onTitleStyleSettingsChange}
                        />
                    ),
                    vertical: true,
                },

                // typography
                {
                    label: __("Typography", "poptics"),
                    field: (
                        <TypographyTooltip
                            onTypographyChange={onTypographyChange}
                            typographyValues={typography}
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // focused Title
        {
            bodyTitle: __("Focused Title", "poptics"),
            bodyItems: [
                // color
                {
                    label: __("Color", "poptics"),
                    field: (
                        <ColorInput
                            value={focusedTColor}
                            onChange={(_, newColor) =>
                                onFocusTitleChange("color", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },

                // hover color
                {
                    label: __("Hover Color", "poptics"),
                    field: (
                        <ColorInput
                            value={focusedTHoverColor}
                            onChange={(_, newColor) =>
                                onFocusTitleChange("hoverColor", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },

                // focused title typography
                {
                    label: __("Typography", "poptics"),
                    field: (
                        <TypographyTooltip
                            onTypographyChange={onFocusedTTypographyChange}
                            typographyValues={focusedTTypographyValues}
                        />
                    ),
                    vertical: false,
                },

                // Focused text decoration color
                {
                    label: __("Text Decoration Color", "poptics"),
                    field: (
                        <ColorInput
                            value={textDecorationColor}
                            onChange={(_, newColor) =>
                                onFocusTitleChange(
                                    "textDecorationColor",
                                    newColor,
                                )
                            }
                        />
                    ),
                    vertical: false,
                },

                // focused text shadow
                {
                    label: __("Text Shadow", "poptics"),
                    field: (
                        <TextShadowTooltip
                            textShadow={focusedTTextShadow}
                            onTextShadowChange={onFocusedTTextShadowChange}
                        />
                    ),
                    vertical: false,
                },

                // focused title padding
                {
                    label: __("Padding", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={padding}
                            field={"padding"}
                            handleOnchange={onFocusTitleChange}
                        />
                    ),
                    vertical: true,
                },
            ],
        },

        // subtitle
        {
            bodyTitle: __("SubTitle", "poptics"),
            bodyItems: [
                // color
                {
                    label: __("Color", "poptics"),
                    field: (
                        <ColorInput
                            value={subTitleColor}
                            onChange={(_, newColor) =>
                                onSubTitleChange("color", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },

                // subtitle typography
                {
                    label: __("Typography", "poptics"),
                    field: (
                        <TypographyTooltip
                            onTypographyChange={onSubTitleTypographyChange}
                            typographyValues={subTitleTypographyValues}
                        />
                    ),
                    vertical: false,
                },

                // subtitle Margin
                {
                    label: __("Margin", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={subTitleMargin}
                            field={"margin"}
                            handleOnchange={onSubTitleChange}
                        />
                    ),
                    vertical: true,
                },

                // divider
                {
                    label: __("", "poptics"),
                    field: <Divider dashed />,
                    vertical: false,
                },

                // subtitle border left
                {
                    label: __("SubTitle Border Left", "poptics"),
                    field: (
                        <BorderControl
                            onBorderValueChange={onSubtitleBorderLeftChange}
                            borderControlValues={borderLeft}
                        />
                    ),
                    vertical: true,
                },

                // divider
                {
                    label: __("", "poptics"),
                    field: <Divider dashed />,
                    vertical: false,
                },

                // subtitle border right
                {
                    label: __("SubTitle Border Right", "poptics"),
                    field: (
                        <BorderControl
                            onBorderValueChange={onSubtitleBorderRightChange}
                            borderControlValues={borderRight}
                        />
                    ),
                    vertical: true,
                },

                // divider

                {
                    label: __("", "poptics"),
                    field: <Divider dashed />,
                    vertical: false,
                },

                // subtitle height
                {
                    label: __("Height", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={height}
                            onChange={(value) =>
                                onSubTitleChange("height", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },

                // subtitle vertical position position
                {
                    label: __("Vertical Position", "poptics"),
                    field: (
                        <UnitControl
                            max={15}
                            min={-10}
                            value={verticalPosition}
                            onChange={(value) =>
                                onSubTitleChange("verticalPosition", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // description
        {
            bodyTitle: __("Title Description", "poptics"),
            bodyItems: [
                // desc color
                {
                    label: __("Color", "poptics"),
                    field: (
                        <ColorInput
                            value={descriptionColor}
                            onChange={(_, newColor) =>
                                onDescriptionChange("color", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },

                // desc typography
                {
                    label: __("Typography", "poptics"),
                    field: (
                        <TypographyTooltip
                            onTypographyChange={onDescriptionTypographyChange}
                            typographyValues={descriptionTypographyValues}
                        />
                    ),
                    vertical: false,
                },

                // desc Margin
                {
                    label: __("Margin", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={descriptionMargin}
                            field={"margin"}
                            handleOnchange={onDescriptionChange}
                        />
                    ),
                    vertical: true,
                },
            ],
        },

        // shadow text
        {
            bodyTitle: __("Shadow Text", "poptics"),
            bodyItems: [
                // Horizontal Position
                {
                    label: __("Horizontal Position", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={shadowTHorizontalPosition}
                            onChange={(value) =>
                                onShadowTextChange("horizontalPosition", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },

                // Vertical Position
                {
                    label: __("Vertical Position", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={shadowTVerticalPosition}
                            onChange={(value) =>
                                onShadowTextChange("verticalPosition", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },

                // shadow text typography
                {
                    label: __("Typography", "poptics"),
                    field: (
                        <TypographyTooltip
                            onTypographyChange={onShadowTTypographyChange}
                            typographyValues={shadowTTypographyValues}
                        />
                    ),
                    vertical: false,
                },

                // text color
                {
                    label: __("Text Color", "poptics"),
                    field: (
                        <ColorInput
                            value={textColor}
                            onChange={(_, newColor) =>
                                onShadowTextChange("color", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },

                // stroke width
                {
                    label: __("Stroke Width", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={strokeWidth}
                            onChange={(value) =>
                                onShadowTextChange("strokeWidth", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },

                // border color
                {
                    label: __("Border Color", "poptics"),
                    field: (
                        <ColorInput
                            value={borderColor}
                            onChange={(_, newColor) =>
                                onShadowTextChange("borderColor", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },
            ],
        },
    ];
    return (
        <Flex vertical>
            {stylePanelSettingsItems.map(({ bodyTitle, bodyItems }) => (
                <CustomPanelBody
                    title={bodyTitle}
                    className="pt-general-settings-body"
                    initialOpen={false}
                >
                    <Flex vertical gap={"middle"}>
                        {bodyItems.map((item) => (
                            <SettingsItem key={item.label} {...item} />
                        ))}
                    </Flex>
                </CustomPanelBody>
            ))}
        </Flex>
    );
};

export default StylePanelBody;
