import { timezoneToCountry } from "../globalConstant";

export default function getCountryName() {
    const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
    const country = timezoneToCountry[timezone] || "Unknown";

    return country;
}
