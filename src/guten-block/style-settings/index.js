import { registerBlockType } from "@wordpress/blocks";
import Save from "./Save";
import Edit from "./Edit";

const { __ } = wp.i18n;

registerBlockType("poptics/style-settings", {
    title: __("Style settings", "poptics"),
    icon: "admin-settings",
    category: "common",
    attributes: {
        generalSettings: {
            type: "object",
            default: {
                popupHeight: "auto",
                popupWidth: "500px",
                closeIconPosition: {
                    top: 5,
                    right: 3,
                },
                closeIconStyle: "icon-close-outline",
                closeIconColor: "#000000",
                fontSize: "16px",
                contentPosition: { x: 0.5, y: 0.5 },
                clickable: {
                    enabled: false,
                    action: "link",
                },
            },
        },
        bodyStyling: {
            type: "object",
            default: {
                borderRadius: "0px 0px 0px 0px",
                padding: "20px 20px 20px 20px",
                background: {
                    type: "color",
                    types: { color: "#ffffff", image: "", video: "" },
                    focalPoint: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                positionType: "fixed",
            },
        },
        overlaySettings: {
            type: "object",
            default: {
                enable: false,
                backgroundColor: "#00000045",
                closePopupOnClick: false,
            },
        },
        lock: {
            remove: true,
            move: true,
        },
    },
    edit: Edit,
    save: Save,
    supports: {
        html: false, // This disables the "Edit as HTML" option
        inserter: false,
    },
});
