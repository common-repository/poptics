/**
 * WordPress Dependencies
 */
import { useImperativeHandle, forwardRef, useEffect } from "@wordpress/element";

import { Form as AntdForm } from "antd";

const Form = forwardRef((props, ref) => {
    const [form] = AntdForm.useForm();
    const { children, onWatch, fieldToWatch, ...rest } = props;

    // Use Form.useWatch to monitor the "name" field (you can change it as per your form)
    const watchedField = AntdForm.useWatch(fieldToWatch, form);

    // Use useImperativeHandle to pass back watched value to parent
    useImperativeHandle(ref, () => ({ form, FormInstance: AntdForm }));

    // Or send the watched value back to the parent directly via a callback
    useEffect(() => {
        if (onWatch) {
            onWatch(watchedField); // Send watched value to parent
        }
    }, [watchedField]);

    return (
        <AntdForm form={form} {...rest}>
            {children}
        </AntdForm>
    );
});

export const FormItem = (props) => {
    const { children, ...rest } = props;
    return <AntdForm.Item {...rest}>{children}</AntdForm.Item>;
};

export const FormList = (props) => {
    const { children, ...rest } = props;
    return <AntdForm.List {...rest}>{children}</AntdForm.List>;
};

export default Form;
