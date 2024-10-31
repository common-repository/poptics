import { Text } from "../../common/components";

const { __ } = wp.i18n;

const TableContentCount = (props) => {
    const { total, paged, per_page } = props;

    const startIndex = (paged - 1) * per_page + 1;
    const endIndex = Math.min(paged * per_page, total);

    return (
        <Text
            className="pt-campaign-count-text"
            text={__(
                `Showing ${startIndex || ""} to ${
                    endIndex || ""
                } of ${total} entries`,
                "poptics",
            )}
        />
    );
};

export default TableContentCount;
