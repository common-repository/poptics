/**
 * WordPress dependencies
 */
import { useState, useEffect } from "@wordpress/element";
import { getTimeDifference } from "../../constant";

const useRunTimer = ({ targetTime, unitDisplay, mode }) => {
    const {
        showDays,
        daysLabel,
        showHours,
        hoursLabel,
        showMinutes,
        minutesLabel,
        showSeconds,
        secondsLabel,
    } = unitDisplay;

    // calculate the left time
    const calculateTimeLeft = () => {
        // calculate the difference between timestamp and target time in milliseconds
        const difference = +new Date(targetTime) - +new Date();
        let timeLeft = {};

        // convert the difference into days, hour, and minutes and seconds
        if (difference > 0) {
            timeLeft = getTimeDifference(
                difference,
                showDays,
                showHours,
                showMinutes,
                showSeconds,
                daysLabel,
                hoursLabel,
                minutesLabel,
                secondsLabel,
            );
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // calculate remaining time after target time change
    useEffect(() => {
        if (mode === "edit") {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [targetTime]);

    // calculate remaining time after every seconds
    useEffect(() => {
        if (mode === "edit") {
            const timer = setTimeout(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearTimeout(timer);
        }
    });

    return { timeLeft };
};
export default useRunTimer;
