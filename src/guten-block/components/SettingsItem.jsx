import { Flex } from "antd";

/**
 * SettingsItem Component
 *
 * This component is used to render a label and a corresponding field within a
 * layout defined by the Ant Design's `Flex` component. The layout can be either
 * vertical or horizontal, depending on the `vertical` prop.
 *
 * Props:
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label text to be displayed alongside the field.
 * @param {boolean} [props.vertical=true] - Controls the layout direction:
 *   - `true`: Stacks the label and field vertically.
 *   - `false`: Aligns the label and field horizontally with space between.
 * @param {React.ReactNode} props.field - The input field or control component to display next to the label.
 * @param {boolean} [props.isApplicable=true] - A flag to conditionally render the component.
 *   - `true`: Renders the component.
 *   - `false`: Returns `null`, preventing rendering.
 *
 */

const SettingsItem = (props) => {
    const { label, vertical = true, field, isApplicable = true } = props;

    if (!isApplicable) return null;

    return (
        <Flex
            vertical={vertical}
            {...(!vertical && { justify: "space-between", align: "center" })}
            gap="small"
        >
            <strong>{label}</strong>
            {field}
        </Flex>
    );
};

export default SettingsItem;
