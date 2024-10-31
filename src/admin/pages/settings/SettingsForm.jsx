/**
 * WordPress Dependencies
 */
import { useState, useContext, useRef } from "@wordpress/element";

import { Flex } from "antd";
import { Button, Form, Tabs, Text } from "../../../common/components";
import { tabItems } from "./constant";
import { SettingsContext } from "./withSettingsData";
import useSettingsApi from "./hooks/useSettingsApi";
import { defaultSettings } from "../../../globalConstant";
import { AdminContext } from "../../withAdminData";

const { __ } = wp.i18n;

const SettingsForm = () => {
    const { settings } = useContext(AdminContext);
    const { editLoading } = useContext(SettingsContext);

    const [activeKey, setActiveKey] = useState(tabItems[0].name);
    const { editSettings } = useSettingsApi();

    const formRef = useRef(null);

    const handleTabChange = (key) => {
        setActiveKey(key);
    };

    const onFinish = (values) => {
        editSettings(values);
    };

    const resetSettings = () => {
        formRef.current?.form?.setFieldsValue(defaultSettings);
        editSettings(defaultSettings);
    };

    return (
        <Form
            ref={formRef}
            layout="vertical"
            initialValues={settings}
            onFinish={onFinish}
        >
            <Tabs
                className="pt-settings-tab"
                activeKey={activeKey}
                tabPosition={"left"}
                items={tabItems.map((item) => ({
                    key: item.name,
                    label: item.name,
                    children: (
                        <Flex gap="middle" vertical>
                            <Flex align="center" justify="space-between" wrap>
                                <Text
                                    className="pt-campaign-edit-title"
                                    text={activeKey}
                                    level={4}
                                />
                                <Flex justify="flex-end" gap="small">
                                    <Button
                                        aria-label={__(
                                            "reset settings",
                                            "poptics",
                                        )}
                                        size={
                                            window.innerWidth > 992 && "large"
                                        }
                                        className="pt-light-btn"
                                        type="primary"
                                        text={__(
                                            "Reset All Settings",
                                            "poptics",
                                        )}
                                        htmlType="button"
                                        onClick={resetSettings}
                                        loading={editLoading}
                                    />
                                    <Button
                                        aria-label={__("save", "poptics")}
                                        size={
                                            window.innerWidth > 992 && "large"
                                        }
                                        type="primary"
                                        text={__("Save", "poptics")}
                                        htmlType="submit"
                                        loading={editLoading}
                                    />
                                </Flex>
                            </Flex>
                            {item.form}
                        </Flex>
                    ),
                }))}
                onChange={handleTabChange}
            />
        </Form>
    );
};

export default SettingsForm;
