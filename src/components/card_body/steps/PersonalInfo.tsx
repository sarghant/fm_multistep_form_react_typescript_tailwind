import { useState, useRef } from "react";
import { useFormSteps } from "../../../context/FormStepsContext";
import { useInputError } from "../../../hooks/useInputError";
import { StepControls } from "../StepControls";

export function PersonalInfo() {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [phoneNumber, setPhoneNumber] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null),
    emailRef = useRef<HTMLInputElement>(null),
    phoneNumberRef = useRef<HTMLInputElement>(null);
  const inputRefs = [usernameRef, emailRef, phoneNumberRef];
  const { changeStep, currentStep, listSteps } = useFormSteps();
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const usernameError = useInputError(username, "text", usernameRef);
  const emailError = useInputError(email, "email", emailRef);
  const phoneNumberError = useInputError(phoneNumber, "tel", phoneNumberRef);
  // Current step's title and subtitle
  const currentStepProps = listSteps.find((step) => step.step === currentStep);
  let title = "",
    subtitle = "";
  if (currentStepProps) {
    title = currentStepProps.title;
    subtitle = currentStepProps.subtitle;
  }
  function handleInputs() {
    if (!inputRefs.every((inputRef) => inputRef.current!.checkValidity())) {
      setIsInvalidInput(true);
      return;
    }
    setIsInvalidInput(false);
    changeStep(1);
  }
  function hasError(errorMessage: string) {
    return errorMessage.length > 0 && isInvalidInput;
  }
  return (
    <>
      <div className="sm:flex-grow rounded-xl sm:rounded py-8 px-7 pb-10 sm:p-0 absolute sm:static inset-x-6 top-32 h-max bg-white">
        <h2 className="text-slate-700 mb-2 text-2xl sm:text-3xl font-semibold">
          {title}
        </h2>
        <p className="text-slate-400 mb-6 sm:mb-8">{subtitle}</p>
        <div className="mb-5">
          <label htmlFor="name" className="inline-block mb-2 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g. Stephen King"
            className={`w-full rounded-md ${
              hasError(usernameError) ? "border-red-500" : "border-gray-300"
            } placeholder:font-medium placeholder:text-slate-400`}
            required
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {hasError(usernameError) && (
            <span className="text-red-500 text-sm">{usernameError}</span>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="inline-block mb-2 text-sm">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            className={`w-full rounded-md ${
              hasError(emailError) ? "border-red-500" : "border-gray-300"
            } placeholder:font-medium placeholder:text-slate-400`}
            required
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {hasError(emailError) && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="inline-block mb-2 text-sm">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            pattern="[+]*[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="e.g. +1 234 567 890"
            className={`w-full rounded-md ${
              hasError(phoneNumberError) ? "border-red-500" : "border-gray-300"
            } placeholder:font-medium placeholder:text-slate-400`}
            required
            ref={phoneNumberRef}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {hasError(phoneNumberError) && (
            <span className="text-red-500 text-sm">{phoneNumberError}</span>
          )}
        </div>
      </div>
      <StepControls handleInputs={handleInputs} />
    </>
  );
}
