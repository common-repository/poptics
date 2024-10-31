import { Flex, Row, Space, Tooltip } from "antd";
import {
    HomeIcon,
    InfoIcon,
    LightBoxIcon,
    WebIcon,
    WebPageIcon,
} from "../../../../../../common/icons";
import ControlItemHeader from "../ControlItemHeader";
import RadioInput from "../RadioInput";
import PopupHiddenPage from "./PopupHiddenPage";
import { Card } from "../../../../../../common/components";
import CustomPage from "./CustomPage";

const { __ } = wp.i18n;

const showInTooltipText = __(
    "Users can use the 'All pages' option to display popups everywhere on their website or 'Home page' to display them only on their homepage. \nAdditionally, custom pages can be configured for more customization.",
    "poptics",
);

const PageTarget = () => {
    // Array of radio button items with icons, labels, and pro status
    const radioItems = [
        {
            key: "all_pages",
            icon: <WebIcon />,
            label: __("All Pages", "poptics"),
            isPro: false,
        },
        {
            key: "home_page",
            icon: <HomeIcon />,
            label: __("Home Pages", "poptics"),
            isPro: false,
        },
        {
            key: "custom_page",
            icon: <WebPageIcon />,
            label: __("Custom Pages", "poptics"),
            isPro: true,
        },
    ];

    return (
        <Space
            direction="vertical"
            size="middle"
            className="pt-control-item-wrapper"
            id="pageTarget"
        >
            {/* Header component with an icon, heading, and subtext */}
            <ControlItemHeader
                icon={
                    <div className="pt-control-item-icon-with-bg">
                        <LightBoxIcon />
                    </div>
                }
                heading={__("Popup Placement", "poptics")}
                subText={__(
                    "Place your popups where you want to display",
                    "poptics",
                )}
            />
            {/* Card component for the main content area */}
            <Card bordered={false}>
                <Flex gap="small" vertical>
                    {/* Radio input component with items, label, and tooltip */}
                    <RadioInput
                        radioItems={radioItems}
                        label={
                            <Space>
                                {__("Show In", "poptics")}
                                <Tooltip title={showInTooltipText}>
                                    <span>
                                        <InfoIcon />
                                    </span>
                                </Tooltip>
                            </Space>
                        }
                        field="show_in"
                        form="page_target"
                    />

                    <Row justify={{ sm: "start", md: "end" }}>
                        <CustomPage />
                        <PopupHiddenPage />
                    </Row>
                </Flex>
            </Card>
        </Space>
    );
};

export default PageTarget;
