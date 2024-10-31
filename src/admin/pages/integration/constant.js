/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { FluentCRMIcon, FluentCRMLogo } from "../../../common/icons";
import { AdminContext } from "../../withAdminData";

const { __ } = wp.i18n;

export const cardInterface = {
    id: 0,
    title: "",
    icon: <FluentCRMIcon />,
    description: "",
    logo: <FluentCRMLogo />,
    storedValue: {},
    isPro: false,
    isConnected: false,
    formItem: [
        {
            formItemProps: {},
            inputProps: {},
        },
    ],
};

const commonDescription = __(
    "To Get Started please create your first prospect list & outreach some",
    "poptics",
);

// function for getting all integration cards as array
export const getIntegrationCards = ({ searchKey }) => {
    const { settings } = useContext(AdminContext);

    if (!settings) return [];

    const { fluent_crm } = settings;

    return [
        {
            id: 1,
            key: "fluent_crm",
            title: __("FluentCRM", "poptics"),
            icon: <FluentCRMIcon />,
            logo: <FluentCRMLogo />,
            description: commonDescription,
            isPro: false,
            storedValue: fluent_crm,
            isConnected: Object.keys(fluent_crm || {}).length !== 0,
            formItem: [
                {
                    formItemProps: {
                        name: ["fluent_crm", "web_hook"],
                        label: __("FluentCRM WebHook", "poptics"),
                        type: "text",
                        required: true,
                    },
                    inputProps: {
                        placeholder: __("Enter WebHook", "poptics"),
                        type: "url",
                        required: true,
                    },
                },
            ],
        },
    ].filter((cardItem) =>
        cardItem.title.toLowerCase().includes(searchKey.toLowerCase()),
    );
};
