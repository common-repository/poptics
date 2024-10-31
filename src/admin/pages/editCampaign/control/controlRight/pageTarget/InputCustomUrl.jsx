/**
 * WordPress Dependencies
 */
import { useState, useContext } from "@wordpress/element";

import { Flex, List, Space } from "antd";
import { Button, Input } from "../../../../../../common/components";
import { BoldDeleteIcon } from "../../../../../../common/icons";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";
import { PlusCircleOutlined } from "@ant-design/icons";

const { __ } = wp.i18n;

const InputCustomUrl = () => {
    // Use context to access campaign data from SingleCampaignContext
    const { campaign } = useContext(SingleCampaignContext);

    // Custom hook to process and update campaign data
    const { processControlData } = useProcessCampaignEditData();

    // Retrieve the initial list of URLs from the campaign's controls
    const initialValue =
        campaign?.controls?.page_target?.dont_show_in?.url || [];

    // State to manage the new URL input field
    const [newUrl, setNewUrl] = useState("");

    /**
     * Handles updating the campaign controls with the edited data.
     * @param {Array} updatedData - The updated list of URLs.
     */
    const handleEditControl = (updatedData) => {
        // Use the custom hook to process the control data update
        processControlData({
            form: "page_target",
            field: "dont_show_in",
            value: { url: updatedData },
        });
    };

    /**
     * Saves the new URL to the list of hidden pages and updates the campaign controls.
     */
    const handleSaveHiddenPage = () => {
        initialValue.push({ link: newUrl }); // Add the new URL to the list
        handleEditControl(initialValue); // Update the campaign controls with the new list
        setNewUrl(""); // Reset the input field
    };

    /**
     * Deletes a URL from the list of hidden pages and updates the campaign controls.
     * @param {number} index - The index of the URL to be removed.
     */
    const handleDelete = (index) => {
        initialValue.splice(index, 1); // Remove the URL from the list
        handleEditControl(initialValue); // Update the campaign controls with the new list
    };

    return (
        <Flex vertical={true} gap="small">
            <Space.Compact block size="small">
                <Input
                    value={newUrl} // Bind the input value to the state
                    style={{ width: "80%" }}
                    placeholder={__(
                        "Write custom URL to add in the list",
                        "poptics",
                    )}
                    size="small"
                    onChange={(e) => setNewUrl(e.target.value)} // Update the state with the input value
                    allowClear // Allow clearing the input field
                />
                <Button
                    aria-label={__("Add", "poptics")}
                    style={{ width: "20%" }}
                    icon={<PlusCircleOutlined />}
                    iconPosition={"end"}
                    text={__("Add", "poptics")}
                    size="medium"
                    onClick={handleSaveHiddenPage} // Save the new URL when the button is clicked
                    disabled={!newUrl}
                />
            </Space.Compact>

            <List
                dataSource={initialValue} // Set the data source to the list of URLs
                bordered
                renderItem={(value, index) => (
                    <List.Item
                        actions={[
                            <Button
                                aria-label={__("delete button", "poptics")}
                                type="link"
                                icon={<BoldDeleteIcon />}
                                onClick={() => handleDelete(index)} // Delete the URL when the button is clicked
                            />,
                        ]}
                    >
                        {value.link} {/* Display the URL */}
                    </List.Item>
                )}
            />
        </Flex>
    );
};

export default InputCustomUrl;
