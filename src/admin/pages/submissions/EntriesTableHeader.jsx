const { __ } = wp.i18n;

import EntriesActions from "./EntriesAction";

function EntriesTableHeader() {
    const columns = [
        {
            title: __("SN", "poptics"),
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            width: 30,
        },
        {
            title: __("EMAIL", "poptics"),
            dataIndex: "email",
            key: "email",
            width: 120,
        },
        {
            title: __("POPUP CAMPAIGN", "poptics"),
            dataIndex: "campaign_name",
            key: "campaign_name",
            width: 115,
        },
        {
            title: __("LOCATION", "poptics"),
            dataIndex: "location",
            key: "location",
            width: 95,
        },
        {
            title: __("DEVICE", "poptics"),
            dataIndex: "device",
            key: "device",
            width: 95,
        },
        {
            title: __("BROWSER", "poptics"),
            dataIndex: "browser",
            key: "browser",
            width: 95,
        },

        {
            title: "ACTIONS",
            key: "action",
            width: 90,
            align: "right",
            render: (_, record) => {
                return <EntriesActions record={record} />;
            },
        },
    ];
    return { columns };
}

export default EntriesTableHeader;
