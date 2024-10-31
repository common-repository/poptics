import { Button, Dropdown } from "../../../../common/components";

import {
    CloneIcon,
    DeleteIcon,
    EditOutlineIcon,
    EmptyTrashIcon,
    MoreIcon,
} from "../../../../common/icons";
import { Flex } from "antd";
import useCampaignApi from "./hooks/useCampaignApi";
import { useNavigate } from "react-router-dom";

const { __ } = wp.i18n;

const CampaignActions = ({ record }) => {
    const { duplicateCampaign, deleteSingleCampaign, updateCampaign } =
        useCampaignApi();

    // Function to navigate to the edit page for the specific campaign
    const navigate = useNavigate();
    const handleNavigateToEditPage = () => {
        navigate(`/campaign/${record?.id}/update`);
    };

    const dropdownItem = [
        {
            key: "edit",
            label: __("Edit", "poptics"),
            icon: <EditOutlineIcon />,
            onClick: () => handleNavigateToEditPage(),
        },
        {
            key: "clone",
            label: __("Duplicate ", "poptics"),
            icon: <CloneIcon />,
            onClick: () => duplicateCampaign(record?.id),
        },
        {
            key: "trash",
            label: __("Trash", "poptics"),
            icon: <DeleteIcon />,
            onClick: () => updateCampaign(record?.id, { status: "trash" }),
        },
        {
            key: "permanent_delete",
            label: __("Delete Permanently", "poptics"),
            icon: <EmptyTrashIcon />,
            onClick: () => deleteSingleCampaign(record?.id),
        },
    ];
    return (
        <Flex gap="small" justify={"end"}>
            {record?.status === "draft" ? (
                <Button
                    aria-label={__("finish editing", "poptics")}
                    className="pt-light-btn"
                    text={__("Finish Editing", "poptics")}
                    onClick={handleNavigateToEditPage}
                />
            ) : null}
            <Dropdown
                menu={{
                    items: dropdownItem,
                }}
                placement="bottom"
            >
                <Button
                    aria-label={__("more icon", "poptics")}
                    type="text"
                    text=<MoreIcon />
                />
            </Dropdown>
        </Flex>
    );
};

export default CampaignActions;
