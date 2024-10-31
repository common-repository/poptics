import { Card as AntdCard } from "antd";

const Card = (props) => {
    const { children, ...rest } = props;
    return <AntdCard {...rest}>{children}</AntdCard>;
};

export default Card;
