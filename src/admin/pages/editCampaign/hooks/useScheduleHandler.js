/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { SingleCampaignContext } from "../withSingleCampaignData";
import dayjs from "dayjs";

/**
 * Custom hook for handling schedule changes and transforming schedule data.
 * @returns {Object} Schedule change handler and formatted schedule data.
 */
function useScheduleHandler() {
    // Access the campaign context to get and update campaign states.
    const campaignStates = useContext(SingleCampaignContext);
    const { campaign, setCampaignStates } = campaignStates;

    /**
     * Handles changes in the schedule form.
     * @param {string} _ - Unused parameter.
     * @param {Object} values - Form values.
     */
    const handleScheduleChange = (_, values) => {
        const schedule = {
            ...values,
            ...(values.fixed && {
                fixed: values.fixed.filter((value) => value.duration), // Filter out fixed schedule items without a duration.
            }),
            ...wp.hooks.applyFilters(
                "format_repeating_schedule",
                {},
                { repeatingSchedule: values.repeating, dayjs }, // Apply custom formatting to the repeating schedule using filters.
            ),
        };

        // Update the campaign state with the new schedule.
        setCampaignStates((prevState) => ({
            ...prevState,
            campaign: {
                ...prevState.campaign,
                controls: { ...prevState.campaign.controls, schedule },
            },
        }));
    };

    /**
     * Transforms duration values to Day.js objects for proper handling.
     * @returns {Object|null} The transformed schedule or null if no schedule exists.
     */
    const transformSchedules = () => {
        const schedule = campaign?.controls?.schedule || {};

        // Format the fixed schedule to transform date strings into Day.js objects.
        const formattedSchedule = {
            ...schedule,
            fixed: schedule.fixed?.length
                ? schedule.fixed.map((item) => ({
                      ...item,
                      duration: item.duration?.map((date) => dayjs(date)),
                  }))
                : [
                      {
                          timezone:
                              Intl.DateTimeFormat().resolvedOptions().timeZone, // Set default timezone if no fixed schedule is present.
                      },
                  ],
            ...wp.hooks.applyFilters(
                "repeating_default_schedule",
                {},
                { schedule, dayjs }, // Apply custom formatting to the default repeating schedule using filters.
            ),
        };

        return formattedSchedule;
    };

    // Generate the formatted schedule data.
    const formattedData = transformSchedules();

    return { handleScheduleChange, formattedData };
}

export default useScheduleHandler;
