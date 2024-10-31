import ApiBase from "./api-base";

export default class Category extends ApiBase {
    prefix = "/poptics/v1/categories";

    async getCategories(params = {}, isRemote = false) {
        return this.get("", params, isRemote);
    }
}
