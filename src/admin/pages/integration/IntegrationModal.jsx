/**
 * WordPress Dependencies
 */
import { useState } from "@wordpress/element";

import { Avatar, Flex } from "antd";
import {
    Text,
    Input,
    Modal,
    FormItem,
    Form,
} from "./../../../common/components";
import { cardInterface } from "./constant";
import useIntegrationApi from "./hooks/useIntegrationApi";

const { __ } = wp.i18n;

const IntegrationModal = (props) => {
    let { open, setOpen, cardInfo } = props;
    let { title, formItem, logo, storedValue } = cardInfo || cardInterface;

    const [loading, setLoading] = useState(false);

    const { addIntegrationSetting } = useIntegrationApi();

    /**
     * onIntegrate Function
     * This function is triggered when the form is submitted. It sends the integration data to the server and handles
     * navigation after the integration is complete.
     *
     * @param {object} values - Form values submitted by the user
     */
    const onIntegrate = async (values) => {
        setLoading(true); // Set loading state to true while the request is being processed
        await addIntegrationSetting(values); // Call the API to add integration setting
        setLoading(false); // Set loading state to false after the request is complete
        setOpen(false); // Close the modal
    };

    // Prepare the initial form values by adding the key of the stored integration card
    storedValue = { [formItem?.[0]?.formItemProps?.name?.[0]]: storedValue };

    return (
        <Modal
            open={open}
            title={__("Integration", "poptics")}
            okText={__("Connect", "poptics")}
            cancelText={__("Cancel", "poptics")}
            okButtonProps={{
                autoFocus: true,
                htmlType: "submit",
                loading: loading,
                ["aria-label"]: "modal submit",
            }}
            onCancel={() => setOpen(false)}
            destroyOnClose
            footer={(_, { OkBtn, CancelBtn }) => (
                <Flex align="center" justify="space-between">
                    <CancelBtn />
                    <OkBtn />
                </Flex>
            )}
            modalRender={(dom) => (
                <Form
                    ref={formRef}
                    layout="vertical"
                    name="integration_modal_form"
                    initialValues={storedValue}
                    clearOnDestroy
                    onFinish={(values) => onIntegrate(values)}
                    requiredMark={false}
                >
                    {dom}
                </Form>
            )}
        >
            <Flex
                className="pt-integration-modal-header-container"
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap="small">
                    <Avatar
                        alt={__("logo", "poptics")}
                        className="pt-integration-avatar"
                        icon={logo}
                    />
                    <Text
                        className="pt-integration-modal-header"
                        text={title}
                    />
                </Flex>

                {/* TODO: will add link when available
                <Link
                    text={__("How do I get the API key,Secret key?", "poptics")}
                />
                */}
            </Flex>

            {formItem?.map((item) => {
                return (
                    <FormItem {...item.formItemProps}>
                        <Input {...item.inputProps} />
                    </FormItem>
                );
            })}
        </Modal>
    );
};

export default IntegrationModal;
