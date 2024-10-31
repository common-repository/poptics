import { Select } from "antd";

const SelectInput = (props) => {
    return (
        <label className="pt-select-input-label">
            <Select {...props} />
        </label>
    );
};

export default SelectInput;
