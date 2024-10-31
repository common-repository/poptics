import ApiBase from "./api-base";

export default class Submission extends ApiBase {
    prefix = "/poptics/v1/submissions";

    async allSubmissions(param = {}) {
        return this.get("", param);
    }
    async allSubmissionAgents() {
        const custom_path = "user-agent-info";
        return this.get(custom_path);
    }
    async updateSubmissionStatus(id, status) {
        return this.put(id, { status });
    }
    async deleteSingleSubmission(id) {
        return this.delete(id);
    }
    async bulkDeleteSubmission(ids) {
        return this.delete("", ids);
    }
}
