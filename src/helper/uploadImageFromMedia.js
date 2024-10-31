/**
 * Upload image form wordpress media
 * @param {*} event
 * @param {*} setImageUrl
 * @returns media
 */
const uploadImageFromMedia = (event, getImgURL, getImgID) => {
    event.preventDefault();

    var mediaUploader;

    if (mediaUploader) {
        mediaUploader.open();
        return;
    }

    mediaUploader = wp.media.frames.file_frame = wp.media({
        title: "Choose Image",
        button: {
            text: "Choose Image",
        },
        library: {
            type: ["image"],
        },
        multiple: false,
    });

    // When a file is selected, check if it's an image and then handle it
    mediaUploader.on("select", () => {
        const selection = mediaUploader.state().get("selection");
        if (selection.length > 0) {
            const selectedFile = selection.first().toJSON();
            if (selectedFile.mime && selectedFile.mime.startsWith("image")) {
                // Selected file is an image
                getImgURL(selectedFile.url);
                getImgID(selectedFile.id);
            } else {
                // Show an error message or handle the non-image file selection
                alert("Please select an image file.");
            }
        }
    });

    // Open the uploader dialog
    var media = mediaUploader.open();
    return media;
};

export default uploadImageFromMedia;
