import { Text } from "../../../common/components";
import {
    ChromeIcon,
    ConversionIcon,
    ConversionRateIcon,
    DesktopIcon,
    EdgeIcon,
    FireFoxIcon,
    MobileIcon,
    OthersDeviceIcon,
    SafariIcon,
    ViewsIcon,
    VisitorIcon,
} from "./../../../common/icons";
import { AnalyticsContext } from "./withAnalyticsData";
import { useContext } from "@wordpress/element";

const { __ } = wp.i18n;

// get the campaign from context and map in a format suitable for select input component
export const campaignsOptions = () => {
    const { campaignList } = useContext(AnalyticsContext);
    const mappedCampaignList = campaignList?.map((campaign) => {
        return { value: campaign?.id, label: campaign?.name };
    });

    mappedCampaignList?.unshift({
        label: __("All Campaign", "poptics"),
        value: "",
    });
    return mappedCampaignList;
};

// return the icon according to the name of the card
export const getCardViewDataWithIcon = () => {
    const { cardViewData } = useContext(AnalyticsContext);

    return cardViewData.map((cardData) => {
        let icon;
        switch (cardData.title.toLowerCase()) {
            case "visitor":
                icon = <VisitorIcon />;
                break;
            case "views":
                icon = <ViewsIcon />;
                break;
            case "conversion":
                icon = <ConversionIcon />;
                break;
            case "conversion rate":
                icon = <ConversionRateIcon />;
                break;
            default:
                icon = null;
        }

        return {
            ...cardData,
            icon: icon,
        };
    });
};

const fillColorsDesktop = {
    View: "#A0B7D6",
    Conversion: "#2563EB",
    Visitors: "#000000",
};

const fillColorsMobile = {
    View: "#B8D5C1",
    Conversion: "#16A34A",
    Visitors: "#000000",
};

const fillColorsOthers = {
    View: "#A0B7D6",
    Conversion: "#9333EA",
    Visitors: "#000000",
};

// add corresponding colors with pie data
export const transformPieData = (data, colors) => {
    return data.map((item) => ({
        ...item,
        fill: colors[item.name],
    }));
};

// return icon according to browser name
const getIcon = (browserName) => {
    switch (browserName) {
        case "Google Chrome":
            return <ChromeIcon />;
        case "Mozilla Firefox":
            return <FireFoxIcon />;
        case "Safari":
            return <SafariIcon />;
        case "Microsoft Edge":
            return <EdgeIcon />;
        default:
            return "";
    }
};

// map icon to browser table data
export const getBrowserWithIcon = (data) => {
    return data.map((browser) => {
        return {
            ...browser,
            item: {
                ...browser.item,
                icon: getIcon(browser.item.name),
            },
        };
    });
};

// return an array after mapping icon to pie data
export const getDevicePieData = () => {
    const { pieDataDesktop, pieDataOthers, pieDataMobile } =
        useContext(AnalyticsContext);

    return [
        {
            icon: DesktopIcon,
            text: __("Desktop", "poptics"),
            data: transformPieData(pieDataDesktop, fillColorsDesktop),
            backgroundColor: "#EFF6FF",
        },
        {
            icon: MobileIcon,
            text: __("Mobile", "poptics"),
            data: transformPieData(pieDataMobile, fillColorsMobile),
            backgroundColor: "#F0FDF4",
        },
        {
            icon: OthersDeviceIcon,
            text: __("Others", "poptics"),
            data: transformPieData(pieDataOthers, fillColorsOthers),
            backgroundColor: "#FAF5FF",
        },
    ];
};

// possible time span for campaign analytics
export const timeSpanValue = {
    monthly: "monthly",
    weekly: "weekly",
    lastWeek: "lastWeek",
    lastMonth: "lastMonth",
    lastYear: "lastYear",
    yearly: "yearly",
    custom: "custom",
};

/**
 * Generates a formatted date range string based on the specified time span.
 *
 * @param {string} timeSpan - The time span for which to generate the date range.
 *                            Possible values are 'monthly', 'weekly', 'lastWeek',
 *                            'lastMonth', 'yearly', 'lastYear', and 'custom'.
 * @param {Date|string} startDate - The start date for the custom time span.
 *                                  Ignored for predefined time spans.
 * @param {Date|string} endDate - The end date for the custom time span.
 *                                Ignored for predefined time spans.
 * @returns {string} - A formatted date range string in the format 'YYYY-MM-DD~YYYY-MM-DD'.
 *
 * @example
 * // Returns the date range for the current month
 * getDateRange('monthly');
 *
 * @example
 * // Returns the date range for the last week
 * getDateRange('lastWeek');
 *
 * @example
 * // Returns a custom date range
 * getDateRange('custom', '2023-01-01', '2023-01-31');
 */

export const getDateRange = (timeSpan, startDate, endDate) => {
    const currentDate = new Date();

    // Get the current year and month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = currentDate.getDay();

    // set the start and end date according to the timeSpan
    switch (timeSpan) {
        case timeSpanValue.monthly:
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0);
            break;
        case timeSpanValue.weekly:
            // Calculate the difference to the previous Monday
            const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - diffToMonday);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            break;
        case timeSpanValue.lastWeek:
            endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() - currentDay - 1);
            startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 6);
            break;
        case timeSpanValue.lastMonth:
            // calculate the first date of the current month
            const firstDayCurrentMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1,
            );
            endDate = new Date(firstDayCurrentMonth);
            endDate.setDate(0);
            startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

            break;
        case timeSpanValue.yearly:
            startDate = new Date(year, 0, 1);
            endDate = new Date(year, 11, 31);
            break;
        case timeSpanValue.lastYear:
            const lastYear = year - 1;
            startDate = new Date(lastYear, 0, 1);
            endDate = new Date(lastYear, 11, 31);
            break;
        case timeSpanValue.custom:
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            break;
        default:
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0);
            break;
    }

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };

    const firstDateFormatted = new Intl.DateTimeFormat("en-CA", options).format(
        startDate,
    );
    const lastDateFormatted = new Intl.DateTimeFormat("en-CA", options).format(
        endDate,
    );

    return `${firstDateFormatted}~${lastDateFormatted}`;
};

/**
 * Parses a date range string and returns an array of formatted date or month names.
 *
 * @param {string} dateRange - The date range string in the format 'YYYY-MM-DD~YYYY-MM-DD'.
 *                             If an empty string is provided, the default date range is used.
 * @returns {string[]} - An array of formatted date or month names based on the date range.
 *
 * @example
 * // Returns an array of dates for the same month
 * parseDateRange('2023-01-01~2023-01-07');
 * // Output: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7']
 *
 * @example
 * // Returns an array of month names for different months in the same year
 * parseDateRange('2023-01-01~2023-03-31');
 * // Output: ['Jan', 'Feb', 'Mar']
 *
 * @example
 * // Returns an array of years for different years
 * parseDateRange('2022-01-01~2023-12-31');
 * // Output: ['2022', '2023']
 */

export const parseDateRange = (dateRange) => {
    dateRange = dateRange === "" ? getDateRange() : dateRange;
    const [start, end] = dateRange?.split("~").map((date) => new Date(date));
    const result = [];
    // if year is equal
    if (start.getFullYear() === end?.getFullYear()) {
        // if two months are equal then return date or return month
        if (start.getMonth() === end?.getMonth()) {
            const options = { day: "numeric", month: "short" };
            if (start.getDate() === end?.getDate()) {
                result.push(
                    new Intl.DateTimeFormat("en-US", options).format(
                        new Date(
                            start.getFullYear(),
                            start.getMonth(),
                            start.getDay(),
                        ),
                    ),
                );
            } else {
                for (let d = start.getDate(); d <= end.getDate(); d++) {
                    result.push(
                        new Intl.DateTimeFormat("en-US", options).format(
                            new Date(start.getFullYear(), start.getMonth(), d),
                        ),
                    );
                }
            }
        } else {
            // get the month name
            for (let m = start.getMonth(); m <= end.getMonth(); m++) {
                let month = new Date(0, m).toLocaleString("en-US", {
                    month: "short",
                });
                result.push(month); // Months are 0-indexed
            }
        }
    } else {
        for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
            result.push(y.toString());
        }
    }

    return result;
};

// possible time span items campaign analytics
export const timeSpanItems = [
    {
        label: (
            <Text
                text={__("This week", "poptics")}
                className="pt-analytics-dropdown-text"
            />
        ),
        value: getDateRange(timeSpanValue.weekly),
    },
    {
        label: (
            <Text
                text={__("Last Week", "poptics")}
                className="pt-analytics-dropdown-text"
            />
        ),
        value: getDateRange(timeSpanValue.lastWeek),
    },
    {
        label: (
            <Text
                text={__("This Month", "poptics")}
                className="pt-analytics-dropdown-text"
            />
        ),
        value: getDateRange(timeSpanValue.monthly),
    },
    {
        label: (
            <Text
                text={__("Last Month", "poptics")}
                className="pt-analytics-dropdown-text"
            />
        ),
        value: getDateRange(timeSpanValue.lastMonth),
    },
    {
        label: (
            <Text
                text={__("This Year", "poptics")}
                className="pt-analytics-dropdown-text"
            />
        ),
        value: getDateRange(timeSpanValue.yearly),
    },
    {
        label: (
            <Text
                text={__("Last Year", "poptics")}
                className="pt-analytics-dropdown-text"
            />
        ),
        value: getDateRange(timeSpanValue.lastYear),
    },
];

// get the period range for campaign if data is empty
export const getPeriodRange = () => {
    const { dateRange } = useContext(AnalyticsContext);
    return parseDateRange(dateRange).map((period) => ({
        period: period,
        impressions: "0",
        conversion: "0",
    }));
};

export const analyticsProTable = [
    {
        title: __("Top Country", "poptics"),
        tableHeader: {
            typeOfHeading: "textOnly",
            title: __("Countries", "poptics"),
        },
    },
    {
        title: __("Top Pages", "poptics"),
        tableHeader: {
            typeOfHeading: "icon",
            title: __("Pages", "poptics"),
        },
    },
    {
        title: __("Top Browsers", "poptics"),
        tableHeader: {
            typeOfHeading: "textOnly",
            title: __("Browsers", "poptics"),
        },
    },
];
