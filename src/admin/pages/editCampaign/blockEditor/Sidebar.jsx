/**
 * WordPress dependencies
 */
import { createSlotFill, Panel } from "@wordpress/components";

import { Text } from "../../../../common/components";

const { __ } = wp.i18n;

// Create SlotFill for Sidebar Inspector
const { Slot: InspectorSlot, Fill: InspectorFill } = createSlotFill(
    "StandAloneBlockEditorSidebarInspector",
);

/**
 * Sidebar component for displaying advanced block settings.
 */
function Sidebar() {
    return (
        <div
            className="pt-block-editor-sidebar"
            role="region"
            aria-label={__(
                "Standalone Block Editor advanced settings.",
                "poptics",
            )}
            tabIndex="-1"
        >
            <Panel header={<Text text={__("Block Settings", "poptics")} />}>
                {/* InspectorSlot for displaying block inspector components */}
                <InspectorSlot bubblesVirtually />
            </Panel>
        </div>
    );
}

// Export InspectorFill for consuming in other components
Sidebar.InspectorFill = InspectorFill;

export default Sidebar;
