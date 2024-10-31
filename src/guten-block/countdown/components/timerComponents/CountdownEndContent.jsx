import { Space } from "antd";
import { Text } from "../../../../common/components";

const { __ } = wp.i18n;
const CountdownEndContent = ({ endAction, countdownContainerStyle }) => {
    let content = null;

    const timeLeft = {
        days: __("00", "poptics"),
        hours: __("00", "poptics"),
        mins: __("00", "poptics"),
        secs: __("00", "poptics"),
    };

    if (endAction === "noAction") {
        content = Object.entries(timeLeft)?.map((timeItem) => (
            <Space
                style={countdownContainerStyle}
                className="pt-countdown-container"
                direction="vertical"
                size="small"
                align="center"
            >
                <Text className="pt-countdown-time" text={timeItem[1]} />
                <Text className="pt-countdown-label" text={timeItem[0]} />
            </Space>
        ));
    } else if (endAction === "showMessage") {
        content = (
            <Text
                className="pt-countdown-message"
                text={__("Times Up!", "poptics")}
            />
        );
    } else {
        content = null;
    }

    return content;
};

export default CountdownEndContent;
