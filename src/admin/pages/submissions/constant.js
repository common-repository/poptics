const { __ } = wp.i18n;
import { useContext } from "@wordpress/element";
import { SubmissionsContext } from "./withSubmissionsData";

export const getFiltersItems = () => {
    const { total, active, trash } = useContext(SubmissionsContext);
    return [
        {
            label: __("All Entries", "poptics"),
            value: total,
            index: 1,
            filterKey: "",
        },
        {
            label: __("Active", "poptics"),
            value: active,
            filterKey: "active",
            index: 2,
        },
        {
            label: __("Trash", "poptics"),
            value: trash,
            filterKey: "trash",
            index: 3,
        },
    ];
};
