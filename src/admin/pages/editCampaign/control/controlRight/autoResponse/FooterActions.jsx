import { Flex } from "antd";
import SendTestMail from "./SendTestMail";

const { __ } = wp.i18n;

const FooterActions = () => {
    return (
        <Flex justify="flex-end">
            <SendTestMail />
        </Flex>
    );
};

export default FooterActions;
