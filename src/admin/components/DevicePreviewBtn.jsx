import { Flex } from "antd";
import { Button } from "../../common/components";
import { DesktopPreviewIcon, MobilePreviewIcon } from "../../common/icons";
const { __ } = wp.i18n;
const DevicePreviewBtn = (props) => {
    const { deviceType, setDeviceType, float } = props;

    // Handler for changing the device type
    const handleDeviceClick = (device) => {
        setDeviceType((preVal) => ({
            ...preVal,
            deviceType: device,
        }));
    };

    // Define preview items for different device types
    const previewItems = [
        {
            icon: <DesktopPreviewIcon />,
            key: "desktop",
        },
        {
            icon: <MobilePreviewIcon />,
            key: "mobile",
        },
    ];

    return (
        // Flex container for device preview buttons
        <Flex
            align="center"
            className={`pt-campaign-device-preview ${
                float && "pt-preview-float-btn"
            }`}
        >
            {previewItems.map((item) => (
                <Button
                    aria-label={__("preview button", "poptics")}
                    key={item.key}
                    type="text"
                    icon={item.icon}
                    onClick={() => handleDeviceClick(item.key)}
                    className={`pt-device-preview-btn ${
                        deviceType === item.key &&
                        "pt-device-preview-btn-active"
                    }`}
                />
            ))}
        </Flex>
    );
};

export default DevicePreviewBtn;
