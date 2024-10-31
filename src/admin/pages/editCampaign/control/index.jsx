import { Affix, Col, Row } from "antd";
import ControlLeft from "./ControlLeft";
import ControlRight from "./controlRight";

const Control = () => {
    return (
        <>
            <Row gutter={[16, 32]} justify={"center"}>
                <Col xs={0} sm={0} lg={6} xxl={4}>
                    <Affix offsetTop={50}>
                        <ControlLeft />
                    </Affix>
                </Col>
                <Col sm={24} lg={18} xxl={16}>
                    <ControlRight />
                </Col>
            </Row>
        </>
    );
};

export default Control;
