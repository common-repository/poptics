import { registerBlockType } from "@wordpress/blocks";
import Save from "./Save";
import Edit from "./Edit";
import { theme } from "../../theme/theme";

const { __ } = wp.i18n;

registerBlockType("poptics/custom-button", {
    title: __("Poptics Button", "poptics"),
    icon: "button",
    category: "common",
    attributes: {
        btnContent: {
            type: "object",
            default: {
                label: __("Submit", "poptics"),
                btnAttribute: null,
                id: null,
                className: "",
            },
        },
        btnStyle: {
            type: "object",
            default: {
                padding: "4px 15px 4px 15px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "6px 6px 6px 6px",
                alignment: "left",
                backgroundColor: theme.token.colorPrimary,
                color: "#fff",
            },
        },
    },
    supports: {
        html: false,
    },
    edit: Edit,
    save: Save,
});
