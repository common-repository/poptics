/** * WordPress Dependencies */
import { useState } from "@wordpress/element";
import { Flex } from "antd";

import { Text } from "../../../common/components";
import { getFiltersItems } from "./constant";
import useSubmissionsApi from "./hooks/useSubmissionAPI";

const { __ } = wp.i18n;

const KeyFilters = () => {
    const [active, setActive] = useState(1);
    const { getAllSubmissionsByFiltering } = useSubmissionsApi();

    const onClickHandle = (filterItem) => {
        setActive(filterItem.index);
        getAllSubmissionsByFiltering({ status: filterItem.filterKey });
    };

    return (
        <Flex className="pt-entries-status-filter-container" gap={"middle"}>
            {getFiltersItems().map((item) => (
                <Flex
                    onClick={() => onClickHandle(item)}
                    key={item.index}
                    className={`pt-entries-key-filters-container`}
                    gap={"small"}
                >
                    <Text
                        className={` ${
                            item.index === active &&
                            "pt-entries-key-filter-active"
                        }`}
                        text={item.label}
                    />
                    <Text
                        className="pt-entries-key-filters-value"
                        text={`${item.value}+`}
                    />
                </Flex>
            ))}
        </Flex>
    );
};

export default KeyFilters;
