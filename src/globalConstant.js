import dayjs from "dayjs";

// Current date and time in 12-hour format with AM/PM
const currentDateTime = dayjs().format("MMMM D, YYYY h:mm A"); // Example: September 17, 2024 5:30 PM

// Date-time after 1 year from now
const dateTimeNextYear = dayjs().add(1, "year").format("MMMM D, YYYY h:mm A");

const { __ } = wp.i18n;

export const pagination = {
    pageSizeOptions: ["10", "20", "50", "100"],
    paged: 1,
    per_page: 20,
};

export const controls = {
    page_target: {
        show_in: { value: "all_pages" },
    },
    audience: {
        geo_target: { value: "all_locations" },
        //language_target: { value: "all_languages" },
        device_target: { value: "all_devices" },
        //operating_system_target: { value: "all_operating_systems" },
        //browser_target: { value: "all_browsers" },
    },
    user_behave: {
        page_load: { value: true },
    },
    frequency_settings: {
        display_frequency: {
            value: "every_page_view",
        },
    },
    schedule: {
        fixed: [
            {
                duration: { 0: currentDateTime, 1: dateTimeNextYear },
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        ],
    },
};

export const taxonomy = {
    goal: "poptics-campaign-goal",
    type: "poptics-campaign-type",
    event: "poptics-campaign-event",
};

export const defaultDesktopBlock = [
    {
        clientId: "56f09ac5-f1ed-4b72-bc82-22e149a7b4bd",
        name: "poptics/style-settings",
        isValid: true,
        attributes: {
            generalSettings: {
                popupHeight: "auto",
                popupWidth: "500px",
                closeIconPosition: {
                    top: 5,
                    right: 3,
                },
                closeIconStyle: "icon-close-outline",
                closeIconColor: "#000000",
                fontSize: "16px",
                contentPosition: { x: 0.5, y: 0.5 },
                clickable: {
                    enabled: false,
                    action: "link",
                },
            },
            bodyStyling: {
                borderRadius: "0px 0px 0px 0px",
                padding: "20px 20px 20px 20px",
                background: {
                    type: "color",
                    types: { color: "#ffffff", image: "", video: "" },
                    focalPoint: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                positionType: "fixed",
            },
            overlaySettings: {
                enable: false,
                backgroundColor: "#00000045",
                closePopupOnClick: false,
            },
            lock: {
                remove: true,
                move: true,
            },
        },
        innerBlocks: [],
    },
];

export const defaultMobileBlock = [
    {
        clientId: "56f09ac5-f1ed-4b72-bc82-22e149a7b4bd",
        name: "poptics/style-settings",
        isValid: true,
        attributes: {
            generalSettings: {
                popupHeight: "auto",
                popupWidth: "100%",
                closeIconPosition: {
                    top: 0,
                    right: 0,
                },
                closeIconStyle: "icon-close-outline",
                closeIconColor: "#000000",
                fontSize: "16px",
                contentPosition: { x: 0.5, y: 0 },
                clickable: {
                    enabled: false,
                    action: "link",
                },
            },
            bodyStyling: {
                borderRadius: "0px 0px 0px 0px",
                padding: "10px 10px 10px 10px",
                background: {
                    type: "color",
                    types: { color: "#ffffff", image: "", video: "" },
                    focalPoint: {
                        x: 0.5,
                        y: 0.5,
                    },
                },
                positionType: "fixed",
            },
            overlaySettings: {
                enable: false,
                backgroundColor: "#00000045",
                closePopupOnClick: false,
            },
            lock: {
                remove: true,
                move: true,
            },
        },
        innerBlocks: [],
    },
];

export const defaultStep = [
    {
        name: __("Main", "poptics"),
        desktop: { content: defaultDesktopBlock },
        mobile: { content: defaultMobileBlock },
    },
];

export const defaultSettings = {
    advanced: { maximum_storage_period: "2_years" },
    data: { keep_data_on_uninstall: true },
};

export const timezoneToCountry = {
    "Pacific/Midway": "United States",
    "Pacific/Pago_Pago": "American Samoa",
    "Pacific/Honolulu": "United States",
    "America/Juneau": "United States",
    "America/Los_Angeles": "United States",
    "America/Tijuana": "Mexico",
    "America/Denver": "United States",
    "America/Phoenix": "United States",
    "America/Chihuahua": "Mexico",
    "America/Mazatlan": "Mexico",
    "America/Chicago": "United States",
    "America/Regina": "Canada",
    "America/Mexico_City": "Mexico",
    "America/Monterrey": "Mexico",
    "America/Guatemala": "Guatemala",
    "America/New_York": "United States",
    "America/Indiana/Indianapolis": "United States",
    "America/Bogota": "Colombia",
    "America/Lima": "Peru",
    "America/Lima": "Ecuador",
    "America/Halifax": "Canada",
    "America/Caracas": "Venezuela",
    "America/La_Paz": "Bolivia",
    "America/Santiago": "Chile",
    "America/St_Johns": "Canada",
    "America/Sao_Paulo": "Brazil",
    "America/Argentina/Buenos_Aires": "Argentina",
    "America/Guyana": "Guyana",
    "America/Godthab": "Greenland",
    "Atlantic/South_Georgia": "South Georgia and the South Sandwich Islands",
    "Atlantic/Azores": "Portugal",
    "Atlantic/Cape_Verde": "Cape Verde",
    "Europe/Dublin": "Ireland",
    "Europe/Lisbon": "Portugal",
    "Europe/London": "United Kingdom",
    "Europe/Amsterdam": "Netherlands",
    "Europe/Belgrade": "Serbia",
    "Europe/Berlin": "Germany",
    "Europe/Bratislava": "Slovakia",
    "Europe/Brussels": "Belgium",
    "Europe/Budapest": "Hungary",
    "Europe/Copenhagen": "Denmark",
    "Europe/Ljubljana": "Slovenia",
    "Europe/Madrid": "Spain",
    "Europe/Paris": "France",
    "Europe/Prague": "Czech Republic",
    "Europe/Rome": "Italy",
    "Europe/Sarajevo": "Bosnia and Herzegovina",
    "Europe/Skopje": "North Macedonia",
    "Europe/Stockholm": "Sweden",
    "Europe/Vienna": "Austria",
    "Europe/Warsaw": "Poland",
    "Europe/Zagreb": "Croatia",
    "Europe/Athens": "Greece",
    "Europe/Bucharest": "Romania",
    "Africa/Cairo": "Egypt",
    "Africa/Harare": "Zimbabwe",
    "Europe/Helsinki": "Finland",
    "Europe/Istanbul": "Turkey",
    "Asia/Jerusalem": "Israel",
    "Europe/Kiev": "Ukraine",
    "Europe/Minsk": "Belarus",
    "Europe/Riga": "Latvia",
    "Europe/Sofia": "Bulgaria",
    "Europe/Tallinn": "Estonia",
    "Europe/Vilnius": "Lithuania",
    "Asia/Baghdad": "Iraq",
    "Asia/Kuwait": "Kuwait",
    "Asia/Riyadh": "Saudi Arabia",
    "Africa/Nairobi": "Kenya",
    "Asia/Tehran": "Iran",
    "Asia/Muscat": "Oman",
    "Asia/Baku": "Azerbaijan",
    "Asia/Tbilisi": "Georgia",
    "Asia/Yerevan": "Armenia",
    "Asia/Kabul": "Afghanistan",
    "Asia/Yekaterinburg": "Russia",
    "Asia/Karachi": "Pakistan",
    "Asia/Tashkent": "Uzbekistan",
    "Asia/Kolkata": "India",
    "Asia/Kathmandu": "Nepal",
    "Asia/Almaty": "Kazakhstan",
    "Asia/Dhaka": "Bangladesh",
    "Asia/Colombo": "Sri Lanka",
    "Asia/Rangoon": "Myanmar",
    "Asia/Bangkok": "Thailand",
    "Asia/Jakarta": "Indonesia",
    "Asia/Novosibirsk": "Russia",
    "Asia/Shanghai": "China",
    "Asia/Chongqing": "China",
    "Asia/Hong_Kong": "Hong Kong",
    "Asia/Urumqi": "China",
    "Asia/Kuala_Lumpur": "Malaysia",
    "Asia/Singapore": "Singapore",
    "Asia/Taipei": "Taiwan",
    "Australia/Perth": "Australia",
    "Asia/Irkutsk": "Russia",
    "Asia/Ulaanbaatar": "Mongolia",
    "Asia/Seoul": "South Korea",
    "Asia/Tokyo": "Japan",
    "Asia/Yakutsk": "Russia",
    "Australia/Darwin": "Australia",
    "Australia/Adelaide": "Australia",
    "Australia/Sydney": "Australia",
    "Australia/Brisbane": "Australia",
    "Australia/Hobart": "Australia",
    "Asia/Vladivostok": "Russia",
    "Pacific/Guam": "Guam",
    "Asia/Magadan": "Russia",
    "Pacific/Noumea": "New Caledonia",
    "Pacific/Fiji": "Fiji",
    "Asia/Kamchatka": "Russia",
    "Pacific/Majuro": "Marshall Islands",
    "Pacific/Auckland": "New Zealand",
    "Pacific/Tongatapu": "Tonga",
};

export const getTimezoneList = () => {
    if (!Intl.supportedValuesOf) {
        return [
            {
                label: __(
                    "Your browser does not support Intl.supportedValuesOf()",
                    "poptics",
                ),
                value: null,
            },
        ];
    } else {
        const options = [];
        for (const timeZone of Intl.supportedValuesOf("timeZone")) {
            options.push({
                label: timeZone,
                value: timeZone,
            });
        }
        return options;
    }
};
