import SwitchBox from "../SwitchBox";

const { __ } = wp.i18n;
const Data = () => {
    const dataSwitchItems = [
        {
            label: __("Data Records", "poptics"),
            subText: __(
                "Keep data by enabling the button, and remove all data by disabling it during uninstallation.",
                "poptics",
            ),
            name: ["data", "keep_data_on_uninstall"],
        },
    ];
    return <SwitchBox {...dataSwitchItems[0]} />;
};

export default Data;
