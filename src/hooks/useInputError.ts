import { RefObject } from "react";

export function useInputError(
  value: string,
  type: string,
  ref: RefObject<HTMLInputElement>
) {
  let error;
  if (value === "") error = "This field is required.";
  else if (type === "email" && !ref.current!.checkValidity())
    error = "Must be a valid email.";
  else if (type === "tel" && !ref.current!.checkValidity())
    error = "Must be a valid phone number.";
  else error = "";
  return error;
}
