import { registerBlockType } from "@wordpress/blocks";
const { __ } = wp.i18n;
import {
    MediaUpload,
    InspectorControls,
    RichText,
    ColorPalette,
} from "@wordpress/block-editor";
import { Button, PanelBody } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

registerBlockType("poptics/cover", {
    title: __("Poptics Cover", "poptics"),
    icon: "cover-image",
    category: "layout",
    attributes: {
        mediaURL: {
            type: [],
            default: null,
        },
        mediaAlt: {
            type: "string",
            default: "",
        },
        overlayColor: {
            type: "string",
            default: "#000000",
        },
        content: {
            type: "string",
            source: "html",
            selector: "h2",
        },
    },

    edit({ attributes, setAttributes }) {
        const { mediaURL, mediaAlt, overlayColor, content } = attributes;
        console.log(attributes);

        const onSelectImage = (media) => {
            setAttributes({
                mediaURL: media.url,
                mediaAlt: media.alt,
            });
        };

        const onOverlayColorChange = (color) => {
            setAttributes({ overlayColor: color });
        };

        const onChangeContent = (newContent) => {
            setAttributes({ content: newContent });
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__("Settings", "custom-cover-block")}>
                        <ColorPalette
                            value={overlayColor}
                            onChange={onOverlayColorChange}
                        />
                    </PanelBody>
                </InspectorControls>
                <div
                    className="cover-block"
                    style={{
                        backgroundImage: `url(${mediaURL})`,
                        backgroundColor: overlayColor,
                    }}
                >
                    <MediaUpload
                        onSelect={onSelectImage}
                        allowedTypes={["image"]}
                        value={mediaURL}
                        render={({ open }) => (
                            <Button
                                aria-label={__("upload image", "poptics")}
                                onClick={open}
                                className="button button-large"
                            >
                                {!mediaURL
                                    ? __("Upload Image", "custom-cover-block")
                                    : __("Change Image", "custom-cover-block")}
                            </Button>
                        )}
                    />
                    <RichText
                        tagName="h2"
                        placeholder={__(
                            "Your custom text here...",
                            "custom-cover-block",
                        )}
                        value={content}
                        onChange={onChangeContent}
                        style={{ color: "#fff" }}
                    />
                </div>
            </Fragment>
        );
    },

    save({ attributes }) {
        const { mediaURL, mediaAlt, overlayColor, content } = attributes;

        return (
            <div
                className="cover-block"
                style={{
                    backgroundImage: `url(${mediaURL})`,
                    backgroundColor: overlayColor,
                }}
            >
                {mediaURL && (
                    <img
                        src={mediaURL}
                        alt={mediaAlt}
                        className="cover-block__image"
                    />
                )}
                <RichText.Content
                    tagName="h2"
                    value={content}
                    className="cover-block__content"
                />
            </div>
        );
    },
});
