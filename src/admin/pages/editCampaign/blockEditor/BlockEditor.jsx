/**
 * WordPress dependencies
 */
import { useContext, useEffect, useState } from "@wordpress/element";
import { useStateWithHistory } from "@wordpress/compose";
import {
    BlockEditorKeyboardShortcuts,
    BlockEditorProvider,
    BlockList,
    BlockTools,
    BlockInspector,
    WritingFlow,
    ObserveTyping,
} from "@wordpress/block-editor";
import { Popover, SlotFillProvider } from "@wordpress/components";
import { ShortcutProvider } from "@wordpress/keyboard-shortcuts";

import Sidebar from "./Sidebar";
import { Col, Flex, Row } from "antd";
import { SingleCampaignContext } from "../withSingleCampaignData";
import useProcessCampaignEditData from "../hooks/useProcessCampaignEditData";
import useBlockEditorSettings from "../hooks/useBlockEditorSettings";
import DevicePreviewBtn from "../../../components/DevicePreviewBtn";
import {
    defaultDesktopBlock,
    defaultMobileBlock,
} from "../../../../globalConstant";
import UndoRedoController from "./topActions/UndoRedoController";
import DeviceChangeAlert from "./DeviceChangeAlert";

function BlockEditor({ clickOutside }) {
    const { processStepData } = useProcessCampaignEditData();
    const { settings } = useBlockEditorSettings();

    // Context for accessing and updating campaign data.
    const {
        editorStep,
        deviceType,
        campaign,
        customDesignOn,
        setCampaignStates,
    } = useContext(SingleCampaignContext);

    const [isCustomDesign, setIsCustomDesign] = useState(null);

    /**
     * Finds and sets the focus on the style block within the current step's content.
     *
     * @returns {Object} - An object containing the updated blocks and the selection details.
     */
    const focusOnStyleBlock = () => {
        const blocks = campaign?.steps?.[editorStep]?.[deviceType]?.content;
        let updatedBlocks = [...blocks];

        // Find the style-settings block in the list of blocks.
        let styleBlock = updatedBlocks.find(
            (block) => block.name === "poptics/style-settings",
        );

        // Extract the client ID of the style block, if it exists.
        const clientId = styleBlock?.clientId;

        // Return an object with the updated blocks and selection details.
        return {
            blocks: updatedBlocks,
            selection: {
                selectionStart: { clientId },
                selectionEnd: { clientId },
                initialPosition: 0,
            },
        };
    };

    // State for managing block history
    const { value, setValue, hasUndo, hasRedo, undo, redo } =
        useStateWithHistory({
            blocks: [],
        });

    /**
     * Updates blocks and triggers processing of step data.
     *
     * @param {Array} blocks - Updated blocks.
     * @param {Object} selection - Current selection object.
     * @param {Boolean} isStaged - A flag indicating if the update should be staged
     */
    const handleUpdateBlocks = (blocks, selection, isStaged) => {
        let newBlocks = blocks;

        // If there's only one block and it is a core/paragraph block, reset it to the default block
        if (blocks.length === 1 && blocks[0]?.name === "core/paragraph") {
            newBlocks =
                deviceType === "desktop"
                    ? defaultDesktopBlock
                    : defaultMobileBlock;
        }

        setValue({ blocks: newBlocks, selection }, isStaged);
        processStepData(newBlocks);
    };

    // Set selection null if clicked outside
    const handleClickOutside = () => {
        setValue(
            {
                blocks: [...value.blocks],
                selection: {
                    selectionStart: {
                        clientId: null,
                    },
                    selectionEnd: {
                        clientId: null,
                    },
                    initialPosition: 0,
                },
            },
            true,
        );
    };

    useEffect(() => {
        if (clickOutside) {
            handleClickOutside();
        }
    }, [clickOutside]);

    useEffect(() => {
        //set blocks and selection for current deviceType with no undo action
        setValue(focusOnStyleBlock(), true);
    }, [deviceType, isCustomDesign]);

    return (
        <ShortcutProvider>
            <SlotFillProvider>
                <BlockEditorProvider
                    value={value.blocks}
                    selection={value.selection}
                    onInput={(blocks, { selection }) =>
                        handleUpdateBlocks(blocks, selection, false)
                    }
                    onChange={(blocks, { selection }) =>
                        handleUpdateBlocks(blocks, selection, false)
                    }
                    settings={settings}
                    useSubRegistry={true}
                >
                    {/* Main Block Editor Layout */}
                    <Row className="pt-block-editor-layout">
                        {/* Main Editor Area */}
                        <Col xs={24} sm={24} md={18}>
                            <Flex
                                vertical
                                justify="space-between"
                                className="pt-block-editor-left"
                            >
                                <div className="getdavesbe-block-editor">
                                    <div
                                        className={`editor-styles-wrapper editor-${deviceType}-styles-wrapper`}
                                    >
                                        <BlockEditorKeyboardShortcuts.Register />
                                        <BlockTools>
                                            <WritingFlow>
                                                <ObserveTyping>
                                                    <BlockList />
                                                </ObserveTyping>
                                            </WritingFlow>
                                        </BlockTools>

                                        {!customDesignOn ? (
                                            <DeviceChangeAlert
                                                setIsCustomDesign={
                                                    setIsCustomDesign
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </div>

                                <UndoRedoController
                                    hasUndo={hasUndo}
                                    hasRedo={hasRedo}
                                    undo={undo}
                                    redo={redo}
                                />

                                {/* Device Preview Button */}
                                <DevicePreviewBtn
                                    deviceType={deviceType}
                                    setDeviceType={setCampaignStates}
                                    float={true}
                                />
                            </Flex>
                        </Col>

                        {/* Sidebar Area */}
                        <Col xs={0} sm={0} md={6}>
                            {/* Sidebar for Block Inspector */}
                            <Sidebar.InspectorFill>
                                <BlockInspector />
                            </Sidebar.InspectorFill>
                            <Sidebar />
                        </Col>
                    </Row>
                </BlockEditorProvider>

                {/* Popover Slot */}
                <Popover.Slot />
            </SlotFillProvider>
        </ShortcutProvider>
    );
}

export default BlockEditor;
