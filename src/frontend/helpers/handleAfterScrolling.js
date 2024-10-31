/**
 * Function to handle actions after scrolling a certain amount.
 *
 * This function calculates the target scroll position based on the specified
 * value and unit, then sets up a scroll event listener that triggers the
 * provided callback function once the target position is reached.
 * The event listener is removed after the callback is executed.
 *
 * @param {Object} target - The target scroll position and unit.
 * @param {number} target.value - The target value (e.g., 50).
 * @param {string} target.unit - The unit of the target value ("px", "%", "vh").
 * @param {Function} callback - The function to be executed once the target scroll position is reached.
 */
const handleAfterScrolling = (target, callback) => {
    const { value, unit } = target;
    let targetScrollPosition;

    // Convert the target value into pixels based on the specified unit
    switch (unit) {
        case "px":
            targetScrollPosition = value;
            break;
        case "%":
            targetScrollPosition =
                document.documentElement.scrollHeight * (value / 100);
            break;
        case "vh":
            targetScrollPosition = window.innerHeight * (value / 100);
            break;
        default:
            return; // Exit if the unit is unsupported
    }

    /**
     * Event listener for the scroll event.
     *
     * Checks if the current scroll position is greater than or equal to
     * the target scroll position. If so, it triggers the callback function
     * and removes the scroll event listener.
     */
    const onScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition >= targetScrollPosition) {
            callback(); // Trigger the callback function
            window.removeEventListener("scroll", onScroll); // Remove listener after callback is triggered
        }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", onScroll);
};

export default handleAfterScrolling;
