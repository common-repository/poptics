import { Space, Flex } from "antd";
import { Text, Title } from "../../../../common/components";
import CountdownEndContent from "./CountdownEndContent";
import useRunTimer from "../hooks/useRunTimer";

const CountdownBase = ({ attributes, mode }) => {
    const { targetTime, endAction, theme, unitDisplay, block } = attributes;
    const { contentPosition, padding, margin, backgroundColor } = block;
    const { secondsLabel, enableSeparator } = unitDisplay;

    const { timeLeft } = useRunTimer({ targetTime, unitDisplay, mode });

    const getBorderRadius = (theme) => {
        switch (theme) {
            case "default":
                return "0px";
            case "default":
                return "0px";
            case "circledBackground":
                return "50%";
            case "rectangleBackground":
                return ".5rem";
            default:
                return "0px";
        }
    };

    const countdownContainerStyle = {
        backgroundColor: backgroundColor ? backgroundColor : "#ffff",
        height: theme !== "default" && "6rem",
        width: theme !== "default" && "6rem",
        borderRadius: getBorderRadius(theme),
        padding,
        margin,
        justifyContent: "center",
    };

    const dataCountDown = JSON.stringify({ attributes, mode: "edit" });

    return (
        <Flex
            id="popticsCountdown"
            gap={"large"}
            justify={contentPosition}
            {...(mode === "save" && {
                ["data-countdown"]: dataCountDown,
            })}
        >
            {Object.keys(timeLeft).length !== 0 ? (
                Object.entries(timeLeft)?.map((timeItem) => (
                    <Space>
                        <Space
                            style={countdownContainerStyle}
                            className="pt-countdown-container"
                            direction="vertical"
                            size="small"
                            align="center"
                        >
                            <Text
                                className="pt-countdown-time"
                                text={timeItem[1]}
                            />
                            <Text
                                className="pt-countdown-label"
                                text={timeItem[0]}
                            />
                        </Space>
                        {enableSeparator && timeItem[0] !== secondsLabel && (
                            <Title text={":"} />
                        )}
                    </Space>
                ))
            ) : (
                <CountdownEndContent
                    countdownContainerStyle={countdownContainerStyle}
                    endAction={endAction}
                />
            )}
        </Flex>
    );
};

export default CountdownBase;
