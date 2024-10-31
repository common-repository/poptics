/**
 * Wordpress Dependencies
 */
import { useContext, useState } from "@wordpress/element";
import { Button, Pagination, Table } from "./../../../common/components";
import { Row, Space, App } from "antd";
import { pagination } from "./../../../globalConstant";
import { Fragment } from "@wordpress/element";
import PaginationBtn from "./../../components/PaginationBtn";
import TableContentCount from "./../../components/TableContentCount";
import EntriesTableHeader from "./EntriesTableHeader";
import { SubmissionsContext } from "./withSubmissionsData";
import useSubmissionsApi from "./hooks/useSubmissionAPI";

const { __ } = wp.i18n;

export const EntriesTable = () => {
    const { submissionsList, searchQuery, queryTotal } =
        useContext(SubmissionsContext);
    const { per_page, paged } = searchQuery;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getAllSubmissionsByFiltering, bulkDeleteSubmission } =
        useSubmissionsApi();

    const { modal } = App.useApp();
    const { columns } = EntriesTableHeader();
    const { pageSizeOptions } = pagination;

    const onPaginationChange = (paged, per_page) => {
        getAllSubmissionsByFiltering({ paged, per_page });
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
        await bulkDeleteSubmission(selectedRowKeys);
        setSelectedRowKeys([]);
        setLoading(false);
    };
    return (
        <Fragment>
            {selectedRowKeys.length > 0 ? (
                <Space className="pt-bulk-delete">
                    <Button
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
                dataSource={submissionsList}
                rowKey={(record) => {
                    return record?.id;
                }}
                scroll={{ y: "calc(100vh - 250px)", x: 640 }}
                pagination={false}
                className="pt-campaign-table"
            />
            <Row justify="space-between" gutter={[0, 15]}>
                <TableContentCount
                    per_page={per_page}
                    paged={paged}
                    total={queryTotal}
                />

                <Pagination
                    defaultPageSize={per_page}
                    showSizeChanger={true}
                    onChange={onPaginationChange}
                    total={queryTotal}
                    itemRender={PaginationBtn}
                    pageSizeOptions={pageSizeOptions}
                />
            </Row>
        </Fragment>
    );
};
