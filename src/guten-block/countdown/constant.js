import { timezoneToCountry } from "../../globalConstant";

const { __ } = wp.i18n;

export const countdownAttributesName = {
    type: "countdownType",
    targetTime: "targetTime",
    endAction: "endAction",
    theme: "theme",
    unitDisplay: "unitDisplay",
    block: "block",
};

export const countdownTypeOptions = [
    {
        value: "fixed",
        label: __("Fixed", "poptics"),
    },
    {
        value: "evergreen",
        label: __("Ever Green", "poptics"),
    },
];

export const countdownEndActions = [
    {
        value: "noAction",
        label: __("No Action", "poptics"),
    },
    {
        value: "hideTimer",
        label: __("Hide Timer", "poptics"),
    },
    {
        value: "showMessage",
        label: __("Show Message", "poptics"),
    },
];
export const countdownThemeOptions = [
    {
        value: "default",
        label: __("Default", "poptics"),
    },
    {
        value: "circledBackground",
        label: __("Circled Background", "poptics"),
    },
    {
        value: "rectangleBackground",
        label: __("Rectangle Background", "poptics"),
    },
];

export const countDownAttributes = {
    [countdownAttributesName.type]: {
        type: "select",
        default: "fixed",
        options: countdownTypeOptions,
    },
    [countdownAttributesName.targetTime]: {
        type: "string",
        default: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    [countdownAttributesName.endAction]: {
        type: "select",
        default: "noAction",
        options: countdownEndActions,
    },
    [countdownAttributesName.theme]: {
        type: "select",
        default: "default",
        options: countdownThemeOptions,
    },

    [countdownAttributesName.unitDisplay]: {
        type: "object",
        default: {
            showDays: true,
            daysLabel: __("days", "poptics"),
            showHours: true,
            hoursLabel: __("hours", "poptics"),
            showMinutes: true,
            minutesLabel: __("mints", "poptics"),
            showSeconds: true,
            secondsLabel: __("secs", "poptics"),
            enableSeparator: false,
        },
    },
    [countdownAttributesName.block]: {
        type: "object",
        default: {
            contentPosition: "center",
            padding: "0px 0px 0px 0px",
            margin: "0px 0px 0px 0px",
            backgroundColor: "#fffff",
        },
    },
};

const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    label: i,
    value: i,
}));
const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i,
    value: i,
}));
const secondOptions = Array.from({ length: 60 }, (_, i) => ({
    label: i,
    value: i,
}));

export const customTimeOptions = [
    { label: __("Days", "poptics"), options: "" },
    { label: __("Hours", "poptics"), options: hourOptions },
    { label: __("Minutes", "poptics"), options: minuteOptions },
    { label: __("Seconds", "poptics"), options: secondOptions },
];

export const timeZoneOptions = Object.keys(timezoneToCountry).map((tZone) => ({
    label: tZone,
    value: tZone,
}));

export const getTimeDifference = (
    timeStampDifference,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    daysLabel,
    hoursLabel,
    minutesLabel,
    secondsLabel,
) => {
    let remainingTime = timeStampDifference;
    let result = {};
    if (showDays) {
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        remainingTime %= 1000 * 60 * 60 * 24;
        result[daysLabel || "days"] = days;
    }

    if (showHours) {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        remainingTime %= 1000 * 60 * 60;
        result[hoursLabel || "hours"] = hours;
    }

    if (showMinutes) {
        const minutes = Math.floor(remainingTime / (1000 * 60));
        result[minutesLabel || "minutes"] = minutes;
        remainingTime %= 1000 * 60;
    }

    if (showSeconds) {
        const seconds = Math.floor(remainingTime / 1000);
        remainingTime %= 1000;
        result[secondsLabel || "seconds"] = seconds;
    } else if (!showDays && !showHours && !showMinutes) {
        const seconds = Math.floor(remainingTime / 1000);
        result[secondsLabel || "seconds"] = seconds;
    }

    return result;
};
