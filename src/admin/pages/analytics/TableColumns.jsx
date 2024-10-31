import { Flex } from "antd";
import { Text } from "./../../../common/components";

const { __ } = wp.i18n;

const TableColumns = (props) => {
    const { typeOfHeading = "icon", title } = props;
    const columns = {
        textOnly: [
            {
                title: title,
                dataIndex: "item",
                key: "item",
                render: ({ name = "" }) => {
                    return (
                        <Flex gap="small" align="center">
                            <Text text={name} strong />
                        </Flex>
                    );
                },
                fixed: "left",
                width: 80,
            },
            {
                title: __("View", "poptics"),
                dataIndex: "views",
                key: "views",
                width: 70,
            },
            {
                title: __("Conversion", "poptics"),
                dataIndex: "conversions",
                key: "conversions",
                width: 90,
            },
        ],
        icon: [
            {
                title: title,
                dataIndex: "item",
                key: "item",
                render: ({ name = "", icon }) => {
                    return (
                        <Flex gap="small" align="center">
                            {icon || null}
                            <Text text={name} strong />
                        </Flex>
                    );
                },
                fixed: "left",
                width: 80,
            },
            {
                title: __("views", "poptics"),
                dataIndex: "views",
                key: "view",
                width: 70,
            },
            {
                title: __("Conversion", "poptics"),
                dataIndex: "conversions",
                key: "conversions",
                width: 90,
            },
        ],
    };
    return columns[typeOfHeading];
};

export default TableColumns;
