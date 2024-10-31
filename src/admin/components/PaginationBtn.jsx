import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Button } from "../../common/components";

const { __ } = wp.i18n;

const PaginationBtn = (_, type, originalElement) => {
    if (type === "prev") {
        return (
            <Button
                aria-label={__("previous button", "poptics")}
                className="pt-pagination-btn"
                text={__("Previous", "poptics")}
                icon={<DoubleLeftOutlined />}
            />
        );
    }
    if (type === "next") {
        return (
            <Button
                aria-label={__("next button", "poptics")}
                className="pt-pagination-btn"
                text={__("Next", "poptics")}
                icon={<DoubleRightOutlined />}
                iconPosition="end"
            />
        );
    }
    return originalElement;
};

export default PaginationBtn;
