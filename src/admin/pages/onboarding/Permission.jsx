import PermissionCard from "./PermissionCard";
import OnboardFooter from "./OnboardFooter";
import { Link, Text, Title, Form } from "../../../common/components";
import { permissionCardItems, permissionDescription } from "./constant";
import { useOnboardingAPI } from "./useOnboardingAPI";

const { __ } = wp.i18n;

const Permission = () => {
  const { createOnboarding } = useOnboardingAPI();

  const onFinish = async (permissionValues) => {
    const permissionApiValues = Object.fromEntries(
      Object.entries(permissionValues).map(([key, value]) => [
        key,
        value ? 1 : 0,
      ])
    );
    await createOnboarding(permissionApiValues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="pt-onboard-wizard-container">
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="pt-onboard-items-container">
          <Title
            text={__("What Permission Are Be Granted", "poptics")}
            className="pt-input-title"
          />
          {permissionCardItems?.map((permissionItem) => (
            <PermissionCard
              icon={permissionItem?.icon}
              title={permissionItem?.title}
              name={permissionItem?.name}
              description={permissionItem?.descriptions}
            />
          ))}
          <div
            className="pt-description"
            id="pt-onboard-permission-description-container"
          >
            <Text text={permissionDescription} />
            <Link href="#" text={__(" Privacy Policy ", "poptics")} />
            <Text text={__("and ", "poptics")} />
            <Link href="#" text={__("Terms o Service", "poptics")} />
          </div>
        </div>

        {/* footer section */}
        <OnboardFooter />
      </Form>
    </div>
  );
};

export default Permission;
