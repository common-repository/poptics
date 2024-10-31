/**
 * WordPress Dependencies
 */
import { useEffect, useContext } from "@wordpress/element";

import { PopupContext } from "../withPopupData";
import usePopupApi from "./usePopupApi";

const { __ } = wp.i18n;

/**
 * Custom hook to manage lead collection in a popup form.
 * This hook handles form validation, submission, and event listeners for a popup form.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Indicates if the popup is currently open.
 * @param {number} props.id - Unique identifier for the popup.
 * @param {number} props.control - Current popup's controls
 *
 * @returns {void}
 */
const useLeadCollectionHandler = ({ isOpen, id, controls }) => {
    // Access the campaign states (such as campaignId) and update functions from the PopupContext.
    const popupStates = useContext(PopupContext);
    const { campaignId } = popupStates;

    // Custom hook to manage storing analytics data for the campaign.
    const { storeAnalytics } = usePopupApi(controls);

    /**
     * Displays an error message below the input field.
     *
     * @param {HTMLElement} input - The input element where the error occurred.
     * @param {string} message - The error message to display.
     */
    const showError = (input, message) => {
        clearError(input); // Clear any existing error
        const errorText = document.createElement("div");
        errorText.className = "pt-error-text"; // Add a class for styling
        errorText.innerText = message;
        input.classList.add("error"); // Add error class to input
        input.parentNode.insertBefore(errorText, input.nextSibling);
    };

    /**
     * Clears the error message from the input field.
     *
     * @param {HTMLElement} input - The input element to clear the error from.
     */
    const clearError = (input) => {
        const errorText = input.parentNode.querySelector(".pt-error-text");
        if (errorText) {
            errorText.remove();
        }
        input.classList.remove("error");
    };

    /**
     * Function to display a response message based on success or failure.
     *
     * @param {boolean} isSuccess - Whether the API response was successful.
     */
    const displayResponseMessage = (isSuccess, campaignContainer) => {
        const formContainer = campaignContainer.querySelector(
            "#popticsFormContainer",
        );

        // Clear existing form content
        formContainer.innerHTML = "";

        if (isSuccess) {
            const textArr = [
                __("Thank You!", "poptics"),
                __(
                    "Your information has been successfully submitted.",
                    "poptics",
                ),
                __("We appreciate your interest.", "poptics"),
            ];

            // Display a nicely designed thank-you card on success
            formContainer.innerHTML = `
            <div class="thank-you-card" style="text-align: center; padding: 20px; background-color: #f0f8ff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #28a745;">${textArr[0]}</h2>
                <p>${textArr[1]}</p>
                <p>${textArr[2]}</p>
            </div>
        `;
        } else {
            const textArr = [
                __("Sorry!", "poptics"),
                __("Something went wrong. Please try again later.", "poptics"),
            ];

            // Display an error message on failure
            formContainer.innerHTML = `
            <div class="error-card" style="text-align: center; padding: 20px; background-color: #ffe6e6; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #dc3545;">${textArr[0]}</h2>
                <p>${textArr[1]}</p>
            </div>
        `;
        }
    };

    /**
     * Handles form submission, validating fields, and storing lead data.
     * It prevents the default form submission, performs validation, and submits the lead values.
     *
     * @param {Event} e - The form submission event.
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Get the campaign container element by its unique ID.
        const campaignContainer = document.getElementById(
            `poptics-campaign-${id}`,
        );

        const form = campaignContainer.querySelector("#popticsForm");
        const submitter = campaignContainer.querySelector(
            "button[type=submit]",
        );
        const formData = new FormData(form, submitter);
        const leadValues = {
            email: "",
            is_converted: 1,
        };

        let firstInvalidField = null; // To track the first invalid field

        // Iterate through form data and validate
        for (const [key, value] of formData) {
            // Check if the field is 'email' and assign accordingly
            if (key === "email") {
                leadValues.email = value;
            } else {
                if (!leadValues.other_details) {
                    leadValues.other_details = {}; // Initialize 'other_details' if not present
                }
                leadValues.other_details[key] = value;
            }

            const input = form.querySelector(`input[name="${key}"]`);

            // Validate email field
            if (input.type === "email" && value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    if (!firstInvalidField) {
                        firstInvalidField = input;
                    }
                    showError(
                        input,
                        __("Please enter a valid email address.", "poptics"),
                    );
                }
            } else if (input.required && !value) {
                // Validate required fields
                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
                showError(input, __("This field is required.", "poptics"));
            } else {
                clearError(input);
            }
        }

        // Focus on the first invalid field, if any
        if (firstInvalidField) {
            firstInvalidField.focus();
            return;
        }

        // Submit form data if validation passes
        const response = await storeAnalytics({ id, leadValues });
        if (response.success) {
            displayResponseMessage(true, campaignContainer); // Call function to display thank-you card
        } else {
            displayResponseMessage(false, campaignContainer); // Call function to display error message
        }
    };

    useEffect(() => {
        // Get the campaign container element by its unique ID.
        const campaignContainer = document.getElementById(
            `poptics-campaign-${id}`,
        );
        if (!campaignContainer) return; // Exit if no campaign container is found.

        const formSubmitBtn = campaignContainer.querySelector(
            "#popticsForm button[type='submit'][data-count-conversion='true']",
        );

        /**
         * Adds necessary event listeners for form submission.
         * This will trigger the form validation and lead data handling.
         */
        const addEventListeners = () => {
            if (!campaignId) {
                formSubmitBtn?.addEventListener("click", handleFormSubmit);
            }
        };

        /**
         * Removes event listeners when the popup is closed or component unmounts.
         */
        const removeEventListeners = () => {
            if (!campaignId) {
                formSubmitBtn?.removeEventListener("click", handleFormSubmit);
            }
        };

        addEventListeners(); // Add the event listeners when the modal is open.
        return () => removeEventListeners(); // Cleanup the event listeners when the modal is closed or on unmount.
    }, [isOpen]);
};

export default useLeadCollectionHandler;
