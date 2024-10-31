import { Button, Col, Row } from "antd";
import { Img, Text, Title } from "../../../common/components";
import { useNavigate } from "react-router-dom";
const { __ } = wp.i18n;
const EmptyScreen = ({ data }) => {
    const navigate = useNavigate();

    // Navigate to the specified URL
    const handleClick = () => {
        navigate(data?.btnLink);
    };

    return (
        <div className="pt-empty-page-wrapper">
            <Row span gutter={[48, 16]} justify="center" align="top">
                <Col xs={24} md={14}>
                    <Img
                        src={data?.image}
                        alt={__("popup dummy image", "poptics")}
                    />
                </Col>
                <Col xs={24} md={10}>
                    <Title
                        level={3}
                        className="pt-empty-page-title"
                        text={data?.title}
                    />
                    <Text
                        className="pt-empty-page-description"
                        text={data?.description}
                    />
                    <ul>
                        {data?.listItem?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <Button
                        aria-label={__("empty screen button", "poptics")}
                        type="primary"
                        size="large"
                        onClick={handleClick}
                    >
                        {data?.btnText}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default EmptyScreen;
