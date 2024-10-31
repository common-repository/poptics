/**
 * WordPress Dependencies
 */
import { useState, useEffect } from "@wordpress/element";
import { CheckBox, Text, Title } from "../../../../common/components";

const { __ } = wp.i18n;

const ControlLeft = () => {
    // State to keep track of the last selected control index
    const [lastIndex, setLastIndex] = useState(0);

    /**
     * Scroll to the section with the specified ID smoothly.
     * @param {string} sectionId - The ID of the section to scroll to.
     */
    const scrollTo = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const yOffset = -110; // Negative value to scroll 110px above the element because of fixed header
            const yCoordinate =
                element.getBoundingClientRect().top + window.scrollY + yOffset;

            // Scroll the element into view
            window.scrollTo({ top: yCoordinate, behavior: "smooth" });
        }
    };

    /**
     * Handle changes to the checkbox selection.
     * @param {string} value - The value of the control item.
     * @param {number} index - The index of the control item.
     */
    const onChange = (value, index) => {
        setLastIndex(index);
        scrollTo(value);
    };

    // Array of control options with labels and values
    const controlArray = [
        {
            label: __("Popup Placement", "poptics"),
            value: "pageTarget",
            description: __(
                "Place your popups where you want to display",
                "poptics",
            ),
        },
        {
            label: __("Audience and Targetings", "poptics"),
            value: "audience",
            description: __(
                "Select audience segments and location-based targeting.",
                "poptics",
            ),
        },
        {
            label: __("Popup Visibility ", "poptics"),
            value: "userBehaviours",
            description: __(
                "How soon do you want the popup to display",
                "poptics",
            ),
        },
        {
            label: __("Frequency Settings", "poptics"),
            value: "frequencySettings",
            description: __("How often you would show popup", "poptics"),
        },
        {
            label: __("Schedule", "poptics"),
            value: "schedule",
            description: __(
                "Create multiple Popup schedules based on date and time.",
                "poptics",
            ),
        },
        {
            label: __("Auto Response Email", "poptics"),
            value: "autoResponder",
            description: __(
                "Visitors receive this email when they enter their email address in a popup.",
                "poptics",
            ),
        },
    ];

    /**
     * Handle the scroll event to update the selected control based on scroll position.
     */
    const handleScroll = () => {
        const sectionOffsets = controlArray.map((controlItem) => {
            const element = document.getElementById(controlItem.value);
            return element ? element.offsetTop : 0;
        });

        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (let i = controlArray.length - 1; i >= 0; i--) {
            if (scrollPosition >= sectionOffsets[i]) {
                setLastIndex(i);
                break;
            }
        }
    };

    // Add the scroll event listener on mount and remove it on unmount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="pt-controls">
            {/* Title of the control section */}
            <Title level={3} text={__("Control", "poptics")} />
            {/* Map through the control array and render checkboxes */}
            {controlArray.map((control, index) => (
                <CheckBox
                    className="pt-control-item-left"
                    key={index}
                    checked={lastIndex >= index}
                    onChange={() => onChange(control.value, index)}
                >
                    <>
                        {/* Label of the control item */}
                        <Text
                            className="pt-control-title"
                            text={control.label}
                        />
                        {/* Description of the control item */}
                        <Text
                            className="pt-control-description"
                            text={control.description}
                        />
                    </>
                </CheckBox>
            ))}
        </div>
    );
};

export default ControlLeft;
