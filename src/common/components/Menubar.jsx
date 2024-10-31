import { Menu } from "antd";

const Menubar = (props) => {
  const { current, ...rest } = props;
  return <Menu selectedKeys={[current]} mode="horizontal" {...rest} />;
};

export default Menubar;
