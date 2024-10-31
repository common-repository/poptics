import { Badge, Title } from "../../../../common/components";
import { CategoryInfo } from "../../../components/CategoryInfo";
import CampaignActions from "./CampaignActions";
import { mapClassNameToStatus } from "../constant";
import { Link } from "react-router-dom";

const { __ } = wp.i18n;

function TableHeader() {
    const columns = [
        {
            title: __("Popups", "poptics"),
            dataIndex: "name",
            key: "name",
            render: (_, record) => (
                <Link to={`/campaign/${record?.id}/update`}>
                    <Title level={5} text={record?.name} />
                </Link>
            ),
            width: window.innerWidth <= 1200 && 300,
            fixed: "left",
        },
        {
            title: __("Type", "poptics"),
            dataIndex: "type",
            key: "type",
            render: (_, record) => <CategoryInfo type={record.type} />,
        },
        {
            title: __("Views", "poptics"),
            dataIndex: "analytics_details",
            key: "total_views",
            render: (_, record) => record?.analytics_details?.total_views || 0,
            sorter: (a, b) =>
                (a?.analytics_details?.total_views || 0) -
                (b?.analytics_details?.total_views || 0),
        },
        {
            title: __("Conversion", "poptics"),
            dataIndex: "analytics_details",
            key: "total_conversions",
            render: (_, record) =>
                record?.analytics_details?.total_conversions || 0,
            sorter: (a, b) =>
                (a?.analytics_details?.total_conversions || 0) -
                (b?.analytics_details?.total_conversions || 0),
        },
        {
            title: __("Conversion Rate", "poptics"),
            dataIndex: "analytics_details",
            key: "total_conversion_rate",
            render: (_, record) =>
                parseFloat(
                    record?.analytics_details?.total_conversion_rate.toFixed(2),
                ) || 0,
            sorter: (a, b) =>
                (a?.analytics_details?.total_conversion_rate || 0) -
                (b?.analytics_details?.total_conversion_rate || 0),
        },
        {
            title: __("Status", "poptics"),
            dataIndex: "status",
            key: "status",
            render: (_, record) => {
                const status = record?.status;
                return (
                    <Badge
                        count={status}
                        className={`pt-campaign-status-badge ${mapClassNameToStatus[status]}`}
                    />
                );
            },
        },
        {
            title: __("Actions", "poptics"),
            key: "action",
            align: "right",
            render: (_, record) => <CampaignActions record={record} />,
        },
    ];

    return { columns };
}

export default TableHeader;
