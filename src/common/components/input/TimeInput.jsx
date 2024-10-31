import { TimePicker } from "antd";

const TimeInput = (props) => {
    const {
        defaultValue,
        format = "hh:mm A",
        allowClear = false,
        ...restProps
    } = props;

    return (
        <TimePicker
            allowClear={allowClear}
            className="pt-w-100"
            format={format}
            {...restProps}
        />
    );
};

export default TimeInput;
