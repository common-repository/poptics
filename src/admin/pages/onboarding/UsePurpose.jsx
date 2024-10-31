import { useState } from "@wordpress/element";

import { CheckBox, Form, Title } from "../../../common/components";
import { usePurposeItems } from "./constant";
import { useOnboardingAPI } from "./useOnboardingAPI";
import OnboardFooter from "./OnboardFooter";
import { Flex } from "antd";

const { __ } = wp.i18n;

const UsePurpose = () => {
    const { createOnboarding } = useOnboardingAPI();

    const [purposeValues, setPurposeValues] = useState({
        [usePurposeItems[0]?.name]: [],
        [usePurposeItems[1]?.name]: [],
    });

    // call api after form submission
    const onFinish = async () => {
        await createOnboarding(purposeValues);
    };

    // update the state of purpose items onchange of checkbox
    const onChange = (event) => {
        const { checked, name, title } = event?.target;
        const firstPurposeTitle = usePurposeItems[0]?.title;
        const firstPurposeName = usePurposeItems[0]?.name;
        const secondPurposeTitle = usePurposeItems[1]?.title;
        const secondPurposeName = usePurposeItems[1]?.name;

        if (title === firstPurposeTitle) {
            if (checked) {
                const index = purposeValues[firstPurposeName].indexOf(name);
                index === -1 &&
                    setPurposeValues((previousValues) => {
                        previousValues[firstPurposeName].push(name);
                        return { ...previousValues };
                    });
            } else {
                const index = purposeValues[firstPurposeName].indexOf(name);
                index > -1 &&
                    setPurposeValues((previousValues) => {
                        purposeValues[firstPurposeName].splice(index, 1);
                        return { ...previousValues };
                    });
            }
        } else if (title === secondPurposeTitle) {
            if (checked) {
                const index = purposeValues[secondPurposeName].indexOf(name);
                index === -1 &&
                    setPurposeValues((previousValues) => {
                        previousValues[secondPurposeName].push(name);
                        return { ...previousValues };
                    });
            } else {
                const index = purposeValues[secondPurposeName].indexOf(name);
                index > -1 &&
                    setPurposeValues((previousValues) => {
                        purposeValues[secondPurposeName].splice(index, 1);
                        return { ...previousValues };
                    });
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="pt-onboard-wizard-container">
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Flex
                    vertical
                    gap="middle"
                    className="pt-onboard-items-container"
                >
                    {/* map through all purposes items */}

                    {usePurposeItems?.map((purposeItem) => (
                        <div>
                            <Title
                                text={purposeItem?.title}
                                className="pt-input-title"
                            />
                            {purposeItem?.checkBoxItems?.map((checkboxItem) => (
                                <CheckBox
                                    className="pt-checkbox-container"
                                    onChange={onChange}
                                    name={purposeItem?.name}
                                    title={purposeItem?.title}
                                >
                                    {checkboxItem}
                                </CheckBox>
                            ))}
                        </div>
                    ))}
                </Flex>

                {/* footer section */}
                <OnboardFooter />
            </Form>
        </div>
    );
};

export default UsePurpose;
