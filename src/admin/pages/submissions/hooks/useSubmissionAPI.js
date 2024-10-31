import { useContext } from "@wordpress/element";
import { pagination as globalPagination } from "./../../../../globalConstant";
import Api from "../../../../api";
import { SubmissionsContext } from "./../withSubmissionsData";

function useSubmissionsApi() {
    const { setSubmissionsData } = useContext(SubmissionsContext);
    // Destructure pagination values
    const { per_page, paged } = globalPagination;

    /**
     * Fetches all submissions based on the provided query parameters.
     * Merges default and additional query parameters.
     *
     * @async
     * @function getAllSubmissionsByFiltering
     * @param {Object} [query={}] - Additional query parameters for filtering submissions.
     * @returns {Promise<Object>} - Indicates the completion of the function.
     * @throws {Error} - If there is an error during data fetching.
     */
    const getAllSubmissionsByFiltering = async (query = {}) => {
        // Merge default and additional query parameters
        const params = {
            per_page,
            paged,
            ...query,
        };

        try {
            const res = await Api.submissions.allSubmissions(params);

            if (res?.success) {
                setSubmissionsData((preVal) => ({
                    ...preVal,
                    submissionsList: res?.data?.items,
                    total: res?.data?.status_count?.total,
                    queryTotal: res?.data?.query_total,
                    showing: res?.data?.items?.length,
                    active: res?.data?.status_count?.active,
                    trash: res?.data?.status_count?.trash,
                }));
            } else {
                setSubmissionsData((preVal) => ({
                    ...preVal,
                    submissionsList: [],
                }));
            }
        } catch (error) {
            console.log("Data fetching error", error);
        } finally {
            return { complete: true }; // Indicate completion
        }
    };

    /**
     * Fetches all user agents and updates the submissions data with the retrieved information.
     *
     * @async
     * @function getAllUserAgents
     * @returns {Promise<void>} - A promise that resolves when the function completes.
     * @throws {Error} - If there is an error during data fetching.
     */
    const getAllUserAgents = async () => {
        try {
            let res = await Api.submissions.allSubmissionAgents();
            if (res?.success) {
                setSubmissionsData((preVal) => ({
                    ...preVal,
                    searchQuery: {
                        ...preVal.searchQuery,
                        devices: res?.data?.devices,
                        browsers: res?.data?.browsers,
                        locations: res?.data?.locations,
                    },
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Deletes a submission by its ID and updates the submissions data.
     *
     * @async
     * @function deleteSubmission
     * @param {string} id - The ID of the submission to delete.
     * @returns {Promise<void>} - A promise that resolves when the function completes.
     * @throws {Error} - If there is an error during the deletion process.
     */
    const deleteSubmission = async (id) => {
        try {
            const res = await Api.submissions.deleteSingleSubmission(id);
            if (res.success) {
                setSubmissionsData((preVal) => ({
                    ...preVal,
                    submissionsList: preVal.submissionsList.filter(
                        (eachSub) => {
                            return eachSub.id !== id;
                        },
                    ),
                    total: preVal.total - 1,
                }));
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    /**
     * Deletes multiple submissions by their IDs and updates the submissions data.
     *
     * @async
     * @function bulkDeleteSubmission
     * @param {Array<string>} [ids=[]] - An array of submission IDs to delete.
     * @returns {Promise<void>} - A promise that resolves when the function completes.
     * @throws {Error} - If there is an error during the deletion process.
     */
    const bulkDeleteSubmission = async (ids = []) => {
        try {
            const res = await Api.submissions.bulkDeleteSubmission(ids);
            if (res.success) {
                setSubmissionsData((preVal) => ({
                    ...preVal,
                    submissionsList: preVal.submissionsList.filter(
                        (eachSub) => {
                            return !ids.includes(eachSub.id);
                        },
                    ),
                    total: preVal.total - ids.length,
                }));
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    /**
     * Updates the status of a submission by its ID and updates the submissions data.
     *
     * @async
     * @function updateSubmission
     * @param {string} id - The ID of the submission to update.
     * @param {string} status - The new status of the submission.
     * @returns {Promise<void>} - A promise that resolves when the function completes.
     * @throws {Error} - If there is an error during the update process.
     */

    const updateSubmission = async (id, status) => {
        try {
            const res = await Api.submissions.updateSubmissionStatus(
                id,
                status,
            );

            if (res?.success) {
                setSubmissionsData((preVal) => {
                    return {
                        ...preVal,
                        submissionsList: preVal.submissionsList.map((item) => {
                            if (item.id === id) return { ...item, status };
                            return item;
                        }),
                        active: parseInt(preVal.active) - 1,
                        trash: parseInt(preVal.trash) + 1,
                    };
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        getAllSubmissionsByFiltering,
        deleteSubmission,
        updateSubmission,
        bulkDeleteSubmission,
        getAllUserAgents,
    };
}

export default useSubmissionsApi;
