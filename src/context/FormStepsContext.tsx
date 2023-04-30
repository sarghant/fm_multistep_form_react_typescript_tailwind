import { createContext, useContext, ReactNode, useState } from "react";
type FormStepsContext = {
  screenX: number;
  onResize: () => void;
  currentStep: number;
  listSteps: ListStep[];
  changeStep: (n: number) => void;
  plans: SelectPlan[];
  addons: AddOn[];
  handleAddons: (id: number, checked: boolean) => void;
  handlePaymentPeriodPrice: (isMonthly: boolean) => void;
};
type FormStepsProviderProps = {
  children: ReactNode;
};
export type ListStep = {
  step: number;
  title: string;
  subtitle: string;
};
export type SelectPlan = {
  id: number;
  name: string;
  initialPrice: number;
  price: number;
};
export type AddOn = {
  id: number;
  name: string;
  desc: string;
  label: string;
  checked: boolean;
  initialPrice: number;
  price: number;
};
const FormStepsContext = createContext({} as FormStepsContext);

export function useFormSteps() {
  return useContext(FormStepsContext);
}

export function FormStepsProvider({ children }: FormStepsProviderProps) {
  // State for horizontal screen size to use for responsive purposes
  const [screenX, setScreenX] = useState(window.innerWidth);
  function onResize() {
    setScreenX(window.innerWidth);
  }
  const [currentStep, setCurrentStep] = useState(1);
  const listSteps: ListStep[] = [
    {
      step: 1,
      title: "Personal info",
      subtitle: "Please, provide your name, email address and phone number.",
    },
    {
      step: 2,
      title: "Select plan",
      subtitle: "You have the option of montly or yearly billing.",
    },
    {
      step: 3,
      title: "Add-ons",
      subtitle: "Add-ons help enhance your gaming experience.",
    },
    {
      step: 4,
      title: "Finishing up",
      subtitle: "Double-check everything looks OK before confirming.",
    },
  ];
  // Select plan
  const [plans, setPlans] = useState<SelectPlan[]>([
    {
      id: 1,
      name: "arcade",
      initialPrice: 9,
      price: 9,
    },
    {
      id: 2,
      name: "advanced",
      initialPrice: 12,
      price: 12,
    },
    {
      id: 3,
      name: "pro",
      initialPrice: 15,
      price: 15,
    },
  ]);
  // Add-ons
  const [addons, setAddons] = useState<AddOn[]>([
    {
      id: 1,
      name: "Online service",
      desc: "Access to multiplayer games",
      label: "online_service",
      checked: false,
      initialPrice: 1,
      price: 1,
    },
    {
      id: 2,
      name: "Larger storage",
      desc: "Extra 1TB of cloud save",
      label: "larger_storage",
      checked: false,
      initialPrice: 2,
      price: 2,
    },
    {
      id: 3,
      name: "Customizable profile",
      desc: "Custom theme on your profile",
      label: "custom_profile",
      checked: false,
      initialPrice: 2,
      price: 2,
    },
  ]);
  function handleAddons(id: number, checked: boolean) {
    setAddons((prevAddons) => {
      return prevAddons.map((addon) => {
        if (addon.id === id) return { ...addon, checked };
        else return addon;
      });
    });
  }
  function handlePaymentPeriodPrice(isMonthly: boolean) {
    setPlans(
      plans.map((plan) => ({
        ...plan,
        price: isMonthly ? plan.initialPrice : plan.initialPrice * 10,
      }))
    );
    setAddons(
      addons.map((addon) => ({
        ...addon,
        price: isMonthly ? addon.initialPrice : addon.initialPrice * 10,
      }))
    );
  }
  function changeStep(n: number) {
    setCurrentStep(currentStep + n);
  }
  return (
    <FormStepsContext.Provider
      value={{
        screenX,
        onResize,
        currentStep,
        listSteps,
        changeStep,
        plans,
        addons,
        handleAddons,
        handlePaymentPeriodPrice,
      }}
    >
      {children}
    </FormStepsContext.Provider>
  );
}
