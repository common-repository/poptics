import ApiBase from "./api-base";

export default class Settings extends ApiBase {
    prefix = "/poptics/v1/settings";

    async addSettings(settings = {}) {
        return this.post("", settings);
    }
    async getSettings() {
        return this.get("");
    }
}
