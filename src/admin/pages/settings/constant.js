import Advanced from "./tabs/Advanced";
import Data from "./tabs/Data";

const { __ } = wp.i18n;

export const storagePeriodItems = [
    {
        value: "1_year",
        label: __("1 Year", "poptics"),
    },
    {
        value: "2_years",
        label: __("2 Years", "poptics"),
    },
    {
        value: "5_years",
        label: __("5 Years", "poptics"),
    },
    {
        value: "forever",
        label: __("Keep Forever", "poptics"),
    },
];

export const tabItems = [
    {
        name: __("Advanced", "poptics"),
        form: <Advanced />,
    },
    {
        name: __("Data", "poptics"),
        form: <Data />,
    },
];
