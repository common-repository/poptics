/**
 * WordPress dependencies
 */
import { useState, useEffect } from "@wordpress/element";

import BlockEditor from "./BlockEditor";
import TopActions from "./topActions";

const CustomBlockEditor = () => {
    const [clickOutside, setClickOutside] = useState(false);

    // Fetch single campaign data when component mounts.
    useEffect(() => {
        // Function to collapse the WordPress sidebar
        const collapseSidebar = () => {
            document.body?.classList?.add("folded");
        };

        collapseSidebar();
    }, []);

    return (
        <>
            <div onClick={() => setClickOutside(true)}>
                <TopActions />
            </div>
            <div onClick={() => setClickOutside(false)}>
                <BlockEditor clickOutside={clickOutside} />
            </div>
        </>
    );
};

export default CustomBlockEditor;
