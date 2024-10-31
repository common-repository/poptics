import { Space } from "antd";
import ControlItemHeader from "../ControlItemHeader";
import { LightBoxIcon } from "../../../../../../common/icons";
import GeoTarget from "./GeoTarget";
import LanguageTarget from "./LanguageTarget";
import DeviceTarget from "./DeviceTarget";
import OsTarget from "./OsTarget";
import BrowserTarget from "./BrowserTarget";
import AudienceType from "./AudienceType";

const { __ } = wp.i18n;

const Audience = () => {
    return (
        <Space
            direction="vertical"
            size="middle"
            className="pt-control-item-wrapper"
            id="audience"
        >
            {/* Header component with an icon, heading, and subtext */}
            <ControlItemHeader
                icon={
                    <div className="pt-control-item-icon-with-bg">
                        <LightBoxIcon />
                    </div>
                }
                heading={__("Audience and Targeting", "poptics")}
                subText={__(
                    "Select audience segments and apply location-based targeting on popups campaigns.",
                    "poptics",
                )}
            />
            <AudienceType />
            <GeoTarget />

            {/*TODO: This will be functional after MVP */}
            {/* <LanguageTarget />*/}

            <DeviceTarget />

            {/*TODO: This will be functional after MVP */}
            {/* <OsTarget />
            <BrowserTarget /> */}
        </Space>
    );
};

export default Audience;
