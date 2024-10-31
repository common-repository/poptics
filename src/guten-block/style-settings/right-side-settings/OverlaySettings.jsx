import { ColorInput, Switch } from "../../../common/components";
import CustomPanelBody from "../../components/CustomPanelBody";

const { __ } = wp.i18n;

const OverlaySettings = ({ overlaySettings, setAttributes }) => {
    const handleOnchange = (field, value) => {
        setAttributes({
            overlaySettings: {
                ...overlaySettings,
                [field]: value,
            },
        });
    };

    const { enable, backgroundColor, closePopupOnClick } = overlaySettings;

    const settingsFields = [
        {
            label: __("Overlay", "poptics"),
            field: (
                <Switch
                    checked={enable}
                    onChange={() => handleOnchange("enable", !enable)}
                />
            ),
            vertical: false,
        },
        {
            label: __("Overlay Color", "poptics"),
            field: (
                <ColorInput
                    value={backgroundColor}
                    onChange={(_, newBg) =>
                        handleOnchange("backgroundColor", newBg)
                    }
                />
            ),
            vertical: false,
        },
        {
            label: __("Close Popup by clicking overlay", "poptics"),
            field: (
                <Switch
                    checked={closePopupOnClick}
                    onChange={() =>
                        handleOnchange("closePopupOnClick", !closePopupOnClick)
                    }
                />
            ),
            vertical: false,
        },
    ];

    return (
        <CustomPanelBody
            title={__("Overlay Setting", "poptics")}
            settingsFields={settingsFields}
            initialOpen={false}
        />
    );
};

export default OverlaySettings;
