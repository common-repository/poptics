/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";

import CountDownType from "./components/panelComponents/CountDownType";
import { Radio, Space } from "antd";
import {
    countdownAttributesName,
    countdownEndActions,
    countdownThemeOptions,
} from "./constant";
import BlockSettings from "./components/panelComponents/BlockSettings";
import UnitDisplay from "./components/panelComponents/UnitDisplay";
import CountdownBase from "./components/timerComponents/CountdownBase";
import CustomPanelBody from "../components/CustomPanelBody";

const { __ } = wp.i18n;

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const { countdownType, targetTime, endAction, theme, unitDisplay, block } =
        attributes;

    // change different settings of the countdown
    const onCountDownStateChange = (name, value) => {
        setAttributes({ [name]: value });
    };

    // list of panel settings components
    const countdownPanelComponents = [
        {
            title: __("Input Type", "poptics"),
            component: (
                <CountDownType
                    countdownType={countdownType}
                    onCountDownStateChange={onCountDownStateChange}
                    setAttributes={setAttributes}
                    targetTime={targetTime}
                />
            ),
        },
        {
            title: __("Theme", "poptics"),
            component: (
                <Fragment>
                    <Radio.Group
                        onChange={(e) =>
                            onCountDownStateChange(
                                countdownAttributesName.theme,
                                e.target.value,
                            )
                        }
                        value={theme}
                    >
                        <Space direction="vertical">
                            {countdownThemeOptions.map((option) => (
                                <Radio value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Fragment>
            ),
        },
        {
            title: __("Countdown End Action", "poptics"),
            component: (
                <Fragment>
                    <Radio.Group
                        onChange={(e) =>
                            onCountDownStateChange(
                                countdownAttributesName.endAction,
                                e.target.value,
                            )
                        }
                        value={endAction}
                    >
                        <Space direction="vertical">
                            {countdownEndActions.map((option) => (
                                <Radio value={option.value}>
                                    {option.label}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Fragment>
            ),
        },
        {
            title: __("Countdown Block Core Settings ", "poptics"),
            component: (
                <BlockSettings block={block} setAttributes={setAttributes} />
            ),
        },
        {
            title: __("Unit Display Settings ", "poptics"),
            component: (
                <UnitDisplay
                    unitDisplay={unitDisplay}
                    setAttributes={setAttributes}
                />
            ),
        },
    ];

    return (
        <div {...blockProps}>
            <InspectorControls>
                {countdownPanelComponents.map((panelComponent, index) => (
                    <CustomPanelBody
                        title={panelComponent.title}
                        initialOpen={index === 0}
                    >
                        {panelComponent.component}
                    </CustomPanelBody>
                ))}
            </InspectorControls>
            <CountdownBase attributes={attributes} mode="edit" />
        </div>
    );
};

export default Edit;
