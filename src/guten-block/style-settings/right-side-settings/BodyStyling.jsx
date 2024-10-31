/**
 * WordPress dependencies
 */
import { ColorPicker, FocalPointPicker } from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

import { Flex, Radio, Segmented } from "antd";
import { Button } from "../../../common/components";
import { CloudUploadOutlined } from "@ant-design/icons";
import CustomPanelBody from "../../components/CustomPanelBody";
import CompactStyleInputs from "../../components/CompactStyleInputs";

const { __ } = wp.i18n;

const BodyStyling = ({ bodyStyling, setAttributes }) => {
    const { borderRadius, padding, background, positionType } = bodyStyling;

    const [bgType, setBgType] = useState(background.type);

    const handleOnchange = (field, value) => {
        setAttributes({
            bodyStyling: {
                ...bodyStyling,
                [field]: value,
            },
        });
    };

    const handleBackgroundChange = (field, value) => {
        setAttributes({
            bodyStyling: {
                ...bodyStyling,
                background: {
                    ...bodyStyling.background,
                    type: bgType,
                    [field]: value,
                },
            },
        });
    };

    const positionTypes = [
        {
            value: "absolute",
            label: __("Scrollable", "poptics"),
        },
        {
            value: "fixed",
            label: __("Fixed", "poptics"),
        },
    ];

    const settingsFields = [
        {
            label: __("Popup Border Radius", "poptics"),
            field: (
                <CompactStyleInputs
                    attributeValue={borderRadius}
                    field={"borderRadius"}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            label: __("Popup Body Padding", "poptics"),
            field: (
                <CompactStyleInputs
                    attributeValue={padding}
                    field={"padding"}
                    handleOnchange={handleOnchange}
                />
            ),
        },
        {
            label: __("Popup Body Background", "poptics"),
            field: (
                <>
                    <Segmented
                        defaultValue={bgType}
                        options={["color", "image", "video"]}
                        onChange={setBgType}
                        block
                        size="large"
                    />
                    {bgType === "color" ? (
                        <ColorPicker
                            color={background.types.color}
                            onChangeComplete={(newColor) =>
                                handleBackgroundChange("types", {
                                    color: newColor.hex,
                                })
                            }
                        />
                    ) : (
                        <Flex vertical gap="small">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(value) =>
                                        handleBackgroundChange("types", {
                                            [bgType]: value.url,
                                        })
                                    }
                                    allowedTypes={[bgType]}
                                    render={({ open }) => (
                                        <Button
                                            aria-label={__(
                                                "upload button",
                                                "poptics",
                                            )}
                                            className="pt-img-upload-btn"
                                            text={`Upload ${bgType}`}
                                            onClick={open}
                                            icon={<CloudUploadOutlined />}
                                        />
                                    )}
                                />
                            </MediaUploadCheck>
                            {background.types.image ||
                            background.types.video ? (
                                <FocalPointPicker
                                    __nextHasNoMarginBottom
                                    onChange={(newFocalPoint) =>
                                        handleBackgroundChange(
                                            "focalPoint",
                                            newFocalPoint,
                                        )
                                    }
                                    url={background.types[bgType]}
                                    value={background.focalPoint}
                                />
                            ) : null}
                        </Flex>
                    )}
                </>
            ),
        },
        {
            label: __("Popup Position Type", "poptics"),
            field: (
                <Radio.Group
                    value={positionType}
                    onChange={(e) =>
                        handleOnchange("positionType", e.target.value)
                    }
                    options={positionTypes}
                />
            ),
        },
    ];

    return (
        <CustomPanelBody
            title={__("Body Styling", "poptics")}
            settingsFields={settingsFields}
            initialOpen={false}
        />
    );
};

export default BodyStyling;
