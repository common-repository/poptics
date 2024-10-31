import {
    CloseOutlined,
    CloseCircleOutlined,
    CloseCircleFilled,
    CloseSquareOutlined,
    CloseSquareFilled,
} from "@ant-design/icons";

const { __ } = wp.i18n;

export const sizeOptions = [
    { width: "40%", label: __("Small", "poptics") },
    { width: "60%", label: __("Large", "poptics") },
    { width: "100%", label: __("Full width", "poptics") },
];

export const iconPositionOptions = [
    {
        value: "inside",
        label: __("Inside of Container", "poptics"),
    },
    {
        value: "outside",
        label: __("Out of Container", "poptics"),
    },
];

export const iconStylesOptions = [
    {
        value: "icon-close-circle-outline",
    },
    {
        value: "icon-close-circle-filled",
    },
    {
        value: "icon-close-square-outline",
    },
    {
        value: "icon-close-square-filled",
    },
    {
        value: "icon-close-outline",
    },
];

/**
 * CloseIcon component renders different types of close icons based on the provided `id`.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The identifier used to determine which close icon to render.
 * @param {string} [props.fontSize="16px"] - The size of the icon, defaulting to 16px if not specified.
 *
 * @returns {JSX.Element|null} - Returns the corresponding Ant Design close icon based on the `id`, or null if the `id` doesn't match any predefined icons.
 */
export const CloseIcon = (props) => {
    // Destructure the id and optional fontSize prop from the input props.
    const { id, fontSize = "16px" } = props;

    // Map of icon identifiers to the corresponding Ant Design icon components with the specified font size.
    const icons = {
        "icon-close-circle-outline": (
            <CloseCircleOutlined style={{ fontSize }} />
        ),
        "icon-close-circle-filled": <CloseCircleFilled style={{ fontSize }} />,
        "icon-close-square-outline": (
            <CloseSquareOutlined style={{ fontSize }} />
        ),
        "icon-close-square-filled": <CloseSquareFilled style={{ fontSize }} />,
        "icon-close-outline": <CloseOutlined style={{ fontSize }} />,
    };

    // Return the icon associated with the provided id. If the id doesn't match, it returns undefined (no icon rendered).
    return icons[id];
};
