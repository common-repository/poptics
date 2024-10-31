import { Flex } from "antd";
import { Card } from "../../../../../../common/components";
import { FlagHalfIcon, FlagIcon } from "../../../../../../common/icons";
import CheckBoxInput from "../CheckBoxInput";

const { __ } = wp.i18n;

const AudienceType = () => {
    // Array of checkbox items
    const checkboxItems = [
        {
            key: "new",
            icon: <FlagIcon />,
            label: __("New Visitor", "poptics"),
        },
        {
            key: "returning",
            icon: <FlagHalfIcon />,
            label: __("Returning Visitor", "poptics"),
        },
    ];

    return (
        <Card bordered={false}>
            <Flex gap="small" vertical>
                {/* CheckBox input component with items and label */}
                <CheckBoxInput
                    checkboxItems={checkboxItems}
                    label={__("Audience Type", "poptics")}
                    subText={__(
                        "Select the type of Audience you want to show the popup",
                        "poptics",
                    )}
                    form="audience"
                    field="audience_type"
                />
            </Flex>
        </Card>
    );
};

export default AudienceType;
