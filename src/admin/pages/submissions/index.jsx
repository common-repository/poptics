import { RowSkeleton } from "../../../common/components";
import useSubmissionsApi from "./hooks/useSubmissionAPI";
import SubmissionsPage from "./SubmissionsPage";
import withSubmissionsData, { SubmissionsContext } from "./withSubmissionsData";
import { useContext, useEffect } from "@wordpress/element";
const { __ } = wp.i18n;

const Submissions = () => {
    const { submissionsList, searchQuery } = useContext(SubmissionsContext);
    const { paged, per_page } = searchQuery;
    const { getAllSubmissionsByFiltering, getAllUserAgents } =
        useSubmissionsApi();

    useEffect(() => {
        getAllSubmissionsByFiltering({ paged, per_page });
        getAllUserAgents();
    }, []);

    return (
        <RowSkeleton rows={per_page} loading={!submissionsList}>
            <SubmissionsPage />
        </RowSkeleton>
    );
};

export default withSubmissionsData(Submissions);
