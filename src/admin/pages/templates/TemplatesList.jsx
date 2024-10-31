/**
 * WordPress Dependencies
 */
import { useContext, useState } from "@wordpress/element";

import { Col, Divider, Flex, Row } from "antd";
import { SelectInput, Title } from "../../../common/components";
import SearchInput from "../../components/SearchInput";
import LeftSidebar from "./LeftSidebar";
import TopFiltersContainer from "./TopFiltersContainer";
import { TemplateContext } from "./withTemplateData";
import TemplateCard from "./TemplateCard";
import CreateFromScrTemplate from "./CreateFromScrTemplate";
import FilterByText from "../../components/FilterByText";
import {
    dropDownTemplatesFilterOptions,
    dropDownTemplatesFilterValues,
} from "./constant";

import SingleTempModal from "./modals/SingleTempModal";
import CreateCampaignModal from "./modals/CreateCampaignModal";
import { taxonomy } from "../../../globalConstant";

const { __ } = wp.i18n;

const TemplatesList = () => {
    const templateStates = useContext(TemplateContext);
    const { templatesList, selectedGoals, selectedTypes, selectedEvents } =
        templateStates;
    const [templates, setTemplates] = useState(templatesList);

    // function to filter templatesList depend on selectInput filter
    const onSelectFilterChange = (filterValue) => {
        if (filterValue === dropDownTemplatesFilterValues.recommendation) {
            setTemplates(
                templatesList.filter((template) => {
                    return template.is_post_recommended;
                }),
            );
        } else if (filterValue === dropDownTemplatesFilterValues.new) {
            setTemplates(templatesList);
        } else if (filterValue === dropDownTemplatesFilterValues.popularity) {
            // create a shallow copy of the templatesList and sort
            let sortedList = [...templatesList]?.sort((a, b) => {
                // handle total_import empty values
                const aImport = parseInt(a.total_import);
                const bImport = parseInt(b.total_import);

                // If anyone is Not-a-Number (NaN), then we need to move it at the end of the array
                // If this callback return 1: This means that the first element (a) should come after the second element (b) and vice versa for returning -1.
                // So if (a) is NaN then we should return 1 and vice versa
                if (isNaN(aImport)) return 1;
                if (isNaN(bImport)) return -1;

                return bImport - aImport;
            });
            setTemplates(sortedList);
        }
    };

    // function to filter templates by goal and type
    const filterTemplates = (templates) => {
        // if no taxonomy are selected, return all templates
        if (
            !selectedGoals?.length &&
            !selectedTypes?.length &&
            !selectedEvents?.length
        ) {
            return templates;
        }

        // else, filter templates based on selected taxonomy
        return templates?.filter((template) => {
            return (
                selectedGoals.includes(
                    template?.taxonomy?.[taxonomy.goal]?.term_id,
                ) ||
                selectedTypes.includes(
                    template?.taxonomy?.[taxonomy.type]?.term_id,
                ) ||
                template?.taxonomy?.[taxonomy.event]?.some((event) =>
                    selectedEvents.includes(event?.term_id),
                )
            );
        });
    };

    return (
        <>
            {/*total page container */}
            <Row gutter={[0, 32]} justify="space-between" align="center">
                {/*top section */}

                {/*title container */}
                <Col xs={24} lg={7} xl={11} xxl={7}>
                    <Title
                        level={3}
                        text={__("Choose your template", "poptics")}
                    />
                </Col>

                {/*search input and modal button container */}
                <Col
                    xs={24}
                    lg={17}
                    xl={13}
                    xxl={17}
                    className="pt-template-search-input-container"
                >
                    <Row
                        gutter={[16, 12]}
                        justify={{
                            xs: "start",
                            lg: "end",
                        }}
                        align="middle"
                    >
                        <Col xs={14} md={14} xl={14} xxl={10}>
                            <Row
                                justify={{
                                    xs: "start",
                                    lg: "end",
                                }}
                            >
                                <SearchInput
                                    placeholder={__("Search", "poptics")}
                                />
                            </Row>
                        </Col>
                        <Col xs={12} md={10} xl={10} xxl={9}>
                            <Row
                                justify={{
                                    xs: "start",
                                    lg: "end",
                                }}
                            >
                                <Flex gap={"small"} align="center">
                                    <FilterByText />
                                    <SelectInput
                                        placeholder={__(
                                            "Popup Type",
                                            "poptics",
                                        )}
                                        options={dropDownTemplatesFilterOptions}
                                        size="large"
                                        onChange={onSelectFilterChange}
                                    />
                                </Flex>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Divider />

                {/*left sidebar container */}
                <Col xs={24} md={8} xl={6} xxl={4}>
                    <LeftSidebar />
                </Col>
                {/*card sections container */}
                <Col xs={24} md={15} lg={15} xl={17} xxl={19}>
                    <TopFiltersContainer />
                    <Row gutter={[15, 15]}>
                        <Col xs={24} md={12} xl={6}>
                            <CreateFromScrTemplate />
                        </Col>
                        {filterTemplates(templates)?.map((template) => {
                            return (
                                <Col xs={24} md={12} xl={6}>
                                    <TemplateCard data={template} />
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>

            {/* Template preview and create campaign modal */}
            <CreateCampaignModal />
            <SingleTempModal />
        </>
    );
};

export default TemplatesList;
