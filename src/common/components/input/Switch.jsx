import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch as AntdSwitch } from "antd";

const Switch = (props) => {
    return (
        <label>
            <AntdSwitch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                {...props}
            />
        </label>
    );
};

export default Switch;
