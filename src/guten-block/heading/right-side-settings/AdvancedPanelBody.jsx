import {
    __experimentalUnitControl as UnitControl,
    __experimentalNumberControl as NumberControl,
    CustomSelectControl,
} from "@wordpress/components";

import { Divider, Flex, Segmented } from "antd";
import CustomPanelBody from "../../components/CustomPanelBody";
import SettingsItem from "../../components/SettingsItem";
import CompactStyleInputs from "../../components/CompactStyleInputs";
import {
    animationDirectionOptions,
    entranceAnimationOptions,
    horizontalOrientationOptions,
    positionOptions,
    units,
    verticalOrientationOptions,
} from "../constant";
import { Switch, Tabs } from "../../../common/components";
import BackgroundControl from "./BackgroundControl";
import BorderControl from "./BorderControl";
import AdvancedBorderControl from "./AdvancedBorderControl";

const { __ } = wp.i18n;

const AdvancedPanelBody = ({ advancedSettings, setAttributes }) => {
    const {
        layout,
        positionSettings,
        background,
        border,
        motionEffects,
        visibility,
    } = advancedSettings;

    const { margin, padding, width, zIndex } = layout;
    const {
        position,
        horizontalOrientation,
        horizontalOffset,
        verticalOrientation,
        verticalOffset,
    } = positionSettings;

    const { normal: normalBackground, hover: hoverBackground } = background;
    const { normal: normalBorder, hover: hoverBorder } = border;
    const { entranceAnimation, animationDirection, loopAnimation } =
        motionEffects;
    const { hideOnDesktop, hideOnTablet, hideOnMobile } = visibility;

    // 1. layout change handler
    const onLayoutChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                layout: {
                    ...advancedSettings.layout,
                    [key]: value,
                },
            },
        });
    };

    // 2. position change handler
    const onPositionChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                positionSettings: {
                    ...advancedSettings.positionSettings,
                    [key]: value,
                },
            },
        });
    };

    // 3. background change handler
    // 3.1 on normal background change
    const onNormalBackgroundChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                background: {
                    ...advancedSettings.background,
                    normal: {
                        ...advancedSettings.background.normal,
                        [key]: value,
                    },
                },
            },
        });
    };
    // 3.2 on normal value background change
    const onNormalBackgroundValueChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                background: {
                    ...advancedSettings.background,
                    normal: {
                        ...advancedSettings.background.normal,
                        value: {
                            ...advancedSettings.background.normal,
                            [key]: value,
                        },
                    },
                },
            },
        });
    };

    // 3.3 on hover background change
    const onHoverBackgroundChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                background: {
                    ...advancedSettings.background,
                    hover: {
                        ...advancedSettings.background.hover,
                        [key]: value,
                    },
                },
            },
        });
    };

    // 3.4 on hover background change
    const onHoverBackgroundValueChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                background: {
                    ...advancedSettings.background,
                    hover: {
                        ...advancedSettings.background.hover,
                        value: {
                            ...advancedSettings.background.hover.value,
                            [key]: value,
                        },
                    },
                },
            },
        });
    };

    // 4. border change handler
    // 4.1 normal border change
    const onNormalBorderChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                border: {
                    ...advancedSettings.border,
                    normal: {
                        ...advancedSettings.border.normal,
                        [key]: value,
                    },
                },
            },
        });
    };

    // 4.2 normal border box-shadow  change
    const onNormalBorderShadowChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                border: {
                    ...advancedSettings.border,
                    normal: {
                        ...advancedSettings.border.normal,
                        boxShadow: {
                            ...advancedSettings.border.normal.boxShadow,
                            [key]: value,
                        },
                    },
                },
            },
        });
    };

    // 4.3 hover border change
    const onHoverBorderChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                border: {
                    ...advancedSettings.border,
                    hover: {
                        ...advancedSettings.border.hover,
                        [key]: value,
                    },
                },
            },
        });
    };

    // 4.4 hover border box-shadow change
    const onHoverBorderShadowChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                border: {
                    ...advancedSettings.border,
                    hover: {
                        ...advancedSettings.border.hover,
                        boxShadow: {
                            ...advancedSettings.border.hover.boxShadow,
                            [key]: value,
                        },
                    },
                },
            },
        });
    };

    // 5. motion effect change handler
    const onMotionEffectChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                motionEffects: {
                    ...advancedSettings.motionEffects,
                    [key]: value,
                },
            },
        });
    };

    // 6. visibility change handler
    const onVisibilityChange = (key, value) => {
        setAttributes({
            advancedSettings: {
                ...advancedSettings,
                visibility: {
                    ...advancedSettings.visibility,
                    [key]: value,
                },
            },
        });
    };

    const advancedPanelSettingsItems = [
        // 1. layout
        {
            bodyTitle: __("Layout", "poptics"),
            bodyItems: [
                // layout Margin
                {
                    label: __("Margin", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={margin}
                            field={"margin"}
                            handleOnchange={onLayoutChange}
                        />
                    ),
                    vertical: true,
                },

                // layout padding
                {
                    label: __("Padding", "poptics"),
                    field: (
                        <CompactStyleInputs
                            attributeValue={padding}
                            field={"padding"}
                            handleOnchange={onLayoutChange}
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

                // layout Width
                {
                    label: __("Width", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={width}
                            onChange={(value) => onLayoutChange("width", value)}
                            units={units}
                        />
                    ),
                    vertical: false,
                },

                // layout zIndex
                {
                    label: __("Z Index", "poptics"),
                    field: (
                        <NumberControl
                            max={100}
                            min={0}
                            shiftStep={1}
                            value={zIndex}
                            onChange={(value) =>
                                onLayoutChange("zIndex", value)
                            }
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // 2. position
        {
            bodyTitle: __("Position Settings", "poptics"),
            bodyItems: [
                // position value
                {
                    label: __("Position", "poptics"),
                    field: (
                        <CustomSelectControl
                            options={positionOptions}
                            value={position}
                            onChange={({ selectedItem }) =>
                                onPositionChange("position", selectedItem)
                            }
                        />
                    ),
                    vertical: true,
                },

                // Horizontal Orientation
                {
                    label: __("Horizontal Orientation", "poptics"),
                    field: (
                        <Segmented
                            value={horizontalOrientation}
                            options={horizontalOrientationOptions}
                            onChange={(value) =>
                                onPositionChange("horizontalOrientation", value)
                            }
                            block
                        />
                    ),
                    vertical: true,
                },

                // horizontal offset
                {
                    label: __("Horizontal Offset", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={horizontalOffset}
                            onChange={(value) =>
                                onPositionChange("horizontalOffset", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },

                // divider
                {
                    label: __("", "poptics"),
                    field: <Divider dashed />,
                    vertical: false,
                },

                // Vertical Orientation
                {
                    label: __("Vertical Orientation", "poptics"),
                    field: (
                        <Segmented
                            value={verticalOrientation}
                            options={verticalOrientationOptions}
                            onChange={(value) =>
                                onPositionChange("verticalOrientation", value)
                            }
                            block
                        />
                    ),
                    vertical: true,
                },

                // vertical offset
                {
                    label: __("Vertical Offset", "poptics"),
                    field: (
                        <UnitControl
                            max={100}
                            min={0}
                            value={verticalOffset}
                            onChange={(value) =>
                                onPositionChange("verticalOffset", value)
                            }
                            units={units}
                        />
                    ),
                    vertical: false,
                },
            ],
        },

        // 3. background
        {
            bodyTitle: __("Background", "poptics"),
            bodyItems: [
                // position value
                {
                    label: __("", "poptics"),
                    field: (
                        <Tabs
                            defaultActiveKey="normal"
                            centered
                            items={[
                                {
                                    label: __("Normal", "poptics"),
                                    key: "normal",
                                    children: (
                                        <BackgroundControl
                                            onBackgroundChange={
                                                onNormalBackgroundChange
                                            }
                                            backgroundValues={normalBackground}
                                            onBackgroundValueChange={
                                                onNormalBackgroundValueChange
                                            }
                                        />
                                    ),
                                },
                                {
                                    label: __("Hover", "poptics"),
                                    key: "hover",
                                    children: (
                                        <BackgroundControl
                                            onBackgroundChange={
                                                onHoverBackgroundChange
                                            }
                                            backgroundValues={hoverBackground}
                                            onBackgroundValueChange={
                                                onHoverBackgroundValueChange
                                            }
                                        />
                                    ),
                                },
                            ]}
                        />
                    ),
                    vertical: true,
                },
            ],
        },

        // 4. border
        {
            bodyTitle: __("Border", "poptics"),
            bodyItems: [
                // position value
                {
                    label: __("", "poptics"),
                    field: (
                        <Tabs
                            defaultActiveKey="normal"
                            centered
                            items={[
                                {
                                    label: __("Normal", "poptics"),
                                    key: "normal",
                                    children: (
                                        <AdvancedBorderControl
                                            onBoxShadowChange={
                                                onNormalBorderShadowChange
                                            }
                                            onBorderValueChange={
                                                onNormalBorderChange
                                            }
                                            borderControlValues={normalBorder}
                                        />
                                    ),
                                },
                                {
                                    label: __("Hover", "poptics"),
                                    key: "hover",
                                    children: (
                                        <AdvancedBorderControl
                                            onBoxShadowChange={
                                                onHoverBorderShadowChange
                                            }
                                            onBorderValueChange={
                                                onHoverBorderChange
                                            }
                                            borderControlValues={hoverBorder}
                                        />
                                    ),
                                },
                            ]}
                        />
                    ),
                    vertical: true,
                },
            ],
        },

        // 5. motion effect
        {
            bodyTitle: __("Motion Effect", "poptics"),
            bodyItems: [
                // entrance animation
                {
                    label: __("Entrance Animation", "poptics"),
                    field: (
                        <CustomSelectControl
                            options={entranceAnimationOptions}
                            value={entranceAnimation}
                            onChange={({ selectedItem }) =>
                                onMotionEffectChange(
                                    "entranceAnimation",
                                    selectedItem,
                                )
                            }
                        />
                    ),
                    vertical: true,
                },

                // loop animation
                {
                    label: __("Loop Animation", "poptics"),
                    field: (
                        <Switch
                            checked={loopAnimation}
                            onChange={(value) =>
                                onMotionEffectChange("loopAnimation", value)
                            }
                        />
                    ),
                    vertical: false,
                },

                //  animation direction
                {
                    label: __("Animation Direction", "poptics"),
                    field: (
                        <CustomSelectControl
                            options={animationDirectionOptions}
                            value={animationDirection}
                            onChange={({ selectedItem }) =>
                                onMotionEffectChange(
                                    "animationDirection",
                                    selectedItem,
                                )
                            }
                        />
                    ),
                    vertical: true,
                },
            ],
        },

        // 6. visibility
        {
            bodyTitle: __("Visibility", "poptics"),
            bodyItems: [
                // Desktop visibility
                {
                    label: __("Hide on Desktop", "poptics"),
                    field: (
                        <Switch
                            checked={hideOnDesktop}
                            onChange={(value) =>
                                onVisibilityChange("hideOnDesktop", value)
                            }
                        />
                    ),
                    vertical: false,
                },

                // Tablet visibility
                {
                    label: __("Hide on Tablet", "poptics"),
                    field: (
                        <Switch
                            checked={hideOnTablet}
                            onChange={(value) =>
                                onVisibilityChange("hideOnTablet", value)
                            }
                        />
                    ),
                    vertical: false,
                },

                // Mobile visibility
                {
                    label: __("Hide on Mobile", "poptics"),
                    field: (
                        <Switch
                            checked={hideOnMobile}
                            onChange={(value) =>
                                onVisibilityChange("hideOnMobile", value)
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
            {advancedPanelSettingsItems.map(({ bodyTitle, bodyItems }) => (
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

export default AdvancedPanelBody;
