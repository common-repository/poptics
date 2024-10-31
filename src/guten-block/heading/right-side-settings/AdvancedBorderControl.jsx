import { __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { units } from "../constant";
import CompactStyleInputs from "../../components/CompactStyleInputs";
import BoxShadowTooltip from "./Tooltip/BoxShadowTooltip";
import { Flex } from "antd";
import SettingsItem from "../../components/SettingsItem";

const { __ } = wp.i18n;

const AdvancedBorderControl = ({
    borderControlValues,
    onBorderValueChange,
    onBoxShadowChange,
}) => {
    const { borderWidth, borderRadius, boxShadow } = borderControlValues;

    const advancedBorderControlItems = [
        {
            label: __("Border Width", "poptics"),
            field: (
                <UnitControl
                    max={100}
                    min={0}
                    value={borderWidth}
                    onChange={(value) =>
                        onBorderValueChange("borderWidth", value)
                    }
                    units={units}
                />
            ),
            vertical: false,
        },

        {
            label: __("Border Radius", "poptics"),
            field: (
                <CompactStyleInputs
                    attributeValue={borderRadius}
                    field={"borderRadius"}
                    handleOnchange={onBorderValueChange}
                />
            ),
            vertical: true,
        },
        {
            label: __("Box Shadow", "poptics"),
            field: (
                <BoxShadowTooltip
                    boxShadowValues={boxShadow}
                    onBoxShadowChange={onBoxShadowChange}
                />
            ),
            vertical: false,
        },
    ];

    return (
        <Flex vertical gap={"middle"}>
            {advancedBorderControlItems.map((item) => (
                <SettingsItem key={item.label} {...item} />
            ))}
        </Flex>
    );
};

export default AdvancedBorderControl;
