const { __ } = wp.i18n;
export const formLayoutOptions = [
    {
        label: __("horizontal", "poptics"),
        value: "horizontal",
    },
    {
        label: __("vertical", "poptics"),
        value: "vertical",
    },
    {
        label: __("inline", "poptics"),
        value: "inline",
    },
];
export const requiredMarkOptions = [
    {
        label: __("default", "poptics"),
        value: true,
    },
    {
        label: __("optional", "poptics"),
        value: "optional",
    },
    {
        label: __("hidden", "poptics"),
        value: false,
    },
];

export const formSizeOptions = [
    {
        label: __("small", "poptics"),
        value: "small",
    },
    {
        label: __("middle", "poptics"),
        value: "middle",
    },
    {
        label: __("large", "poptics"),
        value: "large",
    },
];
export const formVariantOptions = [
    {
        label: __("outlined", "poptics"),
        value: "outlined",
    },
    {
        label: __("borderless", "poptics"),
        value: "borderless",
    },
    {
        label: __("filled", "poptics"),
        value: "filled",
    },
];

export const customInputAttributes = {
    titleColor: {
        type: "string",
        default: "black",
    },
    formLayout: {
        type: "string",
        default: "vertical",
    },
    formSize: {
        type: "string",
        default: "middle",
    },
    formVariant: {
        type: "string",
        default: "outlined",
    },
    requiredMark: {
        type: "string",
        default: "default",
    },
};
