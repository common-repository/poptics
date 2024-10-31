/**
 * WordPress Dependencies
 */
import { useState, useContext } from "@wordpress/element";

import { Space } from "antd";
import {
    Badge,
    Button,
    Input,
    Text,
    TextTruncate,
} from "../../../common/components";
import { mapClassNameToStatus } from "../campaign/constant";
import { EditIcon } from "../../../common/icons";
import { SingleCampaignContext } from "./withSingleCampaignData";
import useSingleCampaignApi from "./hooks/useSingleCampaignApi";

const { __ } = wp.i18n;

/**
 * Component for editing basic campaign details.
 * @returns {JSX.Element} - BasicEdit component JSX.
 */
const BasicEdit = () => {
    // State for toggling edit mode.
    const [editMode, setEditMode] = useState(false);

    // Context for accessing and updating campaign data.
    const { campaign, setCampaignStates, editLoading } = useContext(
        SingleCampaignContext,
    );

    const [title, setTitle] = useState(campaign?.name);

    const { updateCampaign } = useSingleCampaignApi();

    /**
     * Function to toggle edit mode and manage edited data state.
     */
    const toggleNameEditMode = () => {
        if (editMode) {
            setTitle(campaign?.name);
        }
        setEditMode(!editMode);
    };

    /**
     * Function to handle editing campaign name.
     * Triggers campaign update and exits edit mode.
     */
    const handleNameEdit = async () => {
        const name = title;

        await updateCampaign({ name });

        setEditMode(false);
        setCampaignStates((preVal) => ({
            ...preVal,
            campaign: { ...preVal.campaign, name },
        }));
    };

    /**
     * Function to handle changes in campaign name input.
     * Updates campaign state with the new name.
     * @param {Event} e - Input change event.
     */
    const handleNameChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        <Space direction="vertical" size={4} className="pt-campaign-basic-edit">
            <Badge
                count={campaign?.status}
                className={`pt-campaign-status-badge pt-single-campaign-badge ${
                    mapClassNameToStatus[campaign?.status]
                }`}
            />
            <Space align="center" size="small">
                {editMode ? (
                    // Input field for editing campaign name
                    <Input
                        className="pt-campaign-name-input"
                        value={title}
                        onChange={handleNameChange}
                    />
                ) : (
                    // Display campaign name
                    <Text
                        className="pt-campaign-edit-title"
                        text={<TextTruncate text={campaign?.name} />}
                        level={4}
                    />
                )}
                {editMode ? (
                    // Buttons for saving or canceling edit mode
                    <>
                        <Button
                            aria-label={__("save button", "poptics")}
                            text={__("Save", "poptics")}
                            onClick={handleNameEdit}
                            loading={editLoading}
                        />
                        <Button
                            aria-label={__("cancel button", "poptics")}
                            type="text"
                            text={__("Cancel", "poptics")}
                            onClick={toggleNameEditMode}
                        />
                    </>
                ) : (
                    // Button to toggle edit mode
                    <Button
                        aria-label={__("Edit Button", "poptics")}
                        icon={<EditIcon />}
                        onClick={toggleNameEditMode}
                    />
                )}
            </Space>
        </Space>
    );
};

export default BasicEdit;
