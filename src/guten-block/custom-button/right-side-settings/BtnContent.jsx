/**
 * WordPress dependencies
 */
import { PanelBody } from "@wordpress/components";

import { Flex } from "antd";
import { Switch, TextInput } from "../../../common/components";
import SettingsItem from "../../components/SettingsItem";

const { __ } = wp.i18n;

const BtnContent = ({ btnContent, setAttributes }) => {
    const { label, btnAttribute, id, className, count_as_conversion } =
        btnContent;

    const handleOnchange = (field, value) => {
        setAttributes({
            btnContent: {
                ...btnContent,
                [field]: value,
            },
        });
    };

    const settingsFields = [
        {
            label: __("Label", "poptics"),
            field: (
                <TextInput
                    placeholder={__("Enter button label", "poptics")}
                    value={label}
                    onChange={(e) => handleOnchange("label", e.target.value)}
                />
            ),
        },
        {
            label: __("Attribute", "poptics"),
            field: (
                <TextInput
                    placeholder={__("Enter button attribute", "poptics")}
                    help={__(
                        "Enter any custom attribute separated with '/'. ex: type/submit",
                        "poptics",
                    )}
                    value={btnAttribute}
                    onChange={(e) =>
                        handleOnchange("btnAttribute", e.target.value)
                    }
                />
            ),
        },
        {
            label: __("ID", "poptics"),
            field: (
                <TextInput
                    placeholder={__("Enter button ID", "poptics")}
                    value={id}
                    onChange={(e) => handleOnchange("id", e.target.value)}
                />
            ),
        },
        {
            label: __("Class", "poptics"),
            field: (
                <TextInput
                    placeholder={__("Enter button additional class", "poptics")}
                    value={className}
                    onChange={(e) =>
                        handleOnchange("className", e.target.value)
                    }
                />
            ),
        },
        {
            label: __("Count as conversion", "poptics"),
            field: (
                <Switch
                    checked={count_as_conversion}
                    onChange={() =>
                        handleOnchange(
                            "count_as_conversion",
                            !count_as_conversion,
                        )
                    }
                />
            ),
            vertical: false,
        },
    ];

    return (
        <PanelBody title={__("Content", "poptics")} initialOpen={true}>
            <Flex vertical gap="small" className="pt-style-settings-panel-body">
                {settingsFields.map((item) => (
                    <SettingsItem key={item.label} {...item} />
                ))}
            </Flex>
        </PanelBody>
    );
};

export default BtnContent;
