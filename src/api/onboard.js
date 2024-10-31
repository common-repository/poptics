import ApiBase from "./api-base";

export default class Onboard extends ApiBase {
  prefix = "/poptics/v1/onboard";

  async createOnboard(data) {
    return this.post("", data);
  }
}
