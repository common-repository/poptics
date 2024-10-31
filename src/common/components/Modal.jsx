import { Modal as AntdModal } from "antd";

const Modal = (props) => {
    return <AntdModal maskClosable={false} {...props}></AntdModal>;
};

export default Modal;
