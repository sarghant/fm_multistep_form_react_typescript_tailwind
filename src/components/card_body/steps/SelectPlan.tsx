import { useFormSteps } from "../../../context/FormStepsContext";
import { StepControls } from "../StepControls";
import { SelectPlan } from "../../../context/FormStepsContext";

type SelectPlansProps = {
  selectedPlanId: number | null;
  onPlanSelect: (id: number) => void;
  isMonthly: boolean;
  togglePaymentPeriod: () => void;
};
type PlanProps = {
  selectedId: number | null;
  onPlanSelect: (id: number) => void;
  isMonthly: boolean;
} & SelectPlan;

export function SelectPlans({
  selectedPlanId,
  onPlanSelect,
  isMonthly,
  togglePaymentPeriod,
}: SelectPlansProps) {
  const { plans, currentStep, listSteps } = useFormSteps();
  // Current step's title and subtitle
  const currentStepProps = listSteps.find((step) => step.step === currentStep);
  let title = "",
    subtitle = "";
  if (currentStepProps) {
    title = currentStepProps.title;
    subtitle = currentStepProps.subtitle;
  }
  return (
    <>
      <div className="sm:flex-grow rounded-xl sm:rounded py-8 px-7 pb-10 sm:p-0 absolute sm:static inset-x-6 top-32 h-max bg-white">
        <h2 className="text-slate-700 mb-2 text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>
        <p className="text-slate-400 mb-6 sm:mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6">
          {plans.map((plan) => (
            <Plan
              key={plan.id}
              {...plan}
              selectedId={selectedPlanId}
              onPlanSelect={onPlanSelect}
              isMonthly={isMonthly}
            />
          ))}
        </div>
        <div className="bg-slate-100 rounded-lg flex gap-6 items-center justify-center py-2">
          <span
            className={`font-medium ${
              isMonthly ? "text-blue-900" : "text-slate-300"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              togglePaymentPeriod();
            }}
            className="bg-blue-900 p-1 rounded-2xl h-6 w-10 cursor-pointer"
          >
            <span
              className={`bg-white rounded-full w-4 h-4 block ${
                isMonthly ? "translate-x-0" : "translate-x-full"
              } transition-transform`}
            ></span>
          </button>
          <span
            className={`font-medium ${
              isMonthly ? "text-slate-300" : "text-blue-900"
            }`}
          >
            Yearly
          </span>
        </div>
      </div>
      <StepControls selectedPlanId={selectedPlanId} />
    </>
  );
}

function Plan({
  id,
  name,
  price,
  selectedId,
  onPlanSelect,
  isMonthly,
}: PlanProps) {
  const displayName = name.substring(0, 1).toUpperCase() + name.substring(1);
  const isSelected = selectedId === id;
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onPlanSelect(id);
      }}
      className={`w-full sm:w-40 sm:h-48 flex gap-3 flex-row sm:flex-col sm:justify-between rounded-lg border py-4 sm:py-5 px-4 hover:bg-gray-100 transition-colors
        ${isSelected ? "border-purple-900 bg-slate-100" : "border-slate-300"}`}
    >
      <img src={`img/icon-${name}.svg`} alt={displayName} className="w-11" />
      <div className="leading-snug text-left">
        <h4 className="text-blue-900 font-medium">{displayName}</h4>
        <small className="text-slate-400 font-medium text-sm">
          {`$${price}/${isMonthly ? "mo" : "yr"}`}
        </small>
        {!isMonthly && (
          <small className="text-sm text-blue-900 font-medium block">
            2 months free
          </small>
        )}
      </div>
    </button>
  );
}
