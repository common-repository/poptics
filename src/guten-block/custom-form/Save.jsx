/**
 * WordPress Dependencies
 */
import { InnerBlocks } from "@wordpress/block-editor";

import FormInterface from "./FormInterface";

const Save = ({ attributes }) => {
    return (
        <FormInterface mode="save" attributes={attributes}>
            <InnerBlocks.Content />
        </FormInterface>
    );
};

export default Save;
