import { Checkbox } from "antd";

const CheckBoxGroup = (props) => {
    const { children, ...restProps } = props;

    return <Checkbox.Group {...restProps}>{children}</Checkbox.Group>;
};

export default CheckBoxGroup;
