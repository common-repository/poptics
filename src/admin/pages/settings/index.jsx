/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import SettingsForm from "./SettingsForm";
import withSettingsData from "./withSettingsData";
import { Flex } from "antd";
import { RowSkeleton, Title } from "../../../common/components";
import { AdminContext } from "../../withAdminData";

const { __ } = wp.i18n;

const Settings = () => {
    const { settings } = useContext(AdminContext);

    return (
        <RowSkeleton loading={!settings}>
            <Flex vertical gap="large">
                <Title
                    level={3}
                    text={__("Settings", "poptics")}
                    className="pt-page-heading"
                />
                <SettingsForm />
            </Flex>
        </RowSkeleton>
    );
};

export default withSettingsData(Settings);
