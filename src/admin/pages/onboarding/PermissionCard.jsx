import { CheckOutlined } from "@ant-design/icons";
import {
    Switch,
    Description,
    Title,
    FormItem,
} from "../../../common/components";

const PermissionCard = (props) => {
    const {
        icon = <CheckOutlined />,
        title = "",
        description = "",
        onClick,
        name = "",
    } = props;
    return (
        <div className="pt-onboard-permission-card-container ">
            {icon}
            <div>
                <Title
                    text={title}
                    type="secondary"
                    id="pt-onboard-permission-card-title"
                />
                <Description text={description} />
            </div>
            <FormItem
                valuePropName="checked"
                name={name}
                id="pt-onboard-permission-switch-container"
            >
                <Switch onClick={onClick} />
            </FormItem>
        </div>
    );
};

export default PermissionCard;
