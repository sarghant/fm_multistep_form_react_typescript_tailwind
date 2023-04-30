import { useFormSteps } from "../../context/FormStepsContext";

type StepControlsProps = {
  handleInputs?: () => void;
  selectedPlanId?: number | null;
};

export function StepControls({
  handleInputs,
  selectedPlanId,
}: StepControlsProps) {
  const { currentStep, listSteps, changeStep } = useFormSteps();
  return (
    <div className="flex justify-between items-center gap-2 absolute sm:static bottom-0 inset-x-0 bg-white sm:bg-none py-3 px-4 sm:p-0">
      {currentStep > 1 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            changeStep(-1);
          }}
          className="text-slate-400 font-medium hover:text-slate-500 focus:text-slate-500 transition-colors"
        >
          Go Back
        </button>
      )}
      {currentStep === listSteps.length ? (
        <button
          type="submit"
          className="bg-purple-800 text-white text-lg rounded-md py-3 px-8 ml-auto hover:bg-purple-600 focus:bg-purple-600 transition-colors"
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            if (currentStep === 1 && handleInputs) handleInputs();
            if (currentStep === 2 && selectedPlanId != null) changeStep(1);
            if (currentStep === 3) changeStep(1);
          }}
          className="bg-blue-900 text-blue-50 text-lg rounded sm:rounded-md py-2 px-5 sm:py-3 sm:px-6 ml-auto hover:bg-blue-700 focus:bg-blue-700 transition-colors"
        >
          Next Step
        </button>
      )}
    </div>
  );
}
