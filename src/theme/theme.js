export const theme = {
    token: {
        colorPrimary: "#2563eb",
        colorInfo: "#2563eb",
        colorSuccess: "#14b8a6",
        colorWarning: "#eab308",
        colorText: "#030712",
        colorTextTertiary: "#4b5563",
        colorBorder: "#e5e7eb",
        colorFillSecondary: "#f3f4f6",
        colorTextQuaternary: "#d1d5db",
        colorTextBase: "#030712",
    },
    components: {
        Tag: {
            defaultBg: "rgb(156, 163, 175)",
            defaultColor: "rgb(255, 255, 255)",
            borderRadiusSM: 12,
        },
        Pagination: {
            itemActiveBg: "rgb(229, 231, 235)",
            colorText: "rgb(107, 114, 128)",
        },
        Checkbox: {
            controlInteractiveSize: 14,
            paddingXS: 10,
            lineHeight: 1.5,
        },
        Typography: {
            fontSizeHeading1: 40,
        },
        Button: {
            controlHeightLG: 46,
        },
        // Modal: { margin: 0, padding: 0 },
        Tabs: {
            inkBarColor: "rgba(22, 119, 255, 0)",
            lineType: "",
            colorBorder: "rgba(217, 217, 217, 0)",
            colorBorderSecondary: "rgba(240, 240, 240, 0)",
            cardBg: "rgba(255, 255, 255, 0)",
            motionDurationMid: "0.4s",
        },
    },
};

export const analyticsTheme = {
    components: {
        Table: {
            borderColor: "rgb(229, 231, 235)",
            headerBg: "rgb(255, 255, 255)",
            headerColor: "rgb(107, 114, 128)",
            colorText: "rgb(31, 41, 55)",
            colorPrimary: "rgb(9, 109, 217)",
            headerSplitColor: "rgba(240, 240, 240, 0)",
            borderRadius: 12,
            cellFontSize: 12,
        },
        Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
        },
    },
};
