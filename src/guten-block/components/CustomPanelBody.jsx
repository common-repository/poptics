/**
 * WordPress dependencies
 */
import { PanelBody } from "@wordpress/components";

import { Flex } from "antd";
import SettingsItem from "./SettingsItem";

/**
 * CustomPanelBody Component
 *
 * A wrapper component around WordPress's `PanelBody` component. It provides a flexible
 * layout for settings items by leveraging Ant Design's `Flex` component to arrange the
 * contents either vertically or horizontally. The `CustomPanelBody` can render either
 * children passed directly or dynamically generated fields using `SettingsItem`.
 *
 * Props:
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title for the `PanelBody`. It is displayed in the
 *   panel's header.
 * @param {boolean} [props.initialOpen] - Controls whether the panel is initially expanded or collapsed.
 * @param {string} [props.className=""] - Additional custom CSS classes for the container.
 * @param {Array} [props.settingsFields] - An array of objects representing settings fields
 *   to be rendered using the `SettingsItem` component. Each object should contain:
 *   - `label`: A string representing the label of the setting.
 *   - `field`: The associated input/control element to render for that setting.
 *   - `vertical`: A boolean determining the layout direction for the setting (defaults to `true`).
 *   - `isApplicable`: A boolean flag to conditionally render the setting.
 * @param {React.ReactNode} [props.children] - Optional children components to be rendered inside the `PanelBody`.
 *
 * Functionality:
 * - The component wraps the contents in WordPress's `PanelBody` for structured display.
 * - Inside the `PanelBody`, it uses Ant Design's `Flex` component for flexible layouts.
 * - If `children` is passed, it directly renders them. If not, it maps over `settingsFields`
 *   to dynamically generate settings items using the `SettingsItem` component.
 * - Each `SettingsItem` component is rendered based on the passed `settingsFields` array.
 */

const CustomPanelBody = (props) => {
    const {
        title,
        initialOpen,
        className = "",
        settingsFields,
        children,
    } = props;

    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            <Flex
                vertical
                gap="small"
                className={`pt-style-settings-panel-body ${className}`}
            >
                {children ||
                    settingsFields?.map((item) => (
                        <SettingsItem key={item.label} {...item} />
                    ))}
            </Flex>
        </PanelBody>
    );
};

export default CustomPanelBody;
