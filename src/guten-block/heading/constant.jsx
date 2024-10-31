import {
    SettingOutlined,
    EditOutlined,
    BgColorsOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from "@ant-design/icons";
import ContentPanelBody from "./right-side-settings/ContentPanelBody";
import StylePanelBody from "./right-side-settings/StylePanelBody";
import AdvancedPanelBody from "./right-side-settings/AdvancedPanelBody";
const { __ } = wp.i18n;

export const headingAttributes = "";

export const items = [
    {
        label: __("Content", "poptics"),
        key: "content",
        icon: <EditOutlined />,
    },
    {
        label: __("Style", "poptics"),
        key: "style",
        icon: <BgColorsOutlined />,
    },
    {
        label: __("Advanced", "poptics"),
        key: "advanced",
        icon: <SettingOutlined />,
    },
];

export const menuItems = {
    content: <ContentPanelBody />,
    style: <StylePanelBody />,
    advanced: <AdvancedPanelBody />,
};

export const htmlTypeOptions = [
    {
        key: "h1",
        name: "H1",
        style: { fontSize: "150%", padding: "0px 8px", marginBottom: "0px" },
    },
    {
        key: "h2",
        name: "H2",
        style: { fontSize: "145%", padding: "0px 8px", marginBottom: "0px" },
    },
    {
        key: "h3",
        name: "H3",
        style: { fontSize: "140%", padding: "0px 8px", marginBottom: "0px" },
    },
    {
        key: "h4",
        name: "H4",
        style: { fontSize: "135%", padding: "0px 8px", marginBottom: "0px" },
    },
    {
        key: "h5",
        name: "H5",
        style: { fontSize: "120%", padding: "0px 8px", marginBottom: "0px" },
    },
    {
        key: "p",
        name: "p",
        style: { fontSize: "120%", padding: "0px 8px", marginBottom: "0px" },
    },
    {
        key: "span",
        name: "span",
        style: { fontSize: "110%", padding: "0px 8px", marginBottom: "0px" },
    },
];
export const fontFamilyOptions = [
    {
        key: "Dm Sans",
        name: "Dm Sans",
    },
    {
        key: "Inter",
        name: "Inter",
    },
    {
        key: "Space Mono",
        name: "Space Mono",
    },
    {
        key: "Space Grotesk",
        name: "Space Grotesk",
    },
    {
        key: "Syne",
        name: "Syne",
    },
    {
        key: "Libre Franklin",
        name: "Libre Franklin",
    },
    {
        key: "Eczar",
        name: "Eczar",
    },
];
export const fontWeightOptions = [
    {
        key: "Default",
        name: "Default",
    },
    {
        key: "400",
        name: "400",
    },
    {
        key: "Initial",
        name: "Initial",
    },
    {
        key: "Inherit",
        name: "Inherit",
    },
];

export const units = [
    {
        a11yLabel: __("Pixels (px)", "poptics"),
        label: "px",
        step: 1,
        value: "px",
    },
    {
        a11yLabel: __("Rems (rem)", "poptics"),
        label: "rem",
        step: 0.1,
        value: "rem",
    },
    {
        a11yLabel: __("Ems (em)", "poptics"),
        label: "em",
        step: 0.1,
        value: "em",
    },
];

export const fontFamilies = [
    {
        fontFace: [
            {
                fontFamily: "Inter",
                fontStretch: "normal",
                fontStyle: "normal",
                fontWeight: "200 900",
                src: [
                    "file:./assets/fonts/inter/Inter-VariableFont_slnt,wght.ttf",
                ],
            },
        ],
        fontFamily: '"Inter", sans-serif',
        name: "Inter",
        slug: "inter",
    },
    {
        fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        name: "System Font",
        slug: "system-font",
    },
];

export const positionOptions = [
    {
        key: "default",
        name: "Default",
    },
    {
        key: "fixed",
        name: "Fixed",
    },
    {
        key: "absolute",
        name: "Absolute",
    },
];

export const horizontalOrientationOptions = [
    {
        value: "left",
        icon: <ArrowLeftOutlined />,
    },
    {
        value: "right",
        icon: <ArrowRightOutlined />,
    },
];
export const verticalOrientationOptions = [
    {
        value: "up",
        icon: <ArrowUpOutlined />,
    },
    {
        value: "down",
        icon: <ArrowDownOutlined />,
    },
];

export const gradientValues = [
    {
        name: "JShine",
        gradient: "linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)",
        slug: "jshine",
    },
    {
        name: "Moonlit Asteroid",
        gradient:
            "linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)",
        slug: "moonlit-asteroid",
    },
    {
        name: "Rastafarie",
        gradient:
            "linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)",
        slug: "rastafari",
    },
];

export const entranceAnimationOptions = [
    {
        key: "bounce",
        name: "Bounce",
    },
    {
        key: "flash",
        name: "Flash",
    },
    {
        key: "pulse",
        name: "Pulse",
    },
    {
        key: "rubberBand",
        name: "RubberBand",
    },
    {
        key: "scaleX",
        name: "ScaleX",
    },
    {
        key: "scaleY",
        name: "ScaleY",
    },
];

export const animationDirectionOptions = [
    {
        key: "default",
        name: "Default",
    },
    {
        key: "reverse",
        name: "Reverse",
    },
    {
        key: "alternate",
        name: "Alternate",
    },
];
