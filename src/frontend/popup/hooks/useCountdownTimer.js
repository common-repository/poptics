/**
 * WordPress Dependencies
 */
import { useEffect, createRoot } from "@wordpress/element";

import CountdownBase from "../../../guten-block/countdown/components/timerComponents/CountdownBase";

const useCountdownTimer = ({ isOpen, id }) => {
    useEffect(() => {
        // Get the campaign container element by its unique ID.
        const campaignContainer = document.getElementById(
            `poptics-campaign-${id}`,
        );
        if (!campaignContainer) return;

        const countdownElement =
            campaignContainer.querySelector("#popticsCountdown");

        if (!countdownElement) return;

        // Get the value of the "data-countdown" attribute
        const dataCountdownValue = JSON.parse(
            countdownElement.getAttribute("data-countdown") || "",
        );

        // Create a root and render the <CustomCounter /> component into it
        const root = createRoot(countdownElement);
        root.render(<CountdownBase {...(dataCountdownValue || {})} />);
    }, [isOpen]);
};

export default useCountdownTimer;
