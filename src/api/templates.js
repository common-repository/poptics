import ApiBase from "./api-base";

export default class Template extends ApiBase {
    prefix = "/poptics/v1/templates";

    async getTemplates(params = {}, isRemote = false) {
        return this.get("", params, isRemote);
    }

    async singleTemplate(id, params = {}, isRemote = false) {
        return this.get(id, params, isRemote);
    }
}
