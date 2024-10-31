/**
 * Function to determine whether a campaign should be shown on the current page based on page targeting controls.
 *
 * This function checks the page targeting settings in the campaign's controls object to decide
 * whether the campaign should be displayed on the current page. It first checks if the campaign
 * is set to be shown on all pages and then verifies if there are any pages where it should not
 * be shown. If the current page matches one of the excluded pages, the campaign will not be shown.
 * Otherwise, if the campaign is targeted specifically for the home page, it checks if the current
 * page is the home page.
 *
 * @param {Object} controls - The controls object containing page targeting settings.
 * @returns {boolean} - Returns true if the campaign should be shown, false otherwise.
 */
const checkPageTarget = ({ controls }) => {
    const location = window?.location?.href;
    let res = false;

    const pageTarget = controls?.page_target || {};

    // Check if the campaign should be shown on all pages
    if (pageTarget.show_in?.value === "all_pages") {
        if (!pageTarget.dont_show_in) {
            res = true;
        } else {
            // Loop through the list of pages where the campaign should not be shown
            for (let key in pageTarget.dont_show_in) {
                const excludedFound = pageTarget.dont_show_in[key].find(
                    (excludeItem) => excludeItem.link === location,
                );
                if (excludedFound) {
                    res = false;
                    break;
                } else {
                    res = true;
                }
            }
        }
    }
    // Check if the campaign is targeted specifically for the home page
    else if (pageTarget.show_in?.value === "home_page") {
        res = `${window?.poptics?.site_url}/` === location;
    }
    // Check if the campaign is targeted specifically for the custom pages
    else if (pageTarget.show_in?.value === "custom_page") {
        res = wp.hooks.applyFilters("check_custom_pages", res, {
            pageTarget,
        });
    }

    return res;
};

export default checkPageTarget;
