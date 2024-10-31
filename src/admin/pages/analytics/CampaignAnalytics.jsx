import { useContext } from "@wordpress/element";
import { Col, ConfigProvider, Flex, Row } from "antd";

import { CombinedChart, IconPieChart } from "./Chart";
import { analyticsTheme } from "../../../theme/theme";
import ItemContainer from "./ItemContainer";
import { Title } from "../../../common/components";

import {
    getDevicePieData,
    getCardViewDataWithIcon,
    analyticsProTable,
} from "./constant";
import NumberCard from "./NumberCard";

import SearchFilter from "./SearchFilter";
import { AnalyticsContext } from "./withAnalyticsData";
import ProTable from "./ProTable";

const { __ } = wp.i18n;

const CampaignAnalytics = () => {
    const { statisticalAnalysis } = useContext(AnalyticsContext);

    return (
        <ConfigProvider theme={analyticsTheme}>
            {/*page container*/}
            <Flex vertical gap={30}>
                {/*filter container */}
                <SearchFilter />

                {/*card container */}
                <Row gutter={[16, 20]} justify="space-between">
                    {/*Numbers card container */}
                    <Col span={24}>
                        <Row gutter={[16, 20]}>
                            {getCardViewDataWithIcon()?.map((singleCard) => (
                                <Col xs={24} md={12} lg={6}>
                                    <NumberCard
                                        number={singleCard?.number}
                                        icon={singleCard?.icon}
                                        title={singleCard?.title}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                {/*charts row container */}
                <Row gutter={[20, 20]}>
                    {/*combine charts */}
                    <Col xs={24} xl={11}>
                        <ItemContainer
                            title={__("Statistics", "poptics")}
                            item={<CombinedChart data={statisticalAnalysis} />}
                        />
                    </Col>

                    {/*pie chart */}
                    <Col xs={24} xl={13}>
                        <Title
                            text={__("Devices", "poptics")}
                            className="pt-item-container-title"
                        />

                        <Row gap={4} gutter={[20, 20]}>
                            {getDevicePieData()?.map((eachDevice) => {
                                const isAllValueZero = eachDevice.data.every(
                                    (item) => item.value === 0,
                                );

                                const allZero = {
                                    name: "No Data Available",
                                    value: 100,
                                    fill: "#0000000F",
                                };
                                return (
                                    <Col xs={24} md={12} lg={8}>
                                        <IconPieChart
                                            icon={eachDevice?.icon}
                                            text={eachDevice?.text}
                                            data={
                                                isAllValueZero
                                                    ? [
                                                          ...eachDevice?.data,
                                                          allZero,
                                                      ]
                                                    : eachDevice?.data
                                            }
                                            backgroundColor={
                                                eachDevice?.backgroundColor
                                            }
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>

                {/*Top Country row container */}
                <Row gutter={20}>
                    {analyticsProTable.map((tableData) => (
                        <ProTable tableData={tableData} key={tableData.title} />
                    ))}
                </Row>
            </Flex>
        </ConfigProvider>
    );
};

export default CampaignAnalytics;
