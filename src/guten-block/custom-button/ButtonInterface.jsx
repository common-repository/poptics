import { Flex } from "antd";
import { Button } from "../../common/components";

const ButtonInterface = ({ attributes, mode }) => {
    const { btnStyle, btnContent } = attributes;
    const { alignment, borderColor, ...style } = btnStyle;
    const {
        label,
        btnAttribute,
        id,
        className = "",
        count_as_conversion,
    } = btnContent;

    /**
     * Converts btnAttribute to an object with key-value pairs.
     * If the key is "type", it is replaced with "htmlType".
     *
     * @returns {Object} - Converted attributes.
     */
    const convertAttribute = () => {
        if (!btnAttribute) return {};

        // Split the btnAttribute string by the '/' character
        let [key, value] = btnAttribute?.split("/");

        if (key === "type") key = "htmlType";

        // Return the formatted result
        return { [key]: value };
    };

    const extraAttribute = convertAttribute();

    return (
        <Flex justify={alignment}>
            <Button
                style={{ ...style, borderColor: borderColor ?? "transparent" }}
                text={label}
                {...(mode === "save" && { ...extraAttribute })}
                {...(id && { id })}
                {...(className && { className })}
                {...(count_as_conversion && { "data-count-conversion": true })}
            />
        </Flex>
    );
};

export default ButtonInterface;
