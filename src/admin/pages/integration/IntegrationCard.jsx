/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { App, Flex } from "antd";
import {
    CheckCircleFilled,
    PlusCircleFilled,
    DisconnectOutlined,
} from "@ant-design/icons";
import ProTag from "../../components/ProTag";
import { Text, Button } from "./../../../common/components";
import useIntegrationApi from "./hooks/useIntegrationApi";
import { AdminContext } from "../../withAdminData";

const { __ } = wp.i18n;

const IntegrationCard = (props) => {
    const { card, onCardClick } = props;

    const { addIntegrationSetting } = useIntegrationApi();
    const { modal } = App.useApp();

    const { isProActivated } = useContext(AdminContext);

    const handleDisconnectClick = (card) => {
        addIntegrationSetting({ [card.key]: null });
    };
    return (
        <Flex
            key={card.id}
            gap="middle"
            vertical
            className="pt-integration-card-container"
        >
            {card.icon}
            {card.isPro && !isProActivated ? (
                <div className="pt-integration-pro-tag">
                    <ProTag />
                </div>
            ) : null}
            <Text
                text={card.description}
                className="pt-integration-card-text"
            />

            <Flex gap={"middle"}>
                <Button
                    className={
                        card.isConnected
                            ? "pt-integration-card-button-connected"
                            : "pt-integration-card-button-not-connected"
                    }
                    icon={
                        card.isConnected ? (
                            <CheckCircleFilled />
                        ) : (
                            <PlusCircleFilled />
                        )
                    }
                    onClick={() => onCardClick(card.id)}
                    disabled={card.isPro && !isProActivated}
                    size={"middle"}
                    aria-label={__("connect", "poptics")}
                >
                    {__(card.isConnected ? "Connected" : "Connect", "poptics")}
                </Button>

                {card?.isConnected ? (
                    <Button
                        aria-label={__("disconnect button", "poptics")}
                        onClick={() => {
                            modal.confirm({
                                title: __(
                                    "Are you sure to disconnect the Service",
                                    "poptics",
                                ),
                                okText: __("Yes", "poptics"),
                                okType: "danger",
                                cancelText: __("No", "poptics"),
                                onOk: () => handleDisconnectClick(card),
                            });
                        }}
                        className="pt-integration-card-button-disconnect"
                        icon={<DisconnectOutlined />}
                    >
                        Disconnect
                    </Button>
                ) : null}
            </Flex>
        </Flex>
    );
};

export default IntegrationCard;
