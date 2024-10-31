/**
 * WordPress dependencies
 */
import {
    FocalPointPicker,
    __experimentalUnitControl as UnitControl,
    RangeControl,
} from "@wordpress/components";

import { Flex, Space } from "antd";
import { CloseIcon, iconStylesOptions, sizeOptions } from "../constant";
import { ColorInput } from "../../../common/components";
import PopupWidthControl from "./components/PopupWidthControl";
import ClickableSettings from "./components/ClickableSettings";
import CustomPanelBody from "../../components/CustomPanelBody";
import SettingsItem from "../../components/SettingsItem";

const { __ } = wp.i18n;

const GeneralSettings = ({ generalSettings, setAttributes }) => {
    const handleOnchange = (field, value) => {
        setAttributes({
            generalSettings: {
                ...generalSettings,
                [field]: value,
            },
        });
    };

    const {
        popupHeight,
        popupWidth,
        closeIconStyle,
        closeIconColor,
        contentPosition,
        closeIconBgColor,
        fontSize,
        clickable,
    } = generalSettings;

    const settingsFields = [
        {
            label: __("Popup Size", "poptics"),
            field: (
                <Flex
                    justify="space-between"
                    gap="small"
                    wrap={window?.innerWidth < 1200}
                >
                    {sizeOptions.map(({ width, label }) => (
                        <Space
                            key={width}
                            className="pt-popup-size-box"
                            direction="vertical"
                            size={0}
                            onClick={() => handleOnchange("popupWidth", width)}
                        >
                            <div
                                style={{
                                    width,
                                    backgroundColor:
                                        popupWidth === width
                                            ? "#2563EB"
                                            : "#E5E7EB",
                                }}
                                className="pt-popup-inner-box"
                            ></div>
                            <span>{label}</span>
                        </Space>
                    ))}
                </Flex>
            ),
        },
        {
            label: __("Popup Height", "poptics"),
            field: (
                <UnitControl
                    min={100}
                    max={800}
                    value={popupHeight}
                    onChange={(newHeight) =>
                        handleOnchange("popupHeight", newHeight)
                    }
                    units={[
                        {
                            a11yLabel: __("Pixels (px)", "poptics"),
                            label: "px",
                            step: 1,
                            value: "px",
                        },
                    ]}
                />
            ),
        },
        {
            label: __("Popup Width", "poptics"),
            field: (
                <PopupWidthControl
                    popupWidth={popupWidth}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            label: __("Popup Positioning", "poptics"),
            field: (
                <FocalPointPicker
                    __nextHasNoMarginBottom
                    onChange={(newContentPosition) => {
                        handleOnchange("contentPosition", newContentPosition);
                    }}
                    value={contentPosition}
                />
            ),
        },
        {
            field: (
                <ClickableSettings
                    clickable={clickable}
                    handleOnchange={handleOnchange}
                />
            ),
        },
    ];

    const closeIconFields = [
        {
            label: __("Close Icon Style", "poptics"),
            field: (
                <Flex
                    justify="space-between"
                    gap="small"
                    wrap={window?.innerWidth < 991}
                >
                    {iconStylesOptions.map(({ value }) => (
                        <Space
                            key={value}
                            className="pt-popup-size-box"
                            direction="vertical"
                            size={0}
                            onClick={() =>
                                handleOnchange("closeIconStyle", value)
                            }
                            style={{
                                border: `1px solid ${
                                    closeIconStyle === value
                                        ? "#60A5FA"
                                        : "#0000000d"
                                }`,
                            }}
                        >
                            <span>
                                <CloseIcon id={value} />
                            </span>
                        </Space>
                    ))}
                </Flex>
            ),
        },
        {
            label: __("Pick Color", "poptics"),
            field: (
                <ColorInput
                    value={closeIconColor}
                    onChange={(_, newColor) =>
                        handleOnchange("closeIconColor", newColor)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Icon size", "poptics"),
            field: (
                <RangeControl
                    value={parseInt(fontSize)}
                    onChange={(newSize) =>
                        handleOnchange("fontSize", `${newSize}px`)
                    }
                    min={10}
                    max={100}
                    step={2}
                />
            ),
        },
        {
            label: __("Pick Background Color", "poptics"),
            field: (
                <ColorInput
                    value={closeIconBgColor}
                    onChange={(_, newColor) =>
                        handleOnchange("closeIconBgColor", newColor)
                    }
                />
            ),
            vertical: false,
        },
    ];

    return (
        <CustomPanelBody
            title={__("General Settings", "poptics")}
            className="pt-general-settings-body"
            initialOpen={true}
        >
            {settingsFields.map((item) => (
                <SettingsItem key={item.label} {...item} />
            ))}

            <h4>{__("Close Icon", "poptics")}</h4>

            {closeIconFields.map((item) => (
                <SettingsItem key={item.label} {...item} />
            ))}
        </CustomPanelBody>
    );
};

export default GeneralSettings;
