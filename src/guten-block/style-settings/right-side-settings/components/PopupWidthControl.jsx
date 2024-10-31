/**
 * WordPress dependencies
 */
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";

const PopupWidthControl = ({ popupWidth, handleOnchange }) => {
    // Function to determine the max value based on the unit
    const getMaxValue = (unit) => {
        switch (unit) {
            case "px":
                return 1200;
            case "%":
                return 100; // Max 100% (full width)
            case "em":
            case "rem":
                return 50; // Example: max 50em/rem
            case "vw":
                return 50;
            default:
                return 100;
        }
    };

    // Extract the unit from the value (e.g., '100px' -> 'px')
    const unit = popupWidth.match(/[a-zA-Z%]+$/)?.[0] || "px";

    // Calculate the max value for the current unit
    const max = getMaxValue(unit);

    return (
        <UnitControl
            max={max}
            min={50}
            value={popupWidth}
            onChange={(newWidth) => handleOnchange("popupWidth", newWidth)}
        />
    );
};

export default PopupWidthControl;
