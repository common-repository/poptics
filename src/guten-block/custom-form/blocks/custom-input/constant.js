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
export const inputLayoutOptions = [
    {
        label: __("row", "poptics"),
        value: "row",
    },
    {
        label: __("column", "poptics"),
        value: "column",
    },
    {
        label: __("column reverse", "poptics"),
        value: "column-reverse",
    },
    {
        label: __("row reverse", "poptics"),
        value: "row-reverse",
    },
];
export const alignItemOptions = [
    {
        label: __("center", "poptics"),
        value: "center",
    },
    {
        label: __("start", "poptics"),
        value: "start",
    },
    {
        label: __("end", "poptics"),
        value: "end",
    },
];
export const justifyContentsOptions = [
    {
        label: __("center", "poptics"),
        value: "center",
    },
    {
        label: __("left", "poptics"),
        value: "left",
    },
    {
        label: __("right", "poptics"),
        value: "right",
    },
    {
        label: __("space around", "poptics"),
        value: "space-around",
    },
    {
        label: __("space between", "poptics"),
        value: "space-between",
    },
    {
        label: __("space evenly", "poptics"),
        value: "space-evenly",
    },
];

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9); // generates a random ID
}

export const customInputAttributes = {
    name: {
        type: "string",
        default: `name_${generateRandomId()}`,
    },
    titleColor: {
        type: "string",
        default: "black",
    },
    align: {
        type: "string",
        default: "start",
    },
    justify: {
        type: "string",
        default: "left",
    },
    borderWidth: {
        type: "number",
        default: 0.1,
    },
    radioCheckedItemId: {
        type: "number",
        default: 1,
    },

    radioItems: {
        type: "array",
        default: [
            { id: 1, label: __("Option 1", "poptics"), value: 1 },
            { id: 2, label: __("Option 2", "poptics"), value: 2 },
        ],
    },

    placeholder: {
        type: "string",
        default: "",
    },
    label: {
        type: "string",
        default: "",
    },
    type: {
        type: "string",
        default: "text",
    },
    layout: {
        type: "string",
        default: "vertical",
    },
    isRequired: {
        type: "boolean",
        default: true,
    },
    help: {
        type: "string",
        default: "",
    },
};

export const inputTypesValue = {
    text: "text",
    email: "email",
    radio: "radio",
    checkbox: "checkbox",
};

export const inputTypes = [
    {
        label: __("Text", "poptics"),
        value: inputTypesValue.text,
    },
    {
        label: __("Email", "poptics"),
        value: inputTypesValue.email,
    },

    {
        label: __("Checkbox", "poptics"),
        value: inputTypesValue.checkbox,
    },

    {
        label: __("Radio", "poptics"),
        value: inputTypesValue.radio,
    },
];

export const defaultRadioItems = [
    { id: 1, label: __("Option 1", "poptics"), value: 1 },
    { id: 2, label: __("Option 2", "poptics"), value: 2 },
];

export const findMaxId = (array) =>
    array.reduce(
        (max, obj) => (Number(obj.id) > max ? Number(obj.id) : max),
        0,
    );
