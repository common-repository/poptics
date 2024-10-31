/**
 * WordPress Dependencies
 */
import { registerBlockType } from "@wordpress/blocks";

import {
    customInputName,
    customInputMetadata,
    customInputSettings,
} from "./blocks/custom-input/index";

import { FormOutlined } from "@ant-design/icons";
import Edit from "./Edit";
import Save from "./Save";

const { __ } = wp.i18n;

// register the poptics form in the block editor
registerBlockType("poptics/custom-form", {
    title: __("Poptics Form", "poptics"),
    icon: <FormOutlined />,
    category: "layout",
    attributes: {
        formStyle: {
            type: "object",
            default: {
                padding: "10px 10px 10px 10px",
                borderStyle: "solid",
                borderWidth: "0",
                borderRadius: "6px 6px 6px 6px",
                borderColor: "#d9d9d9",
            },
        },
    },
    supports: {
        html: false,
    },
    edit: Edit,
    save: Save,
});

registerBlockType(
    { customInputName, ...customInputMetadata },
    customInputSettings,
);
