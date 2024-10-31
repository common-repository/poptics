import { Flex } from "antd";
import SettingsItem from "../../components/SettingsItem";
import { ColorInput } from "../../../common/components";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { units } from "../constant";
import CompactStyleInputs from "../../components/CompactStyleInputs";
const { __ } = wp.i18n;
const BorderControl = ({ borderControlValues, onBorderValueChange }) => {
    const { backgroundColor, color, width, margin } = borderControlValues;
    const borderControlItems = [
        {
            label: __("BackGround Color", "poptics"),
            field: (
                <ColorInput
                    value={backgroundColor}
                    onChange={(_, newColor) =>
                        onBorderValueChange("backgroundColor", newColor)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Color", "poptics"),
            field: (
                <ColorInput
                    value={color}
                    onChange={(_, newColor) =>
                        onBorderValueChange("color", newColor)
                    }
                />
            ),
            vertical: false,
        },

        {
            label: __("Width", "poptics"),
            field: (
                <UnitControl
                    max={100}
                    min={0}
                    value={width}
                    onChange={(value) => onBorderValueChange("width", value)}
                    units={units}
                />
            ),
            vertical: false,
        },

        {
            label: __("Margin", "poptics"),
            field: (
                <CompactStyleInputs
                    attributeValue={margin}
                    field={"margin"}
                    handleOnchange={onBorderValueChange}
                />
            ),
            vertical: true,
        },
    ];
    return (
        <Flex vertical gap={"middle"}>
            {borderControlItems.map((item) => (
                <SettingsItem key={item.label} {...item} />
            ))}
        </Flex>
    );
};

export default BorderControl;
