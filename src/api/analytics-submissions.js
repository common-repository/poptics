import ApiBase from "./api-base";

export default class AnalyticsSubmissions extends ApiBase {
    prefix = "/poptics/v1/store-submission-analytics";

    async storeAnalytics(data) {
        return this.post("", data);
    }
}
