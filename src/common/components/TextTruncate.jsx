import { Tooltip } from "antd";

/**
 * TextTruncate Component
 * Truncates text and expands it when clicking on the ellipsis.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to truncate and expand.
 * @param {number} props.maxLength - The maximum length of the text before truncation.
 * @returns {JSX.Element} - The TextTruncate component.
 */
const TextTruncate = ({ text, maxLength = 20 }) => {
    const truncatedText =
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return <Tooltip title={text}>{truncatedText}</Tooltip>;
};
export default TextTruncate;
