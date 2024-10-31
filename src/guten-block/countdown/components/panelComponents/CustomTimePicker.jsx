import { useState, Fragment, useEffect } from "@wordpress/element";
import { __experimentalNumberControl as NumberControl } from "@wordpress/components";
import { Flex } from "antd";
import { customTimeOptions } from "../../constant";
import { Text } from "../../../../common/components";

const { __ } = wp.i18n;

export const CustomTimePicker = ({ setAttributes }) => {
    const [time, setTime] = useState({
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        days: 0,
        hours: 5,
        minutes: 0,
        seconds: 0,
    });

    let date = new Date();

    // create option using timezone
    let options = { timeZone: time.timeZone, hour12: true };

    // set time according to the timezone
    date.toLocaleString("en-US", options);

    useEffect(() => {
        let millisecondsToAdd =
            time.days * 86400000 +
            time.hours * 60 * 60 * 1000 +
            time.minutes * 60 * 1000 +
            time.seconds * 1000;
        date.setTime(date.getTime() + millisecondsToAdd);
        setAttributes({ targetTime: date });
    }, [time]);

    const onTimeChange = (label, value) => {
        setTime((preVal) => ({
            ...preVal,
            [label]: value,
        }));
    };

    return (
        <Fragment>
            <Text
                text={__(
                    "Set-and-forget solution. The countdown starts when your visitor sees the offer.",
                    "poptics",
                )}
            />
            <Flex gap={"small"}>
                {customTimeOptions.map(({ label }) => (
                    <NumberControl
                        onChange={(val) =>
                            onTimeChange(label.toLowerCase(), val)
                        }
                        help={label}
                        value={time[label.toLowerCase()] || 0}
                        min={0}
                    />
                ))}
            </Flex>
        </Fragment>
    );
};
