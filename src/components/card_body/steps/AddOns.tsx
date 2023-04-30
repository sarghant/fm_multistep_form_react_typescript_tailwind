import { useFormSteps, AddOn } from "../../../context/FormStepsContext";
import { StepControls } from "../StepControls";

type AddOnsProps = {
  isMonthly: boolean;
};
type AddonProps = {
  isMonthly: boolean;
  handleCheck: (id: number, checked: boolean) => void;
} & AddOn;

export function AddOns({ isMonthly }: AddOnsProps) {
  const { addons, handleAddons, currentStep, listSteps } = useFormSteps();
  // Current step's title and subtitle
  const currentStepProps = listSteps.find((step) => step.step === currentStep);
  let title = "",
    subtitle = "";
  if (currentStepProps) {
    title = currentStepProps.title;
    subtitle = currentStepProps.subtitle;
  }
  function handleCheck(id: number, checked: boolean) {
    handleAddons(id, checked);
  }
  return (
    <>
      <div className="sm:flex-grow rounded-xl sm:rounded py-8 px-7 pb-10 sm:p-0 absolute sm:static inset-x-6 top-32 h-max bg-white">
        <h2 className="text-slate-700 mb-2 text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>
        <p className="text-slate-400 mb-6 sm:mb-8">{subtitle}</p>
        {addons.map((addon) => (
          <Addon
            key={addon.id}
            {...addon}
            isMonthly={isMonthly}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      <StepControls />
    </>
  );
}

function Addon({
  id,
  name,
  desc,
  label,
  checked,
  price,
  isMonthly,
  handleCheck,
}: AddonProps) {
  return (
    <label
      htmlFor={label}
      className={`rounded-lg border ${
        checked ? "border-purple-800" : "border-slate-300"
      } p-4 sm:p-5 mb-4 cursor-pointer flex gap-2 items-center hover:bg-slate-100 focus:bg-slate-100 transition-colors`}
    >
      <div className="flex gap-4 sm:gap-6 items-center flex-grow">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleCheck(id, e.target.checked)}
          id={label}
          className="rounded border-slate-300 w-5 h-5 outline-none"
        />
        <div className="leading-tight">
          <h4 className="text-blue-900 font-semibold">{name}</h4>
          <small className="text-slate-400 font-medium text-md whitespace-nowrap">
            {desc}
          </small>
        </div>
      </div>
      <span className="text-slate-400 text-sm">{`+$${price}/${
        isMonthly ? "mo" : "yr"
      }`}</span>
    </label>
  );
}
