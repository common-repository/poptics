const { __ } = wp.i18n;
import { DBIcon, NoticeIcon } from "../../../common/icons";

const { site_url } = window?.poptics;

export const welcomeText = __(
    "Take your website to the next level with cutting-edge templates, a drag-and-drop editor, AI copywriting, advanced targeting, performance reporting, and more.",
    "poptics",
);

export const welcomeItems = [
    {
        name: "business_name",
        placeholder: __("Business Name", "poptics"),
        className: "pt-onboard-input-item",
    },
    {
        name: "email",
        placeholder: __("Email", "poptics"),
        className: "pt-onboard-input-item",
        type: "email",
    },
    {
        name: "installed_inside",
        placeholder: site_url,
        className: "pt-onboard-input-item",
        disabled: true,
    },
];

export const usePurposeItems = [
    {
        title: __("what type of site you want to use it", "poptics"),
        name: "type_of_using_sites",
        checkBoxItems: [
            __("Blog", "poptics"),
            __("eCommerce", "poptics"),
            __("Earning", "poptics"),
            __("Others", "poptics"),
        ],
    },
    {
        title: __("why you use poptics", "poptics"),
        name: "reasons_of_using_poptics",
        checkBoxItems: [
            __("Show Offer", "poptics"),
            __("Increase Social Media Following", "poptics"),
            __("Abandon Car", "poptics"),
            __("Others", "poptics"),
        ],
    },
];

export const permissionCardItems = [
    {
        icon: <NoticeIcon />,
        name: "receive_notices",
        title: __("receive notices", "poptics"),
        descriptions: __(
            "Updates, announcements, and relevant marketing messages. NO SPAM! You can unsubscribe at any time.",
            "poptics",
        ),
    },
    {
        icon: <DBIcon />,
        name: "data_management",
        title: __("data management", "poptics"),
        descriptions: __(
            "Poptics is GDPR-compliant. You can always remove your data from our database. Your information will never be shared.",
            "poptics",
        ),
    },
];

export const permissionDescription = __(
    "Note: We take privacy and transparency very seriously. To learn more about what data we collect how we use it visit our",
    "poptics",
);
