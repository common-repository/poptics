export default function getDeviceType(params = {}) {
    const { replaceOthers = true } = params;

    const userAgent = navigator.userAgent;

    // Detect device type
    const isMobile = /Mobi|Android/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    let deviceType = "desktop";

    if (isTablet) {
        deviceType = replaceOthers ? "mobile" : "others";
    } else if (isMobile) {
        deviceType = "mobile";
    }
    return deviceType;
}
