import { registerBlockType } from "@wordpress/blocks";
import { ClockCircleOutlined } from "@ant-design/icons";
import Edit from "./Edit";
import Save from "./Save";
import { countDownAttributes } from "./constant";

const { __ } = wp.i18n;

registerBlockType("poptics/countdown", {
    title: __("Countdown", "poptics"),
    icon: <ClockCircleOutlined />,
    category: "common",
    attributes: countDownAttributes,
    edit: Edit,
    save: Save,
});
