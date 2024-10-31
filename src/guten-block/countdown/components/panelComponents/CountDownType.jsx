import { Fragment } from "@wordpress/element";

import { Radio, Space } from "antd";
import { countdownTypeOptions, countdownAttributesName } from "../../constant";

import { CustomTimePicker } from "./CustomTimePicker";
import FixedDatePicker from "./FixedDatePicker";
const { __ } = wp.i18n;

const CountDownType = (props) => {
    let { countdownType, onCountDownStateChange, setAttributes, targetTime } =
        props;

    return (
        <Fragment>
            <Radio.Group
                onChange={(e) =>
                    onCountDownStateChange(
                        countdownAttributesName.type,
                        e.target.value,
                    )
                }
                value={countdownType}
            >
                <Space direction="vertical">
                    {countdownTypeOptions.map((option) => (
                        <Radio value={option.value}>{option.label}</Radio>
                    ))}

                    {countdownType === "fixed" ? (
                        <FixedDatePicker
                            setAttributes={setAttributes}
                            targetTime={targetTime}
                        />
                    ) : (
                        <CustomTimePicker setAttributes={setAttributes} />
                    )}
                </Space>
            </Radio.Group>
        </Fragment>
    );
};

export default CountDownType;
