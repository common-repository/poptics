/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import VisibleInterface from "./VisibleInterface";

const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <VisibleInterface attributes={attributes} mode={"save"}>
                <InnerBlocks.Content />
            </VisibleInterface>
        </div>
    );
};

export default Save;
