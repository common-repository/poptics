/**
 * WordPress dependencies
 */
import { useState, useRef, useContext } from "@wordpress/element";

import { Flex } from "antd";
import { Button, Form, Tour } from "../../../../../../common/components";
import EmailInput from "../../../../../../common/components/input/EmailInput";
import useSingleCampaignApi from "../../../hooks/useSingleCampaignApi";
import { SingleCampaignContext } from "../../../withSingleCampaignData";

const { __ } = wp.i18n;

const SendTestMail = () => {
    // Access the campaign states using context
    const campaignStates = useContext(SingleCampaignContext);
    const { campaign } = campaignStates;

    // Retrieve the email body from the campaign controls
    const email_body = campaign?.controls?.auto_response?.email?.email_body;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Ref for the popup button to attach the tour target
    const popupBtn = useRef(null);

    const { sendTestEmail } = useSingleCampaignApi();

    // Function to handle sending the test email
    const handleSendTestEmail = async (values) => {
        setLoading(true); // Set loading state to true
        const res = await sendTestEmail(values); // Send test email and wait for response

        if (res) {
            setLoading(false); // Set loading state to false
            if (!res.success) return; // If sending was unsuccessful, exit the function
            setOpen(false); // Close the modal on successful send
        }
    };

    // Define the steps for the tour
    const steps = [
        {
            cover: (
                <Form
                    onFinish={handleSendTestEmail}
                    layout="vertical"
                    className="pt-send-mail"
                    validateTrigger="onBlur"
                >
                    <EmailInput
                        className="pt-control-form-label"
                        label={__("Recipient", "poptics")}
                        required
                        placeholder={__("Enter recipient email", "poptics")}
                        hasFeedback={true}
                    />
                    <Button
                        aria-label={__("send button", "poptics")}
                        htmlType="submit"
                        type="primary"
                        text={__("Send", "poptics")}
                        loading={loading}
                    />
                </Form>
            ),
            placement: "rightBottom",
            target: () => popupBtn.current,
            nextButtonProps: { className: "pt-d-none" },
        },
    ];

    return (
        <Flex justify="flex-end">
            <Button
                aria-label={__("send test copy button", "poptics")}
                ref={popupBtn}
                onClick={() => setOpen(true)}
                type="primary"
                text={__("Send me a test copy", "poptics")}
                disabled={!email_body} // Disable button if email body is not available
            />
            <Tour
                open={open}
                onClose={() => setOpen(false)}
                mask={false}
                steps={steps} // Attach the defined steps to the Tour component
            />
        </Flex>
    );
};

export default SendTestMail;
