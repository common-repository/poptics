import { Col, DatePicker, Row, Spin } from "antd";
import { SelectInput, Text } from "../../../common/components";

import {
    campaignsOptions,
    getDateRange,
    timeSpanItems,
    timeSpanValue,
} from "./constant";
import useAnalyticsApi from "./hooks/useAnalyticsApi";
import { AnalyticsContext } from "./withAnalyticsData";
import { useEffect, useContext } from "@wordpress/element";
const { RangePicker } = DatePicker;
const { __ } = wp.i18n;

const SearchFilter = () => {
    const { getAnalytics, getCampaigns } = useAnalyticsApi();
    const { setAnalyticsStates } = useContext(AnalyticsContext);

    const onSelectHandler = (value) => {
        setAnalyticsStates((preVal) => ({ ...preVal, dateRange: value }));
        getAnalytics({ date_range: value });
    };

    const onRangePickerHandler = (value) => {
        const dateRange = getDateRange(
            timeSpanValue.custom,
            value[0]["$d"],
            value[1]["$d"],
        );

        setAnalyticsStates((preVal) => ({ ...preVal, dateRange }));
        getAnalytics({ date_range: dateRange });
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    const onCampaignChange = (value) => {
        setAnalyticsStates((preVal) => ({ ...preVal, campaignId: value }));
        getAnalytics({ campaign_id: value });
    };

    return (
        <Row align="middle" justify="space-between" gutter={[15, 15]}>
            {/* left section */}
            <Col lg={11}>
                <Row align="middle" justify="space-between" gutter={[15, 15]}>
                    {/* page title */}
                    <Col lg={6}>
                        <Text
                            className="pt-analytics-top-title"
                            text={__("Analytics", "poptics")}
                        />
                    </Col>
                    <Col lg={18}>
                        <SelectInput
                            placeholder={__("Select Campaign", "poptics")}
                            {...(!campaignsOptions() && {
                                notFoundContent: <Spin size="small" />,
                            })}
                            options={campaignsOptions()}
                            onChange={onCampaignChange}
                        />
                    </Col>
                </Row>
            </Col>

            {/* right section */}
            <Col lg={13}>
                <Row
                    align="middle"
                    gutter={[15, 15]}
                    justify={{ xs: "start", lg: "end" }}
                >
                    <Col>
                        <SelectInput
                            placeholder={__("This Month", "poptics")}
                            options={timeSpanItems}
                            onChange={(value) => {
                                onSelectHandler(value);
                            }}
                        />
                    </Col>
                    <Col>
                        <Text
                            text={__("Or select", "poptics")}
                            className="pt-analytics-secondary-text"
                        />
                    </Col>
                    <Col>
                        <RangePicker
                            placeholder={["DD/MM/YY", "DD/MM/YY"]}
                            onChange={(value) => {
                                onRangePickerHandler(value);
                            }}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default SearchFilter;
