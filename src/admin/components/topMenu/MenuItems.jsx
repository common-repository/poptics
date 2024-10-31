/**
 * Wordpress Dependencies
 */
const { __ } = wp.i18n;

import {
    ChartIcon,
    CreditCardIcon,
    EntriesIcon,
    IntegrationIcon,
    SendIcon,
    SettingsIcon,
    TemplateIcon,
} from "../../../common/icons";
import {
    ABTESTING_PATH,
    ANALYTICS_PATH,
    CAMPAIGN_PATH,
    INTEGRATION_PATH,
    SETTINGS_PATH,
    SUBMISSIONS_PATH,
    TEMPLATES_PATH,
} from "../../router/routeDefinition";
import DocBtn from "./DocBtn";

export const items = [
    {
        label: __("Popup Campaign", "poptics"),
        key: CAMPAIGN_PATH,
        icon: <SendIcon />,
    },
    {
        label: __("A/B Testing", "poptics"),
        key: ABTESTING_PATH,
        icon: <CreditCardIcon />,
    },
    {
        label: __("Analytics", "poptics"),
        key: ANALYTICS_PATH,
        icon: <ChartIcon />,
    },
    {
        label: __("Templates", "poptics"),
        key: TEMPLATES_PATH,
        icon: <TemplateIcon />,
    },
    {
        label: __("Submissions", "poptics"),
        key: SUBMISSIONS_PATH,
        icon: <EntriesIcon />,
    },
    {
        label: __("Integrations", "poptics"),
        key: INTEGRATION_PATH,
        icon: <IntegrationIcon />,
    },
    {
        label: __("Settings", "poptics"),
        key: SETTINGS_PATH,
        icon: <SettingsIcon />,
    },
    {
        label: <DocBtn />,
        key: "",
        disabled: true,
    },
];
