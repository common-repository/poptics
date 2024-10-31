import { serializeData } from "../../helper";

const ShowHtml = ({ content }) => {
    const getHtml = () => {
        return { __html: serializeData(content) };
    };
    return <div dangerouslySetInnerHTML={getHtml()} />;
};

export default ShowHtml;
