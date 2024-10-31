/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Row, Space, Tooltip } from "antd";
import { CheckBox, CheckBoxGroup } from "../../../../../common/components";
import { SingleCampaignContext } from "../../withSingleCampaignData";
import useProcessCampaignEditData from "../../hooks/useProcessCampaignEditData";
import { InfoIcon } from "../../../../../common/icons";

/**
 * CheckboxInputInline Component
 *
 * This component renders a group of checkbox buttons with optional labels and icons.
 * It uses Ant Design's layout system for responsiveness and proper alignment.
 *
 * Props:
 * - checkboxItems: An array of checkbox items with labels, icons, and keys.
 * - label: The label for the group of checkboxes.
 * - tooltipText: Text to be displayed inside the tooltip for additional information.
 * - form: The name of the form to which the checkbox group belongs.
 * - field: The name of the field within the form that the checkbox group represents.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const CheckboxInputInline = ({
    checkboxItems, // Array of items to be displayed as checkboxes
    label, // Label for the checkbox group
    tooltipText, // Tooltip text to give additional information about the checkboxes
    form, // The form name to which the checkbox group is associated
    field, // The specific field within the form associated with this checkbox group
}) => {
    // Access campaign data using SingleCampaignContext
    const { campaign } = useContext(SingleCampaignContext);

    // Custom hook to handle updating campaign data on checkbox changes
    const { processControlData } = useProcessCampaignEditData();

    // Get the initial value for the checkboxes, based on the form and field passed in props
    const initialValue =
        campaign?.controls?.[form]?.[field]?.selected_value || null;

    /**
     * Handles change events for checkbox group
     *
     * @param {Object} value - The new value selected from the checkbox group.
     */
    const onChangeHandler = (value) => {
        // Update the campaign state with the new selected value for the given form and field
        processControlData({ form, field, value: { selected_value: value } });
    };

    return (
        <Row justify={{ sm: "start", md: "end" }}>
            <Col
                xs={24} // Full width on extra small screens
                sm={24} // Full width on small screens
                md={18} // Occupies 18 columns on medium screens
                xxl={16} // Occupies 16 columns on extra large screens
                className="pt-control-form-bottom-wrapper" // Wrapper for bottom margin/padding control
            >
                {/* Label for the checkbox group with a tooltip for additional information */}
                <Space className="pt-control-form-label">
                    {label}
                    <Tooltip title={tooltipText}>
                        <span>
                            <InfoIcon />
                        </span>
                    </Tooltip>
                </Space>

                {/* Checkbox group with onChange handler and initial value */}
                <CheckBoxGroup
                    onChange={onChangeHandler} // Updates the state on value change
                    className="pt-create-campaign-modal-type-container" // Custom class for styling
                    value={initialValue} // Initial selected value
                >
                    {/* Render each checkbox with an optional icon and label */}
                    {checkboxItems.map((item) => (
                        <CheckBox
                            key={item?.key} // Unique key for each checkbox
                            value={item?.key} // The checkbox's value
                            className="pt-create-campaign-modal-radio" // Custom class for styling
                            disabled={item?.isPro} // Disable the checkbox if it's marked as "Pro"
                        >
                            <Space>
                                {item?.icon} {/* Icon (optional) */}
                                {item?.label} {/* Label for the checkbox */}
                            </Space>
                        </CheckBox>
                    ))}
                </CheckBoxGroup>
            </Col>
        </Row>
    );
};

export default CheckboxInputInline;
