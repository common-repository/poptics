import { Text } from "../../common/components";
import { ListFilterIcon } from "../../common/icons";

const { __ } = wp.i18n;

const FilterByText = () => {
    return (
        <div className="pt-filter-by">
            <ListFilterIcon />
            <Text text={__("Filter By", "poptics")} />
        </div>
    );
};

export default FilterByText;
