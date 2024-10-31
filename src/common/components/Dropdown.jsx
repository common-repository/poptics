import { Dropdown as AntdDropdown } from "antd";

const Dropdown = (props) => {
  const { trigger = ["click"], ...rest } = props;
  return <AntdDropdown arrow trigger={trigger} {...rest} />;
};

export default Dropdown;
