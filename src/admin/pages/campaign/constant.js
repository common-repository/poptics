import { TEMPLATES_PATH } from "../../router/routeDefinition";
import popupImage from "../../../../images/admin/popup.jpg";

const { __ } = wp.i18n;

export const emptyCampaignData = {
    image: popupImage,
    videoId: "DQacCB9tDaw?si=Hf2-sd3DjUbqdPxY",
    title: __("Create Your First Popup", "poptics"),
    description: __(
        "Let's explore the ultimate popup mix to boost your website's conversions.",
        "poptics",
    ),
    listItem: [
        __("Niche based layout", "poptics"),
        __("Lightweight design", "poptics"),
        __("Gutenberg compatibility", "poptics"),
        __("Sales analytics", "poptics"),
    ],
    btnText: __("Create First Popup Campaign", "poptics"),
    btnLink: TEMPLATES_PATH,
};

export const mapClassNameToStatus = {
    draft: "pt-default-badge",
    active: "pt-primary-badge",
    publish: "pt-primary-badge",
    paused: "pt-warning-badge",
    completed: "pt-success-badge",
    scheduled: "pt-outline-badge",
    trash: "pt-trash-badge",
};
