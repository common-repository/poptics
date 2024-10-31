import { createContext, useState } from "@wordpress/element";
import { pagination } from "../../../globalConstant";
export const SubmissionsContext = createContext();

// Destructure pagination values
const { paged, per_page } = pagination;

const withSubmissionsData = (WrappedComponent) => {
    return (props) => {
        const [submissionsData, setSubmissionsData] = useState({
            submissionsList: null,
            total: null,
            showing: null,
            queryTotal: null,
            active: null,
            trash: null,
            searchQuery: {
                locations: "",
                devices: "",
                browsers: "",
                status: "",
                search_key: "",
                paged,
                per_page,
            },
        });
        return (
            <SubmissionsContext.Provider
                value={{ ...submissionsData, setSubmissionsData }}
            >
                <WrappedComponent {...props} />
            </SubmissionsContext.Provider>
        );
    };
};

export default withSubmissionsData;
