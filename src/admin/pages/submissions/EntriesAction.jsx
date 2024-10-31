import { Button, Dropdown } from "./../../../common/components";
import { DeleteIcon, EmptyTrashIcon, MoreIcon } from "./../../../common/icons";
import { Flex } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Fragment, useState } from "@wordpress/element";
import SubmissionPreviewModal from "./SubmissionPreviewModal";
import useSubmissionsApi from "./hooks/useSubmissionAPI";

const { __ } = wp.i18n;

const EntriesActions = ({ record }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { updateSubmission, deleteSubmission } = useSubmissionsApi();
    const handlePreview = () => {
        setIsModalOpen(true);
    };
    const dropdownItem = [
        {
            key: "preview",
            label: __("Preview", "poptics"),
            icon: <EyeOutlined />,
            onClick: () => handlePreview(record),
        },
        {
            key: "trash",
            label: __("Trash", "poptics"),
            icon: <DeleteIcon />,
            onClick: () => updateSubmission(record?.id, "trash"),
        },
        {
            key: "delete",
            label: __("Delete", "poptics"),
            icon: <EmptyTrashIcon />,
            onClick: () => deleteSubmission(record?.id),
        },
    ];
    return (
        <Fragment>
            <Flex gap="small" wrap justify={"end"}>
                <Dropdown
                    menu={{
                        items: dropdownItem,
                    }}
                    placement="left"
                >
                    <Button type="text" text=<MoreIcon /> />
                </Dropdown>
            </Flex>
            <SubmissionPreviewModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                submissionInfo={record}
            />
        </Fragment>
    );
};

export default EntriesActions;
