import { MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { Flex, Segmented } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, ColorInput } from "../../../common/components";
import SettingsItem from "../../components/SettingsItem";
import { gradientValues } from "../constant";
import { GradientPicker } from "@wordpress/components";

const { __ } = wp.i18n;

const BackgroundControl = ({
    backgroundValues,
    onBackgroundChange,
    onBackgroundValueChange,
}) => {
    const { type, value } = backgroundValues;
    const { color, gradient, image } = value;
    const [bgType, setBgType] = useState(type);

    const onBackgroundTypeChange = (value) => {
        setBgType(value);
        onBackgroundChange("type", value);
    };
    const backgroundControlItems = [
        {
            label: __("", "poptics"),
            field: (
                <Segmented
                    defaultValue={type}
                    options={["color", "gradient", "image"]}
                    onChange={onBackgroundTypeChange}
                    block
                />
            ),
            vertical: true,
            isApplicable: true,
        },
        {
            label: __("Color", "poptics"),
            field: (
                <ColorInput
                    value={color}
                    onChange={(_, newColor) =>
                        onBackgroundValueChange("color", newColor)
                    }
                />
            ),
            vertical: false,
            isApplicable: type === "color",
        },
        {
            label: __("Gradient", "poptics"),
            field: (
                <GradientPicker
                    value={gradient}
                    onChange={(currentGradient) =>
                        onBackgroundValueChange("gradient", currentGradient)
                    }
                    gradients={gradientValues}
                />
            ),
            vertical: true,
            isApplicable: type === "gradient",
        },
        {
            label: __("Upload Image", "poptics"),
            field: (
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(value) =>
                            onBackgroundValueChange("image", value.url)
                        }
                        allowedTypes={[bgType]}
                        render={({ open }) => (
                            <Button
                                aria-label={__("upload button", "poptics")}
                                className="pt-img-upload-btn"
                                text={`Upload ${bgType}`}
                                onClick={open}
                                icon={<CloudUploadOutlined />}
                            />
                        )}
                    />
                </MediaUploadCheck>
            ),
            vertical: true,
            isApplicable: type === "image",
        },
    ];

    return (
        <Flex vertical gap={"middle"}>
            {backgroundControlItems
                .filter((item) => item.isApplicable)
                .map((item) => (
                    <SettingsItem key={item.label} {...item} />
                ))}
        </Flex>
    );
};

export default BackgroundControl;
