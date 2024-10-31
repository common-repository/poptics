import { storagePeriodItems } from "../constant";
import SelectBox from "../SelectBox";

const { __ } = wp.i18n;

const Advanced = () => {
    const advancedItems = [
        {
            label: __("Data Analytics Log", "poptics"),
            subText: __(
                "Select a time option to delete old campaign data automatically after the period. Note: Store campaign data in the database. Remember, deleted data won't appear in Analytics.",
                "poptics",
            ),
            name: ["advanced", "maximum_storage_period"],
            items: storagePeriodItems,
        },
    ];
    return <SelectBox {...advancedItems[0]} />;
};

export default Advanced;
