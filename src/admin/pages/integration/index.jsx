/**
 * WordPress Dependencies
 */
import { useState, useContext } from "@wordpress/element";

import { Col, Flex, Row } from "antd";

import { getIntegrationCards } from "./constant";
import IntegrationModal from "./IntegrationModal";

import IntegrationCard from "./IntegrationCard";
import TopBar from "./TopBar";
import withIntegrationData from "./withIntegrationData";
import { IntegrationContext } from "./withIntegrationData";
import { AdminContext } from "../../withAdminData";
import { RowSkeleton } from "../../../common/components";

const Integration = () => {
    const { settings } = useContext(AdminContext);
    const { searchKey, setIntegrationState } = useContext(IntegrationContext);

    const [open, setOpen] = useState(false);
    const [cardId, setCardId] = useState(null);

    /**
     * Function to handle card click event.
     * Opens the modal and sets the clicked card's ID.
     *
     * @param {number} id - The ID of the clicked integration card
     */
    const onCardClick = (id) => {
        setOpen(true);
        setCardId(id);
    };

    // Retrieve the list of integration cards based on the searchKey (if any)
    const integrationList = getIntegrationCards({ searchKey });

    return (
        <RowSkeleton rows={12} loading={!settings}>
            <Flex vertical>
                <TopBar setSearchKey={setIntegrationState} />
                <Row gutter={[12, 12]}>
                    {integrationList.map((card) => (
                        <Col
                            xs={{ flex: "100%" }}
                            sm={{ flex: "50%" }}
                            md={{ flex: "50%" }}
                            lg={{ flex: "25%" }}
                            xl={{ flex: "20%" }}
                        >
                            <IntegrationCard
                                card={card}
                                onCardClick={onCardClick}
                            />
                        </Col>
                    ))}
                </Row>
                <IntegrationModal
                    cardInfo={integrationList[cardId - 1]}
                    open={open}
                    setOpen={setOpen}
                />
            </Flex>
        </RowSkeleton>
    );
};

export default withIntegrationData(Integration);
