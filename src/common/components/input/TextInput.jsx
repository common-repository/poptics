import { FormItem } from "../Form";
import Input from "./Input";

/**
 *  Button component
 * @param {Object} props
 * @param {Object} props.className - extra class name for the component
 * @param {Object} props.name - name of the input
 * @param {Object} props.required - field is required?
 * @param {Object} props.rules - input validation rules
 * @param {Object} props.tooltip - tooltip for the input
 * @param {Object} rest - rest of the props for input element
 * @returns {JSX.Element}
 */

const TextInput = (props) => {
    const {
        className = "",
        name,
        label = "",
        required = false,
        rules = [],
        labelCol = {},
        wrapperCol = {},
        tooltip = "",
        prefix = <></>,
        inputClass = "",
        help = null,
        ...rest
    } = props;
    return (
        <FormItem
            className={className}
            label={label}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            name={name}
            tooltip={tooltip}
            rules={rules}
            required={required}
            help={help}
        >
            <Input prefix={prefix} {...rest} className={inputClass} />
        </FormItem>
    );
};

export default TextInput;
