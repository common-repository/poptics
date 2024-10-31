/**
 * WordPress dependencies
 */
import { useContext } from "@wordpress/element";
import { useStateWithHistory } from "@wordpress/compose";
import {
    BlockEditorKeyboardShortcuts,
    BlockEditorProvider,
    BlockList,
    BlockTools,
    WritingFlow,
    ObserveTyping,
} from "@wordpress/block-editor";
import { Popover, SlotFillProvider } from "@wordpress/components";
import { ShortcutProvider } from "@wordpress/keyboard-shortcuts";

const { __ } = wp.i18n;

import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import { Card, TextInput } from "../../../../../../common/components";
import useBlockEditorSettings from "../../../hooks/useBlockEditorSettings";

function CustomRichTextEditor() {
    const { settings } = useBlockEditorSettings();

    const { processControlData } = useProcessCampaignEditData();

    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const auto_response = campaign?.controls?.auto_response?.email;

    // State for managing block history
    const { value, setValue } = useStateWithHistory({
        blocks: auto_response?.email_body || [],
    });

    /**
     * Wrapper for updating blocks.
     * Required to avoid React error due to multiple arguments passed to onInput callback.
     *
     * @param {Array} blocks - Updated blocks
     * @param {Object} selection - Current selection
     * @param {Boolean} shouldRecord - Whether to record this change in history
     */
    const handleUpdateBlocks = (blocks, selection, shouldRecord) => {
        setValue({ blocks, selection }, shouldRecord);
        processControlData({
            form: "auto_response",
            field: "email",
            value: { email_body: blocks },
        });
    };

    const handleSubjectChange = (e) => {
        const subject = e.target.value;
        processControlData({
            form: "auto_response",
            field: "email",
            value: { subject },
        });
    };

    return (
        <ShortcutProvider>
            <SlotFillProvider>
                <BlockEditorProvider
                    value={value.blocks}
                    selection={value.selection}
                    onInput={(blocks, { selection }) =>
                        handleUpdateBlocks(blocks, selection, true)
                    }
                    onChange={(blocks, { selection }) =>
                        handleUpdateBlocks(blocks, selection, false)
                    }
                    settings={settings}
                    useSubRegistry={true}
                >
                    {/* Main Block Editor Layout */}
                    <Card>
                        <TextInput
                            value={auto_response?.subject}
                            onChange={handleSubjectChange}
                            placeholder={__("Subject", "poptics")}
                        />
                        <BlockEditorKeyboardShortcuts.Register />
                        <Card>
                            <BlockTools>
                                <WritingFlow>
                                    <ObserveTyping>
                                        <BlockList />
                                    </ObserveTyping>
                                </WritingFlow>
                            </BlockTools>
                        </Card>
                    </Card>
                </BlockEditorProvider>

                {/* Popover Slot */}
                <Popover.Slot />
            </SlotFillProvider>
        </ShortcutProvider>
    );
}

export default CustomRichTextEditor;
