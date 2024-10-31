/**
 * WordPress dependencies
 */
import { forwardRef } from "@wordpress/element";

import { Button as AntdButton } from "antd";

/**
 *  Button component
 * @param {Object} props
 * @returns {JSX.Element}
 */

const Button = forwardRef((props, ref) => {
    const { children, text = "", ...rest } = props;
    return (
        <AntdButton ref={ref} {...rest}>
            {children || text}
        </AntdButton>
    );
});

export default Button;
