import {
    TextInput,
    Description,
    Title,
    Form,
} from "../../../common/components";
import { welcomeItems, welcomeText } from "./constant";
import { WelcomeImage } from "../../../common/icons";
import { useOnboardingAPI } from "./useOnboardingAPI";
import OnboardFooter from "./OnboardFooter";
const { __ } = wp.i18n;

const Welcome = () => {
    const { createOnboarding } = useOnboardingAPI();

    const onFinish = async (welcomeValues) => {
        await createOnboarding(welcomeValues);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="pt-onboard-wizard-container">
            <Form
                name="welcome_form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="pt-onboard-items-container">
                    <WelcomeImage />
                    <Title
                        text={__("Welcome to Poptics", "poptics")}
                        className="pt-welcome-title"
                    />
                    <Description
                        id="pt-onboard-welcome-description"
                        text={welcomeText}
                    />

                    {welcomeItems?.map((welcomeItem) => (
                        <TextInput {...welcomeItem} />
                    ))}
                </div>

                {/* footer section */}
                <OnboardFooter />
            </Form>
        </div>
    );
};

export default Welcome;
