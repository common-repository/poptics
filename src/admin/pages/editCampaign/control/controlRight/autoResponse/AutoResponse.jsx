import { EnvelopIcon } from "../../../../../../common/icons";
import ControlItemHeader from "../ControlItemHeader";
import { Space } from "antd";
import FooterActions from "./FooterActions";
import CustomRichTextEditor from "./CustomRichTextEditor";

const { __ } = wp.i18n;

const AutoResponse = () => {
    return (
        <Space
            direction="vertical"
            size="middle"
            className="pt-control-item-wrapper"
            id="autoResponder"
        >
            <ControlItemHeader
                icon={<EnvelopIcon />}
                heading={__("Auto Response Email", "poptics")}
                subText={__(
                    "Visitors receive this email when they enter their email address in a popup.",
                    "poptics",
                )}
            />
            {/* Include the custom rich text editor */}
            <CustomRichTextEditor />

            {/* Include the footer actions component */}
            <FooterActions />
        </Space>
    );
};

export default AutoResponse;
