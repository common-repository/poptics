/**
 * WordPress Dependencies
 */
import { createBlock } from "@wordpress/blocks";
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
} from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";

import { Title } from "../../common/components";
import FormStyle from "./right-side-settings/FormStyle";
import FormInterface from "./FormInterface";

const { __ } = wp.i18n;

// template of the form
const popticsFormTemplate = [
    [
        "poptics/custom-input",
        {
            name: "email",
            label: __("Email", "poptics"),
            type: "email",
            placeholder: __("Enter your email", "poptics"),
            isRequired: true,
        },
    ],
    [
        "poptics/custom-button",
        {
            btnContent: {
                label: __("Submit", "poptics"),
                btnAttribute: "type/submit",
                count_as_conversion: true,
            },
        },
    ],
];

const Edit = ({ clientId, attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const blocks = useSelect(
        (select) => select("core/block-editor").getBlocks(clientId),
        [],
    );

    // Set up dispatch using useDispatch
    const { insertBlock } = useDispatch("core/block-editor");

    const checkForRequiredBlocks = () => {
        if (!blocks.length) return;

        // Check if there's at least one submit button
        const hasSubmitBtn = blocks.some(
            (block) =>
                block.name === "poptics/custom-button" &&
                block.attributes.btnContent?.btnAttribute === "type/submit",
        );

        // Insert submit button if it doesn't exist
        if (!hasSubmitBtn) {
            alert(__("You must add at least one submit button!", "poptics"));
            insertBlock(
                createBlock(...popticsFormTemplate[1]),
                undefined,
                clientId,
            );
        }
    };

    useEffect(() => {
        checkForRequiredBlocks();
    }, [clientId, blocks]);

    return (
        <div {...blockProps}>
            <InspectorControls>
                <Title
                    level={5}
                    className="pt-panel-title"
                    text={__(
                        "Please click on the input element to modify!",
                        "poptics",
                    )}
                />
                <FormStyle
                    formStyle={attributes.formStyle}
                    setAttributes={setAttributes}
                />
            </InspectorControls>

            <FormInterface mode="edit" attributes={attributes}>
                <InnerBlocks
                    allowedBlocks={[
                        "poptics/custom-input",
                        "poptics/custom-button",
                    ]}
                    template={popticsFormTemplate}
                />
            </FormInterface>
        </div>
    );
};

export default Edit;
