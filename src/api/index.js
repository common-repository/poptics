import Onboard from "./onboard";
import Campaign from "./campaign";
import Category from "./category";
import Template from "./templates";
import Analytics from "./analytics";
import Settings from "./settings";
import Submission from "./submissions";
import AnalyticsSubmissions from "./analytics-submissions";
import Remote from "./remote";

const Api = {
    onboard: new Onboard(),
    campaign: new Campaign(),
    category: new Category(),
    template: new Template(),
    analytics: new Analytics(),
    settings: new Settings(),
    submissions: new Submission(),
    leadCollection: new AnalyticsSubmissions(),
    remote: new Remote(),
};

export default Api;
