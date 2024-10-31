import { Checkbox } from "antd";

const CheckBox = (props) => {
    const { onChange, children, ...rest } = props;

    return (
        <Checkbox onChange={onChange} {...rest}>
            {children}
        </Checkbox>
    );
};
export default CheckBox;
