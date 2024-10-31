
import App from "./App";


 document.addEventListener("DOMContentLoaded", () => { 
 
    if (typeof wp !== 'undefined' && wp.blockLibrary && typeof wp.blockLibrary.registerCoreBlocks === 'function') {
        wp.blockLibrary.registerCoreBlocks();
    } 
    /**
     * Renders the poptics
     * in the frontend
     * @returns {void} */
    const rootEl = ReactDOM.createRoot(
        document.getElementById("poptics_dashboard"),
    );
    rootEl.render(<App />);
});