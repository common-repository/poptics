import { useState } from "@wordpress/element";
import ItemContainer from "./ItemContainer";
import { Button, Table } from "../../../common/components";
import { Col, Popover } from "antd";
import TableColumns from "./TableColumns";
import { ArrowUpOutlined } from "@ant-design/icons";
const { __ } = wp.i18n;
const ProTable = ({ tableData }) => {
    const [hovered, setHovered] = useState(false);

    const handleHoverChange = (open) => {
        setHovered(open);
    };

    const hoverContent = (
        <div className="pt-upgrade-tooltip-content">
            {__(
                `Upgrade to Poptics PRO to Unlock ${tableData.title}  Statistics and get valuable insights!`,
                "poptics",
            )}
        </div>
    );
    return (
        <Col xs={24} xl={8} key={tableData.title}>
            <ItemContainer
                title={tableData.title}
                item={
                    <div className="pt-analytics-table-container">
                        <div className="pt-analytics-table-mask">
                            <Table
                                columns={TableColumns(tableData.tableHeader)}
                                className="pt-analytics-disabled-table"
                                dataSource={[]}
                                pagination={false}
                            />

                            <Popover
                                content={hoverContent}
                                trigger="hover"
                                open={hovered}
                                onOpenChange={handleHoverChange}
                            >
                                <Button
                                    aria-label={__("upgrade button", "poptics")}
                                    type="primary"
                                    icon={<ArrowUpOutlined />}
                                    className="pt-table-pro-button"
                                >
                                    {__("Upgrade", "poptics")}
                                </Button>
                            </Popover>
                        </div>
                    </div>
                }
            />
        </Col>
    );
};

export default ProTable;
