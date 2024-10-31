import { Flex } from "antd";
import { Title } from "../../../common/components";

const ItemContainer = (props) => {
  const { title, item } = props;
  return (
    <Flex vertical>
      <Title text={title} className="pt-item-container-title" />
      <div className="pt-item-container">{item}</div>
    </Flex>
  );
};

export default ItemContainer;
