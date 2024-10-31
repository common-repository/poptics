/**
 * WordPress dependencies
 */
import { useState, useRef, useEffect } from "@wordpress/element";

import { Button } from "../../../../common/components";
import { CloseIcon } from "../../constant";

/**
 * CloseBtn Component
 * A draggable close button for a WordPress block.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.mode - The mode in which the block is being used (edit or view).
 * @param {Function} props.setAttributes - Function to update block attributes.
 * @param {Object} props.generalSettings - General settings for the block, including close button styles and position.
 * @param {string} props.generalSettings.closeIconStyle - Style of the close icon.
 * @param {string} props.generalSettings.closeIconColor - Color of the close icon.
 * @param {Object} props.generalSettings.closeIconPosition - Initial position of the close icon.
 * @param {number} props.generalSettings.closeIconPosition.top - Initial top position of the close icon.
 * @param {number} props.generalSettings.closeIconPosition.right - Initial right position of the close icon.
 * @returns {JSX.Element} The CloseBtn component.
 */

const { __ } = wp.i18n;
const CloseBtn = ({ mode, setAttributes, generalSettings }) => {
    const {
        closeIconStyle,
        closeIconColor,
        closeIconBgColor,
        fontSize,
        closeIconPosition,
    } = generalSettings;

    const [position, setPosition] = useState(closeIconPosition);
    const draggingRef = useRef(false);
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });

    /**
     * Handles the mouse down event to initiate dragging.
     *
     * @param {MouseEvent} event - The mouse down event.
     */
    const handleMouseDown = (event) => {
        draggingRef.current = true;
        setInitialMousePos({
            x: event.clientX,
            y: event.clientY,
        });
    };

    /**
     * Handles the mouse move event to update the button's position.
     *
     * @param {MouseEvent} event - The mouse move event.
     */
    const handleMouseMove = (event) => {
        if (draggingRef.current) {
            const dx = initialMousePos.x - event.clientX;
            const dy = initialMousePos.y - event.clientY;

            setPosition((prevPosition) => ({
                top: prevPosition.top - dy,
                right: prevPosition.right + dx,
            }));

            setInitialMousePos({
                x: event.clientX,
                y: event.clientY,
            });
        }
    };

    /**
     * Handles the mouse up event to stop dragging.
     */
    const handleMouseUp = () => {
        draggingRef.current = false;
    };

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (mode === "edit" && draggingRef.current) {
            setAttributes({
                generalSettings: {
                    ...generalSettings,
                    closeIconPosition: position,
                },
            });
        }
    }, [position, draggingRef.current]);

    return (
        <div
            className="pt-close-icon"
            style={{
                top: `${closeIconPosition.top}px`,
                right: `${closeIconPosition.right}px`,
            }}
            {...(mode === "edit" && {
                onMouseDown: handleMouseDown,
                onMouseMove: handleMouseMove,
            })}
        >
            <Button
                className="pt-popup-close-btn"
                aria-label={__("close button", "poptics")}
                id="popticsCloseBtn"
                icon={<CloseIcon id={closeIconStyle} fontSize={fontSize} />}
                type="text"
                style={{
                    color: closeIconColor,
                    backgroundColor: closeIconBgColor,
                    ...(mode === "edit" && {
                        cursor: draggingRef.current ? "grabbing" : "grab",
                    }),
                }}
                {...(mode === "edit" && {
                    title: __(
                        "Drag this button to reposition it anywhere on the screen",
                        "poptics",
                    ),
                })}
            />
        </div>
    );
};

export default CloseBtn;
