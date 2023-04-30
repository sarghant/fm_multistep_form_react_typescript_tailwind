import { FormEvent, useMemo, useState } from "react";
import { useFormSteps } from "../../context/FormStepsContext";
import { FormStep } from "./FormStep";

export function CardBody() {
  const { currentStep, listSteps } = useFormSteps();
  const activeStepForm = useMemo(
    () => listSteps.find((ls) => ls.step === currentStep),
    [currentStep]
  );
  const [formComplete, setFormComplete] = useState(false);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormComplete(true);
  }
  return (
    <form
      noValidate
      className="sm:mx-auto sm:pt-10 sm:pb-4 h-full min-w-full sm:min-w-max sm:flex sm:flex-col relative sm:static"
      onSubmit={handleSubmit}
    >
      {activeStepForm && !formComplete && (
        <FormStep step={activeStepForm.step} />
      )}
      {formComplete && (
        <div className="flex flex-col items-center justify-center gap-3 px-3 bg-white sm:bg-transparent rounded-xl sm:rounded-none absolute sm:static inset-x-6 top-32 bottom-48 sm:h-full">
          <img
            src="img/icon-thank-you.svg"
            alt="Thank You"
            className="w-16 sm:w-20 mb-2 sm:mb-4"
          />
          <h2 className="text-blue-900 text-2xl sm:text-3xl font-semibold">
            Thank you!
          </h2>
          <p className="text-gray-400 text-center sm:w-96">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </p>
        </div>
      )}
    </form>
  );
}
