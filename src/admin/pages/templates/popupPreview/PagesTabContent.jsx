import { Flex } from "antd";
import { Img } from "../../../../common/components";

const PagesTabContent = (props) => {
    const { image } = props;
    return (
        <Flex
            className="pt-pages-preview-image-container"
            align="center"
            justify="center"
        >
            <Img
                alt={__("preview image", "poptics")}
                src={image}
                width={300}
                height={250}
                className="pt-pages-preview-image"
            />
        </Flex>
    );
};

export default PagesTabContent;
