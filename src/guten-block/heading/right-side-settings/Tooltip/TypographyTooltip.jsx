import {
    CustomSelectControl,
    __experimentalNumberControl as NumberControl,
    __experimentalUnitControl as UnitControl,
} from "@wordpress/components";

import { Divider, Flex, Popover } from "antd";
import { EditOutlined } from "@ant-design/icons";
import SettingsItem from "../../../components/SettingsItem";
import { Button, ColorInput } from "../../../../common/components";
import { Fragment } from "@wordpress/element";
import { fontFamilies, fontWeightOptions } from "../../constant";

const {
    __experimentalTextTransformControl: TextTransformControl,
    __experimentalFontFamilyControl: FontFamilyControl,
    __experimentalTextDecorationControl: TextDecorationControl,
} = wp.blockEditor;
const { __ } = wp.i18n;

const TypographyTooltip = ({ typographyValues, onTypographyChange }) => {
    const {
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing,
        wordSpacing,
        textTransform,
        textDecoration,
    } = typographyValues;
    const textShadowSettingsItems = [
        {
            label: __("Font Family", "poptics"),
            field: (
                <FontFamilyControl
                    fontFamilies={fontFamilies}
                    value={fontFamily}
                    onChange={(value) =>
                        onTypographyChange("fontFamily", value)
                    }
                />
            ),
            vertical: true,
        },
        {
            label: __("Font Weight", "poptics"),
            field: (
                <Fragment>
                    <CustomSelectControl
                        options={fontWeightOptions}
                        value={fontWeight}
                        onChange={({ selectedItem }) =>
                            onTypographyChange("fontWeight", selectedItem)
                        }
                    />
                    <Divider dashed />
                </Fragment>
            ),
            vertical: true,
        },

        {
            label: __("Size", "poptics"),
            field: (
                <UnitControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={fontSize}
                    onChange={(value) => onTypographyChange("fontSize", value)}
                />
            ),
            vertical: false,
        },
        {
            label: __("Line Height", "poptics"),
            field: (
                <UnitControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={lineHeight}
                    onChange={(value) =>
                        onTypographyChange("lineHeight", value)
                    }
                />
            ),
            vertical: false,
        },

        {
            label: __("Letter Spacing", "poptics"),
            field: (
                <UnitControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={letterSpacing}
                    onChange={(value) =>
                        onTypographyChange("letterSpacing", value)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Word Spacing", "poptics"),
            field: (
                <UnitControl
                    max={100}
                    min={0}
                    shiftStep={1}
                    value={wordSpacing}
                    onChange={(value) =>
                        onTypographyChange("wordSpacing", value)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("", "poptics"),
            field: <Divider dashed />,
            vertical: false,
        },
        {
            label: __("Text Transform", "poptics"),
            field: (
                <TextTransformControl
                    className="pt-control-component-legend-hide"
                    value={textTransform}
                    onChange={(value) =>
                        onTypographyChange("textTransform", value)
                    }
                />
            ),
            vertical: true,
        },
        {
            label: __("Text Decoration", "poptics"),
            field: (
                <TextDecorationControl
                    className="pt-control-component-legend-hide"
                    value={textDecoration}
                    onChange={(value) =>
                        onTypographyChange("textDecoration", value)
                    }
                />
            ),
            vertical: true,
        },
    ];
    const content = (
        <Flex className="pt-general-settings-body" vertical gap={"middle"}>
            {textShadowSettingsItems.map((item) => (
                <SettingsItem key={item.label} {...item} />
            ))}
        </Flex>
    );
    return (
        <Popover content={content} title="Typography settings" trigger="click">
            <Button
                shape="circle"
                aria-label={__("typography shadow settings", "poptics")}
                icon={<EditOutlined />}
            />
        </Popover>
    );
};

export default TypographyTooltip;
