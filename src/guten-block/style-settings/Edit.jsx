/**
 * WordPress dependencies
 */
import {
    InspectorControls,
    InnerBlocks,
    useBlockProps,
} from "@wordpress/block-editor";

import GeneralSettings from "./right-side-settings/GeneralSettings";
import BodyStyling from "./right-side-settings/BodyStyling";
import VisibleInterface from "./VisibleInterface";
import OverlaySettings from "./right-side-settings/OverlaySettings";

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const { generalSettings, bodyStyling, overlaySettings } = attributes;

    return (
        <div {...blockProps}>
            <InspectorControls>
                <GeneralSettings
                    generalSettings={generalSettings}
                    setAttributes={setAttributes}
                />
                <BodyStyling
                    bodyStyling={bodyStyling}
                    setAttributes={setAttributes}
                />
                <OverlaySettings
                    overlaySettings={overlaySettings}
                    setAttributes={setAttributes}
                />
            </InspectorControls>
            <VisibleInterface
                attributes={attributes}
                mode={"edit"}
                setAttributes={setAttributes}
            >
                <InnerBlocks />
            </VisibleInterface>
        </div>
    );
};

export default Edit;
