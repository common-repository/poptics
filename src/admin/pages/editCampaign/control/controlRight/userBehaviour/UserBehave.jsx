import { Space } from "antd";
import ControlItemHeader from "../ControlItemHeader";
import { CircleArrowIcon } from "../../../../../../common/icons";
import SwitchBox from "../SwitchBox";
import ClickTrigger from "./ClickTrigger";
import NumberInputBox from "./NumberInputBox";

const { __ } = wp.i18n;

const UserBehave = () => {
    return (
        <Space
            direction="vertical"
            size="middle"
            className="pt-control-item-wrapper"
            id="userBehaviours"
        >
            {/* Header component with an icon, heading, and subtext */}
            <ControlItemHeader
                icon={<CircleArrowIcon />}
                heading={__("Popup Visibility", "poptics")}
                subText={__(
                    "How soon do you want the popup to display?",
                    "poptics",
                )}
            />
            {/* Switch for new visitor setting */}
            <SwitchBox
                label={__("On page load", "poptics")}
                subText={__("Show after targeted page loading.", "poptics")}
                form="user_behave"
                field="page_load"
            />

            {/* Number input boxes */}
            <NumberInputBox />
            {/* Switch for exit intent setting */}
            <SwitchBox
                label={__("Exit Intent", "poptics")}
                subText={__(
                    "Show when visitor is leaving the page.",
                    "poptics",
                )}
                form="user_behave"
                field="exit_intent"
                isPro={true}
            />
            {/* Component for click trigger settings */}
            <ClickTrigger />
        </Space>
    );
};

export default UserBehave;
