import { useContext } from "@wordpress/element";
import { useNavigate } from "react-router-dom";
import { OnboardContext } from "./index";
import { Button, Link } from "../../../common/components";
import { CAMPAIGN_PATH } from "../../router/routeDefinition";
const { __ } = wp.i18n;

const OnboardFooter = () => {
    const { loading, currentStep } = useContext(OnboardContext);
    const navigate = useNavigate();
    return (
        <div className="pt-onboard-footer-container">
            <Link
                text={__(
                    `${currentStep === 3 ? "Skip & Explore" : "Skip"}`,
                    "poptics",
                )}
                onClick={() => navigate(CAMPAIGN_PATH)}
            />
            <Button
                aria-label={__("submit", "poptics")}
                text={__(
                    `${
                        currentStep === 3
                            ? "Create a popup campaign"
                            : "Continue"
                    }`,
                    "poptics",
                )}
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
            />
        </div>
    );
};

export default OnboardFooter;
