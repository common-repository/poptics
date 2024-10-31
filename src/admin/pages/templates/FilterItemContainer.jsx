import { useContext } from "@wordpress/element";
import { FilterCrossIcon } from "./../../../common/icons";
import { TemplateContext } from "./withTemplateData";
import { Flex } from "antd";
import { Text } from "../../../common/components";
import { filter } from "./constant";

const FilterItemContainer = ({ item }) => {
    const { setTemplateStates } = useContext(TemplateContext);

    const onFilterDelete = () => {
        if (item?.type === filter.type) {
            setTemplateStates((prevStates) => {
                return {
                    ...prevStates,
                    selectedTypes: prevStates?.selectedTypes?.filter(
                        (prevType) => prevType !== item?.value?.term_id,
                    ),
                };
            });
        } else if (item?.type === filter.goal) {
            setTemplateStates((prevStates) => {
                return {
                    ...prevStates,
                    selectedGoals: prevStates?.selectedGoals?.filter(
                        (prevGoal) => prevGoal !== item?.value?.term_id,
                    ),
                };
            });
        } else if (item?.type === filter.event) {
            setTemplateStates((prevStates) => {
                return {
                    ...prevStates,
                    selectedEvents: prevStates?.selectedEvents?.filter(
                        (prevEvent) => prevEvent !== item?.value?.term_id,
                    ),
                };
            });
        }
    };

    return (
        <Flex
            align="center"
            gap={"small"}
            onClick={onFilterDelete}
            className="pt-filter-item-container"
        >
            <Text
                ellipsis={{ tooltip: item?.value?.term_name }}
                text={item?.value?.term_name}
                className="pt-top-filter-text"
            />
            <FilterCrossIcon />
        </Flex>
    );
};

export default FilterItemContainer;
