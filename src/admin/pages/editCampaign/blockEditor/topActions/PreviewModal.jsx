/**
 * WordPress Dependencies
 */
import { useState, useContext } from "@wordpress/element";

import { Button, Modal } from "../../../../../common/components";
import { SettingsIcon } from "../../../../../common/icons";
import PopupIframe from "../../../../components/PopupIframe";
import { SingleCampaignContext } from "../../withSingleCampaignData";

const { __ } = wp.i18n;

const PreviewModal = () => {
    const { campaign, deviceType } = useContext(SingleCampaignContext);

    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                aria-label={__("preview button", "poptics")}
                className="pt-icon-btn pt-default-btn "
                icon={<SettingsIcon color="#1F2937" />}
                text={__("Preview", "poptics")}
                onClick={showModal}
            />

            {isOpen ? (
                <Modal
                    centered
                    open={isOpen}
                    footer={null}
                    onCancel={handleCancel}
                    className={`pt-preview-modal pt-${deviceType}-preview-modal`}
                >
                    <PopupIframe
                        campaignId={campaign.id}
                        deviceType={deviceType}
                    />
                </Modal>
            ) : null}
        </>
    );
};

export default PreviewModal;
