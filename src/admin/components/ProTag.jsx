import { Space } from "antd";
import { CrownIcon } from "../../common/icons";

const { __ } = wp.i18n;

const ProTag = () => {
    return (
        <Space size={2} className="pt-pro-tag">
            <CrownIcon />
            {__("Pro", "poptics")}
        </Space>
    );
};

export default ProTag;
