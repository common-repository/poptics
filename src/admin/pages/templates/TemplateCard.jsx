import { Flex } from "antd";

import { Img, Text } from "../../../common/components";
import { image } from "./constant";
import { CategoryInfo } from "../../components/CategoryInfo";
import ImagePreviewMask from "./popupPreview/ImagePreviewMask";
import { taxonomy } from "../../../globalConstant";

const { __ } = wp.i18n;

const TemplateCard = ({ data }) => {
    return (
        <Flex
            vertical
            className="pt-template-card-container"
            justify="space-between"
        >
            <Img
                alt={__("template card image", "poptics")}
                src={data?.thumbnail || image}
                height={"11rem"}
                width={"100%"}
                className="pt-template-card-image"
                preview={{
                    visible: false,
                    toolbarRender: () => null,
                    mask: <ImagePreviewMask id={data?.id} />,
                }}
            />
            <Flex vertical className="pt-template-card-title-container">
                <Text text={data?.name} className="pt-template-card-title" />
                <CategoryInfo type={data?.taxonomy?.[taxonomy.type]} />
            </Flex>
        </Flex>
    );
};

export default TemplateCard;
