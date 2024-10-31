/**
 * Wordpress Dependencies
 */
import { Flex, List } from "antd";
import { CheckBox, Text } from "../../../common/components";
import { CategoryInfo } from "../../components/CategoryInfo";
import { useContext } from "@wordpress/element";
import { TemplateContext } from "./withTemplateData";

const { __ } = wp.i18n;

const LeftSidebar = () => {
    // filters setter functions from the context
    const templateStates = useContext(TemplateContext);
    const { setTemplateStates, goals, types, events } = templateStates;

    // handle the type filters state
    const onSelectTypeHandler = (id) => {
        setTemplateStates((preVal) => {
            if (preVal?.selectedTypes?.includes(id)) {
                return {
                    ...preVal,
                    selectedTypes: preVal?.selectedTypes?.filter(
                        (val) => val !== id,
                    ),
                };
            } else {
                return {
                    ...preVal,
                    selectedTypes: [...preVal?.selectedTypes, id],
                };
            }
        });
    };

    // handle the goal filters state
    const onSelectGoalHandler = (id) => {
        setTemplateStates((preVal) => {
            if (preVal?.selectedGoals?.includes(id)) {
                return {
                    ...preVal,
                    selectedGoals: preVal?.selectedGoals?.filter(
                        (val) => val !== id,
                    ),
                };
            } else {
                return {
                    ...preVal,
                    selectedGoals: [...preVal?.selectedGoals, id],
                };
            }
        });
    };
    // handle the events filters state
    const onSelectEventHandler = (id) => {
        setTemplateStates((preVal) => {
            if (preVal?.selectedEvents?.includes(id)) {
                return {
                    ...preVal,
                    selectedEvents: preVal?.selectedEvents?.filter(
                        (val) => val !== id,
                    ),
                };
            } else {
                return {
                    ...preVal,
                    selectedEvents: [...preVal?.selectedEvents, id],
                };
            }
        });
    };

    return (
        <Flex className="pt-template-left-sidebar" vertical gap="middle">
            {/* popup types filters list */}
            <List
                header={<Text text={__("Popup Types", "poptics")} />}
                itemLayout="horizontal"
                dataSource={types || []}
                className="pt-templates-sidebar-list"
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <CheckBox
                                onChange={() =>
                                    onSelectTypeHandler(item?.term_id)
                                }
                                checked={templateStates?.selectedTypes?.includes(
                                    item?.term_id,
                                )}
                            >
                                <CategoryInfo type={item} />
                            </CheckBox>,
                        ]}
                    ></List.Item>
                )}
            />

            {/* popup goals filters list */}
            <List
                header={<Text text={__("Goal", "poptics")} />}
                itemLayout="horizontal"
                dataSource={goals || []}
                className="pt-templates-sidebar-list"
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <CheckBox
                                checked={templateStates?.selectedGoals?.includes(
                                    item?.term_id,
                                )}
                                onChange={() =>
                                    onSelectGoalHandler(item?.term_id)
                                }
                            >
                                <CategoryInfo type={item} />
                            </CheckBox>,
                        ]}
                    ></List.Item>
                )}
            />

            {/* Events filters list */}
            <List
                header={<Text text={__("Events", "poptics")} />}
                itemLayout="horizontal"
                dataSource={events || []}
                className="pt-templates-sidebar-list"
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <CheckBox
                                checked={templateStates?.selectedEvents?.includes(
                                    item?.term_id,
                                )}
                                onChange={() =>
                                    onSelectEventHandler(item?.term_id)
                                }
                            >
                                <CategoryInfo type={item} />
                            </CheckBox>,
                        ]}
                    ></List.Item>
                )}
            />
        </Flex>
    );
};

export default LeftSidebar;
