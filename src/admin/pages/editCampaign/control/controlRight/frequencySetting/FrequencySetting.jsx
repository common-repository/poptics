import { Space } from "antd";
import ControlItemHeader from "../ControlItemHeader";
import { CircleArrowIcon } from "../../../../../../common/icons";
import DisplayFrequency from "./DisplayFrequency";
import HideFrequency from "./HideFrequency";

const { __ } = wp.i18n;

const FrequencySetting = () => {
    return (
        <Space
            direction="vertical"
            size="middle"
            className="pt-control-item-wrapper"
            id="frequencySettings"
        >
            {/* Header component with an icon, heading, and subtext */}
            <ControlItemHeader
                icon={<CircleArrowIcon />}
                heading={__("Frequency Settings", "poptics")}
                subText={__(
                    "Based on visitor behavior, how often popups are shown",
                    "poptics",
                )}
            />
            <DisplayFrequency />
            <HideFrequency />
        </Space>
    );
};

export default FrequencySetting;
