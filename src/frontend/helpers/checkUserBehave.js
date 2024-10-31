import handleAfterScrolling from "./handleAfterScrolling";
import handleClickTrigger from "./handleClickTrigger";

/**
 * Function to check user behavior settings and trigger appropriate actions.
 *
 * @param {Object} controls - The controls object containing user behavior settings.
 * @param {Function} showModal - Function to show the modal when certain conditions are met.
 * @returns {boolean} - Returns true if the modal should be shown immediately, false otherwise.
 */
const checkUserBehaviour = ({ controls, showModal }) => {
    const userBehave = controls?.user_behave || {};
    const { page_load, after_scrolling, click_trigger } = userBehave;
    let res = false;

    // Show modal immediately if page_load is enabled.
    if (page_load?.value) res = true;

    // Handle the after scrolling behavior.
    if (after_scrolling?.value) {
        handleAfterScrolling(after_scrolling, showModal);
    }

    // Handle the click trigger behavior.
    if (click_trigger?.value) {
        handleClickTrigger(click_trigger, showModal);
    }

    // Pro popup visibility
    // Check if the modal should be shown after certain conditions (e.g., after a specific action).
    wp.hooks.applyFilters("check_show_after", res, {
        userBehave,
        showModal,
    });

    // Check if the modal should be shown after user inactivity.
    wp.hooks.applyFilters("check_inactivity", res, {
        userBehave,
        showModal,
    });

    // Check if the modal should be shown based on user exit intent.
    wp.hooks.applyFilters("check_exit_intent", res, {
        userBehave,
        showModal,
    });

    return res;
};

export default checkUserBehaviour;
