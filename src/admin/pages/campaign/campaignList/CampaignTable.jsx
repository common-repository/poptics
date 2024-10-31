/**
 * Wordpress Dependencies
 */
import { useContext, useState } from "@wordpress/element";

import TableHeader from "./TableHeader";
import PaginationBtn from "../../../components/PaginationBtn";
import { Button, Pagination, Table } from "../../../../common/components";
import { Row, Space, App } from "antd";
import useCampaignApi from "./hooks/useCampaignApi";
import { pagination } from "../../../../globalConstant";
import { CampaignContext } from "./withCampaignData";
import TableContentCount from "./../../../components/TableContentCount";

const { __ } = wp.i18n;

const CampaignTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getCampaigns, bulkDeleteCampaign } = useCampaignApi();

    const { modal } = App.useApp();
    const campaignStates = useContext(CampaignContext);
    const { searchQuery, campaignList, total } = campaignStates;

    const { per_page, paged } = searchQuery;

    const { columns } = TableHeader();
    const { pageSizeOptions } = pagination;

    const onPaginationChange = (paged, per_page) => {
        getCampaigns({ paged, per_page });
    };

    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleBulkDelete = async () => {
        setLoading(true);
        await bulkDeleteCampaign(selectedRowKeys);
        setSelectedRowKeys([]);
        setLoading(false);
    };

    return (
        <>
            {selectedRowKeys.length > 0 ? (
                <Space className="pt-bulk-delete">
                    <Button
                        aria-label={__("bulk delete button", "poptics")}
                        danger
                        onClick={() => {
                            modal.confirm({
                                title: __(
                                    "Are you sure delete selected staffs?",
                                    "poptics",
                                ),
                                okText: __("Yes", "poptics"),
                                okType: "danger",
                                cancelText: __("No", "poptics"),
                                onOk: () => handleBulkDelete(),
                            });
                        }}
                        text={__("Bulk Delete", "poptics")}
                        loading={loading}
                    />
                    {selectedRowKeys.length}
                    {__("items selected", "poptics")}
                </Space>
            ) : null}

            <Table
                rowSelection={{ ...rowSelection }}
                columns={columns}
                dataSource={campaignList}
                rowKey={(record) => {
                    return record?.id;
                }}
                {...(window.innerWidth <= 1200 && {
                    scroll: { y: "calc(100vh - 250px)", x: 1400 },
                })}
                pagination={false}
                className="pt-campaign-table"
                loading={!campaignList}
            />
            <Row justify="space-between" gutter={[0, 15]}>
                <TableContentCount
                    per_page={per_page}
                    paged={paged}
                    total={total}
                />
                <Pagination
                    defaultPageSize={per_page}
                    showSizeChanger={true}
                    onChange={onPaginationChange}
                    total={total}
                    itemRender={PaginationBtn}
                    pageSizeOptions={pageSizeOptions}
                />
            </Row>
        </>
    );
};

export default CampaignTable;
