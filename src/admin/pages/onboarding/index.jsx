import { useState, createContext } from "@wordpress/element";
const { __ } = wp.i18n;

import Permission from "./Permission";
import UsePurpose from "./UsePurpose";
import Welcome from "./Welcome";

export const OnboardContext = createContext();

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const onboardingStates = { currentStep, setCurrentStep, loading, setLoading };
  const OnboardingSteps = [
    {
      title: 1,
      content: <Welcome />,
    },
    {
      title: 2,
      content: <UsePurpose />,
    },
    {
      title: 3,
      content: <Permission />,
    },
  ];
  return (
    <OnboardContext.Provider value={onboardingStates}>
      <div>{OnboardingSteps[currentStep - 1].content}</div>;
    </OnboardContext.Provider>
  );
};

export default Onboarding;
