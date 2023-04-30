import { ListStep } from "../../context/FormStepsContext";
import { useFormSteps } from "../../context/FormStepsContext";

type ListItemProps = {
  isCurrent: boolean;
} & ListStep;

export function ListItem({ step, title, isCurrent }: ListItemProps) {
  const { screenX } = useFormSteps();
  return (
    <li className="sm:flex sm:items-center sm:gap-4 sm:mb-5">
      <span
        className={`rounded-full w-9 h-9 flex items-center justify-center text-lg font-medium ${
          isCurrent ? "bg-white text-black" : "text-white"
        }`}
        style={{ border: "1px solid white" }}
      >
        {step}
      </span>
      {screenX > 640 && (
        <div className="flex flex-col">
          <small className="uppercase text-slate-400 font-medium">
            Step {step}
          </small>
          <span className="uppercase text-white tracking-wide font-medium">
            {title}
          </span>
        </div>
      )}
    </li>
  );
}
