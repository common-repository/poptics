import { ColorPicker } from "antd";
import { ColorPickerIcon } from "../../icons";
import Button from "../Button";

const { __ } = wp.i18n;

const ColorInput = ({ value, onChange }) => {
    return (
        <ColorPicker
            value={value}
            onChange={onChange}
            allowClear
            onClear={onChange}
        >
            <Button
                aria-label={__("color picker button", "poptics")}
                style={!!value && { backgroundColor: value }} // Sets the button's background color based on the selected color value, if a value exists.
                icon={
                    <ColorPickerIcon
                        {...((value === "#fff" || value === "#ffffff") && {
                            color: "#808080", // If the color is white, the icon color is set to gray for visibility.
                        })}
                    />
                }
                type="primary"
            />
        </ColorPicker>
    );
};

export default ColorInput;
