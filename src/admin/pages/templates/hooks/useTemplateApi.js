/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { useNavigate } from "react-router-dom";
import Api from "../../../../api";

import { TemplateContext } from "../withTemplateData";

import {
    defaultStep,
    controls as globalControls,
    taxonomy,
} from "../../../../globalConstant";
import { taxonomyGoals, taxonomyTypes } from "../constant";

function useTemplateApi() {
    // Access template states
    const templateStates = useContext(TemplateContext);
    const {
        template,
        setTemplateStates,
        templateId,
        templatesList,
        taxonomyTypes: types,
        taxonomyGoals: goals,
    } = templateStates;

    const navigate = useNavigate();

    const isRemoteActivated = wp.hooks.hasFilter(
        "add_thumbnail_image",
        "poptics-remote-addon",
    );

    const getTemplates = async () => {
        let res;
        try {
            // call api to get all templates
            res = await Api?.[
                isRemoteActivated ? "template" : "remote"
            ].getTemplates({});

            if (res?.success) {
                // set Templates List by updating

                setTemplateStates((preValue) => {
                    return {
                        ...preValue,
                        templatesList: res?.data?.items,
                        goals: res?.data?.goals,
                        types: res?.data?.types,
                        events: res?.data?.events,
                        total: res?.data?.total,
                    };
                });
            }
        } catch (error) {
            console.log(error);
            res = error;
        } finally {
            if (!res.success) {
                // Set templateList list empty if any error occurs while trying to fetch data from remote addon
                setTemplateStates((preValue) => ({
                    ...preValue,
                    templatesList: [],
                }));
            }
        }
    };

    /* */
    const getAllCategory = async (params = {}) => {
        if (types && goals) return;

        let res;
        try {
            // Call API to get categories
            res =
                await Api?.[
                    isRemoteActivated ? "category" : "remote"
                ]?.getCategories(params);
            if (res?.success) {
                // Update categories in template states
                setTemplateStates((preValue) => {
                    return {
                        ...preValue,
                        taxonomyGoals: res?.data?.category?.filter(
                            (cat) => cat.taxonomy === taxonomy.goal,
                        ),
                        taxonomyTypes: res?.data?.category?.filter(
                            (cat) => cat.taxonomy === taxonomy.type,
                        ),
                    };
                });
            }
        } catch (error) {
            console.log(error);
            res = error;
        } finally {
            if (!res.success) {
                // Populate types and goals with static value
                setTemplateStates((preValue) => {
                    return {
                        ...preValue,
                        taxonomyTypes,
                        taxonomyGoals,
                    };
                });
            }
        }
    };

    const populateSingleTempData = (id) => {
        // Find the template with the given id from the templatesList array
        const template = templatesList?.find((temp) => temp.id === id);

        // Extract the events taxonomy data from the found template
        const events = template?.taxonomy?.[taxonomy.event];

        // Find recommended templates that share the same campaign events taxonomy
        const recommendedTemplates = templatesList.filter((template) =>
            template?.taxonomy?.[taxonomy.event].some((taxonomy) =>
                events.some((event) => event.term_id === taxonomy.term_id),
            ),
        );

        // Return the populated template and the list of recommended templates
        return { template, recommendedTemplates };
    };

    const createCampaign = async (values) => {
        try {
            let payload;

            // Check if templateId is defined
            if (templateId) {
                // Destructure taxonomy, steps, and controls from the template
                const { taxonomy: _taxonomy, steps, controls } = template;

                // Helper function to extract taxonomy details
                const extractTaxonomyDetails = (key) => ({
                    term_id: _taxonomy?.[key]?.term_id,
                    name: _taxonomy?.[key]?.name,
                    icon: _taxonomy?.[key]?.icon,
                });

                // Extract type and goal taxonomy details
                const type = extractTaxonomyDetails(taxonomy.type);
                const goal = extractTaxonomyDetails(taxonomy.goal);

                // Update the payload with the extracted details
                payload = {
                    type,
                    goal,
                    steps,
                    controls,
                    ...values,
                };
            } else {
                payload = {
                    steps: defaultStep,
                    controls: globalControls,
                    ...values,
                };
            }

            // Create a new campaign with the payload
            const res = await Api?.campaign?.createCampaign(payload);

            // If the campaign creation is successful, navigate to the update page
            if (res?.success) {
                navigate(`/campaign/${res.data?.id}/update`);
            }
        } catch (error) {
            // Log any errors to the console
            console.error(error);
        }
    };

    return {
        createCampaign,
        getTemplates,
        getAllCategory,
        populateSingleTempData,
    };
}

export default useTemplateApi;
