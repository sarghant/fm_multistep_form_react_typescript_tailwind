import { StepControls } from "../StepControls";
import { useFormSteps } from "../../../context/FormStepsContext";

type SummaryProps = {
  selectedPlanId: number | null;
  isMonthly: boolean;
};

export function Summary({ selectedPlanId, isMonthly }: SummaryProps) {
  const { plans, addons, changeStep, currentStep, listSteps } = useFormSteps();
  // Current step's title and subtitle
  const currentStepProps = listSteps.find((step) => step.step === currentStep);
  let title = "",
    subtitle = "";
  if (currentStepProps) {
    title = currentStepProps.title;
    subtitle = currentStepProps.subtitle;
  }
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
  const planDisplayName =
    selectedPlan!.name.substring(0, 1).toUpperCase() +
    selectedPlan!.name.substring(1);
  const pickedAddons = addons.filter((addon) => addon.checked);
  // Calculate the total
  let totalAddons = 0;
  for (let i of pickedAddons) {
    totalAddons += i.price;
  }
  const total = selectedPlan!.price + totalAddons;
  return (
    <>
      <div className="sm:flex-grow rounded-xl sm:rounded py-8 px-7 pb-10 sm:p-0 absolute sm:static inset-x-6 top-32 h-max bg-white">
        <h2 className="text-slate-700 mb-2 text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>
        <p className="text-slate-400 mb-6 sm:mb-8">{subtitle}</p>
        <div className="bg-slate-100 p-5 rounded-lg mb-6">
          {selectedPlan && (
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="leading-snug">
                <h4 className="text-blue-900 font-medium">{`${planDisplayName} (${
                  isMonthly ? "Monthly" : "Yearly"
                })`}</h4>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    changeStep(-2);
                  }}
                  className="text-slate-400 text-sm underline cursor-pointer hover:text-slate-500 transition-colors"
                >
                  Change
                </button>
              </div>
              <span className="font-semibold text-blue-900">{`$${
                selectedPlan.price
              }/${isMonthly ? "mo" : "yr"}`}</span>
            </div>
          )}
          {pickedAddons.length > 0 && (
            <>
              <hr className="mb-5" />
              {pickedAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-center justify-between gap-2 mb-2"
                >
                  <span className="text-slate-400">{addon.name}</span>
                  <span className="text-blue-900 text-sm">{`+$${addon.price}/${
                    isMonthly ? "mo" : "yr"
                  }`}</span>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 px-6">
          <span className="text-slate-400">{`Total (per ${
            isMonthly ? "month" : "year"
          })`}</span>
          <span className="text-purple-800 text-xl font-semibold">{`+$${total}/${
            isMonthly ? "mo" : "yr"
          }`}</span>
        </div>
      </div>
      <StepControls />
    </>
  );
}
