import { useState } from "react";
import { PersonalInfo } from "./steps/PersonalInfo";
import { SelectPlans } from "./steps/SelectPlan";
import { AddOns } from "./steps/AddOns";
import { Summary } from "./steps/Summary";
import { useFormSteps } from "../../context/FormStepsContext";

type FormStepProps = {
  step: number;
};

export function FormStep({ step }: FormStepProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [isMonthly, setIsMonthly] = useState(true);
  const { handlePaymentPeriodPrice } = useFormSteps();
  function handlePlanSelect(id: number) {
    setSelectedPlanId(id);
  }
  function handlePaymentPeriodChange() {
    setIsMonthly(!isMonthly);
    handlePaymentPeriodPrice(!isMonthly);
  }
  return (
    <>
      {step === 1 && <PersonalInfo />}
      {step === 2 && (
        <SelectPlans
          selectedPlanId={selectedPlanId}
          onPlanSelect={handlePlanSelect}
          isMonthly={isMonthly}
          togglePaymentPeriod={() => handlePaymentPeriodChange()}
        />
      )}
      {step === 3 && <AddOns isMonthly={isMonthly} />}
      {step === 4 && (
        <Summary selectedPlanId={selectedPlanId} isMonthly={isMonthly} />
      )}
    </>
  );
}
