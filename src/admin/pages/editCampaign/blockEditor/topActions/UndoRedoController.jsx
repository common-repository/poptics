/**
 * WordPress dependencies
 */
import { UndoOutlined, RedoOutlined } from "@ant-design/icons";

import { Flex } from "antd";
import { Button } from "../../../../../common/components";

const { __ } = wp.i18n;

const UndoRedoController = (props) => {
    const { undo, redo, hasUndo, hasRedo } = props;

    return (
        <Flex align="center" gap="small" className="pt-float-controller">
            {/* Undo Button */}
            <Button
                aria-label={__("undo button", "poptics")}
                onClick={undo}
                disabled={!hasUndo}
                icon={<UndoOutlined />}
                title="Undo"
            />
            {/* Redo Button */}
            <Button
                aria-label={__("redo button", "poptics")}
                onClick={redo}
                disabled={!hasRedo}
                icon={<RedoOutlined />}
                title="Redo"
            />
        </Flex>
    );
};

export default UndoRedoController;
