import ApiBase from "./api-base";

export default class Remote extends ApiBase {
    prefix = "/poptics/v1/remote";

    async getTemplates(params = {}) {
        const custom_path = "templates";
        return this.get(custom_path, params);
    }

    async getCategories(params = {}) {
        const custom_path = "categories";
        return this.get(custom_path, params);
    }
}
