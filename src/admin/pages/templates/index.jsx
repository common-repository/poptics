/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import TemplatesList from "./TemplatesList";
import { RowSkeleton } from "../../../common/components";
import withTemplateData, { TemplateContext } from "./withTemplateData";
import useTemplateApi from "./hooks/useTemplateApi";
import { useEffect } from "@wordpress/element";

const Templates = () => {
    // Fetch templates from API and store them in context
    const { getTemplates } = useTemplateApi();
    useEffect(() => {
        getTemplates();
    }, []);

    // Access campaign states and state updater from context
    const templateStates = useContext(TemplateContext);
    const { templatesList } = templateStates;

    if (templatesList) {
        return <TemplatesList />;
    }
    return (
        <>
            <RowSkeleton />
        </>
    );
};

export default withTemplateData(Templates);
