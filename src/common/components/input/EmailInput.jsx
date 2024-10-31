import { FormItem } from "../Form";
import Input from "./Input";

const { __ } = wp.i18n;

/**
 * EmailInput Component
 *
 * This component renders a form item specifically for an email input field.
 * It includes validation rules to ensure the input is a valid email address and is required if specified.
 *
 * @param {Object} props - The properties passed to the component
 * @param {string} [props.className=""] - Additional class names for the form item
 * @param {string} [props.name="email"] - The name of the input field, defaults to "email"
 * @param {string} [props.label=""] - The label text for the form item
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {Array} [props.rules=[]] - Additional validation rules for the input field
 * @param {Object} [props.labelCol={}] - Layout for the label column
 * @param {Object} [props.wrapperCol={}] - Layout for the input column
 * @param {string} [props.tooltip=""] - Tooltip text for the form item
 * @param {React.Element} [props.prefix=<></>] - Prefix element for the input field
 * @param {string} [props.inputClass=""] - Additional class names for the input field
 * @param {boolean} [props.hasFeedback=false] - Whether to show feedback icon
 * @param {Object} rest - Additional properties to be passed to the Input component
 *
 * @returns {React.Element} The EmailInput component
 */
const EmailInput = (props) => {
    const {
        className = "",
        name = "email",
        label = "",
        required = false,
        labelCol = {},
        wrapperCol = {},
        tooltip = "",
        prefix = <></>,
        inputClass = "",
        hasFeedback = false,
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
            hasFeedback={hasFeedback}
            rules={[
                {
                    type: "email",
                    message: __("The input is not valid E-mail!", "poptics"),
                },
                ...(required
                    ? [
                          {
                              required: true,
                              message: __(
                                  "Please input your E-mail!",
                                  "poptics",
                              ),
                          },
                      ]
                    : []),
            ]}
            required={required}
        >
            <Input prefix={prefix} {...rest} className={inputClass} />
        </FormItem>
    );
};

export default EmailInput;
