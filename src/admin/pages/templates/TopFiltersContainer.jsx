import { useContext } from "@wordpress/element";
import { Flex } from "antd";
import { Text, SelectInput } from "../../../common/components";
import { TemplateContext } from "./withTemplateData";

import FilterByText from "../../components/FilterByText";
import FilterItemContainer from "./FilterItemContainer";
import { dropDownTemplatesFilterOptions, filter } from "./constant";
const { __ } = wp.i18n;

const TopFiltersContainer = () => {
    const templateStates = useContext(TemplateContext);
    const {
        selectedTypes,
        selectedGoals,
        selectedEvents,
        setTemplateStates,
        goals,
        types,
        events,
    } = templateStates;

    return (
        <Flex
            wrap
            className="pt-templates-top-filter-container"
            justify="space-between"
            align="start"
            gap={"middle"}
        >
            {/* checkbox filters */}
            <Flex
                className="pt-templates-checkbox-filter-container"
                vertical
                gap="small"
            >
                <Text
                    text={__("Previously Used", "poptics")}
                    className="pt-template-card-group-container-title"
                />

                {/* popup type filters */}
                {selectedTypes?.length !== 0 ? (
                    <Flex wrap gap={"small"} align="center">
                        <Text
                            className="pt-templates-top-filter-key-text"
                            text={__("Popup Type: ", "poptics")}
                        />

                        {selectedTypes?.map((selType) => (
                            <FilterItemContainer
                                item={{
                                    type: "popupTypes",
                                    value: types.find(
                                        (type) => type.term_id === selType,
                                    ),
                                }}
                            />
                        ))}

                        {selectedTypes?.length !== 0 && (
                            <Text
                                text={__("Clear All", "poptics")}
                                ellipsis={{ tooltip: "Clear All" }}
                                onClick={() =>
                                    setTemplateStates((prevStates) => {
                                        return {
                                            ...prevStates,
                                            selectedTypes: [],
                                        };
                                    })
                                }
                                className="pt-templates-top-filter-clear-text"
                            />
                        )}
                    </Flex>
                ) : null}

                {/* goal filters */}
                {selectedGoals?.length !== 0 ? (
                    <Flex wrap gap={"small"} align="center">
                        <Text
                            className="pt-templates-top-filter-key-text"
                            text={__("Goal: ", "poptics")}
                        />

                        {selectedGoals?.map((selGoal) => (
                            <FilterItemContainer
                                item={{
                                    type: "goal",
                                    value: goals.find(
                                        (goal) => goal.term_id === selGoal,
                                    ),
                                }}
                            />
                        ))}

                        {selectedGoals?.length !== 0 && (
                            <Text
                                ellipsis={{ tooltip: "Clear All" }}
                                text={__("Clear All", "poptics")}
                                onClick={() =>
                                    setTemplateStates((prevStates) => {
                                        return {
                                            ...prevStates,
                                            selectedGoals: [],
                                        };
                                    })
                                }
                                className="pt-templates-top-filter-clear-text"
                            />
                        )}
                    </Flex>
                ) : null}

                {/* event filters */}

                {selectedEvents?.length !== 0 ? (
                    <Flex wrap gap={"small"} align="center">
                        <Text
                            className="pt-templates-top-filter-key-text"
                            text={__("Event: ", "poptics")}
                        />

                        {selectedEvents?.map((selEvent) => (
                            <FilterItemContainer
                                item={{
                                    type: filter.event,
                                    value: events.find(
                                        (event) => event.term_id === selEvent,
                                    ),
                                }}
                            />
                        ))}

                        {selectedEvents?.length !== 0 && (
                            <Text
                                ellipsis={{ tooltip: "Clear All" }}
                                text={__("Clear All", "poptics")}
                                onClick={() =>
                                    setTemplateStates((prevStates) => {
                                        /-*/;
                                        return {
                                            ...prevStates,
                                            selectedEvents: [],
                                        };
                                    })
                                }
                                className="pt-templates-top-filter-clear-text"
                            />
                        )}
                    </Flex>
                ) : null}
            </Flex>

            {/* dropdown filters 
            <Flex gap={"small"} align="center">
                <FilterByText />
                <SelectInput
                    placeholder={__("Popup Type", "poptics")}
                    options={dropDownTemplatesFilterOptions}
                    size="large"
                />
            </Flex>
            */}
        </Flex>
    );
};

export default TopFiltersContainer;
