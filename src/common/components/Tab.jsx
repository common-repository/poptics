import { Tabs as AntTabs } from "antd";

const Tabs = (props) => {
    const { children, ...rest } = props;
    return <AntTabs {...rest}>{children}</AntTabs>;
};

export default Tabs;
