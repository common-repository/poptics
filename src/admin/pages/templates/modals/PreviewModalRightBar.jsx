/**
 * WordPress Dependencies
 */
import { useContext } from "@wordpress/element";

import { Flex, Space } from "antd";
import { CategoryInfo } from "../../../components/CategoryInfo";
import { Button, Text } from "../../../../common/components";
import { TemplateContext } from "../withTemplateData";
import { taxonomy } from "../../../../globalConstant";

const { __ } = wp.i18n;

const PreviewModalRightBar = ({ data }) => {
    // Access template states
    const templateStates = useContext(TemplateContext);
    const { setTemplateStates } = templateStates;

    /**
     * Formats a string by replacing underscores with spaces and capitalizing the first letter of each word.
     *
     * @param {string} value - The string to be formatted.
     * @returns {string} - The formatted string.
     */
    const underScoreStringFormat = (value) => {
        // Replace underscores with spaces and capitalize the first letter of each word
        return value
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    /**
     * Formats an audience object by transforming keys or values into a human-readable format.
     *
     * @param {Object} audience - The audience object containing key-value pairs.
     * @returns {Array} - An array of formatted audience strings.
     */
    const formatValue = (audience = {}) => {
        const formattedAudience = [];
        for (let key in audience) {
            if (typeof audience[key].value === "boolean") {
                // Format the key using underScoreStringFormat and add it to the formattedAudience array
                formattedAudience.push(underScoreStringFormat(key));
            } else if (typeof audience[key].value === "string") {
                // Format the string value using underScoreStringFormat and add it to the formattedAudience array
                formattedAudience.push(
                    underScoreStringFormat(audience[key].value),
                );
            }
        }

        return formattedAudience;
    };

    const audienceValues = formatValue(data?.controls?.audience);

    /**
     * Handles the opening of the create campaign modal.
     */
    const handleOpenModal = () => {
        setTemplateStates((preVal) => ({
            ...preVal,
            openCreateCampModal: true,
        }));
    };

    return (
        <Flex vertical gap="large">
            {/* header  section*/}
            <Space direction="vertical">
                <CategoryInfo type={data?.taxonomy?.[taxonomy.type]} />
                <Text className="pt-preview-modal-title" text={data?.name} />
                <Button
                    aria-label={__("customize", "poptics")}
                    type="primary"
                    className="pt-preview-modal-right-bar-btn"
                    text={__("Customize", "poptics")}
                    onClick={handleOpenModal}
                />
            </Space>

            {/* summary section*/}
            <Space direction="vertical">
                <Text
                    className="pt-preview-modal-title-secondary"
                    text={__("Summary", "poptics")}
                />

                <Space direction="vertical">
                    <Space>
                        <Text
                            className="pt-preview-modal-description-secondary"
                            text={__("Goal: ", "poptics")}
                        />
                        <Text
                            className="pt-preview-modal-description-black"
                            text={data?.taxonomy?.[taxonomy.goal]?.name}
                        />
                    </Space>

                    <Space align="top">
                        <Text
                            className="pt-preview-modal-description-secondary"
                            text={__("Audience: ", "poptics")}
                        />
                        <Space direction="vertical">
                            {audienceValues?.map((value, index) => (
                                <Text
                                    key={index}
                                    className="pt-preview-modal-description-black"
                                    text={value}
                                />
                            ))}
                        </Space>
                    </Space>
                </Space>
            </Space>
        </Flex>
    );
};

export default PreviewModalRightBar;
