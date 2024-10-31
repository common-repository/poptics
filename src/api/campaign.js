import ApiBase from "./api-base";

export default class Campaign extends ApiBase {
    prefix = "/poptics/v1/campaign";

    async allCampaigns(params = {}) {
        return this.get("", params);
    }

    async singleCampaign(id, params = {}, isRemote = false) {
        return this.get(id, params, isRemote);
    }

    async createCampaign(data) {
        return this.post("", data);
    }

    async cloneCampaign(id) {
        const custom_path = `${id}/clone`;
        return this.post(custom_path);
    }

    async updateCampaign(id, data) {
        return this.put(id, data);
    }

    async deleteSingleCampaign(id) {
        return this.delete(id);
    }

    async bulkDeleteCampaign(ids) {
        return this.delete("", ids);
    }

    async sendTestMail(data) {
        const custom_path = `email/test`;
        return this.post(custom_path, data);
    }
}
