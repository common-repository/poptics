import ApiBase from "./api-base";

export default class Analytics extends ApiBase {
    prefix = "/poptics/v1/analytics";

    async getAnalytics(params) {
        return this.get("", params);
    }
}
