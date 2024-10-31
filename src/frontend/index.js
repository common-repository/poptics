/**
 * WordPress Dependencies
 */
import { registerCoreBlocks } from "@wordpress/block-library";

import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
    // Register core WordPress blocks.
    registerCoreBlocks();

    /**
     * Renders the poptics
     * in the frontend
     * @returns {void} */
    const rootEl = ReactDOM.createRoot(
        document.getElementById("poptics-popup-wrapper"),
    );

    rootEl.render(<App />);
});
