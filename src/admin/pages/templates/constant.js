const { __ } = wp.i18n;

import placeHolder from "../../../../images/admin/placeholder.jpg";

export const image = placeHolder;

export const taxonomyTypes = [
    {
        term_id: -1,
        name: __("Lightbox", "poptics"),
        icon: "",
    },
    {
        term_id: -2,
        name: __("Sidebar", "poptics"),
        icon: "",
    },
];

export const taxonomyGoals = [
    {
        term_id: -3,
        name: __("Collect Lead", "poptics"),
        icon: "",
    },
    {
        term_id: -4,
        name: __("Increase Social Media Following", "poptics"),
        icon: "",
    },
];

export const dropDownTemplatesFilterValues = {
    recommendation: "recommendation",
    popularity: "popularity",
    new: "new",
};

export const dropDownTemplatesFilterOptions = [
    {
        label: __("Recommendation", "poptics"),
        value: dropDownTemplatesFilterValues.recommendation,
    },
    {
        label: __("Popularity", "poptics"),
        value: dropDownTemplatesFilterValues.popularity,
    },
    { label: __("New", "poptics"), value: dropDownTemplatesFilterValues.new },
];

export const filter = {
    goal: "goal",
    type: "popupTypes",
    event: "event",
};
