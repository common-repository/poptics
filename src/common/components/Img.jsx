import { Image } from "antd";
const Img = (props) => {
    const { src, alt, ...rest } = props;
    return <Image src={src} alt={alt} {...rest} />;
};

export default Img;
