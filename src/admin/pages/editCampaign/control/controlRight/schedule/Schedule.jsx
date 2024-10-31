/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, Space } from "antd";
import { Form, Tabs } from "../../../../../../common/components";
import FixedScheduleFields from "./FixedScheduleFields";
import ControlItemHeader from "../ControlItemHeader";
import { CalendarFillIcon } from "../../../../../../common/icons";
import ProTag from "../../../../../components/ProTag";
import { AdminContext } from "../../../../../withAdminData";
import RepeatingScheduleFields from "./RepeatingScheduleFields";
import useScheduleHandler from "../../../hooks/useScheduleHandler";

const { __ } = wp.i18n;

/**
 * Schedule component.
 * @function
 * @returns {JSX.Element} The Schedule component.
 */
const Schedule = () => {
    // Use context to access campaign data
    const { isProActivated } = useContext(AdminContext);

    // Tabs configuration for schedule settings
    const scheduleItem = [
        {
            key: "fixed",
            label: __("Fixed", "poptics"),
            children: <FixedScheduleFields />,
        },
        {
            key: "repeating",
            label: (
                <Flex gap="small">
                    {__("Repeating", "poptics")}
                    {isProActivated ? null : <ProTag />}
                </Flex>
            ),
            children: <RepeatingScheduleFields />,
            disabled: !isProActivated,
        },
    ];

    const { handleScheduleChange, formattedData } = useScheduleHandler();

    return (
        <Space
            direction="vertical"
            size="middle"
            className="pt-control-item-wrapper"
            id="schedule"
        >
            {/* Header component with an icon, heading, and subtext */}
            <ControlItemHeader
                icon={<CalendarFillIcon />}
                heading={__("Schedule", "poptics")}
                subText={__(
                    "Create multiple Popup schedules based on date and time.",
                    "poptics",
                )}
            />

            <Form
                layout="vertical"
                initialValues={formattedData}
                className="pt-control-form-bottom-wrapper"
                onValuesChange={handleScheduleChange}
            >
                <Tabs
                    type="card"
                    defaultActiveKey="fixed"
                    items={scheduleItem}
                />
            </Form>
        </Space>
    );
};

export default Schedule;
