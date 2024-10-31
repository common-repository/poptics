/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import BtnContent from "./right-side-settings/BtnContent";
import ButtonInterface from "./ButtonInterface";
import BtnStyle from "./right-side-settings/BtnStyle";

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();

    const { btnContent, btnStyle } = attributes;

    return (
        <div {...blockProps}>
            <InspectorControls>
                <BtnContent
                    btnContent={btnContent}
                    setAttributes={setAttributes}
                />
                <BtnStyle btnStyle={btnStyle} setAttributes={setAttributes} />
            </InspectorControls>
            <ButtonInterface
                attributes={attributes}
                mode={"edit"}
                setAttributes={setAttributes}
            />
        </div>
    );
};

export default Edit;
