export default function getBrowserInfo() {
    const userAgent = navigator.userAgent;

    // Detect browser name
    let browserName = "Unknown";

    if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    } else if (
        userAgent.indexOf("Opera") > -1 ||
        userAgent.indexOf("OPR") > -1
    ) {
        browserName = "Opera";
    } else if (userAgent.indexOf("Edg") > -1) {
        browserName = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        if (userAgent.brave?.isBrave?.name === "isBrave") {
            browserName = "Brave";
        } else {
            browserName = "Google Chrome";
        }
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    }

    return browserName;
}
