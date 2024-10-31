/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import {
    Button,
    Card,
    FormItem,
    FormList,
    SelectInput,
} from "../../../../../../common/components";
import { Col, DatePicker, Flex, Row, Space, Tooltip } from "antd";
import { InfoIcon } from "../../../../../../common/icons";
import { CloseOutlined } from "@ant-design/icons";
import ProTag from "../../../../../components/ProTag";
import { AdminContext } from "../../../../../withAdminData";
import { getTimezoneList } from "../../../../../../globalConstant";

const { RangePicker } = DatePicker;
const { __ } = wp.i18n;

const FixedScheduleFields = () => {
    const { isProActivated } = useContext(AdminContext);

    return (
        <FormList name="fixed">
            {(fields, { add, remove }) => (
                <Flex vertical gap="small">
                    {fields.map(({ key, name }) => (
                        <Card
                            size="small"
                            title={`Schedule ${name + 1}`}
                            key={key}
                            extra={
                                <CloseOutlined
                                    onClick={() => {
                                        remove(name);
                                    }}
                                />
                            }
                        >
                            <Row gutter={[16]}>
                                <Col xs={24} md={12}>
                                    <Flex vertical>
                                        <Space className="pt-control-form-label">
                                            {__("Duration", "poptics")}
                                            <Tooltip
                                                title={__(
                                                    "Select the date and duration of the time to schedule popups.",
                                                    "poptics",
                                                )}
                                            >
                                                <span>
                                                    <InfoIcon />
                                                </span>
                                            </Tooltip>
                                        </Space>
                                        <FormItem
                                            name={[name, "duration"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: __(
                                                        "Please select your date range!",
                                                        "poptics",
                                                    ),
                                                },
                                            ]}
                                        >
                                            <RangePicker
                                                format="DD/MM/YYYY hh:mm A"
                                                className="pt-w-100"
                                                showTime
                                            />
                                        </FormItem>
                                    </Flex>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Flex vertical>
                                        <Space className="pt-control-form-label">
                                            {__("Timezone", "poptics")}
                                            <Tooltip
                                                title={__(
                                                    "Popup will appear based on this time zone.",
                                                    "poptics",
                                                )}
                                            >
                                                <span>
                                                    <InfoIcon />
                                                </span>
                                            </Tooltip>
                                        </Space>
                                        <FormItem name={[name, "timezone"]}>
                                            <SelectInput
                                                showSearch
                                                options={getTimezoneList()}
                                            />
                                        </FormItem>
                                    </Flex>
                                </Col>
                            </Row>
                        </Card>
                    ))}

                    <Button
                        aria-label={__("add schedule button", "poptics")}
                        type="dashed"
                        onClick={() =>
                            add({
                                timezone:
                                    Intl.DateTimeFormat().resolvedOptions()
                                        .timeZone,
                            })
                        }
                        block
                        disabled={isProActivated ? false : fields.length >= 1}
                        htmlType="submit"
                    >
                        <Space size="small">
                            {__("+ Add Schedule", "poptics")}
                            {isProActivated || fields.length < 1 ? null : (
                                <ProTag />
                            )}
                        </Space>
                    </Button>
                </Flex>
            )}
        </FormList>
    );
};

export default FixedScheduleFields;
