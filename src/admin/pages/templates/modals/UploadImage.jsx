import { Flex, Space, Avatar } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import uploadImageFromMedia from "./../../../../helper/uploadImageFromMedia";
import Button from "./../../../../common/components/Button";

const { __ } = wp.i18n;

const UploadImage = (props) => {
    const { thumbnail = "", setThumbnailId, setThumbnail } = props;

    // Set the thumbnail and thumbnail id to null while thumbnail will be removed
    const handleRemoveIcon = (event) => {
        event.preventDefault();
        setThumbnail(false);
        setThumbnailId();
    };
    return (
        <Space align="center" size="middle" className="pt-mb-10">
            {thumbnail ? (
                <Avatar
                    size={30}
                    src={thumbnail}
                    alt={__("thumbnail", "poptics")}
                />
            ) : (
                <Avatar size={30} thumbnail={<SelectOutlined />} />
            )}
            <Flex gap={"middle"}>
                <Button
                    aria-label={__("Add Button", "poptics")}
                    onClick={(event) =>
                        uploadImageFromMedia(
                            event,
                            setThumbnail,
                            setThumbnailId,
                        )
                    }
                    text={__(
                        `${thumbnail ? "Change Thumbnail" : "Add Thumbnail"}`,
                        "poptics",
                    )}
                />
                {thumbnail && (
                    <Button
                        aria-label={__("Remove Button", "poptics")}
                        onClick={handleRemoveIcon}
                    >
                        {__("Remove", "poptics")}
                    </Button>
                )}
            </Flex>
        </Space>
    );
};

export default UploadImage;
