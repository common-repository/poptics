import { registerBlockType } from "@wordpress/blocks";
import Save from "./Save";
import Edit from "./Edit";

import { FontSizeOutlined } from "@ant-design/icons";
import { gradientValues } from "./constant";

const { __ } = wp.i18n;

registerBlockType("poptics/heading", {
    title: __("Poptics Heading", "poptics"),
    icon: <FontSizeOutlined />,
    category: "common",
    attributes: {
        contentSettings: {
            type: "object",

            default: {
                // title settings attributes
                titleSettings: {
                    htmlTag: "h2",
                    addUrl: false,
                    url: "",
                    borderWidth: "0px 0px 0px 0px",
                    padding: "5px 5px 5px 5px",
                    borderColor: "#fff",
                },

                subTitleSettings: {
                    showSubtitle: false,
                    subtitleText: "",
                    borderWidth: "0px 0px 0px 0px",
                    borderColor: "#fff",
                },
                descriptionSettings: {
                    showDesc: false,
                    descText: "",
                    descWidth: "80%",
                },
                shadowTextSettings: {
                    showShadowText: true,
                    shadowTextValue: "",
                },
            },
        },

        styleSettings: {
            type: "object",

            default: {
                generalStyleSettings: {
                    alignment: "center",
                },

                titleStyleSettings: {
                    color: "#808080",
                    hoverColor: "#808080",
                    textShadow: {
                        color: "#808080",
                        horizontal: "",
                        vertical: "",
                        blur: "",
                    },
                    margin: "5px 5px 5px 5px",
                    typography: {
                        fontFamily: "default",
                        fontWeight: "default",
                        fontSize: "",
                        lineHeight: "",
                        letterSpacing: "",
                        wordSpacing: "",
                        textTransform: "",
                        textDecoration: "",
                    },
                },

                focusedTitleSettings: {
                    color: "#808080",
                    hoverColor: "",
                    typography: {
                        fontFamily: "default",
                        fontWeight: "default",
                        fontSize: "",
                        lineHeight: "",
                        letterSpacing: "",
                        wordSpacing: "",
                        textTransform: "",
                        textDecoration: "",
                    },
                    textDecorationColor: "",
                    textShadow: {
                        color: "#808080",
                        horizontal: "",
                        vertical: "",
                        blur: "",
                    },
                    padding: "0px 0px 0px 0px",
                },

                subTitleSettings: {
                    color: "#808080",
                    typography: {
                        fontFamily: "default",
                        fontWeight: "default",
                        fontSize: "",
                        lineHeight: "",
                        letterSpacing: "",
                        wordSpacing: "",
                        textTransform: "",
                        textDecoration: "",
                    },
                    margin: "0px 0px 0px 0px",
                    borderLeft: {
                        width: "20px",
                        margin: "0px 0px 0px 0px",
                        color: "#808080",
                        backgroundColor: "",
                    },
                    borderRight: {
                        width: "20px",
                        margin: "0px 0px 0px 0px",
                        color: "#808080",
                        backgroundColor: "",
                    },
                    height: "",
                    verticalPosition: "",
                },

                descriptionsSettings: {
                    color: "#808080",
                    typography: {
                        fontFamily: "default",
                        fontWeight: "default",
                        fontSize: "",
                        lineHeight: "",
                        letterSpacing: "",
                        wordSpacing: "",
                        textTransform: "",
                        textDecoration: "",
                    },
                    margin: "0px 0px 0px 0px",
                },

                shadowTextSettings: {
                    horizontalPosition: "",
                    verticalPosition: "",
                    typography: {
                        fontFamily: "default",
                        fontWeight: "default",
                        fontSize: "",
                        lineHeight: "",
                        letterSpacing: "",
                        wordSpacing: "",
                        textTransform: "",
                        textDecoration: "",
                    },
                    textColor: "",
                    strokeWidth: "",
                    borderColor: "",
                },
            },
        },

        advancedSettings: {
            type: "object",

            default: {
                layout: {
                    margin: "5px 5px 5px 5px",
                    padding: "5px 5px 5px 5px",
                    width: "",
                    zIndex: "",
                },
                positionSettings: {
                    position: "default",
                    horizontalOrientation: "left",
                    horizontalOffset: "",
                    verticalOrientation: "up",
                    verticalOffset: "",
                },
                background: {
                    normal: {
                        type: "color",
                        value: {
                            color: "#808080",
                            gradient: gradientValues[0],
                            image: "",
                        },
                    },
                    hover: {
                        type: "color",
                        value: {
                            color: "#",
                            gradient: gradientValues[0],
                            image: "",
                        },
                    },
                },

                border: {
                    normal: {
                        borderWidth: "",
                        borderRadius: "0px 0px 0px 0px",
                        boxShadow: {
                            color: "#808080",
                            horizontal: "",
                            vertical: "",
                            blur: "",
                            spread: "",
                        },
                    },
                    hover: {
                        borderWidth: "",
                        borderRadius: "0px 0px 0px 0px",
                        boxShadow: {
                            color: "#808080",
                            horizontal: "",
                            vertical: "",
                            blur: "",
                            spread: "",
                        },
                    },
                },
                motionEffects: {
                    entranceAnimation: "",
                    loopAnimation: "",
                    animationDirection: "",
                },
                visibility: {
                    hideOnDesktop: false,
                    hideOnTablet: false,
                    hideOnMobile: false,
                },
            },
        },
    },

    edit: Edit,
    save: Save,
    supports: {
        html: false,
    },
});
