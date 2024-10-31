import { Flex } from "antd";
import CustomPanelBody from "../../components/CustomPanelBody";
import SettingsItem from "../../components/SettingsItem";
import { ColorInput, Switch, TextInput } from "../../../common/components";
import {
    CustomSelectControl,
    TextareaControl,
    __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { htmlTypeOptions, units } from "../constant";
import CompactStyleInputs from "../../components/CompactStyleInputs";

const { __ } = wp.i18n;

const ContentPanelBody = ({ contentSettings, setAttributes }) => {
    const {
        titleSettings,
        subTitleSettings,
        descriptionSettings,
        shadowTextSettings,
    } = contentSettings;
    const { borderColor, padding, borderWidth, url, addUrl, htmlTag } =
        titleSettings;
    const {
        borderColor: subBorderColor,
        borderWidth: subBorderWidth,
        subtitleText,
        showSubtitle,
    } = subTitleSettings;

    const { showDesc, descText, descWidth } = descriptionSettings;
    const { shadowTextValue, showShadowText } = shadowTextSettings;

    // title change handler function
    const onTitleSettingsChange = (item, value) => {
        setAttributes({
            contentSettings: {
                ...contentSettings,
                titleSettings: {
                    ...contentSettings.titleSettings,
                    [item]: value,
                },
            },
        });
    };

    // subtitle change handler function
    const onSubTitleSettingsChange = (item, value) => {
        setAttributes({
            contentSettings: {
                ...contentSettings,
                subTitleSettings: {
                    ...contentSettings.subTitleSettings,
                    [item]: value,
                },
            },
        });
    };

    // description change handler function
    const onDescSettingsChange = (item, value) => {
        setAttributes({
            contentSettings: {
                ...contentSettings,
                descriptionSettings: {
                    ...contentSettings.descriptionSettings,
                    [item]: value,
                },
            },
        });
    };

    // shadow text change handler function
    const onShadowSettingsChange = (item, value) => {
        setAttributes({
            contentSettings: {
                ...contentSettings,
                shadowTextSettings: {
                    ...contentSettings.shadowTextSettings,
                    [item]: value,
                },
            },
        });
    };

    const contentSettingsPanelItems = [
        // title settings
        {
            bodyTitle: __("Title", "poptics"),
            bodyItems: [
                {
                    label: __("HTML Tag", "poptics"),
                    field: (
                        <CustomSelectControl
                            options={htmlTypeOptions}
                            value={htmlTag}
                            onChange={({ selectedItem }) =>
                                onTitleSettingsChange("htmlTag", selectedItem)
                            }
                        />
                    ),
                    vertical: true,
                },
                {
                    label: __("Add URL", "poptics"),
                    field: (
                        <Switch
                            checked={addUrl}
                            onChange={(value) =>
                                onTitleSettingsChange("addUrl", value)
                            }
                        />
                    ),
                    vertical: false,
                },

                {
                    label: __("Border Width", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={borderWidth}
                            field={"borderWidth"}
                            handleOnchange={onTitleSettingsChange}
                        />
                    ),
                    vertical: true,
                },
                {
                    label: __("Padding", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={padding}
                            field={"padding"}
                            handleOnchange={onTitleSettingsChange}
                        />
                    ),
                    vertical: true,
                },

                {
                    label: __("Border Color", "poptics"),
                    field: (
                        <ColorInput
                            value={borderColor}
                            onChange={(_, newColor) =>
                                onTitleSettingsChange("borderColor", newColor)
                            }
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // sub title settings
        {
            bodyTitle: __("Sub Title", "poptics"),
            bodyItems: [
                {
                    label: __("Show Subtitle", "poptics"),
                    field: (
                        <Switch
                            checked={showSubtitle}
                            onChange={(value) =>
                                onSubTitleSettingsChange("showSubtitle", value)
                            }
                        />
                    ),
                    vertical: false,
                },
                {
                    label: __("Subtitle Text", "poptics"),
                    field: (
                        <TextInput
                            value={subtitleText}
                            onChange={(e) =>
                                onSubTitleSettingsChange(
                                    "subtitleText",
                                    e.target.value,
                                )
                            }
                        />
                    ),
                    vertical: true,
                },
                {
                    label: __("Subtitle Border Width", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={subBorderWidth}
                            field={"borderWidth"}
                            handleOnchange={onSubTitleSettingsChange}
                        />
                    ),
                    vertical: true,
                },

                {
                    label: __("Border Color", "poptics"),
                    field: (
                        <ColorInput
                            value={subBorderColor}
                            onChange={(_, newColor) =>
                                onSubTitleSettingsChange(
                                    "borderColor",
                                    newColor,
                                )
                            }
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // description settings
        {
            bodyTitle: __("Title Description", "poptics"),
            bodyItems: [
                {
                    label: __("Show Description", "poptics"),
                    field: (
                        <Switch
                            checked={showDesc}
                            onChange={(value) =>
                                onDescSettingsChange("showDesc", value)
                            }
                        />
                    ),
                    vertical: false,
                },
                {
                    label: __("Description Text", "poptics"),
                    field: (
                        <TextareaControl
                            __nextHasNoMarginBottom
                            value={descText}
                            onChange={(value) =>
                                onDescSettingsChange("descText", value)
                            }
                        />
                    ),
                    vertical: true,
                },

                {
                    label: __("Subtitle Width", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={descWidth}
                            onChange={(value) =>
                                onDescSettingsChange("descWidth", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // shadow text settings
        {
            bodyTitle: __("Shadow Text", "poptics"),
            bodyItems: [
                {
                    label: __("Show Shadow Text", "poptics"),
                    field: (
                        <Switch
                            checked={showShadowText}
                            onChange={(value) =>
                                onShadowSettingsChange("showShadowText", value)
                            }
                        />
                    ),
                    vertical: false,
                },

                {
                    label: __("Shadow Text", "poptics"),
                    field: (
                        <TextInput
                            value={shadowTextValue}
                            onChange={(e) =>
                                onShadowSettingsChange(
                                    "shadowTextValue",
                                    e.target.value,
                                )
                            }
                        />
                    ),
                    vertical: true,
                },
            ],
        },
    ];

    return (
        <Flex vertical>
            {contentSettingsPanelItems.map(({ bodyTitle, bodyItems }) => (
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

export default ContentPanelBody;
