import { InspectorControls } from "@wordpress/block-editor";
import HeadingInterface from "./HeadingInterface";
import { Menu } from "../../common/components";
import { items } from "./constant";
import { useState } from "@wordpress/element";
import ContentPanelBody from "./right-side-settings/ContentPanelBody";
import StylePanelBody from "./right-side-settings/StylePanelBody";
import AdvancedPanelBody from "./right-side-settings/AdvancedPanelBody";
import { useBlockProps } from "@wordpress/block-editor";

const { __ } = wp.i18n;

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { contentSettings, styleSettings, advancedSettings } = attributes;
    const [current, setCurrent] = useState("content");
    return (
        <div {...blockProps}>
            <InspectorControls>
                <Menu
                    mode="horizontal"
                    selectedKeys={[current]}
                    items={items}
                    onClick={(e) => setCurrent(e.key)}
                />

                {current === "content" ? (
                    <ContentPanelBody
                        setAttributes={setAttributes}
                        contentSettings={contentSettings}
                    />
                ) : null}
                {current === "style" ? (
                    <StylePanelBody
                        setAttributes={setAttributes}
                        styleSettings={styleSettings}
                    />
                ) : null}
                {current === "advanced" ? (
                    <AdvancedPanelBody
                        setAttributes={setAttributes}
                        advancedSettings={advancedSettings}
                    />
                ) : null}
            </InspectorControls>
            <HeadingInterface />
        </div>
    );
};

export default Edit;
