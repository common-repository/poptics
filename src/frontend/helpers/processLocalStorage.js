/**
 * Retrieves campaign-related data from localStorage, specifically for tracking
 * how many times a given campaign has been viewed and the overall visit count for the site.
 *
 * This function looks for two pieces of information in localStorage:
 * 1. The number of times the campaign has been viewed (tracked by a specific campaign key).
 * 2. The total number of visits to the site (tracked by a general key).
 *
 * If the data does not exist in localStorage, it defaults to an initial structure with a count of 0 views.
 *
 * @param {string} id - The unique identifier for the campaign.
 * @returns {Object} - An object containing:
 *   - `localData`: The parsed data from localStorage related to the campaign's view count.
 *   - `visits`: The total number of visits retrieved from localStorage, defaults to 0 if not found.
 */
export const getLocalStorageData = (id) => {
    // Construct the localStorage key for tracking how many times this specific campaign has been viewed.
    const key = `poptics-campaign-${id}-viewed`;

    // Retrieve the campaign view data from localStorage. If no data is found, default to an object with a count of 0.
    const localData = JSON.parse(localStorage.getItem(key) || '{"count": 0}');

    // Retrieve the total number of site visits stored in localStorage. Default to 0 if no data is found.
    let visits = localStorage.getItem("poptics-number-of-visits") || 0;

    // Return an object containing both the campaign-specific view data and the total site visits.
    return { localData, visits };
};
