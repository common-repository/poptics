import { timeZoneOptions } from "../../constant";
import { Fragment, useState, useEffect } from "@wordpress/element";
import { Text } from "../../../../common/components";
import { TimePicker, SelectControl } from "@wordpress/components";

const { __ } = wp.i18n;

const FixedDatePicker = ({ setAttributes, targetTime }) => {
    const [time, setTime] = useState({
        time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const onDateChange = (label, value) => {
        setTime((preVal) => ({
            ...preVal,
            [label]: value,
        }));
    };

    useEffect(() => {
        // 1. convert the selected time state into date object
        // create option using timezone
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: time.timeZone,
            timeZoneName: "short",
        };
        const timeZoneFormatter = new Intl.DateTimeFormat("en-US", options);
        let date = new Date(time.time);
        const zoneFormattedDate = timeZoneFormatter.format(date);

        // 2. convert the date object timezone into local timezone
        let localDate = new Date(zoneFormattedDate);
        localDate.setTime(Date.parse(localDate));

        setAttributes({ targetTime: localDate });
    }, [time]);

    return (
        <Fragment>
            <Text
                text={__(
                    "Counts down to a specific date and time. Universal deadline for all visitors.",
                    "poptics",
                )}
            />

            <TimePicker
                className="pt-fixed-time-picker"
                currentTime={targetTime}
                onChange={(newTime) => onDateChange("time", newTime)}
                is12Hour
            />

            <SelectControl
                __nextHasNoMarginBottom
                onChange={(val) => onDateChange("timeZone", val)}
                help={__("TimeZone", "poptics")}
                options={timeZoneOptions}
            />
        </Fragment>
    );
};

export default FixedDatePicker;
