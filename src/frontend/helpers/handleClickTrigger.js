/**
 * Function to add a click event listener to an element based on the trigger type.
 *
 * This function determines the elements to attach a click event listener to,
 * based on whether the `trigger_by` property in the `data` object is an "id"
 * or a "class". When the specified element(s) is clicked, the provided callback
 * function is executed.
 *
 * @param {Object} data - The data object containing trigger details.
 * @param {string} data.trigger_by - The method to identify the element(s) ("id" or "class").
 * @param {string} data.value - The value of the ID or class name to target.
 * @param {Function} callback - The function to be executed when the element is clicked.
 */
const handleClickTrigger = (data, callback) => {
    const { trigger_by, value } = data;
    let elements;

    // Determine the selector based on the trigger_by value
    switch (trigger_by) {
        case "id":
            // Get the element by ID
            elements = [document.getElementById(value)];
            break;
        case "class":
            // Get the elements by class name
            elements = Array.from(document.getElementsByClassName(value));
            break;
        default:
            console.error("Invalid trigger_by value");
            return; // Exit the function if trigger_by is invalid
    }

    // Check if the elements exist before adding an event listener
    if (elements?.length > 0 && elements?.[0]) {
        elements.forEach((element) => {
            // Attach the click event listener to each element
            element.addEventListener("click", callback);
        });
    } else {
        console.error("Element(s) not found"); // Log an error if elements are not found
    }
};

export default handleClickTrigger;
