/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";

import ButtonInterface from "./ButtonInterface";

const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <ButtonInterface attributes={attributes} mode={"save"} />
        </div>
    );
};

export default Save;
