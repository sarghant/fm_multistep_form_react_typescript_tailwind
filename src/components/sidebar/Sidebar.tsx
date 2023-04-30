import { ListItem } from "./ListItem";
import { useFormSteps } from "../../context/FormStepsContext";

export function Sidebar() {
  const { currentStep, listSteps, screenX } = useFormSteps();
  return (
    <div className="absolute inset-x-0 sm:inset-x-auto top-0 h-52 sm:rounded-2xl sm:h-full sm:relative sm:w-64 overflow-hidden">
      <img
        src={
          screenX > 640
            ? "img/bg-sidebar-desktop.svg"
            : "img/bg-sidebar-mobile.svg"
        }
        alt="Sidebar background"
        className="absolute min-w-full min-h-full object-cover"
      />
      <ul className="list-none flex justify-center gap-4 sm:block absolute top-10 inset-x-0 sm:inset-x-auto sm:left-10">
        {listSteps.map((s) => (
          <ListItem key={s.step} {...s} isCurrent={currentStep === s.step} />
        ))}
      </ul>
    </div>
  );
}
