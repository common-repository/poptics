import { Collapse, Flex, Space } from "antd";
import {
    SelectInput,
    Switch,
    Text,
    TextInput,
} from "../../../../common/components";
import ProTag from "../../../../admin/components/ProTag";
import SettingsItem from "../../../components/SettingsItem";

const { __ } = wp.i18n;

const ClickableSettings = ({ clickable, handleOnchange }) => {
    const {
        enabled,
        action,
        link = "",
        step,
        target_blank,
        count_as_conversion,
    } = clickable || {};

    const clickableSettings = [
        {
            label: __("Action", "poptics"),
            field: (
                <SelectInput
                    value={action}
                    options={[
                        {
                            label: __("Visit a link", "poptics"),
                            value: "link",
                        },
                        {
                            label: (
                                <Space gap="small">
                                    <Text text={__("Go to step", "poptics")} />
                                    <ProTag />
                                </Space>
                            ),
                            value: "step",
                            disabled: true,
                        },
                    ]}
                    onChange={(val) =>
                        handleOnchange("clickable", {
                            ...clickable,
                            action: val,
                        })
                    }
                />
            ),
        },
        {
            label: action,
            field:
                action === "link" ? (
                    <TextInput
                        value={link}
                        size="small"
                        type="url"
                        onChange={(e) =>
                            handleOnchange("clickable", {
                                ...clickable,
                                link: e.target.value,
                            })
                        }
                        placeholder={__("Enter link here", "poptics")}
                    />
                ) : (
                    <SelectInput
                        value={step}
                        options={[]} //steps option will be passed dynamically
                        onChange={(val) =>
                            handleOnchange("clickable", {
                                ...clickable,
                                step: val,
                            })
                        }
                        placeholder={__("Select step", "poptics")}
                    />
                ),
        },
        action === "link" && {
            label: __("Open in new tab", "poptics"),
            field: (
                <Switch
                    checked={target_blank}
                    onChange={() =>
                        handleOnchange("clickable", {
                            ...clickable,
                            target_blank: !target_blank,
                        })
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Count as conversion", "poptics"),
            field: (
                <Switch
                    checked={count_as_conversion}
                    onChange={() =>
                        handleOnchange("clickable", {
                            ...clickable,
                            count_as_conversion: !count_as_conversion,
                        })
                    }
                />
            ),
            vertical: false,
        },
    ];

    return (
        <Collapse
            collapsible="icon"
            items={[
                {
                    key: "clickable",
                    label: <strong>{__("Clickable", "poptics")}</strong>,
                    children: (
                        <Flex vertical gap="small">
                            {clickableSettings.map((item) => (
                                <SettingsItem key={item.label} {...item} />
                            ))}
                        </Flex>
                    ),
                    showArrow: false,
                    extra: (
                        <Switch
                            checked={enabled}
                            onChange={() =>
                                handleOnchange("clickable", {
                                    ...clickable,
                                    enabled: !enabled,
                                })
                            }
                        />
                    ),
                },
            ]}
            activeKey={enabled ? ["clickable"] : []}
        />
    );
};

export default ClickableSettings;
