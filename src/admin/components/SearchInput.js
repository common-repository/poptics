/**
 * Wordpress Dependencies
 */
import { useState } from "@wordpress/element";

import { Input } from "../../common/components";
import { SearchIcon } from "../../common/icons";

const { __ } = wp.i18n;

const SearchInput = ({ searchFunc, placeholder }) => {
    const [loading, setLoading] = useState(false);

    const searchDebounce = function (fn, d) {
        let timer;
        return function (args) {
            let context = this;
            clearTimeout(timer);
            timer = setTimeout(async () => {
                setLoading(true);
                const res = await fn.apply(context, [{ search_key: args }]);
                if (res.complete) {
                    setLoading(false);
                }
            }, d);
        };
    };

    const searchHandler = searchDebounce(searchFunc, 500);

    return (
        <Input
            disabled={loading}
            size="large"
            className="pt-search-input"
            placeholder={placeholder || __("Search", "poptics")}
            prefix={<SearchIcon color="#6B7280" />}
            onChange={(e) => searchHandler(e.target.value)}
        />
    );
};

export default SearchInput;
