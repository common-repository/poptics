import { Avatar } from "antd";
import { Text } from "../../common/components";
const { __ } = wp.i18n;

// Component to display category information including an icon and term_name.
export const CategoryInfo = ({ type, className = "" }) => {
    const { icon = null, term_name = "", name = "" } = type || {};

    if (!name && !term_name) return null;

    return (
        <div className="pt-popup-type-outline">
            <div className={`pt-types-wrapper ${className}`}>
                {icon ? (
                    <Avatar alt={__("logo", "poptics")} size={20} src={icon} />
                ) : null}
                <Text text={term_name || name} />
            </div>
        </div>
    );
};

export default CategoryInfo;
