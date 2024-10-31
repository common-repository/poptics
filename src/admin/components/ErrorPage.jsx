import { ErrorIcon } from "../../common/icons";
import { Button } from "antd";

const { __ } = wp.i18n;

const ErrorPage = () => {
    return (
        <div className="pt-error-page-wrapper">
            <div className="pt-error-content">
                <div className="pt-error-icon">
                    <ErrorIcon width="60" height="60" />
                </div>
                <h3>{__("Ooops! Something's Wrong. ", "poptics")}</h3>
                <p>
                    {__(
                        "Please try again or let us know if the issue's still here.",
                        "poptics",
                    )}
                </p>
                <Button
                    aria-label={__("try again", "poptics")}
                    onClick={(e) => location.reload()}
                    className="pt-mt-30"
                    type="primary"
                >
                    {__("Try Again", "poptics")}
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
