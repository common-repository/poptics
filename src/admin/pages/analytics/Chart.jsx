import { Flex, List, Progress } from "antd";
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Label,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { Text } from "../../../common/components";
import { getPeriodRange } from "./constant";

const { __ } = wp.i18n;

const value = 50;

/**
 *  Combination of bar and line chart Component in analytics page
 * @param {Object} data - data for the composed chart
 * @returns {JSX.Element} - returns combination of bar and line chart
 */

const CombinedChart = ({ data }) => {
    const isDataEmpty = data.length === 0;
    return (
        <div className="pt-composed-chart-container">
            {/*responsive container component to make the composed chart responsive */}
            <ResponsiveContainer>
                {/*composed chart elements of  rechart */}
                <ComposedChart
                    width={1200}
                    height={400}
                    data={isDataEmpty ? getPeriodRange() : data}
                >
                    {isDataEmpty ? <CartesianGrid stroke="#f5f5f5" /> : null}
                    {/*x and y axis values */}
                    <XAxis
                        dataKey="period"
                        angle={-30}
                        axisLine={isDataEmpty}
                        tickLine={false}
                    />
                    <YAxis
                        axisLine={isDataEmpty}
                        tickLine={false}
                        domain={isDataEmpty ? [0, 150] : null}
                    />

                    {/*tooltip to show the data */}
                    <Tooltip />

                    {/*legend to show the data distribution*/}
                    <Legend
                        layout="horizontal"
                        verticalAlign="top"
                        align="left"
                    />

                    {/*bar chart of the composed chart */}
                    <Bar
                        barSize={20}
                        dataKey="impressions"
                        fill="#E5E7EB"
                        radius={[5, 5, 5, 5]}
                    />

                    {/*line chart of the composed chart */}
                    <Line
                        dataKey="conversion"
                        stroke="#2563EB"
                        type="monotone"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

/**
 *  Pie Chart Bullet Component
 * @param {Object} backgroundColor - background color of the bullet according to the portion data color
 * @returns {JSX.Element} - returns the bullet of the legend
 */
const Bullet = ({ backgroundColor }) => {
    return (
        <div
            className="pt-pie-legend-bullet"
            style={{
                backgroundColor,
            }}
        ></div>
    );
};

/**
 * Customization of the label or title of the chart
 * @param {Object} viewBox - viewBox object containing center of the label
 * @param {Object} icon - icon of the chart label
 * @param {Object} text - name of the chart label or title
 * @param {Object} data - data of the chart, do not remove as positional arguments will be passed, so possibility of breaking design
 * @returns {JSX.Element} - graphics element containing the chart icon and name of the chart label or title
 */
const CustomLabel = ({ viewBox, icon, text, data }) => {
    const { cx, cy } = viewBox;
    return (
        <g>
            {/*icon of the label */}
            {icon(value, data, cx, cy)}

            {/*text of the label */}
            <text
                x={cx}
                y={cy + 25}
                className="recharts-text recharts-label"
                textAnchor="middle"
                dominantBaseline="central"
                alignmentBaseline="middle"
                fill="#ff"
                fontSize=".75re"
                fontWeight="600"
            >
                {text}
            </text>
        </g>
    );
};

/**
 * Each of the list items of the legend
 * @param {Object} dataName - the label or name of the data item
 * @param {Object} dataValue - the value of the data item
 * @param {Object} fill - fill color of the bullet of the legend
 * @returns {JSX.Element} - list item of the legend
 */
const CustomizedLegendListItem = ({ dataName, dataValue, fill }) => {
    return (
        <Flex className="pt-pie-legend-container" justify="space-between">
            <Flex items="center" gap="small">
                <Bullet backgroundColor={fill} />
                <Text className="pt-pie-legend-text" text={dataName} />
            </Flex>
            <Text text={dataValue} />
        </Flex>
    );
};

/**
 * Customization of the legend or data distribution of the Pie chart
 * @param {Object} payload - payload or the data of the pie chart
 * @returns {JSX.Element} - list elements showing the data legend
 */
const CustomizedLegend = ({ payload }) => {
    const filterPayload = payload.filter(
        (item) => item.value !== "No Data Available",
    );
    return (
        <List
            itemLayout="horizontal"
            dataSource={filterPayload || []}
            renderItem={(item) => {
                return (
                    <List.Item>
                        <List.Item.Meta
                            description={
                                <CustomizedLegendListItem
                                    dataName={item?.value}
                                    dataValue={item?.payload?.value}
                                    fill={item?.payload?.fill}
                                />
                            }
                        />
                    </List.Item>
                );
            }}
        />
    );
};

/**
 * Customized Pie chart having icon inside
 * @param {Object} props.icon - viewBox object containing center of the label
 * @param {Object} props.icon - icon of the chart label
 * @param {Object} props.text - chart label or title of the chart
 * @param {Object} props.data - data of the pie chart
 * @returns {JSX.Element} - customized pie chart
 */
const IconPieChart = (props) => {
    const { icon, text, data, backgroundColor } = props;
    return (
        <div
            className="pt-analytics-pie-chart-container"
            style={{ backgroundColor }}
        >
            {/*responsive container component to make the pie chart responsive */}
            <ResponsiveContainer>
                {/* whole chart container */}
                <PieChart>
                    {/*Pie ring having inner and outer radius */}
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                    >
                        {/*Label or tile inside the pie chart having dynamic icon*/}
                        <Label
                            content={
                                <CustomLabel
                                    icon={icon}
                                    text={text}
                                    data={data}
                                />
                            }
                            position="center"
                        />
                    </Pie>
                    {/* recharts Legend component for showing customized legend */}
                    <Legend content={<CustomizedLegend />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export { CombinedChart, IconPieChart };
