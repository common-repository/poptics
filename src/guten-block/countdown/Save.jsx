import { useBlockProps } from "@wordpress/block-editor";
import CountdownBase from "./components/timerComponents/CountdownBase";
const Save = ({ attributes }) => {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <CountdownBase attributes={attributes} mode="save" />
        </div>
    );
};

export default Save;
