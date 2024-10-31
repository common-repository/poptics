import { Table as AntdTable } from "antd";

const Table = (props) => {
    const { scroll = {}, data = [], columns = [], ...rest } = props;
    return (
        <AntdTable
            columns={columns}
            dataSource={data}
            scroll={scroll}
            sticky
            {...rest}
        />
    );
};
export default Table;
