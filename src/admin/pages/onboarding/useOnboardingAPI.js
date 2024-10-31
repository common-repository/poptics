import { useContext } from "@wordpress/element";
import Api from "../../../api";
import { OnboardContext } from "./index";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_PATH } from "../../router/routeDefinition";

const useOnboardingAPI = () => {
    const { currentStep, setCurrentStep, setLoading } =
        useContext(OnboardContext);
    const navigate = useNavigate();

    // do not create onboarding if email is missing in 1st step;
    // navigate to home page in 3rd step
    const createOnboarding = async (values) => {
        try {
            setLoading(true);
            if (currentStep === 1) {
                values?.email && (await Api?.onboard.createOnboard(values));
            } else {
                await Api?.onboard.createOnboard(values);
            }
            currentStep === 3
                ? navigate(CAMPAIGN_PATH)
                : setCurrentStep((currentStep) => currentStep + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { createOnboarding };
};

export { useOnboardingAPI };
