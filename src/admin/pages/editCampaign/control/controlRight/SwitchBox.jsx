/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, Space } from "antd";
import { Card, Switch, Text } from "../../../../../common/components";
import useProcessCampaignEditData from "../../hooks/useProcessCampaignEditData";
import { SingleCampaignContext } from "../../withSingleCampaignData";
import ProTag from "../../../../components/ProTag";
import { AdminContext } from "../../../../withAdminData";

const SwitchBox = (props) => {
    const { label, subText, form, field, isPro = false } = props;

    // Context for accessing and updating campaign data.
    const { campaign } = useContext(SingleCampaignContext);
    const { processControlData } = useProcessCampaignEditData();

    const { isProActivated } = useContext(AdminContext);

    const initialValue =
        campaign?.controls?.[form]?.[field]?.value === true || false;

    const onClick = (value) => {
        processControlData({ form, field, value: { value } });
    };

    return (
        <Card bordered={false}>
            <Flex gap="small" align="center" justify={"space-between"}>
                <Space direction="vertical" size={0}>
                    <Text
                        text={
                            isPro && !isProActivated ? (
                                <Space wrap>
                                    {label}
                                    <ProTag />
                                </Space>
                            ) : (
                                label
                            )
                        }
                        className="pt-control-title"
                    />
                    <Text text={subText} className="pt-control-description" />
                </Space>
                <Switch
                    checked={initialValue}
                    onClick={onClick}
                    disabled={isPro && !isProActivated}
                />
            </Flex>
        </Card>
    );
};

export default SwitchBox;
