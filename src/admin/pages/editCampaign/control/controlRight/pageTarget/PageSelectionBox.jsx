/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Col, Space, Tooltip } from "antd";
import { InfoIcon } from "../../../../../../common/icons";
import { SingleCampaignContext } from "../../../withSingleCampaignData";
import useProcessCampaignEditData from "../../../hooks/useProcessCampaignEditData";
import { Tabs, SelectInput } from "../../../../../../common/components";
import InputCustomUrl from "./InputCustomUrl";

const { __ } = wp.i18n;

const PageSelectionBox = ({ label, tooltipText, field }) => {
    // Use context to access campaign data
    const { campaign } = useContext(SingleCampaignContext);

    // Custom hook to process and update campaign data
    const { processControlData } = useProcessCampaignEditData();

    const initialValue = campaign?.controls?.page_target?.[field];

    // Function to handle updates to the campaign controls
    const handleEditControl = (value, subField) => {
        processControlData({
            form: "page_target",
            field,
            value: { [subField]: value },
        });
    };

    const { published_pages, published_posts, woocommerce_products } =
        window?.poptics;

    const tabItem = [
        {
            key: "pages",
            label: __("Pages", "poptics"),
            options: published_pages,
        },
        {
            key: "posts",
            label: __("Posts", "poptics"),
            options: published_posts,
        },
        {
            key: "products",
            label: __("Products", "poptics"),
            options: woocommerce_products,
        },
        {
            key: "url",
            label: __("URL", "poptics"),
            children: <InputCustomUrl />,
        },
    ];

    return (
        <Col
            xs={24}
            sm={24}
            md={18}
            xxl={16}
            className="pt-control-form-bottom-wrapper"
        >
            <Space className="pt-control-form-label">
                {label}
                <Tooltip title={tooltipText}>
                    <span>
                        <InfoIcon />
                    </span>
                </Tooltip>
            </Space>

            <Tabs
                type="card"
                defaultActiveKey="pages"
                items={tabItem.map((item) => ({
                    ...item,
                    children: item.children || (
                        <SelectInput
                            className="pt-w-100"
                            mode="multiple"
                            defaultValue={initialValue?.[item.key]}
                            placeholder={__(
                                `Select or Search for ${item.key}`,
                                "poptics",
                            )}
                            options={item.options.map((option) => ({
                                value: option.id,
                                label: option.title,
                                link: option.link,
                            }))}
                            onChange={(_, value) =>
                                handleEditControl(value, item.key)
                            }
                        />
                    ),
                }))}
            />
        </Col>
    );
};

export default PageSelectionBox;
